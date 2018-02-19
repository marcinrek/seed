module.exports = (gulp, plugins, config) => {
    return () => {

        // Build HTML docs
        gulp.src(config.markdownFiles)                                  // get all markdown files
            .pipe(plugins.plumber())                                    // run plumber to handle errors
            .pipe(plugins.concat('README.md'))                          // ... concat them
            .pipe(plugins.markdown())                                   // transform to HTML
            .pipe(gulp.dest(config.tempDir))                            // ... write to temp
            .on('end', function(){                                      // after this is done:

                gulp.src(config.htmlMainFile)                           // get index file
                    .pipe(plugins.nunjucksRender({                      // render using nunjucks
                        path: config.nunjucksPaths,                     // set nunjucks paths
                        data: config.nunjucksData                       // set nunjucks data OBJ
                    }))
                    .pipe(gulp.dest(config.buildDir))                   // write index file
                    .on('end', plugins.browserSync.reload);             // reload browsersync on end

            });

        // Build README.md
        gulp.src([config.projectMarkdownFile, config.markdownFiles])    // get main project md and modules md
            .pipe(plugins.plumber())                                    // run plumber to handle errors
            .pipe(plugins.concat('README.md'))                          // ... concat them
            .pipe(gulp.dest('./'));

    };
};
