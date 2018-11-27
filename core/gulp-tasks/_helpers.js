const colors = require('colors');
const glob = require('glob');

/**
 * @description Gets routingEntry from config.json and changes to whatever is passed as --routingEntry=/{value}
 * @param {string} routingEntry routing entry path
 * @param {json} config configuration json from config.json
 * @example gulp serve --routingEntry=/about_me
 */
exports.changeRoutingEntry = (routingEntry, config) => {
    if (routingEntry) {
        console.log(colors.green('#######'));
        console.log(colors.green('# Changing routingEntry from:'), colors.white(config.routingEntry), colors.green('to'), colors.white(routingEntry));
        console.log(colors.green('#######'));

        config.routingEntry = routingEntry;
    }
}

/**
 * @description Builds regexp array for rewrites in browser-sync historyApiFallback middleware
 * @param {array} routingEntry array of strings that will be converted to regular expressions
 * @param {json} config configuration json from config.json
 */
exports.buildRoutingRewrites = (routingEntry, config) => {
    if (routingEntry) {
        console.log(colors.green('#######'));
        config.routingRewrites = config.routingRewrites.map(function (regexString) {
            console.log(colors.green('# routingRewrites from:'), colors.white(regexString), colors.green('to:'), colors.white(config.routingEntry));
            return { from: new RegExp('/' + regexString + '/', ""), to: config.routingEntry }
        });
        console.log(colors.green('#######'));
    } else {
        config.routingRewrites = []
    }
}

/**
 * @description Changes the default destination folder
 * @param {string} dest destination folder name
 * @param {json} config configuration json from config.json
 * @example gulp build --dest=/deploy
 */
exports.changeDest = (dest, config) => {
    if (dest) {

        // Check is argument value provided
        if (undefined !== dest.length) {
            let newBuildDir = './' + dest.replace('/', '').replace(/\s/g, '_') + '/';

            // Check is it save to use given path
            config.reservedPaths.map(function (item) {
                if (item.indexOf(newBuildDir) !== -1) {
                    console.log(colors.red('#######'));
                    console.log(colors.red('# You can not change path to'), colors.white(newBuildDir), colors.red(' as it is marked as reserved in config'));
                    console.log(colors.red('#######'));
                    process.exit(1);
                }
            });

            // All good
            console.log(colors.green('#######'));
            console.log(colors.green('# Changing folder from:'), colors.white(config.buildDir), colors.green('to'), colors.white(newBuildDir));
            console.log(colors.green('#######'));
            config.buildDir = newBuildDir;

        } else {
            console.log(colors.red('#######'));
            console.log(colors.red('# Please provide value for --dest ...'));
            console.log(colors.red('#######'));
            process.exit(1);
        }
    }
}

/**
 * @description Checks does any file exist within a given glob
 * @param {glob} path glob type string or array
 * @returns {boolean} true if any file exists else false
 */
exports.checkGlobFileExists = (path) => {
    let hasFiles = false;

    // Array passed
    if (path instanceof Array) {
        path.map((pathString) => {
            let pathStringExists = glob.sync(pathString, {}).length;
            hasFiles = pathStringExists ? true : hasFiles;
        });

        // String passed
    } else if (path instanceof String) {
        return glob.sync(path, {}).length;

        // Something else passed ...
    } else {
        return false;
    }

    // Return for array type
    return hasFiles;
}

/**
 * @deprecated This will use ["transform-react-jsx",{"pragma": "h"}] for hyperapp
 * @param {boolean} useHyperapp user hyperapp if true
 * @param {json} config configuration json from config.json
 * @example gulp serve --useHyperapp=true
 */
exports.useHyperapp = (useHyperapp, config) => {
    if (useHyperapp) {
        console.log(colors.green('#######'));
        console.log(colors.green('# Using hyperapp! Adding: '), colors.white(JSON.stringify(config.hyperappBabelPlugin)), colors.green('to'), colors.white('babel plugins'));
        console.log(colors.green('#######'));

        config.extraBabelPlugins.push(config.hyperappBabelPlugin);
    }
}

/**
 * @description Print readme text to console
 */
