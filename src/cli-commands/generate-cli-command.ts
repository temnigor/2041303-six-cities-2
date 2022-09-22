import { CliCommandInterface } from './cli-command.interface.js';
import got from 'got';
import { MockData } from '../type/mock-data-type.js';
import OfferGenerator from '../common/offer-generator/offer-generator.js';
import { appendFile } from 'fs/promises';

export default class GenerateCliCommand implements CliCommandInterface {
  public readonly name = '--generate';
  private data!:MockData;

  public async execute(...parameters: string[]): Promise<void> {

    const [ n, filepath, url] = parameters;
    const offerCount = Number.parseInt(n, 10);

    try{
      this.data = await got.get(url).json();
    } catch(error) {
      if(error){
        return console.log(error);
      }
    }

    const offerGeneratorString = new OfferGenerator(this.data);

    for (let i = 0 ; i< offerCount; i++) {
      try{
        await appendFile(filepath, `${offerGeneratorString.generate()}\n`, 'utf-8');
      }catch (error){
        if(error){
          return console.log(error);
        }
      }

    }
    console.log(`create ${filepath}`);
  }
}

