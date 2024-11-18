export interface ReleaseIdProps {
    releaseId: number | undefined;
  }

export interface Release {
  id: number;
  blobs: string[];
  state: string;
}
  