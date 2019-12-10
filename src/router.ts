import express from 'express';
import { db } from './app';
import { getInformation } from './information';
import { logger } from './config/winston';

import fs from 'fs';

const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
  const dataRef = db.collection('data').doc('lastest');
  dataRef.get()
  .then((doc) => {
    if (!doc.exists) {
      logger.info('No such document!');
    } else {
      res.send(JSON.parse(JSON.stringify(doc.data())));
    }
  })
  .catch((err) => {
    logger.error('Error getting document', err);
    res.status(500);
    res.send({ error_message: err.message });
  });
});

router.get('/upload', async (req: express.Request, res: express.Response) => {
  try {
    const ref = db.collection('data').doc('lastest');
    const ifm = await getInformation();

    ref.set(ifm);
    res.status(200);
    res.send({ sentData: ifm, reference: ref });
  } catch (e) {
    console.log(e);
    logger.error(e);
    res.status(500);
    res.send({ error_message: e.message });
  }

});

router.get('/setting/autoUpload/:flag', (req: express.Request, res: express.Response) => {
  let setting: any;
  let reqFlag: string;
  let flag: boolean;

  reqFlag = req.params.flag;

  if (reqFlag === 'true' || reqFlag === 'false' || reqFlag === 'on' || reqFlag === 'off') {
    flag = reqFlag === 'true' || reqFlag === 'on' ? true : false;
  } else {
    res.status(400).send({ error: `${flag} is neither true nor false. You can send flag only 'true/false, on/off'` });
  }

  fs.readFile('./setting.json', 'utf8', (err, data) => {
    if (err) {
      logger.error(err);
      res.status(500);
      res.send({ error_message: err.message });
    } else {
      setting = JSON.parse(data);
      try {
        setting['autoUpload'] = flag;
        fs.writeFile('./setting.json', JSON.stringify(setting, null, 4), 'utf8', (err) => {
          res.status(200).send({ beforeData: JSON.parse(data), afterData: setting });
        });
      } catch (err) {
        logger.error(err);
        res.status(500);
        res.send({ error_message: err.message });
      }

    }
  });
});

router.get('/setting/:id', (req: express.Request, res: express.Response) => {
  let setting: any;
  fs.readFile('./setting.json', 'utf8', (err, data) => {
    if (err) {
      logger.error(err);
      res.status(500);
      res.send({ error_message: err.message });
    } else {
      setting = JSON.parse(data);
      try {
        setting[req.params.id] = req.query.value;
        fs.writeFile('./setting.json', JSON.stringify(setting, null, 4), 'utf8', (err) => {
          res.status(200).send({ beforeData: JSON.parse(data), afterData: setting });
        });
      } catch (err) {
        logger.error(err);
        res.status(500);
        res.send({ error_message: err.message });
      }

    }
  });

});

module.exports = router;
