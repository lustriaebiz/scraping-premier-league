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
                let rank    = parseInt($(statsTable[index]).find('.pos > .value').text());
                let team    = $(statsTable[index]).find('.team > a > .long').text();
                let played  = $(statsTable[index]).find('td:nth-child(4)').text();
                let won     = $(statsTable[index]).find('td:nth-child(5)').text();
                let draw    = $(statsTable[index]).find('td:nth-child(6)').text();
                let lost    = $(statsTable[index]).find('td:nth-child(7)').text();
                let gf      = $(statsTable[index]).find('td:nth-child(8)').text();
                let ga      = $(statsTable[index]).find('td:nth-child(9)').text();
                let gd      = $(statsTable[index]).find('td:nth-child(10)').text();
                let point   = $(statsTable[index]).find('td:nth-child(11)').text();

                if(rank && team) {

                    // push data
                    premierLeagueTable.push({
                        'rank'    : rank,
                        'team'    : team,
                        'played'  : played,
                        'won'     : won,
                        'draw'    : draw,
                        'lost'    : lost,
                        'goals_for'         : gf,
                        'goals_against'     : ga,
                        'goal_difference'   : gd.replace( /[\r\n]+/gm, "" ).trim(),
                        'point'   : point.replace( /[\r\n]+/gm, "" ).trim()
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



