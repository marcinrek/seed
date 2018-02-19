const colors = require('colors');

module.exports = (routingEntry, config) => {
    if (routingEntry) {
        console.log(colors.green('#######'));
        config.routingRewrites = config.routingRewrites.map(function(regexString){
            console.log(colors.green('# routingRewrites from:'), colors.white(regexString), colors.green('to:'), colors.white(config.routingEntry));    
            return { from: new RegExp('/'+regexString+'/', ""), to: config.routingEntry}
        });
        console.log(colors.green('#######'));
    } else {
        config.routingRewrites = []
    }
}
