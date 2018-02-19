const colors = require('colors');

module.exports = (dest, config) => {
    if (dest) {

        // Check is argument value provided
        if (undefined !== dest.length) {
            let newBuildDir = './' + dest.replace('/', '').replace(/\s/g, '_') + '/';

            // Check is it save to use given path
            config.reservedPaths.map(function (item) {
                if (item.indexOf(newBuildDir) !== -1) {
                    console.log(colors.red('#######'));
                    console.log(colors.red('# You can not change path to'), colors.white(newBuildDir), colors.red(' as it is marked as reserved in config'));
                    console.log(colors.red('#######'));
                    process.exit(1);
                }
            });

            // All good
            console.log(colors.green('#######'));
            console.log(colors.green('# Changing folder from:'), colors.white(config.buildDir), colors.green('to'), colors.white(newBuildDir));
            console.log(colors.green('#######'));
            config.buildDir = newBuildDir;
        } else {
            console.log(colors.red('#######'));
            console.log(colors.red('# Please provide value for --dest ...'));
            console.log(colors.red('#######'));
            process.exit(1);
        }
    }
}
