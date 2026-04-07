import path from 'node:path';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function serveStatic(req, res) {
	let filePath = path.join(__dirname, 'public', req.url);

	if (req.url === '/') {
		filePath = path.join(__dirname, 'public', 'index.html');
	}

	const mimeTypes = {
		'.html': 'text/html',
		'.js': 'application/javascript',
		'.css': 'text/css',
		'.json': 'application/json',
		'.png': 'image/png',
	};

	const ext = path.extname(filePath);
	const contentType = mimeTypes[ext];

	try {
		const content = await fs.readFile(filePath, 'utf8');
		res.statusCode = 200;
		res.setHeader('Content-Type', contentType);
		res.end(content);
		return true;
	} catch (err) {
		return false;
	}
}