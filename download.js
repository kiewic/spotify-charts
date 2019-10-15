'use strict';

const https = require('https');
const fs = require('fs');

function getDay(date) {
    return `00${date.getUTCDate()}`.slice(-2);
}

function getMonth(date) {
    return `00${date.getUTCMonth() + 1}`.slice(-2);
}

function getStart(end) {
    const start = new Date(end.valueOf());
    start.setDate(end.getDate() - 7);
    return start;
}

/** Example: "https://spotifycharts.com/regional/mx/weekly/2019-09-20--2019-09-27/download" */
function getDateParts(country, end) {
    const start = getStart(end);
    const dateRange = `${start.getUTCFullYear()}-${getMonth(start)}-${getDay(start)}--${end.getUTCFullYear()}-${getMonth(end)}-${getDay(end)}`;
    return {
        start: start,
        path: `/regional/${country}/weekly/${dateRange}/download`,
        fileName: `regional-${country}-weekly-${dateRange}.csv`,
    };
}

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

const allOptions = [];
for (const country in countries) {
    let end = new Date(Date.UTC(2019, 10 - 1, 11, 12, 0, 0));
    while (end.getUTCFullYear() > 2018) {
        const options = getDateParts(country, end);
        allOptions.push(options);
        end = options.start;
    }
}

function query() {
    if (allOptions.length > 0) {
        const options = allOptions.pop();
        const file = fs.createWriteStream(options.fileName);
        file.on('close', () => {
            // console.log('done!');
            query();
        })

        const request = https.get({
            host: 'spotifycharts.com',
            path: options.path,
            port: 443,
            headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36' },
        }, function(response) {
            console.log(`${response.statusCode} ${response.statusMessage}: ${request.path}`);
            response.pipe(file);
        });
    }
}

query();
