"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = require("cheerio");
const extractUtilText_1 = require("./extractUtilText");
const OWLTranferIfm_1 = require("./OWLTranferIfm");
var FormerTeamFlag;
(function (FormerTeamFlag) {
    FormerTeamFlag[FormerTeamFlag["NoTeam"] = 0] = "NoTeam";
    FormerTeamFlag[FormerTeamFlag["Player"] = 1] = "Player";
    FormerTeamFlag[FormerTeamFlag["WasCoach"] = 2] = "WasCoach";
    FormerTeamFlag[FormerTeamFlag["WasPlayer"] = 3] = "WasPlayer";
})(FormerTeamFlag || (FormerTeamFlag = {}));
const $ = cheerio_1.load('');
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
exports.extractPlayerName = (elemPlayer) => {
    return $('div', $(elemPlayer).html()).text().trim();
};
exports.extractPlayerID = exports.extractPlayerName;
exports.extractPlayerPosition = (elemPlayer) => {
    if (elemPlayer.firstChild.firstChild.data !== undefined &&
        elemPlayer.firstChild.firstChild.data.trim().length > 0) {
        return $('div', $(elemPlayer).html()).text().trim();
    }
    const prcdPosition = $('div a', $(elemPlayer).html()).attr('title');
    return extractUtilText_1.extractRoleText(prcdPosition);
};
exports.extractPlayerNationality = (elemPlayer) => {
    const result = [];
    $('div', $(elemPlayer).html())
        .find('a')
        .each((index, elemPlayerNation) => {
        result.push(extractUtilText_1.extractNationText($(elemPlayerNation).attr('title')));
    });
    return result;
};
exports.extractFormerTeam = (elem, elemPlayer) => {
    if ($(elem).attr('style') === 'background-color:#DFD;') { // 무적상태
        return new OWLTranferIfm_1.OWLFormerTeam();
    }
    const ft = new OWLTranferIfm_1.OWLFormerTeam();
    const underDiv = $('div', $(elemPlayer).html()).children();
    // process.stdout.write($('div a', $(elemPlayer).html()).attr('title'));
    // process.stdout.write(extractFormerTeam($('div', $(elemPlayer).html()).text()));
    // process.stdout.write(extractFormerTeam($('div a', $(elemPlayer).html()).text()));
    switch (underDiv.length) {
        case FormerTeamFlag.Player: {
            ft.team = extractUtilText_1.extractFormerTeamText($('div', $(elemPlayer).html()).text());
            break;
        }
        case FormerTeamFlag.WasCoach: {
            ft.team = extractUtilText_1.extractFormerTeamText($('div a', $(elemPlayer).html()).text());
            ft.formerPosition = extractUtilText_1.extractFormerTeamOpText($('div span', $(elemPlayer).html()).text());
            // console.log(underDiv.length);
            // console.log(underDiv);
            break;
        }
        case FormerTeamFlag.WasPlayer: {
            ft.team = $('div a', $(elemPlayer).html()).attr('title');
            ft.formerPosition = extractUtilText_1.extractFormerTeamOpText($('div', $(elemPlayer).html()).text());
            // console.log(underDiv.length);
            // console.log(underDiv);
            break;
        }
        default: {
            console.log('Player.FormerTeam Switch default!');
        }
    }
    return ft;
};
//# sourceMappingURL=extractUtil.js.map