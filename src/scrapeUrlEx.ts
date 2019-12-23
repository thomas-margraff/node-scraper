import { ScrapeUrl } from './models/scrapeUrl';
import * as Enumerable from 'node-enumerable';
 
var fs = require('fs');
var moment = require('moment');

export class ScrapeUrlEx {
    public static GetScrapeUrls(): Array<ScrapeUrl> {
        let htmlFile:string = '../data/scrapeUrls.json';
        let arr = Array<ScrapeUrl>();
        
        let z = fs.readFileSync(htmlFile);
        arr = JSON.parse(z);
        return arr;    
    }    

    public static GenerateScrapeUrls(): Array<ScrapeUrl> {
        let start = new Date('jan 2007');
        let urls = Array<ScrapeUrl>();
        const dtNow = new Date();
        var dtBegin = moment(start);
        var dtEnd = moment(new Date());

        let fname = 'ff.';
        for (let x: number = 1; x < 200; x++) {
            const url = 'https://www.forexfactory.com/calendar.php?month=' + dtBegin.format('MMM.YYYY');
            fname = 'ff-' + dtBegin.format('YYYY.MM') + '.html';

            urls.push({
                url: url.toLowerCase(),
                fname: fname
            });

            if (moment(dtBegin).format('YYYY-MM') >= moment(dtEnd).format('YYYY-MM')) {
                break;
            }

            dtBegin.add({ months: 1 }).format('MMM.YYYY');

        }
        console.log('done!!');  
        // var data = JSON.stringify(urls, null, 4);
        // console.log(data);
        return urls;
    }

    public static SaveScrapeUrls(urls) {
        let htmlFile = '../data/scrapeUrls.json';
        console.log(urls);
        fs.writeFile(htmlFile, urls, function (err) {
            if (err) {
                return err; 
            } else {
                return urls;
            }
        });
    }
}