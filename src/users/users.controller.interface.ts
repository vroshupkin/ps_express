import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';

export interface IUserController extends BaseController {
	login(req: Request, res: Response, nextFunction?: NextFunction): Promise<void>;
	register(req: Request, res: Response, nextFunction?: NextFunction): void;
	info(req: Request, res: Response, nextFunction?: NextFunction): void;
}
