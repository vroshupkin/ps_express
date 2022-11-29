import { App } from './app.js';
import { Container, ContainerModule, interfaces } from 'inversify';
import { printProgress, PurpleSchool_NodeJS } from './services/course_helper.js';
import { LoggerSevice } from './logger/logger.service.js';
import { Minute, sumMinutes } from './common/time.js';
import { application } from 'express';
import { UserController } from './users/users.controller.js';
import { ExeptionFilter } from './errors/exeption.filter.js';
import { User } from './education/decorators.js';
import { ILogger } from './logger/logger.interface.js';
import { TYPES } from './types.js';
import { IExeptionFilter } from './errors/exeption.filter.interface.js';
import 'reflect-metadata';
import { IUserController } from './users/users.controller.interface.js';
import { IUserService } from './users/users.service.interface.js';
import { UserService } from './users/users.service.js';
import { IConfigService } from './config/config.service.interface.js';
import { ConfigService } from './config/config.service.js';
import { PrismaService } from './database/prisma.service.js';
import { IUserRepository } from './users/users.repository.interface.js';
import { UsersRepository } from './users/users.repository.js';

/*  */
export const appBindings_1 = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerSevice);
	bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
	bind<IUserController>(TYPES.UserController).to(UserController);
	bind<IUserService>(TYPES.UserService).to(UserService);
	bind<App>(TYPES.Application).to(App);
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
	bind<IUserRepository>(TYPES.UsersRepository).to(UsersRepository).inSingletonScope();
});

interface IBootstrap {
	appContainer: Container;
	app: App;
}

function bootstrap(): IBootstrap {
	const appContainer = new Container();
	appContainer.load(appBindings_1);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	// Одноименный вывод объекта
	return { appContainer, app };
}

export const { app, appContainer } = bootstrap();
// const logger = new LoggerSevice()
// const app = new App(
//     logger,
//     new ExeptionFilter(logger)
// );
// app.addController(new UserController(logger), '/users')

// const appContainer = new Container()
// appContainer.bind<ILogger>(TYPES.ILogger).to(LoggerSevice)
// appContainer.bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter)
// appContainer.bind<UserController>(TYPES.UserController).to(UserController)
// appContainer.bind<App>(TYPES.Application).to(App)

// const app = appContainer.get<App>(TYPES.Application)
// app.init();

// export { app, appContainer }

// function sumMinutes(arr: Minute[] | number[]): Minute {
// 	return arr
// 		.map((v) => new Minute(v))
// 		.reduce((prev, next) => Minute.add(prev, next), new Minute(0));
// }

const current_step = 16;
const current_video = 3;
const remainCourseTime = PurpleSchool_NodeJS.remainTimeOfCourses(current_step);

printProgress(current_step, current_video);
console.log('Оставшееся время курсов ' + remainCourseTime);
const progress_debug = sumMinutes([16.06, 21.05]);
console.log('время: ' + progress_debug);

// const rest_course = [12.47, 67.36, 42.12, 61.28, 4.3].reduce(
// 	(prev, curr) => Minute.add(prev, curr),
// 	new Minute(0),
// );
const rest_course = sumMinutes([12.47, 67.36, 42.12, 61.28, 4.3]);

console.log(Number(rest_course + ''));

// TODO test 16.06 + 21.05 минут, не верный результат

interface WeekDaysEnumarate {
	start: Date;
	days: {
		1: number[] | Minute[];
		2: number[] | Minute[];
		3: number[] | Minute[];
		4: number[] | Minute[];
		5: number[] | Minute[];
		6: number[] | Minute[];
		7: number[] | Minute[];
	};
}

const week_1: WeekDaysEnumarate = {
	start: new Date('2022-11-21'),
	days: {
		1: [],
		2: [],
		3: [29.26],
		4: [39.16],
		5: [12.47],
		6: [17.23],
		7: [37.11],
	},
};

console.log('sum minutes:', sumMinutes([13.02, 5.5, 11.57]) + '');

const week_2: WeekDaysEnumarate = {
	start: new Date('2022-11-28'),
	days: {
		1: [sumMinutes([13.02, 5.5, 11.57])],
		2: [],
		3: [],
		4: [],
		5: [],
		6: [],
		7: [],
	},
};
// class WeekEntity{

// }

let sum = new Minute(0);
for (const v of Object.values(week_2.days)) {
	sum = Minute.add(sum, sumMinutes(v));
}

console.log('Суммарное время за неделю', sum + '');
