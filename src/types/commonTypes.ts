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
  selectedVersionId: number | undefined;
}


export interface VersionProcessDocument {
  version: number;
  timeCreated: string;
  status: VersionProcessStatus;
  norskEkstensjon: NorskEkstensjon[];
  smokeTest: SmokeTest[];
  generateDerivative: GenerateDerivative;
  releases: Release[];
}


export interface NorskEkstensjon {
  id: string;
  fileName: string;
  logfile: string;
  selected: boolean;
}

export interface SmokeTest {
  id: string;
  logfile: string;
}

export interface GenerateDerivative {
  LM: {id: string, logfile: string }[];
  INC: {id: string, logfile: string }[];
  FD: {id: string, logfile: string }[];
}

export interface Release {
  id: string;
  logfile: string;
}