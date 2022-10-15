import TSVReader from '../common/tsv-reader/tsv-reader.js';
import chalk from 'chalk';
import { CliCommandInterface } from './cli-command.interface.js';
import { offerTsvToArray } from '../common/offer-tsv-to-array/offer-tsv-to-array.js';
import { RentsOfferInterface } from '../modules/rents-offer/rents-offer.interface.js';
import { UserServiceInterface } from '../modules/user/user-service.interface.js';
import { LoggerInterface } from '../common/logger/logger.interface.js';
import { DatabaseClientInterface } from '../common/database-client/database-interface.js';
import LoggerService from '../common/logger/logger.service.js';
import DatabaseService from '../common/database-client/database.service.js';
import UserService from '../modules/user/user.service.js';
import { UserModel } from '../modules/user/user.entity.js';
import RentsOfferService from '../modules/rents-offer/rents-offer.service.js';
import { RentsOfferModel } from '../modules/rents-offer/rents-offer.entity.js';
import { AbsData } from '../type/abs-data-type.js';
import { getUrl } from '../utils/db.js';

const DEFAULT_DB_PORT = 27017;
const DEFAULT_DB_PASSWORD = 'test';

export default class ImportCliCommand implements CliCommandInterface {

  public readonly name = '--import';
  private rentsOfferService !: RentsOfferInterface;
  private userService !: UserServiceInterface;
  private logger !: LoggerInterface;
  private databaseService !: DatabaseClientInterface;
  private salt !: string;

  constructor (  ){
    this.online = this.online.bind(this);
    this.onComplete = this.onComplete.bind(this);

    this.logger = new LoggerService();
    this.databaseService = new DatabaseService(this.logger);
    this.userService = new UserService(this.logger, UserModel);
    this.rentsOfferService = new RentsOfferService(this.logger, RentsOfferModel);
  }

  private async saveOffer(offer: AbsData) {
    const user = await this.userService.findOrCreate({
      ...offer.author,
      password:DEFAULT_DB_PASSWORD
    }, this.salt);

    await this.rentsOfferService.create({
      ...offer,
      author:{
        name:user.name,
        surname:user.surname,
        email:user.email,
        userType:user.userType,
        avatarImg:user.avatarImg,
      }
    });

  }


  private async online (line:string, resolve:()=>void) {
    const offers = offerTsvToArray(line);
    await offers.forEach((offer)=> this.saveOffer(offer));
    resolve();
  }

  private onComplete (count:number) {

    console.log(`${count} row imported`);
    this.databaseService.disconnect();
  }

  public async execute(fileName:string, login: string, password: string, host: string, dbname: string, salt: string):Promise<void> {

    if(!fileName){
      return console.log('Нет импортированного файла');
    }
    const url = getUrl(login, password, host, DEFAULT_DB_PORT, dbname);

    this.salt = salt;

    await this.databaseService.connect(url);

    const readFile = new TSVReader(fileName.trim());
    readFile.on('line', this.online);
    readFile.on('end', this.onComplete);
    try {
      readFile.read();
    } catch (err) {
      if(!(err instanceof Error)){
        throw err;
      }
      console.log(chalk.red(`${err.message}`));
    }
  }

}
