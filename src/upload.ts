import { db } from './app';
import { getInformation } from './information';

import fs from 'fs';
import * as admin from 'firebase-admin';

const setting = require('../setting.json');

let a: number = 1;
let repeater: NodeJS.Timeout;
let currentSetting: any;

const autoUploadMain = async () => {
  console.log(`${new Date().toLocaleString()} ${a}`);
  a += 1;

  try {
    const ref = db.collection('data').doc('lastest');
    ref.set(await getInformation());
    console.log(`Upload success ${new Date().toLocaleString()} ${a}`);
  } catch (e) {
    console.error(e);
    const errRef = db.collection('log').doc('uploadFail');
    errRef.update({
      log: admin.firestore.FieldValue.arrayUnion({
        updatedTime: new Date().toLocaleString(),
        error: e,
      }),
    });
  }

};

const autoUploadInside = (beforeInterval: any) => {

  currentSetting = JSON.parse(fs.readFileSync('./setting.json', 'utf8'));

  if (currentSetting.autoUpload) {
    autoUploadMain();
  }

  if (beforeInterval !== currentSetting.uploadInterval) {
    clearInterval(repeater);
    repeater = setInterval(autoUploadInside,
                           currentSetting.uploadInterval,
                           currentSetting.uploadInterval);
  }
};

export const autoUpload = () => {
  repeater = setInterval(autoUploadInside, setting.uploadInterval, setting.uploadInterval);
};
