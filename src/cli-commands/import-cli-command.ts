import TSVReader from '../common/tsv-reader/tsv-reader.js';
import chalk from 'chalk';
import { CliCommandInterface } from './cli-command.interface.js';
import { offerTsvToArray } from '../common/offer-tsv-to-array/offer-tsv-to-array.js';

export default class ImportCliCommand implements CliCommandInterface {

  public readonly name = '--import';

  private online (line:string) {
    const offer = offerTsvToArray(line);
    console.log(offer);
  }

  private onComplete (count:number) {

    console.log(`${count} row imported`);
  }

  public execute(fileName:string):void {

    if(!fileName){
      return console.log('Нет импортированного файла');
    }

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
