const puppeteer = require('puppeteer');
const express = require('express');
const app = express();

const PORT = 8090;
const HOST = '0.0.0.0';
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

app.get('/', (req, res) => {
    res.send('Hello world\n');
});

app.get('/crawl', async (req, res) => {
    var result = await crawl(req.query.url);
    res.send(result);
});

async function crawl(url) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    //设置图片拦截器
    await page.setRequestInterception(true);
    page.on('request', request => {
        if (request.resourceType === 'image')
            request.abort();
        else
            request.continue();
    });

    await page.goto(url, { waitUntil: "domcontentloaded" });

    var content = await page.content();
    console.log(content);

    await page.waitFor(2 * 1000);

    await browser.close();
    return content;
}