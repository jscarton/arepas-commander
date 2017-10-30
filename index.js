#!/usr/bin/env node
var program = require('commander');

program
  .version('0.0.1')
  .description('Arepas Commander CLI')
  .command('init <platform>', 'creates arepas.json file with all data required about your ADE')
  .command('start <platform>', 'start platform\'s ADE, is this is the first time the ADE will be setup and provisioned')
  .command('stop <platform>', 'stop platform\'s ADE if running')
  .command('reload <platform>', 'restart platform\'s ADE if it is running')
  .command('connect <platform>', 'open an ssh connection to platform\'s ADE if it is running')
  .command('delete <platform>', 'destroy a platform\'s ADE')
  .command('version', 'show version information').alias('v')
  .parse(process.argv);