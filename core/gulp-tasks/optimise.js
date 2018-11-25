module.exports = (gulp, plugins, config) => {
    return () => {

    // Minify css
    gulp.src(config.buildDir+'css/*.css')                                               // Get all output CSS files
            .pipe(plugins.plumber())                                                    // run plumber to handle errors
            .pipe(plugins.size({showFiles: true, pretty: true, title: 'Before:'}))      // Show file size
            .pipe(plugins.cleanCss({compatibility: 'ie8'}))                             // minify
            .pipe(plugins.size({showFiles: true, pretty: true, title: 'After:'}))       // show minified size
            .pipe(gulp.dest(config.buildDir+'css/'))                                    // write minified file

        // Uglify JS
        gulp.src(config.buildDir+'js/*.js')                                             // Get all output JS files
            .pipe(plugins.plumber())                                                    // run plumber to handle errors
            .pipe(plugins.size({showFiles: true, pretty: true, title: 'Before:'}))      // Show file size
            .pipe(plugins.uglifyes())                                                   // minify
            .pipe(plugins.size({showFiles: true, pretty: true, title: 'After:'}))       // show minified size
            .pipe(gulp.dest(config.buildDir+'js'))                                      // write minified file

    };
};
