import * as express from "express";
import * as fs from "fs";
import * as request from "request"
import * as moment from "moment"
import {Downloader} from './downloader'
import {ParseData} from './parser'

const app = express(); 
const port = 8000;

const dd = new Downloader();

// comment for now
let baseFname = 'ff-2019.11';
const url = "https://www.forexfactory.com/calendar.php?month="+baseFname;
const fname = './src/downloads/' + baseFname + '.html';
dd.downloadHtml(url, fname)

// baseFname = 'jul.2018';

const pd = new ParseData();
const file = './src/downloads/' + baseFname + '.html';
let html = fs.readFileSync(file, 'utf8');
const data = pd.parseHtml(html);
let recs: string = JSON.stringify(data,null,2);
console.log(recs); 

fs.writeFile('../data/' + baseFname + '.json', JSON.stringify(data,null,2), 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 


app.listen(port);
console.log("listening on port 8000");
