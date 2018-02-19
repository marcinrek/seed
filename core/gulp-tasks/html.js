module.exports = (gulp, plugins, config) => {
    return () => {

        gulp.src([config.buildDir+'*.html'], {read: false})         // get all output HTML files ...
            .pipe(plugins.clean())                                  // ... and remove them

        gulp.src(config.htmlEntryFiles)                             // get all entry html files
            .pipe(plugins.plumber())                                // run plumber to handle errors
            .pipe(plugins.nunjucksRender({                          // render using nunjucks
                path: config.nunjucksPaths,                         // set nunjucks paths
                data: config.nunjucksData                           // set nunjucks data OBJ
            }))           
            .pipe(gulp.dest(config.buildDir))                       // write to output
            .on('end', plugins.browserSync.reload);                 // reload browsersync on end
            
    };
};
