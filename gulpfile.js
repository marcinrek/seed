/*
*   Simple Plate V2
*   Author: info@marcinrek.pl
*   Version: 1.3.0
*   
*
*/

// Init
const gulp = require('gulp'),                                                   // Gulp ...
    argv = require('yargs').argv,                                               // read arguments
    helpers = require('./core/gulp-tasks/_helpers.js'),  
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
helpers.changeDest(argv.dest, config);

// Change routingEntry from / to --routingEntry argument
helpers.changeRoutingEntry(argv.routingEntry, config);

// Build routingRewrites
helpers.buildRoutingRewrites(argv.routingEntry, config);

// Use ["transform-react-jsx",{"pragma": "h"}] for hyperapp
helpers.useHyperapp(argv.useHyperapp, config);

// Optimise after build 
if (argv.optimise) {
    config.optimise = true;
}

/**
 *  Setup webpack
 */
let withWebpack = false;                                                        // set flag
let browserSyncMiddleware = [];                                                 // placeholder for browser sync middleware
let bundler;                                                                    // placeholder for webpack bundler
let webpackConfig = require('./webpack.config.js');                             // read webpack configuration file
webpackConfig.module.rules[0].use.options.plugins = config.extraBabelPlugins;   // add any additional babel plugins

if (helpers.checkGlobFileExists(config.webpackEntryFiles)) {                    // Check should webpack be used
    withWebpack = true;                                                         // if so set flag
    bundler = webpack(webpackConfig);                                           // create webpack instance                            
}

/*
 *  Tasks
 */

// Partial tasks
gulp.task('scss', getTask('scss'));                 // build css from scss files
gulp.task('html', getTask('html'));                 // build html files
gulp.task('imageFolder', getTask('imageFolder'));   // build html files
gulp.task('images', getTask('images'));             // copy css images
gulp.task('files', getTask('files'));               // copy other files
gulp.task('custom-merge', getTask('custom-merge')); // custom files merge
gulp.task('custom-copy', getTask('custom-copy'));   // custom files copy
gulp.task('js-global', getTask('js-global'));       // merge js files
gulp.task('js-plugins', getTask('js-plugins'));     // merge js files
gulp.task('js-modules', getTask('js-modules'));     // merge js files
gulp.task('js-babel', getTask('js-babel'));         // babelify js files
gulp.task('js-test', getTask('js-test'));           // run mocha test
gulp.task('clean', getTask('clean'));               // clean output dir
gulp.task('markdown', getTask('markdown'));         // clean output dir
gulp.task('optimise', getTask('optimise'));         // optimise CSS & JS
gulp.task('webpack', getTask('webpack'));           // webpack

// Default task -- show instructions only
gulp.task('default', ()=>{
    if (showReadme) {
        helpers.readme();
    } else {
        gulp.start('build');
    }
});

// Build task
gulp.task('build', ['scss', 'custom-merge', 'custom-copy', 'js-global', 'js-plugins', 'js-modules', 'js-babel', 'images', 'imageFolder', 'files', 'markdown', 'html', 'js-test'],()=>{
    if (withWebpack) {
        gulp.start('webpack');
    } else if (config.optimise && !withWebpack) {
        gulp.start('optimise');
    }
});

// Serve
gulp.task('serve', ['scss', 'custom-merge', 'custom-copy', 'js-global', 'js-plugins', 'js-modules', 'js-babel', 'images', 'imageFolder', 'files', 'markdown', 'html', 'js-test'], ()=>{

    // Run browser-sync
    if (withWebpack) {
        
        // used in webpack-dev-server middleware for browser-sync   
        browserSyncMiddleware = [
            historyApiFallback({
                index: config.routingEntry,
                rewrites: config.routingRewrites,
                verbose: config.routingDebug
            }),
            webpackDevMiddleware(bundler, {
                path: config.buildDir + 'js',
                publicPath: '/js',
                stats: { colors: true }
            }),
            webpackHotMiddleware(bundler)
        ] 
    }
    
    // Fire browserSync
    plugins.browserSync({
        server: {
            baseDir: config.buildDir,
            middleware: browserSyncMiddleware
        },
        reloadDebounce: config.browserSyncDebounceTime
    });

    // On webpack done reload browserSync
    if (withWebpack) {
        bundler.plugin('done', () => {
            plugins.browserSync.reload();
        });
    }

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

    // Process *.babel.js
    watch(config.jsBabelGate, () => {
        gulp.start('js-babel');
    });

    // Build HTML
    watch(config.htmlWatchPath, () => {
        gulp.start('html');
    });

    // CSS images
    watch(config.cssImagePath, () => {
        gulp.start('images');
    });

    // Images folder
    watch(config.imagePath, () => {
        gulp.start('imageFolder');
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
    
    // Custom copy
    watch([].concat.apply([], config.customCopy.map((item) => item.files)), () => {
        gulp.start('custom-copy');
    });    

    // Custom merge
    watch([].concat.apply([], config.customMerge.map((item) => item.files)), () => {
        gulp.start('custom-merge');
    });  
});
