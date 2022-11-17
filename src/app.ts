import express, { Express } from "express"
// import { userRouter } from "./users/users";
import { Server } from 'node:http'
import { LoggerSevice } from "./logger/logger.service.js";
import { UserController } from "./users/users.controller";
import { BaseController } from "./common/base.controller";

export class App{
    app: Express
    server: Server
    port: number;
    logger: LoggerSevice
    // userController: BaseController
    controllers: BaseController[]

    constructor(logger: LoggerSevice) {
        this.app = express()
        this.port = 8000
        this.logger = logger

        // this.userController = new UserController(new LoggerSevice())
        this.controllers = []
    }

    useRoutes() {
        // this.app.use('/users', userRouter)
        // this.app.use('/users', this.userController.router)
    }

    public async init(){
        this.useRoutes()
        this.server = this.app.listen(this.port)
        console.log(`Сервер запущен localhost:${this.port}`)

        this.logger.log(`Сервер запущен localhost:${this.port}`)
    }

    addController(pass_controller: BaseController | BaseController[], route_path: string){
        if(!Array.isArray(pass_controller)){
            pass_controller = [pass_controller]
        }
        
        for (const contoller of pass_controller) {
            this.controllers.push(contoller)
            this.app.use(route_path, contoller.router)
        }
    }

    removeController(){
        console.error('TODO!!!')
    }

}

