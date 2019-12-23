import * as cheerio from "cheerio"

export class ParseData { 
    public test() {
        console.log("parsing!!!");
    }

    public parseHtml(html: string) {
        const $ = cheerio.load(html);
        let h = $.html();
        let calData = [];
        let weekOf=$('.highlight').filter('.light').text();
        let yyyy = weekOf.substring(4);
        
        console.log(weekOf); 
        
        let prevDate="", prevTime="", title='', impact='';

        let calRec = {}

        $('.calendar__row').each(function(i: any,element: any) {
            var data = $(element);

            if ($(element).children().length > 2) {
                let c = $(element).children();
                let x = '';

                if($(c[0]).text().trim() !== ''){
                    prevDate=$(c[0]).text().trim();
                } else {
                    $(c[0]).text(prevDate);
                }
                if($(c[1]).text().trim() !== ''){
                    prevTime=$(c[1]).text().trim();
                } else {
                    $(c[1]).text(prevTime);
                }
 
                let origDate = $(c[0]).text().trim().substring(3) + ', ' + yyyy;
                let origTime = $(c[1]).text().trim().replace('am',' AM').replace('pm',' PM');
                let w = 2;
                
                calRec = {
                    dt: origDate, // $(c[0]).text().trim(),
                    tm: $(c[1]).text().trim(),
                    cc: $(c[2]).text().trim().replace('\n','').replace('\n',''),
                    im: $(c[3]).find("span").first().attr("title"),
                    rn: $(c[4]).text().trim(), 
                    ac: $(c[6]).text().trim(), 
                    fc: $(c[7]).text().trim(), 
                    pr: $(c[8]).text().trim() 
                }
                calData.push(calRec);
            }
        })  
        
        return calData;
    }
    
}