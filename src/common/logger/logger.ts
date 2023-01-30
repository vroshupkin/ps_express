import path from 'path';
import { C } from '../../education/reflect';
import chalk from 'chalk';
import { ISettings } from 'tslog/dist/nodejs/interfaces';
interface ILoggerInfoObject {
	columnAndLine: string;
	functionName: string;
	absolutePath: string;
	relativePath: string;
}

/**
 * Собирает _loggerInfoObject из ошибки. Сделан для возможтости логирование место и функции лога
 */
export class LoggerInfoObject {
	private _loggerInfoObject: ILoggerInfoObject;
	constructor(err: Error) {
		const stackString = this.getStackString(err);
		if (!stackString) return;

		this._loggerInfoObject = {
			columnAndLine: this.getColumnAndLine(stackString),
			functionName: this.getFunctionName(stackString),
			absolutePath: this.getAbsolutePath(stackString),
			relativePath: this.getRelativePath(stackString),
		};
	}

	get loggerInfoObject(): ILoggerInfoObject {
		return this._loggerInfoObject;
	}

	private getRelativePath(str: string): string {
		const projectPath = path.resolve('./');
		const filePath = this.getAbsolutePath(str);

		const isDelimiter = (ch: string): boolean => ch === '/' || ch === '\\';
		let i = 0;
		let ch_1 = projectPath[i];
		let ch_2 = filePath[i];
		while (ch_1 === ch_2 || (isDelimiter(ch_1) && isDelimiter(ch_2))) {
			i++;
			ch_1 = projectPath[i];
			ch_2 = filePath[i];
		}

		return '.' + filePath.slice(i);
	}

	private getColumnAndLine(str: string): string {
		let i = str.length - 1;
		const reg = /[0-9:]/;
		while (reg.test(str[i])) {
			i--;
		}
		return str.slice(i + 1, str.length);
	}

	private getAbsolutePath(str: string): string {
		const strArr = str.split(' ').filter((s) => {
			return s != 'at' && s != '';
		});

		let fileName = strArr[strArr.length - 1];

		// Удаляет скобки по краям
		if (fileName[0] === '(') {
			fileName = fileName.slice(1, fileName.length - 1);
		}

		if (fileName.slice(0, 4) === 'file') {
			fileName = fileName.slice(4);
		}
		const reg = /[/\\:]/;
		let i = 0;
		while (reg.test(fileName[i])) {
			i++;
		}

		return fileName.slice(i);
	}

	private getFunctionName(str: string): string {
		const strArr = str.split(' ').filter((s) => {
			return s != 'at' && s != '';
		});

		if (strArr.length === 1) {
			return '';
		}
		return strArr[0];
	}

	private getStackString(err: Error): string | undefined {
		if (err.stack) {
			return err.stack.split('\n')[3];
		}
	}
}

export class LoggerInfo {
	private loggerInfoObject: ILoggerInfoObject;
	constructor(err: Error) {
		this.loggerInfoObject = new LoggerInfoObject(err).loggerInfoObject;
	}

	get relativePath(): string {
		return this.loggerInfoObject.relativePath;
	}

	get absolutePath(): string {
		return this.loggerInfoObject.absolutePath;
	}

	get functionName(): string {
		return this.loggerInfoObject.functionName;
	}
}

const loggerDefaultSetting: ILoggerSettings = {
	order: {
		on: true,
		color: 'bgYellow',
		order: 1,
	},
	time: {
		on: true,
		color: 'blueBright',
	},
	path: {
		on: true,
		color: 'yellow',
		type: 'relative',
	},
	functionName: {
		on: true,
		color: 'greenBright',
	},
};

class LoggerSetting {
	private setting: ILoggerSettings;
	constructor(settings?: ILoggerSettings) {
		if (settings) {
			this.setting = settings;
		} else {
			this.setting = loggerDefaultSetting;
		}
	}

	get time(): ILoggerSettings['time'] {
		return this.setting.time;
	}
	set time(time: ILoggerSettings['time']) {
		this.setting.time = time;
	}

	get order(): ILoggerSettings['order'] {
		return this.setting.order;
	}
	set order(order: ILoggerSettings['order']) {
		this.setting.order = order;
	}

	get path(): ILoggerSettings['path'] {
		return this.setting.path;
	}

	set path(path: ILoggerSettings['path']) {
		this.setting.path = path;
	}

	get functionName(): ILoggerSettings['functionName'] {
		return this.setting.functionName;
	}

	set functionName(settings: ISettingsFunctionName) {
		this.setting.functionName = settings;
	}
}

type TChalkColors =
	| 'black'
	| 'red'
	| 'green'
	| 'yellow'
	| 'blue'
	| 'magenta'
	| 'cyan'
	| 'white'
	| 'gray'
	| 'blackBright'
	| 'redBright'
	| 'greenBright'
	| 'yellowBright'
	| 'blueBright'
	| 'magentaBright'
	| 'cyanBright'
	| 'whiteBright'
	| 'bgBlack'
	| 'bgRed'
	| 'bgGreen'
	| 'bgYellow'
	| 'bgBlue'
	| 'bgMagenta'
	| 'bgCyan'
	| 'bgWhite'
	| 'bgGray'
	| 'bgBlackBright'
	| 'bgRedBright'
	| 'bgGreenBright'
	| 'bgBlueBright'
	| 'bgYellowBright'
	| 'bgCyanBright'
	| 'bgWhiteBright';

// Получает имя функции в который вызывается
class FunctionName implements LoggerObject {
	constructor(private settings: ISettingsFunctionName, private loggerInfo: LoggerInfo) {}

