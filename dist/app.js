"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const app = express_1.default();
app.use(require('./router'));
app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
//# sourceMappingURL=app.js.map