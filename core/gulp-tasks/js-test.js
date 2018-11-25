const colors = require('colors');
const helpers = require('./_helpers.js');

module.exports = (gulp, plugins, config) => {
    return () => {

        if (helpers.checkGlobFileExists(config.jsMochaTests)) {             // Check do test files exist
            gulp.src(config.jsMochaTests, { read: false })                  // get test files
                .pipe(plugins.mocha({                                       // run mocha ...
                    require: ['babel-register']                             // .. with plugins
                }))
        } else {
            console.log(colors.green('No test files in js-test task in config.json:', colors.magenta(config.jsMochaTests.join(' | '))));    // else just display info
        }
    };
};
