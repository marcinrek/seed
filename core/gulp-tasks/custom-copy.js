const colors = require('colors');

module.exports = (gulp, plugins, config) => {
    return () => {

    config.customCopy.map(function (item, i) {                                  // loop through configuration array

            if (item.files.length) {
                gulp.src(item.files)                                            // copy files on start
                    .pipe(plugins.rename({dirname: ''}))                        // remove directories 
                    .pipe(gulp.dest(config.buildDir + item.outputDir))          // output directory
                    .on('end', plugins.browserSync.reload);                     // reload browsersync on end
            } else {
                console.log(colors.green('No files in custom-copy task.'));
            }

        });

    };
};
