var fs = require('fs');
var request = require('request');
var http = require('http');
var net = require('net');

let scrapeUrl = 'https://www.forexfactory.com/calendar.php?month=jun.2019';
let scrapeFname = 'ff-2019.06.html';

// downloadFile(scrapeUrl, scrapeFname);
downloadAll();

function downloadFile(url: string, fname: string) {
    request(url, function (error, response, html) {
        fs.writeFile('../data/ffhtml/' + fname, html, function (err) {
            if (err)
                console.log(err);
            else {
                console.log(fname + ' has been saved!');
            }
        });
    }); 

}

function downloadAll() {
    var json = JSON.parse(fs.readFileSync('../data/scrapeUrls.json', 'utf8'));
    json.forEach(function (item) {
        request(item.url, function (error, response, html) {
            fs.writeFile('../data/ffhtml/' + item.fname, html, function (err) {
                if (err)
                    console.log(err);
                else {
                    console.log(item.fname + ' has been saved!');
                }
            });
        }); 
    });
 }