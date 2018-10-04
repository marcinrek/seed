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

## Knows bugs
* You may incounter an issue with markdown task when first running gulp. This should happen only once on the initial run.

## Changelog
* v1.2.1 - improved support for current LTS Node version 8.12.0, updated gulp-markdown to ver 3.0.0, improved html task by adding base path
* v1.2.0 - add more example modules, minor issue fixes, clean up main readme
* v1.1.1 - Update custom-copy and custom-merge tasks - add watchers
* v1.1.0 - Add mocha test
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

### babel docs

Javascript files that have **.babel.js** ending will just get babelified and put to output JS folder. In this example **/src/modules/module_babel/js/babel_sample.babel.js** 
```javascript
const sample = (b) => {
  let x = `This is: ${b}!`;
}
```
ends up in ***/dist/js/babel_sample.babel.js*** as
```javascript
"use strict";

var sample = function sample(b) {
  var x = "This is: " + b + "!";
};
```
The key use of this is when you just want to have one specific file in your project to be babelified - like a small helper for example.

---

### global docs

Javascript files with name **global.js** are concatinated to one global.js file and babelified on output.

---

### image_example docs

Sample use of images. Made just to point out module folders and where will those files end up in /dist.

---

### hyperapp_app docs
Sample hyperapp example.
This module requires adding a plugin to .babelrc
```javascript
["transform-react-jsx",{"pragma": "h"}]
```
This will cause React apps to stop working as the default for this is:
```javascript
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
This does make it hard to build react and hyperapp at the same time but this is an unlikely scenario. Still possible to do "manually" by changing the gulp parameters during development.

---

### random_password docs
Sample app that uses &lt;script type="module"&gt; with webpack bundle as fallback for browsers that do not support it.

```html
<script type="module" src="js/random_password.mod.js"></script>
<script nomodule src="js/random_password.bundle.js"></script>
```

#### Key files

* **/src/modules/random.password.app.js** - entry file for webpack

```javascript
import random_password from 'random_password.mod';
```

* **/src/modules/module_random_password/js/*.js** - all files used here have **.mod.js** endin which makes that just to be copied to the dest js folder. See config.json for more related settings.

* **/src/modules/module_random_password/js/random_password.test.js** - same mocha test. Test are run automatically after each js file change or manually by npm run test. See config.json for more related settings on automatically run.

---


### react_app docs
Basic react application example module.

This modules uses routing so to run dev server type:
```
gulp serve --routingEntry=/react_app.html
```

#### Key files
- **/src/modules/react.app.js** - this is the entry file for webpack. It has a very simple markup:

    ```javascript
    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from 'react_app';

    ReactDOM.render(
        <App  />,
        document.getElementById('app')
    );
    ```

- **/src/modules/module_react_app/js/react_app.js** - this is the file imported above by:

    ```javascript
    import App from 'react_app';
    ```

    as you don't need to specify the folder. Webpack will look for all files in all folders specified in config.json under "webpackResolveDest" :

    ```javascript
    "webpackResolveDest": "./src/modules/**/js"
    ```
---
