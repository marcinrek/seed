const fs = require('fs');
const colors = require('colors');
const config = JSON.parse(fs.readFileSync('./config.json')).puppeteer;
const puppeteer = require('puppeteer');
const helpers = require('puppeteer.helpers.js');

const component = '{{module_name}}';
const url = 'http://localhost:3000';

try {
    (async () => {

        // Browser settings test
        const browser = await puppeteer.launch(config.browser);
        const page = await browser.newPage();

        /*
         *  TEST PLACEHOLDER
         */

        /* #### END #### */
        await browser.close();

        console.log('--');
        console.log(colors.green('Finished: '), colors.yellow(component));
        console.log('--');


    })();

} catch (err) {
    console.error(colors.red(err));
    process.exit(1);
}
