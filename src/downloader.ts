import * as express from "express";
import * as fs from "fs";
import * as request from "request"
import * as moment from "moment"

export class Downloader {
    downloadHtml(url, fname) {
        const destination = fs.createWriteStream(fname);
        request(url)
        .pipe(destination)
        .on("finish", function() {
            console.log("done!");
        })
        .on("error", function(err) {
            console.log(err);
        });
    }    
}