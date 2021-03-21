module.exports = (gulp, plugins, config) => {
    
    let count = config.imageResizeConfig.length;
    const imageResizeDone = () => {
        count-=1;
        if (count == 0) {
            plugins.browserSync.reload();
        }
    };
    
    return () => {  
        config.imageResizeConfig.forEach((item)=>{
            gulp.src(config.imagePath)                                                          // copy files on start
                .pipe(plugins.rename({dirname: ''}))                                            // remove directories 
                .pipe(plugins.rename(function (path) { path.basename += `${item.variaty}`; }))  // add variaty name
                .pipe(plugins.imageResize(item.settings))                                       // create variaty
                .pipe(gulp.dest(config.buildDir+config.imagePathOutputDir))                     // output directory
                .on('end', imageResizeDone);                                                    // reload browsersync on end
        });
    };
};
