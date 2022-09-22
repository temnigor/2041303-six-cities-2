#!/usr/bin/env node
import CliApplication from './app/cli-application.js';
import GenerateCliCommand from './cli-commands/generate-cli-command.js';
import HelpCliCommand from './cli-commands/help-cli-command.js';
import ImportCliCommand from './cli-commands/import-cli-command.js';
import VersionCliCommands from './cli-commands/version-cli-command.js';

const cliManager = new CliApplication();

cliManager.registerCommands([
  new VersionCliCommands, new HelpCliCommand, new ImportCliCommand, new GenerateCliCommand
]);

cliManager.processCommand(process.argv);
