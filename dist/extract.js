"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = require("cheerio");
const test_1 = require("./test");
var Player;
(function (Player) {
    Player[Player["Name"] = 0] = "Name";
    Player[Player["ID"] = 1] = "ID";
    Player[Player["Position"] = 2] = "Position";
    Player[Player["Nationality"] = 3] = "Nationality";
    Player[Player["FormerTeam"] = 4] = "FormerTeam";
})(Player || (Player = {}));
var FormerTeamFlag;
(function (FormerTeamFlag) {
    FormerTeamFlag[FormerTeamFlag["NoTeam"] = 0] = "NoTeam";
    FormerTeamFlag[FormerTeamFlag["Player"] = 1] = "Player";
    FormerTeamFlag[FormerTeamFlag["WasCoach"] = 2] = "WasCoach";
    FormerTeamFlag[FormerTeamFlag["WasPlayer"] = 3] = "WasPlayer";
})(FormerTeamFlag || (FormerTeamFlag = {}));
const pretty = require('pretty');
exports.extract = (html) => {
    if (html === '')
        return;
    const $ = cheerio_1.load(html);
    // tslint:disable-next-line: variable-name
    const processing_1 = $('div#__nuxt > div#__layout > div.app > div:nth-child(2) > article').children('div').eq(2);
    // tslint:disable-next-line: variable-name
    const processing_2 = $('div.clearfix > div:nth-child(1) > div.w', processing_1.html()).children('div').eq(-2);
    // tslint:disable-next-line: variable-name
    const processing_3 = $('div.wiki-table-wrap table tbody', processing_2.html());
    const processed = processing_3.find('tr');
    processed.each((index, elem) => {
        const ic = elem.firstChild.firstChild;
        if (index >= 2 && index !== processed.length - 1) { // 유효한 룩업 범위
            console.log(index);
            if (elem.children.length === 1) { // 팀 이름
                console.log('---------------------------------------------------');
                try {
                    if (ic.firstChild.type === 'text') {
                        // 처음에 빈 요소가 있다면
                        console.log(ic.children[1].lastChild.attribs.title);
                    }
                    else if (ic.firstChild.type === 'tag') {
                        // 바로 tag가 있다면
                        if (ic.firstChild.name === 'strong') {
                            // 그 태그가 strong 태그면
                            console.log(ic.firstChild.lastChild.attribs.title);
                        }
                        else {
                            // a 태그면 (기타의 경우)
                            console.log(ic.children[2].attribs.title);
                        }
                    }
                    else {
                        throw new Error('Exception occured!');
                    }
                }
                catch (error) {
                    console.error('Team detection error!');
                    console.error(ic.children);
                    console.error(error);
                }
            }
            else { // 선수 이름
                $(elem).find('td').each((index, elemPlayer) => {
                    switch (index) {
                        case Player.Name: {
                            process.stdout.write($('div', $(elemPlayer).html()).text().trim());
                            process.stdout.write(' ');
                            break;
                        }
                        case Player.ID: {
                            process.stdout.write($('div', $(elemPlayer).html()).text().trim());
                            process.stdout.write(' ');
                            break;
                        }
                        case Player.Position: {
                            if (elemPlayer.firstChild.firstChild.data.trim().length > 0) {
                                process.stdout.write($('div', $(elemPlayer).html()).text().trim());
                            }
                            else {
                                const prcdPosition = $('div a', $(elemPlayer).html()).attr('title');
                                process.stdout.write(test_1.extractRole(prcdPosition));
                            }
                            process.stdout.write(' ');
                            break;
                        }
                        case Player.Nationality: {
                            $('div', $(elemPlayer).html()).find('a').each((index, elemPlayerNation) => {
                                process.stdout.write(test_1.extractNation($(elemPlayerNation).attr('title')));
                                process.stdout.write(' ');
                            });
                            break;
                        }
                        case Player.FormerTeam: {
                            if ($(elem).attr('style') === 'background-color:#DFD;') { // 무적상태
                                process.stdout.write('N/A');
                            }
                            else {
                                const underDiv = $('div', $(elemPlayer).html()).children();
                                process.stdout.write($('div a', $(elemPlayer).html()).attr('title'));
                                switch (underDiv.length) {
                                    case FormerTeamFlag.Player: {
                                        break;
                                    }
                                    case FormerTeamFlag.WasCoach: {
                                        console.log(underDiv.length);
                                        console.log(underDiv);
                                        break;
                                    }
                                    case FormerTeamFlag.WasPlayer: {
                                        console.log(underDiv.length);
                                        console.log(underDiv);
                                        break;
                                    }
                                    default: {
                                        console.log('Player.FormerTeam Switch default!');
                                    }
                                }
                            }
                            process.stdout.write(' ');
                            break;
                        }
                        default: {
                            console.log('default');
                        }
                    }
                });
            }
        }
        console.log();
    });
    const crawled = pretty(processing_3.html());
    return crawled;
};
//# sourceMappingURL=extract.js.map