exports.readme = () => {
    console.log('');
    console.log(colors.green('      _________                 .___').rainbow);
    console.log(colors.green('     /   _____/ ____   ____   __| _/').rainbow);
    console.log(colors.green('     \\_____  \\_/ __ \\_/ __ \\ / __ | ').rainbow);
    console.log(colors.green('     /        \\  ___/\\  ___// /_/ | ').rainbow);
    console.log(colors.green('    /_v.1.3.1/\\___  >\\___  >____  | ').rainbow);
    console.log(colors.green('           \\/     \\/     \\/     \\/ ').rainbow);
    console.log('');
    console.log(colors.cyan('All available commands: '));
    console.log(colors.white('-'), colors.yellow('gulp OR gulp build'), colors.white('<- build all to output folder and optimise'));
    console.log(colors.white('-'), colors.yellow('gulp clean'), colors.white('<- remove all from output folder'));
    console.log(colors.white('-'), colors.yellow('gulp serve'), colors.white('<- gulp build + start browserSync witch watchers'));
    console.log(colors.white('-'), colors.yellow('gulp js-test'), colors.white('<- run mocha tests'));
    console.log('')
    console.log(colors.cyan('Arguments: '));
    console.log(colors.white('-'), colors.yellow('--readme'), colors.white('this screen'));
    console.log(colors.white('-'), colors.yellow('--dest=FOLDER_NAME'), colors.white('<- change output folder'));
    console.log(colors.white('-'), colors.yellow('--routingEntry=/HTML_FILE_NAME'), colors.white('<- change routingEntry'));
    console.log(colors.white('-'), colors.yellow('--useHyperapp'), colors.white('<- use when working with hyperapp for proper JSX transformation'));
    console.log(colors.white('-'), colors.yellow('--optimise'), colors.white('<- optimise after build? can set default in config.json'));
    console.log('')
    console.log(colors.cyan('Other: '));
    console.log(colors.white('-'), colors.yellow('npm run add-module'), colors.white('<- create new module based on scaffold'));
    console.log(colors.white('-'), colors.yellow('npm run hook-pre-commit'), colors.white('<- create pre-commit hook based on eslint'));
    console.log(colors.white('-'), colors.yellow('npm run lint'), colors.white('<- lints all .js files from src/ folder'));
    console.log(colors.white('-'), colors.yellow('npm run test'), colors.white('<- run mocha tests'));
    console.log(colors.white('-'), colors.yellow('npm run pup'), colors.white('<- run puppeteer tests'));
    console.log('')
    console.log(colors.cyan('Module structure: '));
    console.log(colors.yellow('| module_{{module_name}} [folder]'), '<- main module folder');
    console.log(colors.yellow('|- css [folder]'), '<- css folder');
    console.log(colors.yellow('   |- images [folder]'), '<- css images folder');
    console.log(colors.green('   |- desktop.scss'), '<- desktop breakpoint scss file - breakpoint value configurable in config.json');
    console.log(colors.green('   |- global.scss'), '<- global scss file');
    console.log(colors.green('   |- print.scss'), '<- print scss file');
    console.log(colors.green('   |- tablet.scss'), '<- tablet breakpoint scss file - breakpoint value configurable in config.json');
    console.log(colors.yellow('|- files [folder]'), '<- other files used in module');
    console.log(colors.yellow('|- html [folder]'), '<- partial html folder');
    console.log(colors.green('   |- _fragment_name.html'), '<- partial html file');
    console.log(colors.yellow('|- js [folder]'), '<- js folder');
    console.log(colors.green('   |- global-{{module_name}}.js'), '<- global-*.js will be merged to global.js');
    console.log(colors.green('   |- {{module_name}}.js'), '<- module js file');
    console.log(colors.green('   |- {{module_name}}.mod.js'), '<- *.mod.js will be copied to /js');
    console.log(colors.green('   |- {{module_name}}.sub.mod.js'), '<- *.mod.js will be copied to /js');
    console.log(colors.green('   |- {{module_name}}.test.js'), '<- *.test.js - mocha test file');
    console.log(colors.green('   |- {{module_name}}.pup.js'), '<- *.pup.js - puppeteer test file');
    console.log(colors.green('|- README.md'), '<- used for module documentation, will be merged to global README.md and HTML entry file');
    console.log(colors.green('|- {{module_name}}.html'), '<- main module html file');
}