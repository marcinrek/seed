const colors = require('colors');

module.exports = (gulp, plugins, config) => {
    return () => {
        
        config.customMerge.map(function(item, i){                   // loop through configuration array

            if (item.files.length) {
                gulp.src(item.files)                                    // set files
                    .pipe(plugins.plumber())                            // run plumber to handle errors
                    .pipe(plugins.concat(item.outputName))              // create marged file
                    .pipe(gulp.dest(config.buildDir + item.outputDir))  // write output file to disk
                    .on('end', plugins.browserSync.reload);             // reload browsersync on end
            } else {
                console.log(colors.green('No files in custom-merge task.'));
            }
        });

    };
};
