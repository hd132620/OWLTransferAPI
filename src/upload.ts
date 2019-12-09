import { db } from './app';
import { getInformation } from './information';

import fs from 'fs';
import * as admin from 'firebase-admin';
import { logger } from './config/winston';

const setting = require('../setting.json');

let a: number = 1;
let repeater: NodeJS.Timeout;
let currentSetting: any;

const autoUploadMain = async () => {
  logger.info(`Upload start ${a}`);

  try {
    const ref = db.collection('data').doc('lastest');
    ref.set(await getInformation());

    logger.info(`Upload success ${a}`);
  } catch (e) {
    logger.info(`Upload fail! ${a}`);
    logger.error(e);

    const errRef = db.collection('log').doc('uploadFail');
    errRef.update({
      log: admin.firestore.FieldValue.arrayUnion({
        updatedTime: new Date().toLocaleString(),
        error: e,
      }),
    });
  }
  a += 1;
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
