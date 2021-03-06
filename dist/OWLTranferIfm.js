"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OWLFormerTeam {
    constructor() {
        this.team = null;
        this.formerPosition = null;
    }
}
exports.OWLFormerTeam = OWLFormerTeam;
class OWLTransferPerson {
    constructor() {
        this.name = '';
        this.id = '';
        this.position = '';
        this.nationality = [];
        this.formerTeam = new OWLFormerTeam();
    }
}
exports.OWLTransferPerson = OWLTransferPerson;
class OWLTransfer {
    constructor(str) {
        this.team = str;
        this.archive = [];
    }
}
exports.OWLTransfer = OWLTransfer;
class OWLTransferIfm extends Object {
    constructor() {
        super();
        // this.updated = null;
        this.data = [];
    }
    // update() {
    //   this.updated = new Date();
    //   this.updated.setHours(this.updated.getHours() + 9);
    // }
    pushTeam(str) {
        this.data.push(new OWLTransfer(str));
    }
    pushPerson(person) {
        this.data[this.data.length - 1].archive.push(person);
    }
}
exports.OWLTransferIfm = OWLTransferIfm;
//# sourceMappingURL=OWLTranferIfm.js.map