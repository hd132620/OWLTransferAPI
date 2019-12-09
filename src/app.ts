import express from 'express';

import * as admin from 'firebase-admin';
import { autoUpload } from './upload';

import morgan from 'morgan';
import { stream, logger } from './config/winston';

const app = express();

logger.info('Server start');

const serviceAccount = require('../../../owltransfer2020-firebase-adminsdk-h6o7i-364f08ab86.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const db = admin.firestore();

logger.info('Firebase db certification success');

app.use(express.json());
app.use(morgan('combined', { stream }));
app.use(require('./router'));

app.listen(3000, () => {
  logger.info('Server listening on port 3000!');
});

autoUpload();
