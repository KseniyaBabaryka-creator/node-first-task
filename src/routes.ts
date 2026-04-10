import { get, post } from './router.js';
import { parseBody } from './utils/parseBody.js';
import type {IncomingMessage} from "http";
import type {ServerResponse} from "node:http";

interface User {
	name: string;
}

const users: User[] = [];

get('/users', (req: IncomingMessage, res: ServerResponse): void => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(users));
});

post('/add-user', async (req: IncomingMessage, res: ServerResponse) => {
	const body = await parseBody(req);
	if ( isUserBody(body)) {
		users.push({name: body.name});
	}
	res.statusCode = 201;
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify({ success: true }));
});

get('/greet', (req: IncomingMessage, res: ServerResponse, query) => {
	const name = query.get('name');
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html');
	res.end(`<html><body><h1>Hello, ${name}!</h1><a href="/users.html">Back</a></body></html>`);
})

function isUserBody(data: unknown): data is { name: string } {
	return (
		typeof data === 'object' &&
		data !== null &&
		'name' in data &&
		typeof (data as Record<string, unknown>).name === 'string'
	);
}