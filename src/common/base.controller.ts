import { Router, Response, Request } from "express";
import { LoggerSevice } from "../logger/logger.service";
import { IControllerRoute } from "./route.interface";



export abstract class BaseController{
    private readonly _router: Router;

    constructor(private logger: LoggerSevice){
        this._router = Router()
    }

    get router(){
        return this._router
    }

    public created(res: Response){
        res.type('application/json')
        return res.status(201)
    }

    public send<T>(res: Response, code: number, message: T){
        res.type('application/json')
        return res.status(code).json(message)
    }

    public ok<T>(res: Response, message: T){
        this.send(res, 200, message)
    }


    protected bindRoutes(routes: IControllerRoute[]){
        
        let log_str: string = ''
        for (const route of routes) {
            const handler = route.func.bind(this)
            this.router[route.method](route.path, handler)

            log_str += `${route.method} ${route.path}\n`
        }

        this.logger.log('Создан контроллер с путями:')
        console.log(log_str)
    }
}