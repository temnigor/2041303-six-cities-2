import {readFileSync} from 'fs';
import chalk from 'chalk';
import { CliCommandInterface } from './cli-command.interface.js';

export default class VersionCliCommands implements CliCommandInterface {

  public readonly name = '--version';

  private readVersion ():string {
    const contentPageJSON = readFileSync('./package.json', 'utf-8');
    const contentPage = JSON.parse(contentPageJSON);
    return contentPage.version;
  }

  public async execute ():Promise<void> {
    const version = this.readVersion();
    console.log(chalk.blue(version));
  }
}
