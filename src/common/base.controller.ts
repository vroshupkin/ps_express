import { Router, Response, Request } from 'express';

import { IControllerRoute } from './route.interface';
import { ILogger } from '../logger/logger.interface';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export abstract class BaseController {
	private readonly _router: Router;

	constructor(private logger: ILogger) {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	public created(res: Response): Response {
		res.type('application/json');
		return res.status(201);
	}

	public send<T>(res: Response, code: number, message: T): Response {
		res.type('application/json');
		return res.status(code).json(message);
	}

	public ok<T>(res: Response, message: T): void {
		this.send(res, 200, message);
	}

	protected bindRoutes(routes: IControllerRoute[]): void {
		let log_str = '';
		for (const route of routes) {
			log_str += `${route.method} ${route.path}\n`;

			const handler = route.func.bind(this);
			const middleware = route.middlewares?.map((m) => m.execute.bind(m));
			const pipeline = middleware ? [...middleware, handler] : handler;
			this.router[route.method](route.path, pipeline);
		}

		this.logger.log('Создан контроллер с путями:');
		console.log(log_str);
	}
}
