import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../common/base.controller';
import { IControllerRoute } from '../common/route.interface';
import { HTTPError } from '../errors/http-error.class';
import { LoggerSevice } from '../logger/logger.service';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import 'reflect-metadata';
import { IUserController } from './users.controller.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(@inject(TYPES.ILogger) logger: ILogger) {
		super(logger);

		this.bindRoutes([
			{ func: this.login, method: 'post', path: '/login' },
			{ func: this.register, method: 'post', path: '/register' },
		]);
	}

	login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
		next(new HTTPError(401, 'ошибка авторизации'));

		console.log('hello debugger');

		console.log('end');
	}

	async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const user = new User(body.email, body.name);
		await user.setPasword(body.password);

		// this.send(res, 200, user);
		this.ok(res, 'register');
	}
}
