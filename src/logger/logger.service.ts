import { Logger } from 'tslog'


interface defaultLogObject{
    
}

export class LoggerSevice {
    public logger: Logger<defaultLogObject>

    constructor(){
        const prettyLogTemplate =  "{{logLevelName}} {{yyyy}}-{{mm}}-{{dd}} {{hh}}:{{MM}}:{{ss}}"
        this.logger = new Logger({type: 'pretty', prettyLogTemplate: prettyLogTemplate})
    }

    error(...args: unknown[]){
        this.logger.error(args, { bar: true });
    }

    warn(...args: unknown[]){
        this.logger.warn(args, { bar: true });
    }
    log(...args: unknown[]){
        this.logger.info(args);

        
    }

}

