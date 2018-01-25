#!/usr/bin/env node
var program = require('commander');
var shell = require('shelljs');
var fs = require('fs');
var chalk = require('chalk');

//get current working directory
var cwd=process.cwd();

//parse commands args and options

program
    .arguments('<project>')
  	.option('-p, --provisioning', 'For to run provisioning tasks on the selected ADE')
	.parse(process.argv);

var project=program.args[0];

if (project==undefined){
  console.log(chalk.red('ERROR:')+'missing argument <project>');
  shell.exit(1);
}

//check Vagrant is installed
check_vagrant=shell.which('vagrant');
if (!check_vagrant) {
  console.log(chalk.red('ERROR:')+'sorry, ADE requires vagrant installed on host machine');
  shell.exit(1);
}
else
	console.log(chalk.green('SUCCESS:')+ 'vagrant found at '+check_vagrant);

//check Virtual box is installed
check_vbox=shell.which('VBoxManage');
if (!check_vbox) {
  console.log(chalk.red('ERROR:')+'sorry, ADE requires VirtualBox installed on host machine');

  shell.exit(1);
}
else
	console.log(chalk.green('SUCCESS:')+ 'VirtualBox found at '+check_vbox);

console.log(chalk.cyan('INFO:')+ 'starting Arepas Developer Environment (ADE) at '+cwd+'/'+project);

//Setup ADE specific platform
try {
  fs.accessSync(project, fs.constants.R_OK);
  shell.cd(project);
  var _shell_command=program.provisioning?'vagrant up --provision':'vagrant up';
  if (shell.exec(_shell_command).code !== 0) {
    console.log(chalk.red('ERROR:')+'sorry, vagrant has returned a non zero exit code, please check output to see what happened');
    shell.exit(1);
  }
} catch (e) {
    console.log(chalk.cyan('ERROR:')+ 'trying to start ADE for '+project.toUpperCase()+", please ensure you have initialized this ADE");
}

console.log(chalk.green('SUCCESS:')+ 'ADE for '+project.toUpperCase()+' has been initialized at '+cwd+'/'+project);