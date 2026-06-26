import speakeasy from 'speakeasy';
import JavaScriptObfuscator from 'javascript-obfuscator';
import JSZip from 'jszip';
import path from 'path';

export default async function handler(req, res) {
    const { file, otp } = req.query;

    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const REPO_OWNER = process.env.REPO_OWNER;
    const REPO_NAME = process.env.REPO_NAME;
    const SHARED_SECRET = process.env.SHARED_SECRET;
    const branch = "main";

    const isValid = speakeasy.totp.verify({
        secret: SHARED_SECRET,
        encoding: 'ascii',
        token: otp,
        window: 1
    });

    if (!isValid) {
        return res.status(403).json({ error: "Unauthorized: Invalid OTP" });
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

                if (item.path.endsWith('.js')) {
                    const rawCode = await fileResponse.text();
                    const obfuscatedResult = JavaScriptObfuscator.obfuscate(rawCode, {
                        compact: true,
                        controlFlowFlattening: true, 
                        numbersToExpressions: true,  
                        simplify: false,
                        stringArray: true,           
                        stringArrayEncoding: ['base64'], 
                        deadCodeInjection: false     
                    });
                    zip.file(item.path, obfuscatedResult.getObfuscatedCode());
                } else {
                    const arrayBuffer = await fileResponse.arrayBuffer();
                    zip.file(item.path, Buffer.from(arrayBuffer));
                }
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
