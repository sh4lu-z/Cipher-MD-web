import crypto from 'crypto';


function cleanNumber(raw) {
    if (!raw) return '';
    let cleaned = String(raw).replace(/\D/g, '');
    cleaned = cleaned.replace(/^00/, '');
    return cleaned;
}

function getHash(num, salt) {
    return crypto.createHmac('sha256', salt).update(num).digest('hex');
}

async function fetchRawData(owner, repo, filePath) {
    try {
        const url = `https://raw.githubusercontent.com/${owner}/${repo}/main/${filePath}?t=${Date.now()}`;
        const res = await fetch(url, { headers: { 'User-Agent': 'Cipher-MD-Web' } });
        if (res.ok) {
            const parsed = await res.json();
            return {
                exists: true,
                hashes: Array.isArray(parsed) ? parsed : (Array.isArray(parsed.hashes) ? parsed.hashes : []),
                logs: Array.isArray(parsed.logs) ? parsed.logs : []
            };
        }
    } catch {
        // Fallback to GitHub API if raw fetch fails
    }
    return null;
}

async function fetchFromGitHub(owner, repo, filePath, token) {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
    const headers = {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Cipher-MD-Web'
    };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(url, { headers });
    if (res.status === 404) {
        return { exists: false, sha: null, hashes: [], logs: [] };
    }
    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`GitHub API error (${res.status}): ${errorText}`);
    }

    const data = await res.json();
    const content = Buffer.from(data.content, 'base64').toString('utf8');
    let parsed;
    try {
        parsed = JSON.parse(content);
    } catch {
        parsed = { hashes: [], logs: [] };
    }

    const hashList = Array.isArray(parsed) ? parsed : (Array.isArray(parsed.hashes) ? parsed.hashes : []);
    const logList = Array.isArray(parsed.logs) ? parsed.logs : [];
    return {
        exists: true,
        sha: data.sha,
        hashes: hashList,
        logs: logList
    };
}

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const REPO_OWNER = process.env.PROTECT_REPO_OWNER || 'sh4lu-z';
    const REPO_NAME = process.env.PROTECT_REPO_NAME || 'MD-Raw-Data';
    const FILE_PATH = process.env.PROTECT_FILE_PATH || 'protected_numbers.json';
    const HASH_SALT = process.env.PROTECT_SALT || 'cipher_md_salt_2026';

    if (req.method === 'GET') {
        const queryNum = req.query.check || req.query.number;
        if (!queryNum) {
            res.setHeader('Content-Type', 'text/plain');
            return res.status(200).send('NO');
        }

        const cleaned = cleanNumber(queryNum);
        if (cleaned.length < 7 || cleaned.length > 15) {
            res.setHeader('Content-Type', 'text/plain');
            return res.status(200).send('NO');
        }

        const targetHash = getHash(cleaned, HASH_SALT);

        // Fetch via raw.githubusercontent.com to avoid GitHub API token rate limits
        let rawData = await fetchRawData(REPO_OWNER, REPO_NAME, FILE_PATH);
        if (!rawData) {
            try {
                rawData = await fetchFromGitHub(REPO_OWNER, REPO_NAME, FILE_PATH, GITHUB_TOKEN);
            } catch {
                rawData = { hashes: [] };
            }
        }

        const isFound = rawData.hashes.includes(targetHash);
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate=50');
        return res.status(200).send(isFound ? 'YES' : 'NO');
    }

    if (req.method === 'POST') {
        try {
            const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
            const { number, action, token, t: clientTime } = body;

            if (!action || !['protect', 'remove'].includes(action)) {
                return res.status(400).json({ error: 'Invalid action. Must be "protect" or "remove".' });
            }

            const cleaned = cleanNumber(number);
            if (cleaned.length < 7 || cleaned.length > 15) {
                return res.status(400).json({ error: 'Invalid phone number length. Must be 7 to 15 digits without symbols.' });
            }

            // Web token validation
            if (!token || !clientTime) {
                return res.status(403).json({ error: 'Security validation failed: Token missing.' });
            }

            const now = Date.now();
            const clientT = parseInt(clientTime);
            if (isNaN(clientT) || Math.abs(now - clientT) > 60000) {
                return res.status(403).json({ error: 'Security validation failed: Request expired.' });
            }

            const timeWindow = Math.floor(clientT / 30000);
            const expectedToken = crypto.createHash('sha256')
                .update(`${cleaned}:${action}:${timeWindow}:${HASH_SALT}`)
                .digest('hex');

            if (token !== expectedToken) {
                return res.status(403).json({ error: 'Security validation failed: Invalid token.' });
            }

            if (!GITHUB_TOKEN) {
                return res.status(500).json({ error: 'Server configuration error: GITHUB_TOKEN is missing.' });
            }

            const targetHash = getHash(cleaned, HASH_SALT);

            // Anonymized IP hash
            const clientIp = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
            const ipHash = crypto.createHash('sha256').update(clientIp + HASH_SALT).digest('hex').substring(0, 16);

            const gitData = await fetchFromGitHub(REPO_OWNER, REPO_NAME, FILE_PATH, GITHUB_TOKEN);
            const hashSet = new Set(gitData.hashes || []);
            const currentLogs = Array.isArray(gitData.logs) ? gitData.logs : [];

            // Cooldown check (1 hour)
            const COOLDOWN_MS = 60 * 60 * 1000;
            const recentLog = currentLogs.find(log => 
                (log.target === targetHash || log.ip === ipHash) && (now - log.timestamp < COOLDOWN_MS)
            );

            if (recentLog) {
                const remainingMinutes = Math.ceil((COOLDOWN_MS - (now - recentLog.timestamp)) / 60000);
                return res.status(429).json({
                    error: `Action cooldown active. Please wait ${remainingMinutes} minute(s) before changing protection status.`
                });
            }

            if (action === 'protect') {
                if (hashSet.has(targetHash)) {
                    return res.status(200).json({
                        success: true,
                        status: 'already_protected',
                        message: 'This number is already protected.'
                    });
                }
                hashSet.add(targetHash);
            } else if (action === 'remove') {
                if (!hashSet.has(targetHash)) {
                    return res.status(200).json({
                        success: false,
                        status: 'not_found',
                        message: 'This number is not found in the protection list.'
                    });
                }
                hashSet.delete(targetHash);
            }

            // Auto-prune logs older than 1 hour
            const validLogs = currentLogs.filter(l => (now - l.timestamp) < COOLDOWN_MS);
            validLogs.push({
                ip: ipHash,
                target: targetHash,
                action: action,
                timestamp: now
            });

            const updatedArray = Array.from(hashSet);
            const payloadContent = {
                updated_at: new Date().toISOString(),
                total: updatedArray.length,
                hashes: updatedArray,
                logs: validLogs
            };

            const commitUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;
            const commitBody = {
                message: action === 'protect' ? 'Add protected number hash [skip ci]' : 'Remove protected number hash [skip ci]',
                content: Buffer.from(JSON.stringify(payloadContent, null, 2)).toString('base64')
            };

            if (gitData.sha) {
                commitBody.sha = gitData.sha;
            }

            const commitRes = await fetch(commitUrl, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json',
                    'User-Agent': 'Cipher-MD-Web'
                },
                body: JSON.stringify(commitBody)
            });

            if (!commitRes.ok) {
                const errBody = await commitRes.text();
                throw new Error(`GitHub Commit failed (${commitRes.status}): ${errBody}`);
            }

            return res.status(200).json({
                success: true,
                status: action === 'protect' ? 'protected' : 'removed',
                message: action === 'protect' 
                    ? 'Profile photo protection enabled successfully.' 
                    : 'Profile photo protection removed successfully.'
            });

        } catch (error) {
            console.error('[Protect API Error]:', error.message);
            return res.status(500).json({ error: error.message || 'Internal server error' });
        }
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
}
