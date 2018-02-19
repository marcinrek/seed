module.exports = (gulp, plugins, config) => {
    return () => {

    // Global files
    gulp.src(config.jsGlobalFiles)                  // Get global files
        .pipe(plugins.plumber())                    // run plumber to handle errors
        .pipe(plugins.sourcemaps.init())            // create sourcemap
        .pipe(plugins.concat('global.js'))          // concat to global.js
        .pipe(plugins.babel())                      // babelify
        .pipe(plugins.sourcemaps.write('.'))        // write sourcemap
        .pipe(gulp.dest(config.buildDir+'js'))      // write output file to disk
        .on('end', plugins.browserSync.reload);     // reload browsersync on end
    
    };
};
