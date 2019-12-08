import { load } from 'cheerio';
import { OWLTransferIfm, OWLTransfer } from './OWLTranferIfm';
import { extractTr, extractTeam, extractPerson } from './extractMain';

export const extract = (html: string) =>
  new Promise<OWLTransferIfm>((resolve, reject) => {
    if (html === '' || html === undefined || html === null) {
      reject(new Error('Source is empty or undefined or null - extract'));
    }

    const ifm: OWLTransferIfm = new OWLTransferIfm();

    const $ = load(html);

    let processed: Cheerio;

    try {
      processed = extractTr(html);
    } catch (error) {
      console.error('Tr extracting Error - extract');
      reject(error);
    }

    processed.each((index: number, elem: CheerioElement) => {

      if (index >= 2 && index !== processed.length - 1) { // 유효한 룩업 범위
        if (elem.children.length === 1) { // 팀 이름
          try {
            ifm.pushTeam(extractTeam(elem));
          } catch (error) {
            console.error('Team extracting Error - extract');
            reject(error);
          }
        } else { // 선수 이름
          try {
            ifm.pushPerson(extractPerson(elem));
          } catch (error) {
            console.error('Person extracting Error - extract');
            reject(error);
          }
        }
      }
    });
  // ifm.update();
    if (ifm.data.length !== 0) {
      resolve(ifm);
    } else {
      reject(new Error('Data is empty - extract'));
    }
  });
