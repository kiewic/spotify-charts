# Spotify Charts Data Downloader

This is a set of node.js scripts to automatically download all the [Spotify Charts](https://spotifycharts.com/) data.

First, use the following script to download all the data:

```
node download.js
```

Some dates will not have data available, so, run the following script to separate files with valid data from missing-data files:

```
mkdir missing
mkdir regional
node clean.js
```

Use the following script to merge all the downloaded data into a single file:

```
node merge.js
```

At the end, all the data will be written into `spotify-charts.csv`
