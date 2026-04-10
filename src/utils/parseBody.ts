import { IncomingMessage } from 'http';
export function parseBody(req: IncomingMessage): Promise<unknown> {
	return new Promise((resolve, reject) => {
		let body: string = '';
		req.on('data', chunk => {body += chunk});
		req.on('end', () => {
			try{
				resolve(JSON.parse(body));
			} catch (err) {
				reject(err);
			}
		});
		req.on('error', reject);
	});
}