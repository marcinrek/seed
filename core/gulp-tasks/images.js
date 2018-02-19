module.exports = (gulp, plugins, config) => {
    return () => {

        gulp.src(config.cssImagePath)                         						// copy files on start
            .pipe(plugins.rename({dirname: ''}))                            		// remove directories 
            .pipe(gulp.dest(config.buildDir+'css/'+config.cssImageOutputDir+'/'))   // output directory
            .on('end', plugins.browserSync.reload);                         		// reload browsersync on end

    };
};
