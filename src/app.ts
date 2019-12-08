import express from 'express';
import * as admin from 'firebase-admin';
import { autoUpload } from './upload';

const app = express();
const serviceAccount = require('../../../owltransfer2020-firebase-adminsdk-h6o7i-364f08ab86.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const db = admin.firestore();

app.use(require('./router'));

app.listen(3000, () => {
  console.log('Server listening on port 3000!');
});

autoUpload();
