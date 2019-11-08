import express from 'express';
import { crawl } from './crawl';
import { extract } from './extract';

const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
  const result = await crawl();
  const extracted: string = extract(result);
  // console.log(extracted);
  res.send(extracted);
});

module.exports = router;
