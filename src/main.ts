import axios     from 'axios';
import cheerio   from 'cheerio';

require('dotenv').config();
const url = String(process.env.URL);

class Scrap {

    cheerio() {

        axios(url).then(response => {

            const html          = response.data;
            const $             = cheerio.load(html);
            const statsTable    = $('.tableBodyContainer.isPL > tr');

            /** table premier league */
            const premierLeagueTable: any = [];

            for (let index = 0; index < statsTable.length; index++) {
                let rank = parseInt($(statsTable[index]).find('.pos > .value').text());
                let team = $(statsTable[index]).find('.team > a > .long').text();

                if(rank && team) {

                    // push data
                    premierLeagueTable.push({
                        rank: rank,
                        team: team
                    });

                }
                
                
            }

            console.log('Table Premier League: ',premierLeagueTable);

        }).catch(error => {
            console.log('Error: ', error);
            
        });
        
    }

}

let scrap = new Scrap;

scrap.cheerio();



