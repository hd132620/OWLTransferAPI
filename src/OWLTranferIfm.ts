export class OWLFormerTeam {
  team: string;
  formerPosition: string;
  constructor() {
    this.team = null;
    this.formerPosition = null;
  }
}

export class OWLTransferPerson {
  name: string;
  id: string;
  position: string;
  nationality: string[];
  formerTeam: OWLFormerTeam;
}

export class OWLTransfer {
  team: string;
  archive: OWLTransferPerson[];

  constructor(str: string) {
    this.team = str;
    this.archive = [];
  }

}

export class OWLTransferIfm {
  updated: Date;
  data: OWLTransfer[];

  constructor() {
    this.updated = null;
    this.data = [];
  }

  update() {
    this.updated = new Date();
    this.updated.setHours(this.updated.getHours() + 9);
  }

  pushTeam(str: string) {
    this.data.push(new OWLTransfer(str));
  }

  pushPerson(person: OWLTransferPerson) {
    this.data[this.data.length - 1].archive.push(person);
  }
}
