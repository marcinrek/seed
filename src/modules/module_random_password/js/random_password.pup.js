const fs = require('fs');
const colors = require('colors');
const config = JSON.parse(fs.readFileSync('./config.json')).puppeteer;
const puppeteer = require('puppeteer');
const helpers = require('puppeteer.helpers.js');

const component = 'Random password';
const url = 'http://localhost:3000/random_password.html';

try {
    (async () => {

        // Browser settings test
        const browser = await puppeteer.launch(config.browser);
        const page = await browser.newPage();
        const testName = 'settings';

        // Open URL
        await page.goto(url, { timeout: config.timeout, waitUntil: 'load' }).then(() => {
            helpers.printMsg(true, component, 'Open URL');
        }).catch(() => {
            helpers.printMsg(false, component, 'Open URL', true);
        });

        // Test 01: Click generate
        await page.waitForSelector('#generate', { timeout: config.timeout }).then(() => {

            // Click
            page.click('#generate');
            page.click('#generate');
            page.click('#generate');

            helpers.printMsg(true, component, 'Click generate 3 times');

        }).catch(() => {
            helpers.printMsg(false, component, 'Click generate 3 times');
        });

        async function testCount(page) {
            let count = await page.evaluate(() => {
                return document.querySelectorAll('#passwd_list > li').length;
            });
            if (count === 3) {
                helpers.printMsg(true, component, 'Click generate 3 times - count result');
            } else {
                helpers.printMsg(false, component, 'Click generate 3 times - count result - expected "3" got "' + count + '"');
            }
        }

        await page.waitFor(1000);
        testCount(page);

        // Make screenshot if required
        if (config.screenshots) {
            await page.screenshot({
                path: config.screenshotsDir + testName + '.png',
                fullPage: true
            });
        }

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
