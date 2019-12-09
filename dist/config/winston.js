"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importStar(require("winston"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const { combine, timestamp, printf } = winston_1.format;
const customFormat = printf((info) => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
});
const logger = winston_1.default.createLogger({
    format: combine(timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
    }), customFormat),
    transports: [
        new winston_1.default.transports.Console(),
        new winston_daily_rotate_file_1.default({
            level: 'info',
            datePattern: 'YYYYMMDD',
            dirname: './logs',
            filename: 'OWLTransfer_UploadServer_%DATE%.log',
            maxSize: null,
            maxFiles: 14,
        }),
    ],
});
exports.logger = logger;
const stream = {
    write: (message) => {
        logger.info(message);
    },
};
exports.stream = stream;
//# sourceMappingURL=winston.js.map