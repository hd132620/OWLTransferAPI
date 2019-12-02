"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function extractRoleText(str) {
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
exports.extractRoleText = extractRoleText;
function extractNationText(str) {
    const forming = str.split(':');
    return forming[1].split(' ')[0];
}
exports.extractNationText = extractNationText;
function extractFormerTeamText(str) {
    const forming = str.split('>');
    return forming[forming.length - 1].trim();
}
exports.extractFormerTeamText = extractFormerTeamText;
exports.extractFormerTeamOpText = extractFormerTeamText;
//# sourceMappingURL=extractUtilText.js.map