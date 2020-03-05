import axios     from 'axios';
import cheerio   from 'cheerio';

require('dotenv').config();
const url = String(process.env.URL);

class Scrap {

    cheerio() {

        axios(url).then(response => {

            const html          = response.data;
            const $             = cheerio.load(html);
            const statsTable    = $('.statsTableContainer > tr');

            console.log('statsTable: ', $(statsTable[0]).find('td'));

            const topPremierLeagueScorers: any = [];

            for (let index = 0; index < statsTable.length; index++) {
                const rank          = $(statsTable[index]).find('.rank > strong').text();
                const playerName    = $(statsTable[index]).find('.playerName > strong').text();
                const nationality   = $(statsTable[index]).find('.playerCountry').text();
                const goals         = $(statsTable[index]).find('.mainStat').text();
    
                topPremierLeagueScorers.push({
                    rank,
                    name: playerName,
                    nationality,
                    goals,
                });
            }

            console.log('topPremierLeagueScorers: ', topPremierLeagueScorers);

        }).catch(error => {
            console.log('Error: ', error);
            
        });
        
    }

}

let scrap = new Scrap;

scrap.cheerio();



