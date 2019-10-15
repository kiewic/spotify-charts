'use strict';

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const countries = {
    'us': 'United States',
    'gb': 'United Kingdom',
    'ad': 'Andorra',
    'ar': 'Argentina',
    'at': 'Austria',
    'au': 'Australia',
    'be': 'Belgium',
    'bg': 'Bulgaria',
    'bo': 'Bolivia',
    'br': 'Brazil',
    'ca': 'Canada',
    'ch': 'Switzerland',
    'cl': 'Chile',
    'co': 'Colombia',
    'cr': 'Costa Rica',
    'cy': 'Cyprus',
    'cz': 'Czech Republic',
    'de': 'Germany',
    'dk': 'Denmark',
    'do': 'Dominican Republic',
    'ec': 'Ecuador',
    'ee': 'Estonia',
    'es': 'Spain',
    'fi': 'Finland',
    'fr': 'France',
    'gr': 'Greece',
    'gt': 'Guatemala',
    'hk': 'Hong Kong',
    'hn': 'Honduras',
    'hu': 'Hungary',
    'id': 'Indonesia',
    'ie': 'Ireland',
    'il': 'Israel',
    'in': 'India',
    'is': 'Iceland',
    'it': 'Italy',
    'jp': 'Japan',
    'lt': 'Lithuania',
    'lu': 'Luxembourg',
    'lv': 'Latvia',
    'mc': 'Monaco',
    'mt': 'Malta',
    'mx': 'Mexico',
    'my': 'Malaysia',
    'ni': 'Nicaragua',
    'nl': 'Netherlands',
    'no': 'Norway',
    'nz': 'New Zealand',
    'pa': 'Panama',
    'pe': 'Peru',
    'ph': 'Philippines',
    'pl': 'Poland',
    'pt': 'Portugal',
    'py': 'Paraguay',
    'ro': 'Romania',
    'se': 'Sweden',
    'sg': 'Singapore',
    'sk': 'Slovakia',
    'sv': 'El Salvador',
    'th': 'Thailand',
    'tr': 'Turkey',
    'tw': 'Taiwan',
    'uy': 'Uruguay',
    'vn': 'Vietnam',
    'za': 'South Africa',
};

const dirName = './regional';
const outputFileName = './spotify-charts.csv';
const headersLine = `Country,Week,Position,"Track Name",Artist,Streams,URL\n`;
const files = fs.readdirSync(dirName);
let countryCount = {};
fs.appendFileSync(outputFileName, headersLine, { encoding: 'utf8' });

for (const fileName of files) {
    const fullFileName = path.join(dirName, fileName);
    let matches = fileName.match(/regional-(\w+)-weekly-\d+-\d+-\d+--(\d+-\d+-\d+).csv$/)
    if (matches) {
        const country = matches[1];
        const end = matches[2];

        if (!countryCount[country]) {
            countryCount[country] = 1;
        }
        else {
            countryCount[country]++;
        }

        // Read line by line.
        let lineReader = require('readline').createInterface({
            input: require('fs').createReadStream(fullFileName),
        });

        // Append suffix
        lineReader.on('line', function (line) {
            if (line.match(/^,,,/)) {
                // Skip first line
                return;
            }

            if (line.match(/^Position,/)) {
                // Skip second line
                return;
            }

            line = `"${countries[country]}","${end}",${line}\n`
            // console.log('Line from file:', line);

            // Append to output file
            fs.appendFileSync(outputFileName, line, { encoding: 'utf8' });
        });
    }
}
console.log(countryCount);
