# Description
Simple cutup boilerplate with support of:
* react
* hyperapp
* &lt;script type="module"&gt;
* routing
* scss
* ES6
* jQuery ;)
* and more ...

## Dev tools used
* gulp for automation 
* webpack for bundling JS 
* browsersync with webpack-dev-server and connect-history-api-fallback running as middleware for a development server
* eslint for JS linting
* npm or yarn as package manager
* mocha and puppeteer for testing

## Features/instructions
Please refer to example modules at the bottom for use cases.
* Run 'gulp --readme' for more details
* things like css breakpoints can be configred in config.json - check out comments at top of the file for more details
* all modules global.js files will be merged to one global.js
* you can create more then one webpack JS bundle - check config.json and look at webpackEntryFiles - by default all *.app.js files are used as entry files
* name a JS file *.mod.js and it will be copied to build folder to be used as &lt;script type="module"&gt;
* automatic markdown documentation concat from each module
  
## Testes under
* Windows 10 with Cygwin installed
* Windows 10 with Ubuntu 18.04 subsystem - please note that when you have both Cygwin and Linux Subsystem installed runing "bash" command from the terminal will most likely fire the subsystem. As bash is used in some scripts in Seed you may have to move Cygwin in system paths above "%SystemRoot%\system32". This will cause the bash command to fire the Cygwin bash. You can still fire Ubuntu subsystem by "ubuntu1804.exe" for example.
* Ubuntu 18.04
* Node 8.12.0
* Npm 6.4.1

## Knows bugs and issues
* You may incounter an issue with markdown task when first running gulp. This should happen only once on the initial run.
* To run under Node 10.X you have to remove node_modules and package-lock.json - then run npm install again.

## Changelog
* v1.3.2 - fix Node 10 issues by adding natives module, add custom nunjucks tags to config.json to enable double curly brackets in templates 
* v1.3.1 - remove puppeteer from dependencies
* v1.3.0 - make puppeteer optional, fixes to work without webpack and tests, updated add-module script, refactor gulpfile.js, remove example modules
* v1.2.2 - added puppeteer
* v1.2.1 - improved support for current LTS Node version 8.12.0, updated gulp-markdown to ver 3.0.0, improved html task by adding base path
* v1.2.0 - add more example modules, minor issue fixes, clean up main readme
* v1.1.1 - Update custom-copy and custom-merge tasks - add watchers
* v1.1.0 - Add mocha test
* v1.0.0 - Initial commit

## Next release plans
* replace mocha with Jest
* clear CSS scaffold
* refactor add-module scaffold
* simplify index.html

# Instalation
* npm install
* npm install -g yarn
* npm install -g eslint
* npm run hook-pre-commit - if you want eslint to run on each commit

## Commands
```
gulp <- build all to output folder
```
```
gulp serve <- gulp + start browserSync witch watchers
```
```
gulp clean <- remove all from output folder
```
```
npm run add-module <- create new module based on scaffold
```
```
npm run hook-pre-commit <- create pre-commit hook based on eslint
```
```
npm run lint <- lints all .js files from src/ folder
```
```
npm run test <- run mocha tests
```
```
npm run pup <- run puppeteer tests
```

### Gulp Modifiers
```
--optimise <- build and optimise CSS and JS
```
```
--dest=FOLDER_NAME <- change output folder
```
```
--routingEntry=/HTML_FILE_NAME <- change routingEntry
```
```
--useHyperapp <- use when working with hyperapp for proper JSX transformation
```

## Module docs below

## Donate 
If you find this piece of code to be useful, please consider a donation :)

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate?hosted_button_id=ZPSPDRNU99V4Y)
