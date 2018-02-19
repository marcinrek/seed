module.exports = (gulp, plugins, config) => {
    return () => {

    // Plugins
    gulp.src(config.jsPluginsFiles)                 // first get the plugins
        .pipe(plugins.sourcemaps.init())            // create sourcemap
        .pipe(plugins.concat('plugins.js'))         // concat to plugins.js
        .pipe(plugins.sourcemaps.write('.'))        // write sourcemap
        .pipe(gulp.dest(config.buildDir+'js'));     // write output file to disk

    };
};
