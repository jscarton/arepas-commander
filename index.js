#!/usr/bin/env node
var program = require('commander');
var chalk = require('chalk');

program
  .version(chalk.cyan('INFO:')+"ADE CLI Version: 0.0.1 Codename: LA PELUA\nby jscarton. Learn more at: https://github.com/jscarton/arepas-commander")
  .description('Arepas Commander CLI')
  .command('init <platform>', 'creates arepas.json file with all data required about your ADE')
  .command('start <platform>', 'start platform\'s ADE, is this is the first time the ADE will be setup and provisioned')
  .command('stop <platform>', 'stop platform\'s ADE if running')
  .command('reload <platform>', 'restart platform\'s ADE if it is running')
  .command('connect <platform>', 'open an ssh connection to platform\'s ADE if it is running')
  .command('delete <platform>', 'destroy a platform\'s ADE')
  .parse(process.argv);