import crypto from 'crypto';
import JSZip from 'jszip';
import path from 'path';

export default async function handler(req, res) {
    const { file, token, t: clientTimeMs } = req.query;
    console.log(`[API] Incoming request received. File: ${file}, Token: ${token}, ClientTime: ${clientTimeMs}`);

    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const REPO_OWNER = process.env.REPO_OWNER;
    const REPO_NAME = process.env.REPO_NAME;
    const SHARED_SECRET = process.env.SHARED_SECRET;
    const branch = "feat/dynamic-owner-refactor";

    if (!token || !SHARED_SECRET) {
        return res.status(403).json({ error: "Unauthorized: Missing credentials" });
    }

    const clientT = Math.floor(parseInt(clientTimeMs) / 30000);
    const expectedToken = crypto.createHmac('sha256', SHARED_SECRET).update(clientT.toString()).digest('hex');

    const isValid = (token === expectedToken);

    if (!isValid) {
        console.log(`[API] Token mismatch! Expected: ${expectedToken}, Got: ${token}`);
        return res.status(403).json({ error: "Unauthorized: Invalid Security Token" });
    }

    try {
        if (file === 'version.txt') {
            const versionUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/version.txt?ref=${branch}`;
            const verResponse = await fetch(versionUrl, {
                headers: {
                    'Authorization': `Bearer ${GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3.raw'
                }
            });

            if (!verResponse.ok) return res.status(404).json({ error: "version.txt not found" });

            const versionText = await verResponse.text();
            res.setHeader('Content-Type', 'text/plain');
            return res.status(200).send(versionText);
        }

        const listUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/git/trees/${branch}?recursive=1`;
        const treeResponse = await fetch(listUrl, {
            headers: { 'Authorization': `Bearer ${GITHUB_TOKEN}` }
        });

        const treeData = await treeResponse.json();
        if (!treeData.tree) throw new Error("Failed to fetch GitHub tree");

        const zip = new JSZip();

        for (const item of treeData.tree) {
            if (item.type === 'blob') {

                if (item.path.startsWith('node_modules/') || item.path.startsWith('.git/')) continue;

                const fileUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${item.path}?ref=${branch}`;
                const fileResponse = await fetch(fileUrl, {
                    headers: {
                        'Authorization': `Bearer ${GITHUB_TOKEN}`,
                        'Accept': 'application/vnd.github.v3.raw'
                    }
                });

                if (!fileResponse.ok) continue;

                const arrayBuffer = await fileResponse.arrayBuffer();
                zip.file(item.path, Buffer.from(arrayBuffer));
            }
        }

        const zipBuffer = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });

        res.setHeader('Content-Type', 'application/zip');
        res.setHeader('Content-Disposition', 'attachment; filename="update.zip"');

        return res.status(200).send(zipBuffer);

    } catch (error) {
        console.error("API Error:", error.message);
        return res.status(500).json({ error: "Sync & Obfuscation Failed", details: error.message });
    }
}
