import express, { Express } from 'express';
// import { userRouter } from "./users/users";
import { Server } from 'node:http';
// import { LoggerSevice as ILogger } from './logger/logger.service.js';
import { UserController } from './users/users.controller.js';
import { BaseController } from './common/base.controller.js';
import { ExeptionFilter } from './errors/exeption.filter.js';
import { inject, injectable } from 'inversify';
import { TYPES } from './types.js';
import 'reflect-metadata';
import body_parse from 'body-parser';
import { ConfigService } from './config/config.service.js';
import { IConfigService } from './config/config.service.interface.js';
import { IUserController } from './users/users.controller.interface.js';
import { IExeptionFilter } from './errors/exeption.filter.interface.js';
import { PrismaService } from './database/prisma.service.js';
import { AuthGuard } from './common/auth.guard.js';
import { AuthMiddleware } from './common/auth.middleware.js';
const { json } = express;

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		// @inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.ExeptionFilter) private exeptionFilter: IExeptionFilter,
		@inject(TYPES.UserController) private userController: IUserController,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
	) {
		this.app = express();
		this.port = 8001;
	}

	useMiddleware(): void {
		this.app.use(json());
		const authMiddleware = new AuthMiddleware(this.configService.get('SECRET'));
		this.app.use(authMiddleware.execute.bind(authMiddleware));
	}

	useRoutes(): void {
		this.app.use('/users', this.userController.router);
	}

	public async init(): Promise<void> {
		this.useMiddleware();

		this.useRoutes();
		this.useExceptionFilters();

		this.server = this.app.listen(this.port);

		await this.prismaService.connect();

		console.log(`Сервер запущен localhost:${this.port}`);
	}

	removeController(): void {
		console.error('TODO!!!');
	}

	useExceptionFilters(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}
}
