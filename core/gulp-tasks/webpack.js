const colors = require('colors');
const helpers = require('./_helpers.js');

module.exports = (gulp, plugins, config, webpackConfig) => {

    return () => {
       
        if (helpers.checkGlobFileExists(config.webpackEntryFiles)) {    // Check are there entry files with given pattern from config.json
            gulp.src(config.webpackEntryFiles)                          // Get app file
                .pipe(plugins.webpackStream(webpackConfig))             // run webpack
                .pipe(gulp.dest(config.buildDir+'js'))                  // write output file to disk
                .on('end', function() { 
                    if (config.optimise) {
                        gulp.start('optimise');                         // after webpack finishes run optimise
                    }
                });
        } else {
            console.log(colors.green('No files for webpack in path provided in config.json: ', colors.magenta(config.webpackEntryFiles.join(' | '))));
            if (config.optimise) {
                gulp.start('optimise');                                 // after webpack finishes run optimise
            }
        }
        
    };
    
};
