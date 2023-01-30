import { Logger } from 'tslog';

export interface ILogger {
	error(...args: unknown[]): void;
	warn(...args: unknown[]): void;
	log(...args: unknown[]): void;
}
