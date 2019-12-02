"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTeam = (ic) => {
    try {
        if (ic.firstChild.type === 'text') {
            // 처음에 빈 요소가 있다면
            return ic.children[1].lastChild.attribs.title;
        }
        if (ic.firstChild.type === 'tag') {
            // 바로 tag가 있다면
            if (ic.firstChild.name === 'strong') {
                // 그 태그가 strong 태그면
                return ic.firstChild.lastChild.attribs.title;
            }
            // a 태그면 (기타의 경우)
            return ic.children[2].attribs.title;
        }
        throw new Error('Exception occured!');
    }
    catch (error) {
        console.error('Team detection error!');
        console.error(ic.children);
        console.error(error);
    }
};
//# sourceMappingURL=extractTeam.js.map