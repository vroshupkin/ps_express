import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import jsonwebtoken from 'jsonwebtoken';
const { verify } = jsonwebtoken;

import { ParsedQs } from 'qs';
import { C } from '../education/reflect';
import { IMiddleware } from './middleware.interface';

export class AuthMiddleware implements IMiddleware {
	constructor(private secret: string) {}

	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.headers.authorization) {
			const token = req.headers.authorization.split(' ')[1];
			verify(token, this.secret, (err, payload) => {
				if (err) {
					return next();
				} else if (payload && typeof payload != 'string') {
					req.user = payload.email;
					next();
				}
			});
		}
		next();
	}
}
