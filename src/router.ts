import express from 'express';
import { crawl } from './crawl';
import { extract } from './extract';
import { OWLTransferIfm } from './OWLTranferIfm';
import { db } from './app';

const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
  const result = await crawl();
  const extracted: OWLTransferIfm = extract(result);
  // console.log(extracted);
  res.send(extracted);
});

router.get('/upload', async (req: express.Request, res: express.Response) => {
  try {
    const result = await crawl();
    const extracted: OWLTransferIfm = extract(result);

    const ref = db.collection('data').doc('lastest');

    ref.set(JSON.parse(JSON.stringify(extracted)));

    res.status(200);
    res.send({ reference: ref });
  } catch (e) {
    console.log(e);
    res.status(500);
    res.send({ error_message: e.message });
  }

});

module.exports = router;
