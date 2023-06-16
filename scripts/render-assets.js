'use strict';
const upath = require('upath');
const sh = require('shelljs');

module.exports = function renderAssets() {
    const sourcePath = upath.resolve(upath.dirname(__filename), '../src/assets');
    const destPath = upath.resolve(upath.dirname(__filename), '../dist/.');
    
    const indexPath = upath.resolve(upath.dirname(__filename), '../src/index.html');
    const indexDestPath = upath.resolve(upath.dirname(__filename), '../dist/.');

    sh.cp('-R', sourcePath, destPath)
    sh.cp('-R', indexPath, indexDestPath)
};