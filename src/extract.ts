import { load } from 'cheerio';
import { OWLTransferIfm, OWLTransfer, OWLFormerTeam } from './OWLTranferIfm';
import { extractTeam, extractPlayerName, extractPlayerID,
  extractPlayerPosition, extractPlayerNationality, extractFormerTeam } from './extractUtil';

enum Player {
  Name = 0,
  ID,
  Position,
  Nationality,
  FormerTeam,
}

const pretty = require('pretty');

const ifm: OWLTransferIfm = new OWLTransferIfm();

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
      processing_1.html()).children('div').eq(11);

  // tslint:disable-next-line: variable-name
  const processing_3 = $(
        'div.wiki-table-wrap table tbody',
        processing_2.html());

  const processed = processing_3.find('tr');

  processed.each((index: number, elem: CheerioElement) => {

    if (index >= 2 && index !== processed.length - 1) { // 유효한 룩업 범위
      console.log(index);
      if (elem.children.length === 1) { // 팀 이름
        console.log('---------------------------------------------------');
        console.log(extractTeam(elem));

      } else { // 선수 이름
        try {
          $(elem)
        .find('td')
        .each((index: number, elemPlayer: CheerioElement) => {
          switch (index) {
            case Player.Name: {
              process.stdout.write(extractPlayerName(elemPlayer));
              process.stdout.write(' ');
              break;
            }
            case Player.ID: {
              process.stdout.write(extractPlayerID(elemPlayer));
              process.stdout.write(' ');
              break;
            }
            case Player.Position: {
              process.stdout.write(extractPlayerPosition(elemPlayer));
              process.stdout.write(' ');
              break;
            }
            case Player.Nationality: {
              extractPlayerNationality(elemPlayer).forEach((str:string) => {
                process.stdout.write(str);
                process.stdout.write(' ');
              });
              break;
            }
            case Player.FormerTeam: {
              const ft: OWLFormerTeam = extractFormerTeam(elem, elemPlayer);
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
        } catch (error) {
          console.error('Player information detection error!');
          console.error(error);
        }
      }
    }
    console.log();
  });

  const crawled: string = pretty(processing_3.html());
  return crawled;
};
