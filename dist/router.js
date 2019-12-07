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
const crawl_1 = require("./crawl");
const extract_1 = require("./extract");
const app_1 = require("./app");
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield crawl_1.crawl();
    const extracted = extract_1.extract(result);
    // console.log(extracted);
    res.send(extracted);
}));
router.get('/upload', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield crawl_1.crawl();
        const extracted = extract_1.extract(result);
        const ref = app_1.db.collection('data').doc('lastest');
        ref.set(JSON.parse(JSON.stringify(extracted)));
        res.status(200);
        res.send({ reference: ref });
    }
    catch (e) {
        console.log(e);
        res.status(500);
        res.send({ error_message: e.message });
    }
}));
module.exports = router;
//# sourceMappingURL=router.js.map