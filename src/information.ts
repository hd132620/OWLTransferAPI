import { crawl } from './crawl';
import { extract } from './extract';
import { OWLTransferIfm } from './OWLTranferIfm';

export const getInformation = async () => {

  return new Promise<JSON>(async (resolve, reject) => {
    let result: string;
    let extracted: OWLTransferIfm;

    try {
      result = await crawl();
    } catch (error) {
      console.error(error);
      reject(error);
    }

    try {
      extracted = await extract(result);
    } catch (error) {
      console.error(error);
      reject(error);
    }

  // extracted.data[3].archive.push(new OWLTransferPerson());

    resolve(JSON.parse(JSON.stringify(extracted)));
  });
};
