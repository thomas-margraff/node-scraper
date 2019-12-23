import * as fs from 'fs';
import * as path from 'path';
import * as moment from 'moment';
//import * as tz from 'moment-timezone';
import 'moment-timezone'
import * as cheerio from 'cheerio';

function parseYearFromFilename(filename: string) {
    const ff = path.parse(filename).base;
    const dd = ff.replace('ff-', '').replace('.html', '');
    const yyyy = +dd.substring(0, 4);
    return yyyy;
}

function parseFile(file: string){
    const yyyy = this.parseYearFromFilename(file);

    const html = fs.readFileSync(file); 
    const scrapeData=this.parseHtml(html, yyyy);

    return scrapeData;
}

function parseHtml(html: string, yyyy: any) {
    const $ = cheerio.load(html);
    const h = $.html();

    let period = $('.highlight').filter('.light').text();
    period = period.replace('This Week: ', '');
    const scrapeData = {
        period: period,
        calendarData: []
    };

    let prevDate = '';
    let prevTime = '';
    let title = '';
    let impact = '';

    $('.calendar__row').filter(function() {
        const children = $(this).children();

        if($(children).length > 2) {
            let isAllDay = false;
            // release date fixup
            $(children[0]).text($(children[0]).text().trim());

            if ($(children[0]).text().trim() !== '') {
                prevDate = $(children[0]).text().trim();
            } else {
                $(children[0]).text(prevDate);
            }

            if ($(children[1]).text().trim() !== '') {
                prevTime = $(children[1]).text();
            } else {
                $(children[1]).text(prevTime);
            }

            $('.calendar__impact-icon--screen').filter( function() {
                impact = $(this).find('span').first().attr('title');
            });

            $('.calendar__event-title').filter(function() {
                title = $(this).find('span').first().attr('title');
            });
            const eventId = $(this).data('eventid');

            const origDate = $(children[0]).text().substring(3);
            const origTime = $(children[1]).text().replace('am', ' AM').replace('pm', ' PM').trim();

            let dt = moment(new Date(yyyy + origDate + ' ' + origTime));

            if (!dt.isValid()) {
                dt = moment(new Date(yyyy + origDate));
                if (origTime === 'All Day') {
                    isAllDay = true;
                }
            }
            
            if (dt.isDST()) {
                dt.add(1, 'hour');
            }
            // let dtt = dt.clone().tz('America/New_York');
            // let utc = dt.utc();
            let rt = dt.format('h:mm A');
            if (isAllDay) {
                rt = origTime;
            } 

            if (eventId) {
                scrapeData.calendarData.push({
                    eventid: eventId,
                    releaseDateTime: dt.format(),
                    releaseDate: origDate.trim() + ', ' + yyyy,
                    // releaseTime: origTime.trim(), 
                    releaseTime: rt, // dt.format('h:mm A'),
                    currency: $(children[2]).text().replace('\n','').replace('\n',''),
                    impact: impact,
                    indicator: $(children[4]).text().trim(),
                    actual: $(children[6]).text(),
                    forecast: $(children[7]).text(),
                    previous: $(children[8]).text(),
                });
            }
        }
    });
    return scrapeData;
}

module.exports = { parseYearFromFilename, parseFile, parseHtml };
