export interface VersionIdProps {
    versionId: number | undefined;
  }

export interface Version {
  id: number;
  blobs: string[];
  state: VersionProcessStatus;
  processData: VersionProcessDocument | null;
}

export enum VersionProcessStatus {
  Opprettet = 'Opprettet',
  Publisert = 'Publisert',
  Historisk = 'Historisk',
}

export interface StoreActions {
  loadVersion: () => Promise<Version[]>;
  selectVersion: (versionId: number) => void;
  createVersion: (versionId: number) => Promise<void>;
  addNorskEkstensjon: (file: File) => Promise<void>;
}

export interface StoreState {
  versions: Version[];
  selectedVersion: Version | undefined;
}


export interface VersionProcessDocument {
  version: number;
  timeCreated: string;
  status: VersionProcessStatus;
  norskEkstensjon: NorskEkstensjon[];
  smokeTest: any[];
  generateDerivative: {
    LM: any[];
    INC: any[];
    FD: any[];
  };
  releases: any[];
}


// "norskEkstensjon": [
//   {
//       "id": "abc",
//       "fileName": "SnomedCT_ManagedServiceNO_PRODUCTION_NO1000202_20240915T120000Z (6).zip",
//       "logfile": "SnomedCT_ManagedServiceNO_PRODUCTION_NO1000202_20240915T120000Z (6).json",
//       "selected": true
//   }
// ]


export interface NorskEkstensjon {
  id: string;
  fileName: string;
  logfile: string;
  selected: boolean;
}