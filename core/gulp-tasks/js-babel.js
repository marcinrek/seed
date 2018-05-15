module.exports = (gulp, plugins, config) => {
    return () => {

    // Global files
    gulp.src(config.jsBabelGate)                    // Get global files
        .pipe(plugins.plumber())                    // run plumber to handle error
        .pipe(plugins.rename({dirname: ''}))        // remove directories
        .pipe(plugins.babel())                      // babelify
        .pipe(gulp.dest(config.buildDir+'js'))      // write output file to disk
        .on('end', plugins.browserSync.reload);     // reload browsersync on end
        
    };
};
