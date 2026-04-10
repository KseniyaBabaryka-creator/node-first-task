import type {IncomingMessage} from "http";
import type {ServerResponse} from "node:http";

type RouteHandler = (
	req: IncomingMessage,
	res: ServerResponse,
	query: URLSearchParams
) => void;

const routes: Record<string, RouteHandler> = {};
export function get(path: string, handler: RouteHandler): void {
	routes[`GET:${path}`] = handler;
}

export function post(path: string, handler: RouteHandler): void {
	routes[`POST:${path}`] = handler;
}

export async function handle(req: IncomingMessage, res: ServerResponse): Promise<boolean> {
	const parsedUrl = new URL(req.url || '/',  `http://${req.headers.host}`);
	const key = `${req.method}:${parsedUrl.pathname}`;

	const handler = routes[key];

	if (handler) {
		handler(req, res, parsedUrl.searchParams);
		return true;
	} else {
		return false;
	}

}