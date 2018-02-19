module.exports = (gulp, plugins, config) => {
    return () => {

        gulp.src([
            config.buildDir,                // get output folder ...
            config.tempDir+'*.*'            // ... and temp files
            ], {read: false})        
            .pipe(plugins.clean())          // ... and remove them

    };
};
