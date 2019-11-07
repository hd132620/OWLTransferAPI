"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = require("cheerio");
const $ = require('cheerio');
exports.extract = (html) => {
    if (html === '')
        return;
    const $$ = cheerio_1.load(html);
    // tslint:disable-next-line: variable-name
    const processing_1 = $$('div#__nuxt > div#__layout > div.app > div:nth-child(2) > article').children('div').eq(2);
    // tslint:disable-next-line: variable-name
    const processing_2 = $('div.clearfix > div:nth-child(1) > div.w', processing_1.html()).children('div').eq(-2);
    // tslint:disable-next-line: variable-name
    const processing_3 = $('div.wiki-table-wrap', processing_2.html());
    const crawled = processing_3.html();
    //
    return crawled;
};
//# sourceMappingURL=extract.js.map