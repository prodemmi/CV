'use strict';

var fs = require('fs');
var path = require('path');
const puppeteer = require('puppeteer');
require('dotenv').config();

(async () => {
  const htmlFile = path.resolve(__dirname + '/../dist/index.html');
  const filename = path.resolve(__dirname + '/../dist/assets/pdf/EmadMalekpour-SeniorDeveloper_EN.pdf');
  fs.mkdirSync(path.dirname(filename), { recursive: true });

  const options = {
    headless: true,
    args: ['--disable-features=IsolateOrigins',
      '--disable-site-isolation-trials',
      '--autoplay-policy=user-gesture-required',
      '--disable-background-networking',
      '--disable-background-timer-throttling',
      '--disable-backgrounding-occluded-windows',
      '--disable-breakpad',
      '--disable-client-side-phishing-detection',
      '--disable-component-update',
      '--disable-default-apps',
      '--disable-dev-shm-usage',
      '--disable-domain-reliability',
      '--disable-extensions',
      '--disable-features=AudioServiceOutOfProcess',
      '--disable-hang-monitor',
      '--disable-ipc-flooding-protection',
      '--disable-notifications',
      '--disable-offer-store-unmasked-wallet-cards',
      '--disable-popup-blocking',
      '--disable-print-preview',
      '--disable-prompt-on-repost',
      '--disable-renderer-backgrounding',
      '--disable-setuid-sandbox',
      '--disable-speech-api',
      '--disable-sync',
      '--hide-scrollbars',
      '--ignore-gpu-blacklist',
      '--metrics-recording-only',
      '--mute-audio',
      '--no-default-browser-check',
      '--no-first-run',
      '--no-pings',
      '--no-sandbox',
      '--no-zygote',
      '--password-store=basic',
      '--use-gl=swiftshader',
      '--use-mock-keychain']
  }

  if (process.env.DEBUG === "true"){
    options.executablePath = "/usr/bin/google-chrome";
  }

  const browser = await puppeteer.launch(options)

  const page = await browser.newPage();

  await page.goto(`file://${htmlFile}`, { waitUntil: 'networkidle0' });

  await page.emulateMediaType('print');

  await page.pdf({
    path: filename,
    printBackground: true,
    format: 'tabloid',
    scale: 0.8,
    displayHeaderFooter: false,
    landscape: true,
    preferCSSPageSize: true
  });

  await browser.close();
})()