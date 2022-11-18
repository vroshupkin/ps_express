import { App } from "./app.js";
import { printProgress } from "./services/course_helper.js";
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

    const progress_debug = [44.24, 37.58].reduce((prev, curr) => Minute.add(prev, curr), new Minute(0))

    app.logger.log(progress_debug + '')
}

bootstrap()

printProgress(11, 5)


