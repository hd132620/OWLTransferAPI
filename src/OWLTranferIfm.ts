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
}

export class OWLTransferIfm {
  updated: Date;
  data: OWLTransfer[];
}
