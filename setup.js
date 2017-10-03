#!/usr/bin/env node
var program = require('commander');
var fs = require('fs');
var git = require('simple-git');

program.parse(process.argv);

//sets default to current working directory
var platform = program.args;
if (!platform.length) {
  console.error('platform is required');
  process.exit(1);
}

var target_dir = './arepas4'+platform[0];

console.log('Setting a new Arepas Development Environment (ADE) for platform:'+platform[0]+" on target_dir:"+target_dir);

console.log('Cloning ADE for '+platform[0]+" from https://github.com/jscarton/arepas4php.git");
var remote = 'https://github.com/jscarton/arepas4php.git';
git().silent(false).clone(remote,function(){
	console.log('Running ADE for '+platform[0]+" with vagrant");
	try {
		var olddir=process.cwd();
		console.log('current directory: ' + process.cwd());
		var machinedir=process.cwd()+"/arepas4"+platform[0];
		console.log('opening... '+machinedir);
		process.chdir(machinedir);
	    console.log('entering to machine directory: ' + process.cwd());
	}
	catch (err) {
	  console.log('chdir: ' + err);
	}
	var sys = require('util')
	var exec = require('child_process').exec;
	function puts(error, stdout, stderr) { console.log(stdout) }
	exec("vagrant up", puts);
});



