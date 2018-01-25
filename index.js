#!/usr/bin/env node
var program = require('commander');
var chalk = require('chalk');

program
  .version(chalk.cyan('INFO:')+"ADE CLI Version: 0.0.2 Codename: LA PELUA\nby jscarton. Learn more at: https://github.com/jscarton/arepas-commander")
  .description('Arepas Commander CLI')
  .command('init <platform> <project>', 'initialize an ADE in the folder <project> using the chosen <platform>')
  .command('start <project>', 'start and ADE, is this is the first time the ADE will be setup and provisioned')
  .command('stop <project>', 'stop a a running ADE')
  .command('reload <project>', 'restart a running ADE')
  .command('connect <project>', 'open an ssh connection to a running ADE')
  .command('delete <project>', 'destroy an ADE')
  .command('status <pproject>', 'check status of an ADE')
  .parse(process.argv);