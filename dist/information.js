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
Object.defineProperty(exports, "__esModule", { value: true });
const crawl_1 = require("./crawl");
const extract_1 = require("./extract");
exports.getInformation = () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        let result;
        let extracted;
        try {
            result = yield crawl_1.crawl();
        }
        catch (error) {
            console.error(error);
            reject(error);
        }
        try {
            extracted = yield extract_1.extract(result);
        }
        catch (error) {
            console.error(error);
            reject(error);
        }
        // extracted.data[3].archive.push(new OWLTransferPerson());
        resolve(JSON.parse(JSON.stringify(extracted)));
    }));
});
//# sourceMappingURL=information.js.map