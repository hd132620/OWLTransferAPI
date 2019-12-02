import { load } from 'cheerio';
import { OWLTransferIfm } from './OWLTranferIfm';
import { extractTr, extractTeam, extractPerson } from './extractMain';

const ifm: OWLTransferIfm = new OWLTransferIfm();

export const extract = (html: string): OWLTransferIfm => {
  if (html === '') return;

  const $ = load(html);

  const processed: Cheerio = extractTr(html);

  processed.each((index: number, elem: CheerioElement) => {

    if (index >= 2 && index !== processed.length - 1) { // 유효한 룩업 범위
      if (elem.children.length === 1) { // 팀 이름
        ifm.pushTeam(extractTeam(elem));

      } else { // 선수 이름
        try {
          ifm.pushPerson(extractPerson(elem));
        } catch (error) {
          console.error('Player information detection error!');
          console.error(error);
        }
      }
    }
  });
  ifm.update();
  return ifm;
};
