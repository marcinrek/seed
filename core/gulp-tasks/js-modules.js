module.exports = (gulp, plugins, config) => {
    return () => {

    // Global files
    gulp.src(config.jsModulesFiles)                 // get modules files
        .pipe(plugins.plumber())                    // run plumber to handle errors
        .pipe(plugins.rename({dirname: ''}))        // remove directories
        .pipe(gulp.dest(config.buildDir+'js'))      // write output file to disk
        .on('end', plugins.browserSync.reload);     // reload browsersync on end
    
    };
};
