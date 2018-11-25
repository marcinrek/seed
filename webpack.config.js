const path = require("path"),
      glob = require("glob"),
      fs = require('fs'),
      config = JSON.parse(fs.readFileSync('./config.json'));

/**
 * @description Transform relative path to absolute path
 * @param {array} rel Relative path array
 * @returns {array} Absolute path array
 */
const relToAbsPath = (rel) => {
    let abs = rel.map((item) => {
        return path.resolve(item);
    });

    return abs;
}

/**
 * @description Generate list of app entry points
 * @param {array} appPath Array og glob used for creating entry points
 * @returns {object} Entries list object
 */
const getEntryPoints = (appPath) => {
    let entries = {},
        path = appPath;
    
    path.map((item) => {
        glob.sync(item).map((path) => {
            let name = path.replace(/^.*[\\\/]/, '').replace(/\.app\.js/g, '').replace(/\./g,'_'),
                absPath = relToAbsPath([path]);

            entries[name] = absPath;
        });
    });

    return entries;
}

/**
 * Export config
 */
module.exports = {
    cache: true,
    entry: getEntryPoints(config.webpackEntryFiles),
    output: {
        devtoolLineToLine: true,
        filename: "[name].bundle.js", 
        sourceMapFilename: "[name].bundle.js.map",
        path: relToAbsPath([config.buildDir+'js']).toString(),
        pathinfo: true
    },
    devtool: 'source-map',

    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            path.resolve('./src/js'),
            path.resolve('./src/modules'),
            path.resolve('./node_modules')
        ].concat(relToAbsPath(glob.sync(config.webpackResolveDest)))
    },

    module: {
        rules: [
            {
                test: /\.js(x)?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: config.extraBabelPlugins
                    }
                },
                exclude: /node_modules/,
            }
        ]
    }
};
