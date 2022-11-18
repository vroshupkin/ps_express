import { Request, Response, NextFunction } from "express";
import { BaseController } from "../common/base.controller";
import { IControllerRoute } from "../common/route.interface";
import { HTTPError } from "../errors/http-error.class";
import { LoggerSevice } from "../logger/logger.service";

export class UserController extends BaseController{
    constructor(logger: LoggerSevice){
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