import TSVReader from '../common/tsv-reader/tsv-reader.js';
import chalk from 'chalk';
import { CliCommandInterface } from './cli-command.interface.js';

export default class ImportCliCommand implements CliCommandInterface {

  public readonly name = '--import';

  public execute(fileName:string):void {
    const readFile = new TSVReader(fileName);
    if(!fileName){
      return console.log('Нет импортированного файла');
    }
    try {
      readFile.read();
      console.log(readFile.toArray());
    } catch (err) {
      if(!(err instanceof Error)){
        throw err;
      }
      console.log(chalk.red(`${err.message}`));
    }
  }

}
