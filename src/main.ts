import { App } from "./app.js";
import { printProgress, PurpleSchool_NodeJS } from "./services/course_helper.js";
import { LoggerSevice } from './logger/logger.service.js'
import { Minute } from "./common/time.js";
import { application } from "express";
import { UserController } from "./users/users.controller.js";
import { ExeptionFilter } from "./errors/exeption.filter.js";


async function bootstrap() {
    const logger = new LoggerSevice()
    const app = new App(
        logger,
        new ExeptionFilter(logger)
    );
    app.addController(new UserController(logger), '/users')

    await app.init();

    const progress_debug = [21.53, 16.57].reduce((prev, curr) => Minute.add(prev, curr), new Minute(0))

    app.logger.log(progress_debug + '')
}

bootstrap()

const current_step = 12
const current_video = 2
const remainCourseTime = PurpleSchool_NodeJS.remainTimeOfCourses(current_step)
printProgress(current_step, current_video)

console.log('Оставшееся время курсова ' + remainCourseTime)


