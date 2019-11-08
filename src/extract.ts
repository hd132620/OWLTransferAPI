import { load } from 'cheerio';

const pretty = require('pretty');

export const extract = (html: string): string => {
  if (html === '') return;

  const $ = load(html);

  // tslint:disable-next-line: variable-name
  const processing_1 = $(
      'div#__nuxt > div#__layout > div.app > div:nth-child(2) > article',
    ).children('div').eq(2);

  // tslint:disable-next-line: variable-name
  const processing_2 = $(
      'div.clearfix > div:nth-child(1) > div.w',
      processing_1.html()).children('div').eq(-2);

  // tslint:disable-next-line: variable-name
  const processing_3 = $(
        'div.wiki-table-wrap table tbody',
        processing_2.html());

  const processed = processing_3.find('tr');

  processed.each((index: number, elem: CheerioElement) => {

    const ic: CheerioElement = elem.firstChild.firstChild;

    if (index >= 2 && index !== processed.length - 1) {
      if (elem.children.length === 1) { // 팀 이름

        try {
          if (ic.firstChild.type === 'text') {
            // strong 태그있음
            console.log(ic.children[1].lastChild.attribs.title);
          } else if (ic.firstChild.type === 'tag') {
            // strong 태그 없이 바로 a
            console.log(ic.children[2].attribs.title);
          } else {}
        } catch (error) {
          console.log(error);
        }

      } else if (elem.children.length === 5 && $(this).has('style')) { // 선수 이름

      }
    }
  });

  const crawled: string = pretty(processing_3.html());
  return crawled;
};
