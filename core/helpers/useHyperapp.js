const colors = require('colors');

module.exports = (useHyperapp, config) => {
    if (useHyperapp) {
        console.log(colors.green('#######'));
        console.log(colors.green('# Using hyperapp! Adding: '), colors.white(JSON.stringify(config.hyperappBabelPlugin)), colors.green('to'), colors.white('babel plugins'));
        console.log(colors.green('#######'));

        config.extraBabelPlugins.push(config.hyperappBabelPlugin);
    }
}
