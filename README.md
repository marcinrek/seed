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

## Features/instructions
* Run 'gulp --readme' for more details
* things like css breakpoints can be configred in config.json - check out comments at top of the file for more details
* all modules global.js files will be merged to one global.js
* you can create more then one webpack JS bundle - check config.json and look at webpackEntryFiles - by default all *.app.js files are used as entry files
* name a JS file *.mod.js and it will be copied to build folder to be used as &lt;script type="module"&gt;
  
## Testes under
* Windows 10 with Cygwin installed
* Ubuntu 
* Node 8.7.0

## Changelog
* v1.0.0 - Initial commit

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

### hyperapp_app docs
Sample hyperapp example.
This module requires adding a plugin to .babelrc
```
["transform-react-jsx",{"pragma": "h"}]
```
This will cause React apps to stop working as the default for this is:
```
["transform-react-jsx",{"pragma": "React.createElement"}]
```
This can be done by 
```
--useHyperapp
```
for example:
```
gulp serve --useHyperapp --routingEntry=/hyperapp_app.html
```
This does make it hard to build react and hyperapp at the same time but this is an unlikely scenario. Still possible to do "manually" ...

### image_example docs

Sample use of images. Made just to point out module folders and where will those files end up in /dist.
### random_password docs
Sample app that uses &lt;script type="module"&gt;

### react_app docs
Basic react application example module.

This modules uses routing so to run dev server type:
```
gulp serve --routingEntry=/react_app.html
```