import { Logger } from "tslog"
    
export interface ILogger {
    logger: unknown

    error(...args: unknown[]): void
    warn(...args: unknown[]): void
    log(...args: unknown[]): void

}
