import http from 'node:http';
import fs from 'node:fs/promises';
import * as path from "node:path";
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const users = [];


const server = http.createServer( async (req, res) => {
	const parsedUrl = new URL(req.url, `http://${req.headers.host}`);

	if (req.url === '/' && req.method === 'GET') {
		const content = await fs.readFile(path.join(__dirname, 'public', 'index.html'), 'utf8');
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/html');
		res.end(content);
	} else if (req.url === '/index.js' && req.method === 'GET') {
		const content = await fs.readFile(path.join(__dirname, 'public', 'index.js'), 'utf8');
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/javascript');
		res.end(content);
	} else if (req.url === '/users.js' && req.method === 'GET') {
		const content = await fs.readFile(path.join(__dirname, 'public', 'users.js'), 'utf8');
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/javascript');
		res.end(content);
	} else if (req.url === '/users.html' && req.method === 'GET') {
		const content = await fs.readFile(path.join(__dirname, 'public', 'users.html'), 'utf8');
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/html');
		res.end(content);
	} else if (req.url === '/add-user' && req.method === 'POST') {
		let body = '';
		req.on('data', chunk => { body += chunk });
		req.on('end', () => {
			const { name } = JSON.parse(body);
			users.push(name);
			res.statusCode = 201;
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify({ success: true }));
		});
	} else if (req.url === '/users' && req.method === 'GET') {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(users));
	} else if (parsedUrl.pathname === '/greet' && req.method === 'GET') {
		const name = parsedUrl.searchParams.get('name');
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/html');
		res.end(`<html><body><h1>Hello, ${name}!</h1><a href="/users.html">Back</a></body></html>`);
	} else {
		res.statusCode = 404;
		res.setHeader('Content-Type', 'text/html');
		res.end('Not found');
	}
})

server.listen(8000);