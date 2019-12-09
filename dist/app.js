"use strict";
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
const express_1 = __importDefault(require("express"));
const admin = __importStar(require("firebase-admin"));
const upload_1 = require("./upload");
const morgan_1 = __importDefault(require("morgan"));
const winston_1 = require("./config/winston");
const body_parser_1 = __importDefault(require("body-parser"));
const app = express_1.default();
const serviceAccount = require('../../../owltransfer2020-firebase-adminsdk-h6o7i-364f08ab86.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
exports.db = admin.firestore();
app.use(body_parser_1.default.json());
app.use(morgan_1.default('combined', { stream: winston_1.stream }));
app.use(require('./router'));
app.listen(3000, () => {
    console.log('Server listening on port 3000!');
});
upload_1.autoUpload();
//# sourceMappingURL=app.js.map