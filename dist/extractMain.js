"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = require("cheerio");
const extractUtil_1 = require("./extractUtil");
const OWLTranferIfm_1 = require("./OWLTranferIfm");
const $ = cheerio_1.load('');
var Player;
(function (Player) {
    Player[Player["Name"] = 0] = "Name";
    Player[Player["ID"] = 1] = "ID";
    Player[Player["Position"] = 2] = "Position";
    Player[Player["Nationality"] = 3] = "Nationality";
    Player[Player["FormerTeam"] = 4] = "FormerTeam";
})(Player || (Player = {}));
exports.extractTr = (html) => {
    const $ = cheerio_1.load(html);
    // tslint:disable-next-line: variable-name
    const processing_1 = $('div#__nuxt > div#__layout > div.app > div:nth-child(2) > article').children('div').eq(2);
    // tslint:disable-next-line: variable-name
    const processing_2 = $('div.clearfix > div:nth-child(1) > div.w', processing_1.html()).children('div').eq(11);
    // tslint:disable-next-line: variable-name
    const processing_3 = $('div.wiki-table-wrap table tbody', processing_2.html());
    const processed = processing_3.find('tr');
    return processed;
};
exports.extractTeam = (elem) => {
    const ic = elem.firstChild.firstChild;
    try {
        if (ic.firstChild.type === 'text') {
            // 처음에 빈 요소가 있다면
            return ic.children[1].lastChild.attribs.title;
        }
        if (ic.firstChild.type === 'tag') {
            // 바로 tag가 있다면
            if (ic.firstChild.name === 'strong') {
                // 그 태그가 strong 태그면
                return ic.firstChild.lastChild.attribs.title;
            }
            // a 태그면 (기타의 경우)
            return ic.children[2].attribs.title;
        }
        throw new Error('Exception occured!');
    }
    catch (error) {
        console.error('Team detection error!');
        console.error(ic.children);
        console.error(error);
    }
};
exports.extractPerson = (elem) => {
    const result = new OWLTranferIfm_1.OWLTransferPerson();
    $(elem)
        .find('td')
        .each((index, elemPlayer) => {
        switch (index) {
            case Player.Name: {
                result.name = extractUtil_1.extractPlayerName(elemPlayer);
                break;
            }
            case Player.ID: {
                result.id = extractUtil_1.extractPlayerID(elemPlayer);
                break;
            }
            case Player.Position: {
                result.position = extractUtil_1.extractPlayerPosition(elemPlayer);
                break;
            }
            case Player.Nationality: {
                result.nationality = extractUtil_1.extractPlayerNationality(elemPlayer);
                break;
            }
            case Player.FormerTeam: {
                const ft = extractUtil_1.extractFormerTeam(elem, elemPlayer);
                result.formerTeam = ft;
                break;
            }
            default: {
                console.log('default');
            }
        }
    });
    return result;
};
//# sourceMappingURL=extractMain.js.map