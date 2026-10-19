import crypto from 'crypto';

// In-memory cache for fast lookup
let memoryCache = {
    hashes: new Set(),
    sha: null,
    lastFetched: 0
};
const CACHE_TTL = 30000; // 30 seconds cache for GET checks

function cleanNumber(raw) {
    if (!raw) return '';
    let cleaned = String(raw).replace(/\D/g, '');
    cleaned = cleaned.replace(/^00/, '');
    return cleaned;
}

function getHash(num, salt) {
    return crypto.createHmac('sha256', salt).update(num).digest('hex');
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
        return { exists: false, sha: null, hashes: [] };
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
        parsed = { hashes: [] };
    }

    const hashList = Array.isArray(parsed) ? parsed : (Array.isArray(parsed.hashes) ? parsed.hashes : []);
    return {
        exists: true,
        sha: data.sha,
        hashes: hashList
    };
}

export default async function handler(req, res) {
    // CORS configuration
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

    // Fast check endpoint for bot
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
        const now = Date.now();

        // Refresh cache if stale
        if (now - memoryCache.lastFetched > CACHE_TTL) {
            try {
                const gitData = await fetchFromGitHub(REPO_OWNER, REPO_NAME, FILE_PATH, GITHUB_TOKEN);
                memoryCache.hashes = new Set(gitData.hashes);
                memoryCache.sha = gitData.sha;
                memoryCache.lastFetched = now;
            } catch (err) {
                console.error('[Protect API] Cache refresh failed:', err.message);
            }
        }

        const isFound = memoryCache.hashes.has(targetHash);
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate=50');
        return res.status(200).send(isFound ? 'YES' : 'NO');
    }

    // Add or remove protection endpoint
    if (req.method === 'POST') {
        try {
            const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
            const { number, action } = body;

            if (!action || !['protect', 'remove'].includes(action)) {
                return res.status(400).json({ error: 'Invalid action. Must be "protect" or "remove".' });
            }

            const cleaned = cleanNumber(number);
            if (cleaned.length < 7 || cleaned.length > 15) {
                return res.status(400).json({ error: 'Invalid phone number length. Must be 7 to 15 digits without symbols.' });
            }

            if (!GITHUB_TOKEN) {
                return res.status(500).json({ error: 'Server configuration error: GITHUB_TOKEN is missing.' });
            }

            const targetHash = getHash(cleaned, HASH_SALT);
            const gitData = await fetchFromGitHub(REPO_OWNER, REPO_NAME, FILE_PATH, GITHUB_TOKEN);
            let currentHashes = gitData.hashes;
            const hashSet = new Set(currentHashes);

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

            const updatedArray = Array.from(hashSet);
            const payloadContent = {
                updated_at: new Date().toISOString(),
                total: updatedArray.length,
                hashes: updatedArray
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

            const commitData = await commitRes.json();

            // Update local cache
            memoryCache.hashes = hashSet;
            memoryCache.sha = commitData.content?.sha || null;
            memoryCache.lastFetched = Date.now();

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
