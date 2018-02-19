module.exports = (gulp, plugins, config, webpackConfig) => {
    return () => {
        
        gulp.src(config.webpackEntryFiles)                  // Get app file
            .pipe(plugins.webpackStream(webpackConfig))     // run webpack
            .pipe(gulp.dest(config.buildDir+'js'))          // write output file to disk
            .on('end', function() { 
                if (config.optimise) {
                    gulp.start('optimise');                 // after webpack finishes run optimise
                }
            })
            
    };
};
