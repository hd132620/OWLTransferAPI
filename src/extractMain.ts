import { load } from 'cheerio';
import { extractPlayerName, extractPlayerID,
    extractPlayerPosition, extractPlayerNationality, extractFormerTeam } from './extractUtil';
import { OWLTransferPerson, OWLFormerTeam } from './OWLTranferIfm';

const $ = load('');

enum Player {
    Name = 0,
    ID,
    Position,
    Nationality,
    FormerTeam,
}

export const extractTr = (html: string): Cheerio => {
  const $ = load(html);

  // tslint:disable-next-line: variable-name
  const processing_1 = $(
      'div#__nuxt > div#__layout > div.app > div:nth-child(2) > article',
    ).children('div').eq(2);

  // tslint:disable-next-line: variable-name
  const processing_2 = $(
      'div.clearfix > div:nth-child(1) > div.w',
      processing_1.html()).children('div').eq(11);

  // tslint:disable-next-line: variable-name
  const processing_3 = $(
        'div.wiki-table-wrap table tbody',
        processing_2.html());

  const processed = processing_3.find('tr');
  return processed;
};

export const extractTeam = (elem: CheerioElement): string => {

  const ic: CheerioElement = elem.firstChild.firstChild;

  try {
    if (ic.firstChild.type === 'text') {
            // 처음에 빈 요소가 있다면
      return ic.children[1].lastChild.attribs.title;
    }  if (ic.firstChild.type === 'tag') {
            // 바로 tag가 있다면
      if (ic.firstChild.name === 'strong') {
              // 그 태그가 strong 태그면
        return ic.firstChild.lastChild.attribs.title;
      }
              // a 태그면 (기타의 경우)
      return ic.children[2].attribs.title;

    }
    throw new Error('Exception occured!');

  } catch (error) {
    console.error('Team detection error!');
    console.error(ic.children);
    console.error(error);
  }
};

export const extractPerson = (elem: CheerioElement): OWLTransferPerson => {

  const result: OWLTransferPerson = new OWLTransferPerson();

  $(elem)
  .find('td')
  .each((index: number, elemPlayer: CheerioElement) => {
    switch (index) {
      case Player.Name: {
        result.name = extractPlayerName(elemPlayer);
        break;
      }
      case Player.ID: {
        result.id = extractPlayerID(elemPlayer);
        break;
      }
      case Player.Position: {
        result.position = extractPlayerPosition(elemPlayer);
        break;
      }
      case Player.Nationality: {
        result.nationality = extractPlayerNationality(elemPlayer);
        break;
      }
      case Player.FormerTeam: {
        const ft: OWLFormerTeam = extractFormerTeam(elem, elemPlayer);
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
