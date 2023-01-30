import { Logger, ISettings, loggerDefaultSetting } from '../common/logger/logger';
import { ILogger } from './logger.interface';
import { injectable } from 'inversify';
import 'reflect-metadata';

type defaultLogObject = {};

@injectable()
export class LoggerSevice implements ILogger {
	private commonLogger: Logger;
	private errorLogger: Logger;
	private warnLogger: Logger;

	constructor() {
		const defaultSetting = JSON.parse(JSON.stringify(loggerDefaultSetting)) as ISettings;
		defaultSetting['path']['stackDepth'] = 4;

		this.commonLogger = new Logger(defaultSetting);

		const errorLoggerSetting = JSON.parse(JSON.stringify(defaultSetting)) as ISettings;
		errorLoggerSetting.headerName = {
			name: ' ERROR ',
			color: 'bgRed',
			on: true,
		};
		errorLoggerSetting.order.on = false;
		errorLoggerSetting.path.color = 'red';
		this.errorLogger = new Logger(errorLoggerSetting);

		const warnLoggerSetting = JSON.parse(JSON.stringify(defaultSetting)) as ISettings;

		warnLoggerSetting.headerName = {
			on: true,
			name: ' WARN ',
			color: 'bgYellowBright',
		};

		warnLoggerSetting.order.on = false;

		this.warnLogger = new Logger(warnLoggerSetting);
	}

	error(...args: unknown[]): void {
		this.errorLogger.log(args);
	}

	warn(...args: unknown[]): void {
		this.warnLogger.log(args);
	}
	log(...args: unknown[]): void {
		this.commonLogger.log(args);
	}
}
