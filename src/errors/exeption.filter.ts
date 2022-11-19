import { Request, Response, NextFunction} from 'express'
import { LoggerSevice } from '../logger/logger.service';
import { IExeptionFilter } from './exeption.filter.interface';
import { HTTPError } from './http-error.class';
import { injectable, inject } from "inversify";
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import 'reflect-metadata'

@injectable()
export class ExeptionFilter implements IExeptionFilter{
    constructor(@inject(TYPES.ILogger) private logger: ILogger) { }

    catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction){
        if(err instanceof HTTPError){
            this.logger.error(`${err.context} Ошибка ${err.statusCode}: ${err.message}`)
            res.status(err.statusCode).send({err: err.message})
        }else{
            this.logger.error(`${err.message}`)
        }
        
     
    }
}