# arepas-commander

Arepas Commander is an NPM CLI tool to interact with an ADEs (Arepas Development Environments)

## Prerequisites

The following software needs to be installed on your system:

* [Vagrant](https://www.vagrantup.com)
* [Virtualbox](https://www.virtualbox.org)
* [latest Node and NPM](https://nodejs.org/en/)

## Arepas Development Environment (ADE)

Any *ADE* have the following components

* A Vagrant Box provisioned for an specific development platform (currently we support only [PHP](https://github.com/jscarton/arepas4php) and [Go](https://github.com/jscarton/arepas4go))
* A .json file to manage environment settings
* A shared folder structure to share files between your computer and the vagrant box (you can use your preferred IDE or text editor to edit your files).
* A set of shell recipes to install and setup software related to the chosen development platform and also recipes to perform automated tasks in an easy way.
* An internal CLI installed in the vagrant box(see the arepas-cli repository)


All this components are managed by an external CLI (which is provided by this package/repository)

## Installation

Just install arepas-commander as any other npm package at the npm registry.

```bash
npm install -g arepas-commander
```

## Setting up your ADE

Create a folder wherever you want on your filesystem to home your workspace. Then use the arepas _init_ command to initialize your ADE

In example:

```bash
mkdir workspace
cd workspace
arepas init php
```

After initializing your ADE you will have a new folder in your workspace with a Vagrantfile and an ade_{platform}.json file.

Example for PHP
```javascript
{
	"ade": {
		"platforms": {
			"PHP": {
				"version": "20171030",
				"platform": "php",
				"hostname": "php.arepasapp.com",
				"memory": "1024",
				"ip": "192.168.56.151",
				"dns": {
					"entry": [
						{
							"domain": "php.arepasapp.com",
							"active": "yes"
						},
						{
							"domain": "phpapp.arepasapp.com",
							"active": "yes"
						}
					]
				},
				"apps": {
					"docs": {
						"dns": "php.arepasapp.com",
						"uri": "/docs",
						"webroot": "/var/www/projects/arepas-docs",
						"port": "80",
						"ssl": "no",
						"require": [
							"laravel",
							"bedrock",
							"wp-cli"
						]
					}
				}
			}
		}
	}
}
```
The meaining of every setting is explained in each ADE's github repository.

* [Arepas 4 PHP](https://github.com/jscarton/arepas4php)
* [Arepas 4 Go](https://github.com/jscarton/arepas4go)

## Starting your ADE

Once initilized your ADE you need to start it. On the first start up vagrant will run the provisioning process to setup all software. You just need to type this on your workspace:

```bash
cd workspace
arepas start php
```

## Connecting to your ADE

Sometime you need to connect to your running ADE using _SSH_. You just need to type this on your workspace to open an SSH connection in your shell:

```bash
cd workspace
arepas connect php
```

## Stopping or Reloading your ADE

To stop your ADE,type this on your workspace on your shell:

```bash
cd workspace
arepas stop php
```

To reload your ADE,type this on your workspace on your shell:

```bash
cd workspace
arepas reload php
```

## Deleting your ADE

Once you have finished and shipped your software product you could destroy  your ADE to free space on your system.

```bash
cd workspace
arepas delete php
```

## Running Recipes

This feature is still on development

## Developing Software with an ADE

This tutorial will be on the Wiki and is still on development


## Contributing

To report issues use this repo issues tracker.

To collaborate with arepas-commander CLI fork and do some pull request (and welcome!!!)

To contact me write me at <jscarton@gmail.com>

