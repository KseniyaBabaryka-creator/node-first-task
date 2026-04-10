import type { IncomingMessage } from "http";
import type { ServerResponse } from "node:http";
type RouteHandler = (req: IncomingMessage, res: ServerResponse, query: URLSearchParams) => void;
export declare function get(path: string, handler: RouteHandler): void;
export declare function post(path: string, handler: RouteHandler): void;
export declare function handle(req: IncomingMessage, res: ServerResponse): Promise<boolean>;
export {};
//# sourceMappingURL=router.d.ts.map