import http from 'node:http';
import './routes.js';
import { handle } from './router.js';
import { serveStatic } from './static.js';


const server = http.createServer( async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

	const served = await serveStatic(req, res);
	if (served) return;

	const handled = await handle(req, res);
	if (handled) return;

	res.statusCOde = 404;
	res.end('Not found');
})

server.listen(8000);