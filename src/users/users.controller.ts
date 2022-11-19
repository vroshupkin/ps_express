import { Request, Response, NextFunction } from "express";
import { BaseController } from "../common/base.controller";
import { IControllerRoute } from "../common/route.interface";
import { HTTPError } from "../errors/http-error.class";
import { LoggerSevice } from "../logger/logger.service";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { ILogger } from "../logger/logger.interface";
import 'reflect-metadata'

@injectable()
export class UserController extends BaseController{
    constructor(
        @inject(TYPES.ILogger) logger: ILogger
    ){
        super(logger)

        this.bindRoutes([
            { func: this.login, method: 'post', path: '/login' },
            { func: this.register, method: 'post', path: '/register' },

        ])

    }

    login(req: Request, res: Response, next: NextFunction){
        next(new HTTPError(401, 'ошибка авторизации'))
        // this.send(res, 200, 'login')
    }

    register(req: Request, res: Response, next: NextFunction){
        this.send(res, 200, 'register')
        
    }

    



}