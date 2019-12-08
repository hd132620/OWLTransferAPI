import express from 'express';
import { db } from './app';
import { getInformation } from './information';

const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
  const dataRef = db.collection('data').doc('lastest');
  dataRef.get()
  .then((doc) => {
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      console.log('Document data:', JSON.stringify(doc.data()));
      res.send(JSON.parse(JSON.stringify(doc.data())));
    }
  })
  .catch((err) => {
    console.log('Error getting document', err);
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
    res.status(500);
    res.send({ error_message: e.message });
  }

});

module.exports = router;
