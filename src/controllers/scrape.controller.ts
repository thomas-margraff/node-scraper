/* app/controllers/welcome.controller.ts */

import * as bodyParser from 'body-parser';
import * as parser from '../parseUtility';
import * as request from 'request';
import * as moment from 'moment';

// Import only what we need from express
import {Response, Request, Router } from 'express'; 

// Assign router to the express.Router() instance
const router: Router = Router();

// scrape this week
router.get('/', (req: Request, res: Response) => {
    const url = 'https://www.forexfactory.com/calendar.php';
    const yyyy = moment().format('YYYY');

    doScrape(res, url, yyyy);

});

// scrape day
router.get('/day/:period', (req: Request, res: Response) => {
    const period = req.params.period;
    const url = 'https://www.forexfactory.com/calendar.php?day=' + period;
    let yyyy = getYear(period);

    doScrape(res, url, yyyy);

});

// scrape week
router.get('/week/:period', (req: Request, res: Response) => {
    const period = req.params.period;
    const url = 'https://www.forexfactory.com/calendar.php?week=' + period;
    
    let yyyy = getYear(period);
    doScrape(res, url, yyyy);

});

// scrape month
router.get('/month/:period', (req: Request, res: Response) => {
    const period = req.params.period;
    const url = 'https://www.forexfactory.com/calendar.php?month=' + period;
    let yyyy = getYear(period);

    doScrape(res, url, yyyy);

});

// utils
function getYear(period: string) {
    let temp = period.split('.');
    if (temp.length === 1) {
        return moment().format('YYYY');
    } else {
        return temp[1];
    }
}

function doScrape(res: Response, url: string, yyyy: string) {
    
    request(url, (error: any, response: any, html: string) => {
        const scrapeData = parser.parseHtml(html, yyyy);
        res.send(scrapeData);
    });
}


// Export the express.Router() instance to be used by server.ts
export const ScrapeController: Router = router;