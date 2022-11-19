import { App } from "./app.js";
import { Container } from 'inversify'
import { printProgress, PurpleSchool_NodeJS } from "./services/course_helper.js";
import { LoggerSevice } from './logger/logger.service.js'
import { Minute } from "./common/time.js";
import { application } from "express";
import { UserController } from "./users/users.controller.js";
import { ExeptionFilter } from "./errors/exeption.filter.js";
import { User } from "./education/decorators.js";
import { ILogger } from "./logger/logger.interface.js";
import { TYPES } from "./types.js";
import { IExeptionFilter } from "./errors/exeption.filter.interface.js";
import 'reflect-metadata'


    // const logger = new LoggerSevice()
    // const app = new App(
    //     logger,
    //     new ExeptionFilter(logger)
    // );
    // app.addController(new UserController(logger), '/users')

const appContainer = new Container()
appContainer.bind<ILogger>(TYPES.ILogger).to(LoggerSevice)
appContainer.bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter)
appContainer.bind<UserController>(TYPES.UserController).to(UserController)
appContainer.bind<App>(TYPES.Application).to(App)

const app = appContainer.get<App>(TYPES.Application)
app.init();

export { app, appContainer }     

const current_step = 12
const current_video = 2
const remainCourseTime = PurpleSchool_NodeJS.remainTimeOfCourses(current_step)

printProgress(current_step, current_video)
console.log('Оставшееся время курсов ' + remainCourseTime)
const progress_debug = [21.53, 16.57].reduce((prev, curr) => Minute.add(prev, curr), new Minute(0))
console.log(progress_debug + '')

