import path from 'path';
import { C } from '../../education/reflect';
import chalk from 'chalk';
import { deepCopyObj } from '../deep_copy';

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
	public loggerInfoObject: ILoggerInfoObject;
	constructor(err: Error, private stackDepth: number) {
		const stackString = this.getStackString(err);
		if (!stackString) return;

		this.loggerInfoObject = {
			columnAndLine: this.getColumnAndLine(stackString),
			functionName: this.getFunctionName(stackString),
			absolutePath: this.getAbsolutePath(stackString),
			relativePath: this.getRelativePath(stackString),
		};
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
			return err.stack.split('\n')[this.stackDepth];
		}
	}

	get absolutePath(): string {
		return this.loggerInfoObject.absolutePath;
	}
	get relativePath(): string {
		return this.loggerInfoObject.relativePath;
	}

	get functionName(): string {
		return this.loggerInfoObject.functionName;
	}
}

export const loggerDefaultSetting: ISettings = {
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
		stackDepth: 3,
	},
	functionName: {
		on: true,
		color: 'greenBright',
	},
	headerName: {
		name: 'INFO',
		on: true,
		color: 'cyan',
	},
};

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
	constructor(private setting: ISettings['functionName'], private loggerInfo: LoggerInfoObject) {}

	toString(): string {
		if (!this.setting?.on) return '';

		const [functionName, color] = [this.loggerInfo.functionName, this.setting.color];

		if (color) {
			return Chalk.toColor(`${functionName}()`, color);
		}
		return functionName;
	}
}

class HeaderName implements LoggerObject {
	constructor(private setting: ISettings['headerName']) {}

	toString(): string {
		if (!this.setting?.on) return '';

		const [name, color] = [this.setting.name, this.setting.color];

		if (color) {
			return Chalk.toColor(name, color);
		} else {
			return name;
		}
	}
}

export class Logger {
	private settings: ISettings;
	private headersOn: boolean;

	constructor(settings?: ISettings) {
		if (settings === undefined) {
			this.settings = deepCopyObj(loggerDefaultSetting);
		} else {
			this.settings = settings;
		}

		this.headersOn = true;
	}

	log(...data: any[]): void {
		if (this.headersOn) {
			console.log(this.header);
		}
		console.log(...data);
	}

	onHeader(bool: boolean): void {
		this.headersOn = bool;
	}

	printHeader(): void {
		console.log(this.header);
	}

	get header(): string {
		const loggerInfo = new LoggerInfoObject(new Error(), this.settings['path']['stackDepth']);

		const orderObject = new Order(this.settings);

		const timeObj = new Time(this.settings.time);
		const pathObj = new Path(loggerInfo, this.settings.path);
		const functionNameObj = new FunctionName(this.settings.functionName, loggerInfo);

		const headerName = new HeaderName(this.settings.headerName);

		return `${orderObject} ${headerName} ${timeObj} ${pathObj}`;
	}
}

class Time {
	constructor(private setting: ISettings['time']) {}

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
	private setting: ISettings['order'];

	constructor(setting: ISettings) {
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

export interface ISettings {
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
		stackDepth: number;
	};
	functionName: {
		on: boolean;
		color?: TChalkColors;
		withoutBracket?: boolean;
	};
	headerName: {
		on: boolean;
		color?: TChalkColors;
		name: string;
	};
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
	constructor(private loggerTokens: ILoggerToken[], private loggerSettings: ISettings) {}

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
	constructor(private loggerInfo: LoggerInfoObject, private pathSettings: ISettings['path']) {}

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
