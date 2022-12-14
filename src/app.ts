import express, { Express } from 'express';
// import { userRouter } from "./users/users";
import { Server } from 'node:http';
import { LoggerSevice as ILogger } from './logger/logger.service.js';
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
import { AuthMiddleware } from './common/auth.guard.js';
const { json } = express;

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;
	// logger: ILogger
	// userController: BaseController
	// controllers: BaseController[]
	// exeptionFilter: ExeptionFilter

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.ExeptionFilter) private exeptionFilter: IExeptionFilter,
		@inject(TYPES.UserController) private userController: IUserController,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
	) {
		this.app = express();
		this.port = 8001;

		// this.logger = logger

		// this.userController = new UserController(new LoggerSevice())
		// this.exeptionFilter = exeptionFilter
		// this.controllers = []
		// this.userController = userController
	}

	useMiddleware(): void {
		this.app.use(json());
		const authMiddleware = new AuthMiddleware(this.configService.get('SECRET'));
		this.app.use(authMiddleware.execute.bind(authMiddleware));
	}

	useRoutes(): void {
		// this.app.use('/users', userRouter)
		this.app.use('/users', this.userController.router);
	}

	public async init(): Promise<void> {
		this.useMiddleware();

		this.useRoutes();
		this.useExceptionFilters();

		this.server = this.app.listen(this.port);
		console.log(`???????????? ?????????????? localhost:${this.port}`);

		await this.prismaService.connect();
		// this.app.use('/users', this.userController.router)
		this.logger.log(`???????????? ?????????????? localhost:${this.port}`);
	}

	// addController(pass_controller: BaseController | BaseController[], route_path: string){
	//     if(!Array.isArray(pass_controller)){
	//         pass_controller = [pass_controller]
	//     }

	//     for (const contoller of pass_controller) {
	//         this.controllers.push(contoller)
	//         this.app.use(route_path, contoller.router)
	//     }
	// }

	removeController(): void {
		console.error('TODO!!!');
	}

	useExceptionFilters(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}
}
