module.exports = (gulp, plugins, config) => {
    return () => {

        gulp.src(config.jsMochaTests, { read: false })
            .pipe(plugins.mocha({
                require: ['babel-register']
            }))
        
    };
};
