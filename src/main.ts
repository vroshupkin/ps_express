import { App } from "./app.js";
import { printProgress } from "./services/course_helper.js";
import { LoggerSevice } from './logger/logger.service.js'
import { Minute } from "./common/time.js";
import { application } from "express";


async function bootstrap() {
    const app = new App(new LoggerSevice);
    await app.init();

    const progress_debug = [5.45, 10.56, 11.22, 15.54].reduce((prev, curr) => Minute.add(prev, curr), new Minute(0))

    app.logger.log(progress_debug + '')
}

bootstrap()

printProgress(11, 5)


