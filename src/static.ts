import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import type {IncomingMessage} from "http";
import type {ServerResponse} from "node:http";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

export async function serveStatic(req: IncomingMessage, res: ServerResponse): Promise<boolean> {
	let filePath = path.join(rootDir, 'public', req.url || '/');

	if (req.url === '/') {
		filePath = path.join(rootDir, 'public', 'index.html');
	}

	const mimeTypes: Record<string, string> = {
		'.html': 'text/html',
		'.js': 'application/javascript',
		'.css': 'text/css',
		'.json': 'application/json',
		'.png': 'image/png',
	};

	const ext: string = path.extname(filePath);
	const contentType: string = mimeTypes[ext] || 'application/octet-stream';

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