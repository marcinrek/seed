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
                .pipe(plugins.imagemin([                                                        // image minify
                    plugins.imagemin.gifsicle(config.imageMinify.gif),
                    plugins.imagemin.mozjpeg(config.imageMinify.jpg),
                    plugins.imagemin.optipng(config.imageMinify.png)
                ], {
                    verbose: config.imageMinify.verbose
                }))                                                       
                .pipe(gulp.dest(config.buildDir+config.imagePathOutputDir))                     // output directory
                .on('end', imageResizeDone);                                                    // reload browsersync on end
        });
    };
};
