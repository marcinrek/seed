module.exports = (gulp, plugins, config) => {
    return () => {

        // gulp.src([config.buildDir+'*.html'], {read: false})                 // get all output HTML files ...
        //     .pipe(plugins.clean())                                          // ... and remove them

        gulp.src(config.htmlEntryFiles, {base: config.htmlEntryFilesBase})  // get all entry html files
            .pipe(plugins.plumber())                                        // run plumber to handle errors
            .pipe(plugins.nunjucksRender({                                  // render using nunjucks
                path: config.nunjucksPaths,                                 // set nunjucks paths
                data: config.nunjucksData,                                  // set nunjucks data OBJ
                envOptions: config.nunjucksEnvOptions                       // custom settings
            }))
            .pipe(plugins.prettyHtml({                                      // beautify
                indent_size: 2,
                preserve_newlines: true,
                max_preserve_newlines: 1
            }))           
            .pipe(gulp.dest(config.buildDir))                               // write to output
            .on('end', plugins.browserSync.reload);                         // reload browsersync on end
            
    };
};
