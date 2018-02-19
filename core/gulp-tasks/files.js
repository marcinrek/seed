module.exports = (gulp, plugins, config) => {
    return () => {

        gulp.src(config.filesPath)                                          // copy files on start
            .pipe(plugins.rename({dirname: ''}))                            // remove directories 
            .pipe(gulp.dest(config.buildDir+config.filesOutputDir))           // output directory
            .on('end', plugins.browserSync.reload);                         // reload browsersync on end

    };
};
