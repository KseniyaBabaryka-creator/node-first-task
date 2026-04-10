import http, {type IncomingMessage} from 'http';
import './routes.js';
import { handle } from './router.js';
import { serveStatic } from './static.js';
import type {ServerResponse} from "node:http";


const server = http.createServer( async (req: IncomingMessage, res: ServerResponse) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

	const served: boolean = await serveStatic(req, res);
	if (served) return;

	const handled = await handle(req, res);
	if (handled) return;

	res.statusCode = 404;
	res.end('Not found');
})

server.listen(8000);