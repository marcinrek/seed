const path = require("path"),
      glob = require("glob"),
      fs = require('fs'),
      config = JSON.parse(fs.readFileSync('./config.json'));

// Transform relative path to absolute path
const relToAbsPath = (rel) => {
    let abs = rel.map((item) => {
        return path.resolve(item);
    });

    return abs;
}

// Generate list of app entry points
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

console.log(config.extraBabelPlugins);

module.exports = {
    cache: true,
    entry: getEntryPoints(config.webpackEntryFiles),
    output: {
        filename: "[name].bundle.js",
        path: relToAbsPath(['./dist/js']).toString()
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
