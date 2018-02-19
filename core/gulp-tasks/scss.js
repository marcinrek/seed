module.exports = (gulp, plugins, config) => {
    return () => {
        
        let streamArray = [];                                                                                       // stream array

        config.scssFiles.map(function(item, i){                                                                     // loop through configuration array

            streamArray[i] = gulp.src(item.files)                                                                   // set files
                .pipe(plugins.plumber())                                                                            // run plumber to handle errors
                .pipe(plugins.sourcemaps.init())                                                                    // create sourcemap
                .pipe(plugins.concat(item.outputName+'.scss'))                                                      // create marged file
                
                .pipe(plugins['appendPrepend'].prependText(item.prepend !== undefined ? item.prepend : ' '))        // prepend with media query
                .pipe(plugins['appendPrepend'].appendText(item.append !== undefined ? item.append : ' '))           // end media query

        });

        return plugins.streamqueue.obj.apply(null, streamArray)                                                     // run streams in order
        .pipe(plugins.concat('styles.css'))                                                                         // marge parial css to output css
        .pipe(plugins.sass().on('error', plugins.sass.logError))                                                    // build css
        .pipe(plugins.autoprefixer(config.autoprefixer))                                                            // autoprefixer
        .pipe(plugins.replace(new RegExp(config.cssImageOutputDirRegExp, 'g'), config.cssImageOutputDir))           // replace config.cssImageOutputDirRegExp in CSS paths for output dir
        .pipe(plugins.sourcemaps.write('.'))                                                                        // write sourcemap
        .pipe(gulp.dest(config.buildDir+'css/'))                                                                    // write output file to disk
        .on('end', plugins.browserSync.reload);                                                                     // reload browsersync on end

    };
};
