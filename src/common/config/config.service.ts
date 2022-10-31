import { config} from 'dotenv';
import { inject, injectable} from 'inversify';
import { Component } from '../../type/component-type.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import { ConfigInterface } from './config.interface';
import { configSchema, ConfigSchema } from './config.schema.js';

@injectable()

export default class ConfigService implements ConfigInterface {

  private config : ConfigSchema;
  private logger : LoggerInterface;

  constructor (@inject(Component.LoggerInterface) logger:LoggerInterface) {
    this.logger = logger;

    const parsedOutput = config();

    if(parsedOutput.error){
      throw new Error ('no find .env');
    }

    configSchema.load({});
    configSchema.validate({allowed: 'strict', output: this.logger.info});

    this.config = configSchema.getProperties();

    this.logger.info('.env successfully parsed');

  }

  public get <T extends keyof ConfigSchema>(key:T):ConfigSchema[T]{
    return this.config[key];
  }

}
