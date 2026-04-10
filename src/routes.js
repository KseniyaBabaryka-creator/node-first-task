import { get, post } from './router.js';
import { parseBody } from './utils/parseBody.js';
const users = [];
get('/users', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(users));
});
post('/add-user', async (req, res) => {
    const body = await parseBody(req);
    if (isUserBody(body)) {
        users.push({ name: body.name });
    }
    res.statusCode = 201;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: true }));
});
get('/greet', (req, res, query) => {
    const name = query.get('name');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(`<html><body><h1>Hello, ${name}!</h1><a href="/users.html">Back</a></body></html>`);
});
function isUserBody(data) {
    return (typeof data === 'object' &&
        data !== null &&
        'name' in data &&
        typeof data.name === 'string');
}
//# sourceMappingURL=routes.js.map