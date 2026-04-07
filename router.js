const routes = {};
export function get(path, handler) {
	routes[`GET:${path}`] = handler;
}

export function post(path, handler) {
	routes[`POST:${path}`] = handler;
}

export async function handle(req, res) {
	const parsedUrl = new URL(req.url,  `http://${req.headers.host}`);
	const key = `${req.method}:${parsedUrl.pathname}`;

	const handler = routes[key];

	if (handler) {
		req.query = parsedUrl.searchParams;
		handler(req, res);
		return true;
	}

	return false;
}