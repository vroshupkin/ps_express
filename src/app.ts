import express, { Express } from "express"
// import { userRouter } from "./users/users";
import { Server } from 'node:http'
import { LoggerSevice as ILogger } from "./logger/logger.service.js";
import { UserController } from "./users/users.controller";
import { BaseController } from "./common/base.controller";
import { ExeptionFilter } from "./errors/exeption.filter.js";
import { inject, injectable } from "inversify";
import { TYPES } from "./types.js";
import 'reflect-metadata'

@injectable()
export class App{
    app: Express
    server: Server
    port: number;
    // logger: ILogger
    // userController: BaseController
    // controllers: BaseController[]
    // exeptionFilter: ExeptionFilter

    constructor(
        @inject(TYPES.ILogger) private logger: ILogger,
        @inject(TYPES.ExeptionFilter) private exeptionFilter: ExeptionFilter,
        @inject(TYPES.UserController) private userController: UserController
        // logger: ILogger,
        // exeptionFilter: ExeptionFilter
    ) {
        this.app = express()
        this.port = 8000

        // this.logger = logger

        // this.userController = new UserController(new LoggerSevice())
        // this.exeptionFilter = exeptionFilter
        // this.controllers = []
        // this.userController = userController
    }

    useRoutes() {
        // this.app.use('/users', userRouter)
        this.app.use('/users', this.userController.router)
    }

    public async init(){
        this.useRoutes()
        this.useExceptionFilters()
        this.server = this.app.listen(this.port)
        console.log(`Сервер запущен localhost:${this.port}`)

        // this.app.use('/users', this.userController.router)
        this.logger.log(`Сервер запущен localhost:${this.port}`)
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

    removeController(){
        console.error('TODO!!!')
    }

    useExceptionFilters(){
        this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter))
    }

}

