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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const information_1 = require("./information");
const fs_1 = __importDefault(require("fs"));
const admin = __importStar(require("firebase-admin"));
const winston_1 = require("./config/winston");
const setting = require('../setting.json');
let a = 1;
let repeater;
let currentSetting;
const autoUploadMain = () => __awaiter(void 0, void 0, void 0, function* () {
    winston_1.logger.info(`Upload start ${a}`);
    try {
        const ref = app_1.db.collection('data').doc('lastest');
        ref.set(yield information_1.getInformation());
        winston_1.logger.info(`Upload success ${a}`);
    }
    catch (e) {
        winston_1.logger.info(`Upload fail! ${a}`);
        winston_1.logger.error(e);
        const errRef = app_1.db.collection('log').doc('uploadFail');
        errRef.update({
            log: admin.firestore.FieldValue.arrayUnion({
                updatedTime: new Date().toLocaleString(),
                error: e,
            }),
        });
    }
    a += 1;
});
const autoUploadInside = (beforeInterval) => {
    currentSetting = JSON.parse(fs_1.default.readFileSync('./setting.json', 'utf8'));
    if (currentSetting.autoUpload) {
        autoUploadMain();
    }
    if (beforeInterval !== currentSetting.uploadInterval) {
        clearInterval(repeater);
        repeater = setInterval(autoUploadInside, currentSetting.uploadInterval, currentSetting.uploadInterval);
    }
};
exports.autoUpload = () => {
    repeater = setInterval(autoUploadInside, setting.uploadInterval, setting.uploadInterval);
};
//# sourceMappingURL=upload.js.map