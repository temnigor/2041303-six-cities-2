import CliApplication from './app/cli-application.js';
import HelpCliCommand from './cli-commands/help-cli-command.js';
import VersionCliCommands from './cli-commands/version-cli-command.js';

const cliManager = new CliApplication();

cliManager.registerCommands([
  new VersionCliCommands, new HelpCliCommand
]);

cliManager.processCommand(process.argv);
