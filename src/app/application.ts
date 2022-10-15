import { ConfigInterface } from '../common/config/config.interface';
import{injectable, inject} from 'inversify';
import { LoggerInterface } from '../common/logger/logger.interface';
import { Component } from '../type/component-type.js';
import { DatabaseClientInterface } from '../common/database-client/database-interface.js';
import { getUrl } from '../utils/db.js';

@injectable()

export default class Application {

  private logger !: LoggerInterface;
  private config !: ConfigInterface;
  private databaseClient !: DatabaseClientInterface;

  constructor(
    @inject(Component.LoggerInterface) logger:LoggerInterface,
    @inject(Component.ConfigInterface) config:ConfigInterface,
    @inject(Component.DatabaseClientInterface) databaseClient:DatabaseClientInterface
  ) {

    this.logger = logger;
    this.config = config;
    this.databaseClient = databaseClient;
  }

  public async init (){
    this.logger.info('initialization Application');
    this.logger.info(`Get value $PORT: ${this.config.get('PORT')}`);

    const url = getUrl(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME')
    );

    await this.databaseClient.connect(url);
  }
}
