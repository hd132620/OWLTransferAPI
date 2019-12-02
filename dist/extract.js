"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = require("cheerio");
const OWLTranferIfm_1 = require("./OWLTranferIfm");
const extractUtil_1 = require("./extractUtil");
var Player;
(function (Player) {
    Player[Player["Name"] = 0] = "Name";
    Player[Player["ID"] = 1] = "ID";
    Player[Player["Position"] = 2] = "Position";
    Player[Player["Nationality"] = 3] = "Nationality";
    Player[Player["FormerTeam"] = 4] = "FormerTeam";
})(Player || (Player = {}));
const pretty = require('pretty');
const ifm = new OWLTranferIfm_1.OWLTransferIfm();
exports.extract = (html) => {
    if (html === '')
        return;
    const $ = cheerio_1.load(html);
    // tslint:disable-next-line: variable-name
    const processing_1 = $('div#__nuxt > div#__layout > div.app > div:nth-child(2) > article').children('div').eq(2);
    // tslint:disable-next-line: variable-name
    const processing_2 = $('div.clearfix > div:nth-child(1) > div.w', processing_1.html()).children('div').eq(11);
    // tslint:disable-next-line: variable-name
    const processing_3 = $('div.wiki-table-wrap table tbody', processing_2.html());
    const processed = processing_3.find('tr');
    processed.each((index, elem) => {
        if (index >= 2 && index !== processed.length - 1) { // 유효한 룩업 범위
            console.log(index);
            if (elem.children.length === 1) { // 팀 이름
                console.log('---------------------------------------------------');
                console.log(extractUtil_1.extractTeam(elem));
            }
            else { // 선수 이름
                try {
                    $(elem)
                        .find('td')
                        .each((index, elemPlayer) => {
                        switch (index) {
                            case Player.Name: {
                                process.stdout.write(extractUtil_1.extractPlayerName(elemPlayer));
                                process.stdout.write(' ');
                                break;
                            }
                            case Player.ID: {
                                process.stdout.write(extractUtil_1.extractPlayerID(elemPlayer));
                                process.stdout.write(' ');
                                break;
                            }
                            case Player.Position: {
                                process.stdout.write(extractUtil_1.extractPlayerPosition(elemPlayer));
                                process.stdout.write(' ');
                                break;
                            }
                            case Player.Nationality: {
                                extractUtil_1.extractPlayerNationality(elemPlayer).forEach((str) => {
                                    process.stdout.write(str);
                                    process.stdout.write(' ');
                                });
                                break;
                            }
                            case Player.FormerTeam: {
                                const ft = extractUtil_1.extractFormerTeam(elem, elemPlayer);
                                process.stdout.write(ft.team);
                                process.stdout.write(' ');
                                process.stdout.write(ft.formerPosition);
                                break;
                            }
                            default: {
                                console.log('default');
                            }
                        }
                    });
                }
                catch (error) {
                    console.error('Player information detection error!');
                    console.error(error);
                }
            }
        }
        console.log();
    });
    const crawled = pretty(processing_3.html());
    return crawled;
};
//# sourceMappingURL=extract.js.map