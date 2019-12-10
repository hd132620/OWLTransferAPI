"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app_1 = require("./app");
const information_1 = require("./information");
const winston_1 = require("./config/winston");
const fs_1 = __importDefault(require("fs"));
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dataRef = app_1.db.collection('data').doc('lastest');
    dataRef.get()
        .then((doc) => {
        if (!doc.exists) {
            winston_1.logger.info('No such document!');
        }
        else {
            res.send(JSON.parse(JSON.stringify(doc.data())));
        }
    })
        .catch((err) => {
        winston_1.logger.error('Error getting document', err);
        res.status(500);
        res.send({ error_message: err.message });
    });
}));
router.get('/upload', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ref = app_1.db.collection('data').doc('lastest');
        const ifm = yield information_1.getInformation();
        ref.set(ifm);
        res.status(200);
        res.send({ sentData: ifm, reference: ref });
    }
    catch (e) {
        console.log(e);
        winston_1.logger.error(e);
        res.status(500);
        res.send({ error_message: e.message });
    }
}));
router.get('/setting/autoUpload/:flag', (req, res) => {
    let setting;
    let reqFlag;
    let flag;
    reqFlag = req.params.flag;
    if (reqFlag === 'true' || reqFlag === 'false' || reqFlag === 'on' || reqFlag === 'off') {
        flag = reqFlag === 'true' || reqFlag === 'on' ? true : false;
    }
    else {
        res.status(400).send({ error: `${flag} is neither true nor false. You can send flag only 'true/false, on/off'` });
    }
    fs_1.default.readFile('./setting.json', 'utf8', (err, data) => {
        if (err) {
            winston_1.logger.error(err);
            res.status(500);
            res.send({ error_message: err.message });
        }
        else {
            setting = JSON.parse(data);
            try {
                setting['autoUpload'] = flag;
                fs_1.default.writeFile('./setting.json', JSON.stringify(setting, null, 4), 'utf8', (err) => {
                    res.status(200).send({ beforeData: JSON.parse(data), afterData: setting });
                });
            }
            catch (err) {
                winston_1.logger.error(err);
                res.status(500);
                res.send({ error_message: err.message });
            }
        }
    });
});
router.get('/setting/:id', (req, res) => {
    let setting;
    fs_1.default.readFile('./setting.json', 'utf8', (err, data) => {
        if (err) {
            winston_1.logger.error(err);
            res.status(500);
            res.send({ error_message: err.message });
        }
        else {
            setting = JSON.parse(data);
            try {
                setting[req.params.id] = req.query.value;
                fs_1.default.writeFile('./setting.json', JSON.stringify(setting, null, 4), 'utf8', (err) => {
                    res.status(200).send({ beforeData: JSON.parse(data), afterData: setting });
                });
            }
            catch (err) {
                winston_1.logger.error(err);
                res.status(500);
                res.send({ error_message: err.message });
            }
        }
    });
});
module.exports = router;
//# sourceMappingURL=router.js.map