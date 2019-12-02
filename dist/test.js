"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function extractRole(str) {
    const forming = str.split('_');
    switch (forming[forming.length - 1].split('.')[0]) {
        case 'offense': {
            return '공격';
        }
        case 'tank': {
            return '돌격';
        }
        case 'support': {
            return '지원';
        }
    }
}
exports.extractRole = extractRole;
function extractNation(str) {
    const forming = str.split(':');
    return forming[1].split(' ')[0];
}
exports.extractNation = extractNation;
function extractFormerTeam(str) {
    const forming = str.split('>');
    return forming[forming.length - 1].trim();
}
exports.extractFormerTeam = extractFormerTeam;
exports.extractFormerTeamOp = extractFormerTeam;
//# sourceMappingURL=test.js.map