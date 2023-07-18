'use strict';
const fs = require('fs');
const upath = require('upath');
const pug = require('pug');
const sh = require('shelljs');
const prettier = require('prettier');
var { get, upperFirst } = require('lodash');
const translations = require("../src/assets/translations.json");

const LANGS = ["en", "fa"];

module.exports = function renderPug(filePath) {

    for (const lang of LANGS) {
        const destPath = filePath.replace(/src\/pug\//, 'dist/').replace(/\.pug$/, `-${lang}.html`);
        const srcPath = upath.resolve(upath.dirname(__filename), '../src');

        const html = pug.renderFile(filePath, {
            doctype: 'html',
            filename: filePath,
            basedir: srcPath,
            translations,
            lang,
            dir: lang === "fa" ? "rtl" : "ltr",
            t: function (key) {
                return get(translations, `${lang}.${key}`);
            },
            getName: function(link) {
                return upperFirst(upath.parse(link).name);
            }
        });

        const destPathDirname = upath.dirname(destPath);
        if (!sh.test('-e', destPathDirname)) {
            sh.mkdir('-p', destPathDirname);
        }

        const prettified = prettier.format(html, {
            printWidth: 1000,
            tabWidth: 4,
            singleQuote: true,
            proseWrap: 'preserve',
            endOfLine: 'lf',
            parser: 'html',
            htmlWhitespaceSensitivity: 'ignore'
        });

        fs.writeFileSync(destPath, prettified);
    }

};
