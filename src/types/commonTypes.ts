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
  loadVersion: () => Promise<void>;
  selectVersion: (versionId: number) => Promise<void>;
  createVersion: (versionId: number) => Promise<void>;
}

export interface StoreState {
  versions: Version[];
  selectedVersionId: number | undefined;
  versionProcessDoc: VersionProcessDocument | null;
}
  

export interface VersionProcessDocument {
  version: string;
  timeCreated: string;
  status: VersionProcessStatus;
  norskEkstensjon: any[];
  smokeTest: any[];
  generateDerivative: {
    LM: any[];
    INC: any[];
    FD: any[];
  };
  releases: any[];
}


