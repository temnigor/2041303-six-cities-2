import LoggerService from './common/logger/logger.service.js';
import Application from './app/application.js';
import ConfigService from './common/config/config.service.js';
import {types} from '@typegoose/typegoose';
import { Container } from 'inversify';
import { Component } from './type/component-type.js';
import { ConfigInterface } from './common/config/config.interface.js';
import { LoggerInterface } from './common/logger/logger.interface.js';
import { DatabaseClientInterface } from './common/database-client/database-interface.js';
import DatabaseService from './common/database-client/database.service.js';
import { UserServiceInterface } from './modules/user/user-service.interface.js';
import UserService from './modules/user/user.service.js';
import { UserEntity, UserModel } from './modules/user/user.entity.js';
import { RentsOfferInterface } from './modules/rents-offer/rents-offer.interface.js';
import { RentsOfferEntity, RentsOfferModel } from './modules/rents-offer/rents-offer.entity.js';
import RentsOfferService from './modules/rents-offer/rents-offer.service.js';
import { RentsOfferCommentModel, RentsOfferCommentsEntity } from './modules/rents-offer-comments/rents-offer-comments.entity.js';
import { RentsOfferCommentsInterface } from './modules/rents-offer-comments/rents-offer-comments.interface.js';
import { RentsOfferCommentService } from './modules/rents-offer-comments/rents-offer-comments.service.js';

const applicationContainer = new Container();

applicationContainer.bind<Application>(Component.Application).to(Application).inSingletonScope();
applicationContainer.bind<ConfigInterface>(Component.ConfigInterface).to(ConfigService).inSingletonScope();
applicationContainer.bind<LoggerInterface>(Component.LoggerInterface).to(LoggerService).inSingletonScope();
applicationContainer.bind<DatabaseClientInterface>(Component.DatabaseClientInterface).to(DatabaseService).inSingletonScope();
applicationContainer.bind<UserServiceInterface>(Component.UserServiceInterface).to(UserService).inSingletonScope();
applicationContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
applicationContainer.bind<RentsOfferInterface>(Component.RentsOfferInterface).to(RentsOfferService);
applicationContainer.bind<types.ModelType<RentsOfferEntity>>(Component.RentsOfferModel).toConstantValue(RentsOfferModel);
applicationContainer.bind<types.ModelType<RentsOfferCommentsInterface>>(Component.RentsOfferCommentsInterface).to(RentsOfferCommentService).inSingletonScope();
applicationContainer.bind<types.ModelType<RentsOfferCommentsEntity>>(Component.RentsOfferCommentModel).toConstantValue(RentsOfferCommentModel);

const application = applicationContainer.get<Application>(Component.Application);

await application.init();
