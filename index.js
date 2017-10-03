#!/usr/bin/env node
var program = require('commander');

program
  .version('0.0.1')
  .description('Arepas Commander CLI')
  .command('setup <platform>', 'setup an arepas development environment for any supported development platform').alias('s')
  .command('version', 'show version information').alias('v')
  .parse(process.argv);