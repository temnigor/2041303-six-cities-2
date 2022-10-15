import { inject, injectable } from 'inversify';
import mongoose from 'mongoose';
import { Component } from '../../type/component-type.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import { DatabaseClientInterface } from './database-interface.js';

@injectable()

export default class DatabaseService implements DatabaseClientInterface {

  constructor(

    @inject(Component.LoggerInterface) private logger:LoggerInterface

  ) {}

  public async connect(url: string): Promise<void> {
    this.logger.info('try connect to database.');
    await mongoose.connect(url);
    this.logger.info('connect success');
  }

  public async disconnect(): Promise<void> {
    await mongoose.disconnect();
    this.logger.info('disconnect to database.');
  }
}
