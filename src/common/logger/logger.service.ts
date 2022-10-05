import pino,{ Logger } from 'pino';
import { injectable } from 'inversify/lib/annotation/injectable.js';
import { LoggerInterface } from './logger.interface';

@injectable()

export default class LoggerService implements LoggerInterface {
  private logger !: Logger;

  constructor(){
    this.logger = pino();
    this.logger.info('logger create...');
  }

  public info (massage:string, ...arg:unknown[]){
    this.logger.info(massage, ...arg);
  }

  public debug (massage:string, ...arg:unknown[]){
    this.logger.debug(massage, ...arg);
  }

  public warn (massage:string, ...arg:unknown[]){
    this.logger.warn(massage, ...arg);
  }

  public error (massage:string, ...arg:unknown[]){
    this.logger.error(massage, ...arg);
  }
}
