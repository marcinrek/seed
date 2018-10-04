const colors = require('colors');

module.exports = () => {
    console.log('');
    console.log(colors.green('      _________                 .___').rainbow);
    console.log(colors.green('     /   _____/ ____   ____   __| _/').rainbow);
    console.log(colors.green('     \\_____  \\_/ __ \\_/ __ \\ / __ | ').rainbow);
    console.log(colors.green('     /        \\  ___/\\  ___// /_/ | ').rainbow);
    console.log(colors.green('    /_v.1.2.1/\\___  >\\___  >____  | ').rainbow);
    console.log(colors.green('           \\/     \\/     \\/     \\/ ').rainbow);
    console.log('');
    console.log(colors.cyan('All available commands: '));
    console.log(colors.white('-'),colors.yellow('gulp OR gulp build'),colors.white('<- build all to output folder and optimise'));
    console.log(colors.white('-'),colors.yellow('gulp clean'),colors.white('<- remove all from output folder'));
    console.log(colors.white('-'),colors.yellow('gulp serve'),colors.white('<- gulp build + start browserSync witch watchers'));
    console.log(colors.white('-'),colors.yellow('gulp js-test'), colors.white('<- run mocha tests'));
    console.log('')
    console.log(colors.cyan('Arguments: '));
    console.log(colors.white('-'),colors.yellow('--readme'),colors.white('this screen'));
    console.log(colors.white('-'),colors.yellow('--dest=FOLDER_NAME'),colors.white('<- change output folder'));
    console.log(colors.white('-'),colors.yellow('--routingEntry=/HTML_FILE_NAME'), colors.white('<- change routingEntry'));
    console.log(colors.white('-'),colors.yellow('--useHyperapp'), colors.white('<- use when working with hyperapp for proper JSX transformation'));
    console.log(colors.white('-'),colors.yellow('--optimise'), colors.white('<- optimise after build? can set default in config.json'));
    console.log('')
    console.log(colors.cyan('Other: '));
    console.log(colors.white('-'),colors.yellow('npm run add-module'),colors.white('<- create new module based on scaffold'));
    console.log(colors.white('-'),colors.yellow('npm run hook-pre-commit'),colors.white('<- create pre-commit hook based on eslint'));
    console.log(colors.white('-'),colors.yellow('npm run lint'),colors.white('<- lints all .js files from src/ folder'));
    console.log(colors.white('-'),colors.yellow('npm run test'),colors.white('<- run mocha tests'));
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
    console.log(colors.green('|- README.md'), '<- used for module documentation, will be merged to global README.md and HTML entry file');
    console.log(colors.green('|- {{module_name}}.html'), '<- main module html file');
}