	toString(): string {
		let out = this.loggerInfo.functionName;
		const color = this.settings.color;
		if (color) {
			out = Chalk.toColor(out + '()', color);
		}
		return out;
	}
}

export class Logger {
	private settings: LoggerSetting;
	private headersOn: boolean;

	constructor(settings?: ILoggerSettings) {
		if (settings) {
			this.settings = new LoggerSetting(settings);
		} else {
			this.settings = new LoggerSetting();
		}

		this.headersOn = true;
	}

	log(...data: any[]): void {
		console.log(...data);

		if (this.headersOn) {
			console.log(this.header);
		}
	}

	onHeader(bool: boolean): void {
		this.headersOn = bool;
	}

	printHeader(): void {
		console.log(this.header);
	}

	get header(): string {
		const loggerInfo = new LoggerInfo(new Error());

		const orderObject = new Order(this.settings);

		const timeObj = new Time(this.settings.time);
		const pathObj = new Path(loggerInfo, this.settings.path);
		const functionNameObj = new FunctionName(this.settings.functionName, loggerInfo);

		let type = 'INFO';
		type = chalk.cyan(type);

		return `${orderObject} ${type} ${timeObj} ${pathObj}`;
	}
}

class Time {
	constructor(private setting: ILoggerSettings['time']) {}

	public toString(): string {
		let timeStr = this.getTimeNow();
		const color = this.setting.color;
		if (color) {
			timeStr = Chalk.toColor(timeStr, color);
		}

		return timeStr;
	}

	private getTimeNow(): string {
		const now = new Date(Date.now());
		const start = (now + '').indexOf(':');

		return `${now}`.slice(start - 2, start + 6);
	}
}

class Order {
	private setting: ILoggerSettings['order'];

	constructor(setting: ILoggerSettings) {
		this.setting = setting.order;
	}

	get order(): number {
		return this.setting.order;
	}

	set order(val: number) {
		this.setting.order = val;
	}

	public toString(): string {
		if (!this.setting.on) return '';

		const color = this.setting.color;
		if (!color) return this.setting.order + '';

		return Chalk.toColor(' ' + this.setting.order + ' ', color);
	}
}

interface ILoggerSettings {
	order: {
		on: boolean;
		color?: TChalkColors;
		order: number;
	};
	time: {
		on: boolean;
		color?: TChalkColors;
		timeFormat?: 'string';
	};
	path: {
		on: boolean;
		color?: TChalkColors;
		type: 'relative' | 'absolute';
	};
	functionName: {
		on: boolean;
		color?: TChalkColors;
		withoutBracket?: boolean;
	};
	// headerName: {
	// 	name: string;
	// };
}

interface ISettingItemBase {
	on: boolean;
	color?: TChalkColors;
}

// interface ISettingItemColor
// interface ISettingsOrder extends ISettingItemBase {
// 	on: boolean;
// 	color?: TChalkColors;
// 	order: number;
// }

interface ISettingsTime extends ISettingItemBase {
	timeFormat?: 'string';
}
interface ISettingsPath extends ISettingItemBase {
	type: 'relative' | 'absolute';
}

interface ISettingsFunctionName extends ISettingItemBase {
	withoutBracket?: boolean;
}

type TLoggerTokens = 'string' | 'time' | 'functionName';
type ILoggerToken = {
	str: string;
	type: TLoggerTokens;
};

const TypeObjLoggerTokens: { [s: string]: TLoggerTokens } = {
	time: 'time',
	functionName: 'functionName',
};

class LoggerTokenParser {
	private _parserObject: ILoggerToken[];

	constructor(private parsingSting: string) {
		this._parserObject = this.parseString();
	}
	// '[order] [time] [functionName]': ['order', ' ', 'time', ' ', 'functionName']
	private parseString(): ILoggerToken[] {
		const openParenteeseStack: number[] = [];
		const out: ILoggerToken[] = [];

		for (const [ch, i] of Object.entries(this.parsingSting)) {
			const ind = Number(i);

			if (ch === '[') {
				openParenteeseStack.push(ind);
			} else if (ch === ']') {
				const startInd = openParenteeseStack.pop();
				const endInd = ind;

				if (startInd === undefined) {
					throw new Error(`Не правильно расставлены скобки: ${this.parseString}`);
				}

				const str = this.parsingSting.slice(startInd, endInd + 1);
				const token =
					TypeObjLoggerTokens[str] !== undefined ? TypeObjLoggerTokens[str] : 'string';

				out.push({
					str: str,
					type: token,
				});
			}
		}

		return out;
	}

	get parserObject(): ILoggerToken[] {
		return this._parserObject;
	}
}

class StringConstructor {
	private str: string;
	constructor(private loggerTokens: ILoggerToken[], private loggerSettings: ILoggerSettings) {}

	// private constructString() {
	// 	for (const token of this.loggerTokens) {
	// 		if (token.type === 'string') {
	// 			this.str += token.str;
	// 		}

	// 		if (token.type === 'path') {
	//             const pathObj = new Path()

	// 		}
	// 	}
	// }
}

class Path {
	constructor(private loggerInfo: LoggerInfo, private pathSettings: ISettingsPath) {}

	toString(): string {
		let out = '';
		const pathType = this.pathSettings.type;
		const color = this.pathSettings.color;

		if (pathType === 'relative') {
			out = this.loggerInfo.relativePath;
		} else if (pathType === 'absolute') {
			out = this.loggerInfo.absolutePath;
		}

		if (color) {
			out = Chalk.toColor(out, color);
		}
		return out;
	}
}

class Chalk {
	static toColor(str: string, color: TChalkColors): string {
		return chalk[color](str);
	}
}

interface LoggerObject {
	toString(): string;
}
