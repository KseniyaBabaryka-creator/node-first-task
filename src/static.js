import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
export async function serveStatic(req, res) {
    let filePath = path.join(rootDir, 'public', req.url || '/');
    if (req.url === '/') {
        filePath = path.join(rootDir, 'public', 'index.html');
    }
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
    };
    const ext = path.extname(filePath);
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    try {
        const content = await fs.readFile(filePath, 'utf8');
        res.statusCode = 200;
        res.setHeader('Content-Type', contentType);
        res.end(content);
        return true;
    }
    catch (err) {
        return false;
    }
}
//# sourceMappingURL=static.js.map