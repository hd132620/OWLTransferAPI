import express from 'express';
import { crawl } from './crawl';
import { extract } from './extract';
import { OWLTransferIfm } from './OWLTranferIfm';

const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
  const result = await crawl();
  const extracted: OWLTransferIfm = extract(result);
  // console.log(extracted);
  extracted.update();
  res.send(extracted);
});

module.exports = router;
