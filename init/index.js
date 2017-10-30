#!/usr/bin/env node
var program = require('commander');
var shell = require('shelljs');
var fs = require('fs');
var chalk = require('chalk');

//get current working directory
var cwd=process.cwd();

//parse commands args and options

program
    .arguments('<platform>')
	.parse(process.argv);

var platform=program.args[0];
console.log(platform);
if (platform==undefined){
  console.log(chalk.red('ERROR:')+'missing argument <platform>');
  shell.exit(1);
}
// check prerequisites
console.log(chalk.cyan('INFO:')+"checking prerequisites");
//check GIT is installed
check_git=shell.which('git');
if (!check_git) {
  console.log(chalk.red('ERROR:')+'sorry, ADE requires git installed on host machine');
  shell.exit(1);
}
else
	console.log(chalk.green('SUCCESS:')+ 'git found at '+check_git);

//check GIT is installed
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

console.log(chalk.cyan('INFO:')+ 'initializing Arepas Developer Environment at '+cwd);

//Setup ADE Recipes
try {
  fs.accessSync('arepas-recipes', fs.constants.R_OK);
} catch (e) {
  console.log(chalk.cyan('INFO:')+ 'trying to clone ADE RECIPES  from https://github.com/jscarton/arepas-recipes.git');
  // clone ADE RECIPES
  if (shell.exec("git clone https://github.com/jscarton/arepas-recipes.git").code !== 0) {
      console.log(chalk.red('ERROR:')+'git clone failed please check your internet connection');
      shell.exit(1);
  }
}
//updating recipes
shell.cd("arepas-recipes");
console.log(chalk.cyan('INFO:')+"updating recipes on "+process.cwd());
if (shell.exec("git pull origin").code!==0){
  console.log(chalk.red('ERROR:')+'git pull failed please check your internet connection');
  shell.exit(1);
}
shell.cd("..");

//Setup ADE specific platform
try {
  fs.accessSync('arepas4'+platform, fs.constants.R_OK);
} catch (e) {
    console.log(chalk.cyan('INFO:')+ 'trying to clone ADE for '+platform.toUpperCase()+" from https://github.com/jscarton/arepas4"+platform+".git");
    // clone ADE for specific platform
    if (shell.exec("git clone https://github.com/jscarton/arepas4"+platform+".git").code !== 0) {
        console.log(chalk.red('ERROR:')+'git clone failed please check your internet connection');
        shell.exit(1);
    }
    else
    {
      shell.cd("arepas4"+platform);
      console.log("entering to "+process.cwd());
      shell.rm('-rf', '.git');
      shell.cd("..");
    }
}
//Setup Basic Settings for ADE
try {
  fs.accessSync('./arepas4'+platform+'/ade_'+platform+'.json', fs.constants.R_OK);
} catch (e) {
    console.log(chalk.cyan('INFO:')+ 'copying base settings to arepas4'+platform+"/ade_"+platform+".json");
    // checkout ADE for specific platform
    if (shell.cp('./arepas-recipes/recipes/env-json/ade_'+platform+'.json', './arepas4'+platform+'/').code !== 0) {
        console.log(chalk.red('ERROR:')+'failed to initialize ADE settings');
        shell.exit(1);
    }
}

console.log(chalk.cyan('INFO:')+ 'ADE for '+platform.toUpperCase()+' has been initialized at '+cwd+'/arepas4'+platform);