/*
*   Simple Plate V2
*   Author: info@marcinrek.pl
*   Version: 1.0.0
*   
*
*/

// Init
const gulp = require('gulp'),                                                   // Gulp ...
    argv = require('yargs').argv,                                               // read arguments
    readme = require('./core/helpers/readme.js'),                               // get readme
    changeDest = require('./core/helpers/changeDest.js'),                       // change dist folder from config.json
    changeRoutingEntry = require('./core/helpers/changeRoutingEntry.js'),       // change routingEntry from config.json
    buildRoutingRewrites = require('./core/helpers/buildRoutingRewrites.js'),   // Build routingRewrites
    useHyperapp = require('./core/helpers/useHyperapp.js'),                     // Use ["transform-react-jsx",{"pragma": "h"}] for hyperapp
    watch = require('gulp-watch'),                                              // gulp.watch replacement
    fs = require('fs'),                                                         // File system access
    webpack = require('webpack'),                                               // webpack used in build
    webpackDevMiddleware = require('webpack-dev-middleware'),                   // browser-sync middleware
    webpackHotMiddleware = require('webpack-hot-middleware'),                   // browser-sync middleware
    historyApiFallback = require('connect-history-api-fallback'),               // browser-sync middleware
    plugins = require('gulp-load-plugins')({                                    // lazy-load plugins
        //DEBUG: true,                                                          // uncomment to enable debug - will show a list of loaded modules
        pattern: [                                                              // plugins to load name patterns
            'gulp-*',                                  
            'gulp.*', 
            '@*/gulp{-,.}*',
            'streamqueue',                                                      // required by scss task
            'browser-sync',                                                     // required by serve task
            'webpack-stream',                                                   // webpack
            'colors'                                                            // colors in console logs
        ]
    });

let config = JSON.parse(fs.readFileSync('./config.json'));                      // read configuration file

// Helpers
const getTask = (task) => {
    return require('./core/gulp-tasks/' + task)(gulp, plugins, config, webpackConfig);
}

/*
 *  Process arguments
 */

// Show readme when --readme
let showReadme = argv.readme ? true : false;

// Change dest from ./dist/ to --dist argument
changeDest(argv.dest, config);

// Change routingEntry from / to --routingEntry argument
changeRoutingEntry(argv.routingEntry, config);

// Build routingRewrites
buildRoutingRewrites(argv.routingEntry, config);

// Use ["transform-react-jsx",{"pragma": "h"}] for hyperapp
useHyperapp(argv.useHyperapp, config);

// Optimise after build 
if (argv.optimise) {
    config.optimise = true;
}

// Setup webpack config
let webpackConfig = require('./webpack.config.js');                             // read webpack configuration file
webpackConfig.module.rules[0].use.options.plugins = config.extraBabelPlugins;   // add any additional babel plugins
const bundler = webpack(webpackConfig);                                         // used in webpack-dev-server middleware for browser-sync

/*
 *  Tasks
 */

// Partial tasks
gulp.task('scss', getTask('scss'));                 // build css from scss files
gulp.task('html', getTask('html'));                 // build html files
gulp.task('images', getTask('images'));             // copy css images
gulp.task('files', getTask('files'));               // copy other files
gulp.task('custom-merge', getTask('custom-merge')); // custom files merge
gulp.task('custom-copy', getTask('custom-copy'));   // custom files copy
gulp.task('js-global', getTask('js-global'));       // merge js files
gulp.task('js-plugins', getTask('js-plugins'));     // merge js files
gulp.task('js-modules', getTask('js-modules'));     // merge js files
gulp.task('js-test', getTask('js-test'));           // run mocha test
gulp.task('clean', getTask('clean'));               // clean output dir
gulp.task('markdown', getTask('markdown'));         // clean output dir
gulp.task('optimise', getTask('optimise'));         // optimise CSS & JS
gulp.task('webpack', getTask('webpack'));           // webpack

// Default task -- show instructions only
gulp.task('default', function () {
    if (showReadme) {
        readme();
    } else {
        gulp.start('build');
    }
});

// Build task
gulp.task('build', ['scss', 'custom-merge', 'custom-copy', 'js-global', 'js-plugins', 'js-modules', 'html', 'images', 'files', 'markdown', 'js-test', 'webpack']);

// Serve
gulp.task('serve', ['scss', 'custom-merge', 'custom-copy', 'js-global', 'js-plugins', 'js-modules', 'html', 'images', 'files', 'markdown', 'js-test'], function() {

    // Run browser-sync
    plugins.browserSync({
        server: {
            baseDir: config.buildDir,
            middleware: [
                historyApiFallback({
                    index: config.routingEntry,
                    rewrites: config.routingRewrites,
                    verbose: config.routingDebug
                }),
                webpackDevMiddleware(bundler, {
                    path: './dist/js',
                    publicPath: '/js',
                    stats: { colors: true }
                }),
                webpackHotMiddleware(bundler)
            ]
        },
        reloadDebounce: config.browserSyncDebounceTime
    });

    // On webpack done reload browserSync
    bundler.plugin('done', () => {
        plugins.browserSync.reload();
    });

    // Build CSS from Scss
    watch(config.scssWatchPath, () => {
        gulp.start('scss');
    });

    // Build global.js
    watch(config.jsGlobalFiles, () => {
        gulp.start('js-global');
    });

    // Build plugins.js
    watch(config.jsPluginsFiles, () => {
        gulp.start('js-plugins');
    });

    // Copy *.mod.js
    watch(config.jsModulesFiles, () => {
        gulp.start('js-modules');
    });

    // Build HTML
    watch(config.htmlWatchPath, () => {
        gulp.start('html');
    });

    // CSS images
    watch(config.cssImagePath, () => {
        gulp.start('images');
    });
 
    // Markdown docs
    watch([config.projectMarkdownFile, config.markdownFiles], () => {
        gulp.start('markdown');
    });

    // Other files
    watch(config.filesPath, () => {
        gulp.start('files');
    }); 

    // Mocha tests
    watch(config.jsMochaWatch, () => {
        gulp.start('js-test');
    }); 
});
