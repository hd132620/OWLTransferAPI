"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = require("cheerio");
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
        if (index >= 2 && index !== processed.length - 1) { // 유효한 팀 범위
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
            else if (elem.children.length === 5 && $(this).has('style')) { // 선수 이름
            }
        }
    });
    const crawled = pretty(processing_3.html());
    return crawled;
};
//# sourceMappingURL=extract.js.map