const colors = require('colors');

module.exports = (routingEntry, config) => {
    if (routingEntry) {
        console.log(colors.green('#######'));
        console.log(colors.green('# Changing routingEntry from:'), colors.white(config.routingEntry), colors.green('to'), colors.white(routingEntry));
        console.log(colors.green('#######'));
        
        config.routingEntry = routingEntry;
    }
}
