const parser = require('./parseUtility');
// const fs =  require('fs');
// const path = require('path');

import * as fs from "fs";
import * as path from "path";

const jsonFolder = '../data/jsondata/';
const htmlFile = 'ff-2019.06.html';
const htmlFolder = '../data/ffhtml/';

//parseHtmlFile(htmlFolder, htmlFile, jsonFolder);

parseAllHtmlFiles(htmlFolder);

// test
function parseHtmlFile(htmlfolder: string, htmlFile: string, jsonFolder: string) {
    console.log('start');
    const pFile = htmlfolder + htmlFile;
    const p = parser;
    const scrapeData = p.parseFile(pFile);
    // console.log(scrapeData);

    const jfile =  jsonFolder + htmlFile.replace('.html', '.json');
    console.log(jfile);

    fs.writeFileSync(jfile, JSON.stringify(scrapeData, null, 2), (err) => {
        if (err) {
            console.log('ERROR ' + err);
        } else {
            console.log(jfile + ' has been saved!');
        }
    });
}

function parseAllHtmlFiles(htmlfolder){
    console.log('parse all');
    // jan 5, 2007 - nfp
    fs.readdir(htmlfolder, (err, files) =>  {
        // let data = parseFile(files[0]);
        files.forEach(file => {
            let data = parser.parseFile(path.join(htmlfolder,file));
            let jfile=file.replace('.html', '.json');
            console.log(jfile);
            try {
                fs.writeFileSync('../data/jsondata/' + jfile, JSON.stringify(data, null, 2), (err) => {
                    if (err) 
                        console.log(err);
                    else 
                        console.log(jfile +' has been saved!');
                });
            }
            catch(e){
                console.log('error: ' + e);
            }
        });
    });
} 