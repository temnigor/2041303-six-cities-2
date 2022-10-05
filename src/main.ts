import LoggerService from './common/logger/logger.service.js';
import Application from './app/application.js';
import ConfigService from './common/config/config.service.js';
import { Container } from 'inversify';
import { Component } from './type/component-type.js';
import { ConfigInterface } from './common/config/config.interface.js';
import { LoggerInterface } from './common/logger/logger.interface.js';

const applicationContainer = new Container();

applicationContainer.bind<Application>(Component.Application).to(Application).inSingletonScope();
applicationContainer.bind<ConfigInterface>(Component.ConfigInterface).to(ConfigService).inSingletonScope();
applicationContainer.bind<LoggerInterface>(Component.LoggerInterface).to(LoggerService).inSingletonScope();

const application = applicationContainer.get<Application>(Component.Application);

await application.init();
