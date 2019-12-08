"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = require("cheerio");
const OWLTranferIfm_1 = require("./OWLTranferIfm");
const extractMain_1 = require("./extractMain");
exports.extract = (html) => new Promise((resolve, reject) => {
    if (html === '' || html === undefined || html === null) {
        reject(new Error('Source is empty or undefined or null - extract'));
    }
    const ifm = new OWLTranferIfm_1.OWLTransferIfm();
    const $ = cheerio_1.load(html);
    let processed;
    try {
        processed = extractMain_1.extractTr(html);
    }
    catch (error) {
        console.error('Tr extracting Error - extract');
        reject(error);
    }
    processed.each((index, elem) => {
        if (index >= 2 && index !== processed.length - 1) { // 유효한 룩업 범위
            if (elem.children.length === 1) { // 팀 이름
                try {
                    ifm.pushTeam(extractMain_1.extractTeam(elem));
                }
                catch (error) {
                    console.error('Team extracting Error - extract');
                    reject(error);
                }
            }
            else { // 선수 이름
                try {
                    ifm.pushPerson(extractMain_1.extractPerson(elem));
                }
                catch (error) {
                    console.error('Person extracting Error - extract');
                    reject(error);
                }
            }
        }
    });
    // ifm.update();
    if (ifm.data.length !== 0) {
        resolve(ifm);
    }
    else {
        reject(new Error('Data is empty - extract'));
    }
});
//# sourceMappingURL=extract.js.map