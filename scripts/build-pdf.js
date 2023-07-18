'use strict';

var fs = require('fs');
var path = require('path');
const puppeteer = require('puppeteer');
require('dotenv').config();

const LANGS = ["en", "fa"];

(async () => {
  const options = {
    headless: true,
    args: ['--no-sandbox', '--disable-web-security'],
  }

  if (process.env.DEBUG === "true") {
    options.executablePath = "/usr/bin/google-chrome";
  }

  puppeteer.launch(options).then(async browser => {

    fs.mkdirSync(path.resolve(__dirname + `/../dist/assets/pdf/`), { recursive: true });

    for (const lang of LANGS) {
      const htmlFile = path.resolve(__dirname + `/../dist/index-${lang}.html`);
      const filename = path.resolve(__dirname + `/../dist/assets/pdf/EmadMalekpour-SeniorDeveloper-${lang}.pdf`);

      const htmlUrl = `file://${htmlFile}`;

      const page = await browser.newPage();

      await page.bringToFront();

      await page.goto(htmlUrl, { waitUntil: ['networkidle0', 'networkidle2'] });

      await page.pdf({
        path: filename,
        printBackground: true,
        format: 'a4',
        scale: 0.70,
        displayHeaderFooter: false,
        landscape: false
      });
    }

    browser.close()
  });
})()