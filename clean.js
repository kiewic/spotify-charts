'use strict';

const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.');
let filesWithErrors = 0;
let filesWithoutErrors = 0;
for (const fileName of files) {
    const fullFileName = path.join('.', fileName);
    if (fileName.match(/.csv$/)) {
        const content = fs.readFileSync(fullFileName, { encoding: 'utf8' });
        const hasError = content.substring(0, 50).match(/doctype html/);
        if (hasError) {
            fs.renameSync(fullFileName, path.join('./missing/', fileName));
            filesWithErrors++;
        }
        else {
            fs.renameSync(fullFileName, path.join('./regional/', fileName));
            filesWithoutErrors++;
        }
    }
}
console.log('filesWithErrors', filesWithErrors);
console.log('filesWithoutErrors', filesWithoutErrors);
