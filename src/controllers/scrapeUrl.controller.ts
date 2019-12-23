/* app/controllers/welcome.controller.ts */

// Import only what we need from express
import { Router, Request, Response } from 'express';
import { ScrapeUrl } from './../models/scrapeUrl';
import { ScrapeUrlEx } from './../scrapeUrlEx';
const fs =  require('fs');
// const Enumerable = require('node-enumerable');
import * as Enumerable from 'node-enumerable'; 

// Assign router to the express.Router() instance
const router: Router = Router();
 
// base url is: http://localhost:3000/api/scrapeurl

router.get('/', (req: Request, res: Response) => {
    res.send('scrape urls home');
});

// get urls from local json file
router.get('/list', (req: Request, res: Response) => {
    res.send(ScrapeUrlEx.GetScrapeUrls());
});

// generate the urls in memory
router.get('/generate', (req: Request, res: Response) => {
    const urls = ScrapeUrlEx.GenerateScrapeUrls();
    res.send(urls);
});

// generate and save urls to disk in json file
router.get('/create', (req: Request, res: Response) => {
    // Reply with a hello world when no name param is provided
    const urls = ScrapeUrlEx.GenerateScrapeUrls();
    ScrapeUrlEx.SaveScrapeUrls(JSON.stringify(urls, null, 2));
    res.send(urls);
});

router.get('/update', (req: Request, res: Response) => {
    // Reply with a hello world when no name param is provided
    res.send('scrapeurl update');
});

// update
router.get('/update/:from', (req: Request, res: Response) => {
    res.send('scrapeurl update from');
});

// delete
router.get('/delete', (req: Request, res: Response) => {
    // Reply with a hello world when no name param is provided
    res.send('scrapeurl delete');
});

// get url for a specific mmm.yyyy
router.get('/:mmmyyyy', (req: Request, res: Response) => {
        // Extract the name from the request parameters
    let { mmmyyyy } = req.params;
    let x: string = mmmyyyy;
    let arr = Array<ScrapeUrl>();
    arr = ScrapeUrlEx.GetScrapeUrls();
    let rec: ScrapeUrl = Enumerable
        .from(arr)
        .where(r => r.url.toLowerCase() === 'https://www.forexfactory.com/calendar.php?month=' + x.toLowerCase())
        .first();
    // Greet the given name
    res.send(rec);
});

// Export the express.Router() instance to be used by server.ts
export const ScrapeUrlController: Router = router;