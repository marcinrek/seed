const colors = require('colors');

module.exports = (gulp, plugins, config) => {
    return () => {

        if (config.jsMochaTests.length) {                                   // Check do test path exist
            gulp.src(config.jsMochaTests, { read: false })                  // get test files
                .pipe(plugins.mocha({                                       // run mocha ...
                    require: ['babel-register']                             // .. with plugins
                }))
        } else {
            console.log(colors.green('No test files in js-test task.'));    // else just display info
        }
    };
};
