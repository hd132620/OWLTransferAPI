"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = require("cheerio");
const OWLTranferIfm_1 = require("./OWLTranferIfm");
const extractMain_1 = require("./extractMain");
const ifm = new OWLTranferIfm_1.OWLTransferIfm();
exports.extract = (html) => {
    if (html === '')
        return;
    const $ = cheerio_1.load(html);
    const processed = extractMain_1.extractTr(html);
    processed.each((index, elem) => {
        if (index >= 2 && index !== processed.length - 1) { // 유효한 룩업 범위
            if (elem.children.length === 1) { // 팀 이름
                ifm.pushTeam(extractMain_1.extractTeam(elem));
            }
            else { // 선수 이름
                try {
                    ifm.pushPerson(extractMain_1.extractPerson(elem));
                }
                catch (error) {
                    console.error('Player information detection error!');
                    console.error(error);
                }
            }
        }
    });
    ifm.update();
    return ifm;
};
//# sourceMappingURL=extract.js.map