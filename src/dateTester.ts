import * as moment from "moment"

console.log('date tester!');
 
let htmlFile:string = '../data/scrapeUrls.json';// 'C:\\dev\\projects\\jsondata\\scrapeUrls1.json';

var moment = require('moment');
var fs = require('fs');
// starts at = https://www.forexfactory.com/calendar.php?month=jan.2007
var start = new Date('jan 2007');
var urls = [];
var dt0 = moment(start); //.format('MMM.YYYY');
var fname = 'ff.';
for (var x = 1; x < 500; x++) {
    var url = 'https://www.forexfactory.com/calendar.php?month=' + dt0.format('MMM.YYYY');
    fname = 'ff-' + dt0.format('YYYY.MM') + '.html';
    if (dt0.get('year') == 2018) {
        if (dt0.get('month') > 6) {
            break;
        }
    }
    urls.push({
        url: url,
        fname: fname
    });
    dt0.add({ months: 1 }).format('MMM.YYYY');
}
console.log('done');
var data = JSON.stringify(urls, null, 4);
console.log(data);
fs.writeFile(htmlFile, data, function (err) {
    if (err)
        console.log(err);
    else
        console.log('The file has been saved!');
});
