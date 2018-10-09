const fs = require('fs');
const colors = require('colors');
const config = JSON.parse(fs.readFileSync('./config.json')).puppeteer;
const puppeteer = require('puppeteer');
const helpers = require('puppeteer.helpers.js');

const component = 'Generic test';
const url = 'http://localhost:3000';

try {
    (async () => {
        
        // Browser settings test
        const browser = await puppeteer.launch(config.browser);
        const page = await browser.newPage();
        const testName = 'settings';

        // Test viewport
        await page.setViewport(config.viewport).then(() => {
            helpers.printMsg(true, component, 'Viewport settings');
        }).catch(() => {
            helpers.printMsg(false, component, 'Viewport settings', true);
        });

        // Test url
        await page.goto(url, { timeout: config.timeout, waitUntil: 'load' }).then(() => {
            helpers.printMsg(true, component, 'Open URL');
        }).catch(() => {
            helpers.printMsg(false, component, 'Open URL', true);
        });

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
