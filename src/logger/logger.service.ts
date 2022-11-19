import { Logger } from 'tslog'
import { ILogger } from './logger.interface';
import { injectable } from 'inversify'
import 'reflect-metadata'

interface defaultLogObject{
    
}

@injectable()
export class LoggerSevice implements ILogger {
    public logger: Logger<defaultLogObject>

    constructor(){
        const prettyLogTemplate =  "{{logLevelName}} {{yyyy}}-{{mm}}-{{dd}} {{hh}}:{{MM}}:{{ss}}"
        this.logger = new Logger({type: 'pretty', prettyLogTemplate: prettyLogTemplate})
    }

    error(...args: unknown[]){
        this.logger.error(args);
    }

    warn(...args: unknown[]){
        this.logger.warn(args);
    }
    log(...args: unknown[]){
        this.logger.info(args);

        
    }

}

