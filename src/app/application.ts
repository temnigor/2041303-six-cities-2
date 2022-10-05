import { ConfigInterface } from '../common/config/config.interface';
import{injectable, inject} from 'inversify';
import { LoggerInterface } from '../common/logger/logger.interface';
import { Component } from '../type/component-type.js';

@injectable()

export default class Application {

  private logger !: LoggerInterface;
  private config !: ConfigInterface;

  constructor(
    @inject(Component.LoggerInterface) logger:LoggerInterface,
    @inject(Component.ConfigInterface) config:ConfigInterface) {

    this.logger = logger;
    this.config = config;
  }

  public async init (){
    this.logger.info('initialization Application');
    this.logger.info(`Get value $PORT: ${this.config.get('PORT')}`);
  }
}
