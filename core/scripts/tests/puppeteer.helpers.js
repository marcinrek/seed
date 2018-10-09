const colors = require('colors');

/**
 * @description Print custom message to terminal
 * @param {boolean} status True = green ✔, false = red ✖ else nothing
 * @param {string} componentName Yellow component name
 * @param {string} text White text
 * @param {boolean} exit If true then exit
 */
exports.printMsg = (status, componentName, text, exit) => {
    let icon = status === true ? colors.green('✔') : status === false ? colors.red('✖') : '';
    let comp = componentName ? colors.yellow(componentName) + ':' : '';
    let textMsg = text && !status ? colors.red(text) : text ? text : '';
    let doExit = exit ? exit : false;

    console.log(icon, comp, textMsg);

    if (doExit) {
        process.exit(1);
    }
}
