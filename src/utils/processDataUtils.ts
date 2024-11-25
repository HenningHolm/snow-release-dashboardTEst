
import { Version, NorskEkstensjon, SmokeTest, GenerateDerivative, Release, VersionProcessStatus } from '../types/commonTypes';

export interface ProcessDataUpdate {
  norskEkstensjon?: NorskEkstensjon[];
  smokeTest?: SmokeTest[];
  generateDerivative?: GenerateDerivative;
  releases?: Release[];
}

export const updateProcessData = (
    version: Version,
    updates: ProcessDataUpdate
  ): Version => {
    return {
      ...version,
      processData: version.processData
        ? {
            ...version.processData,
            ...updates,
            norskEkstensjon: updates.norskEkstensjon
              ? [...(version.processData.norskEkstensjon || []), ...updates.norskEkstensjon]
              : version.processData.norskEkstensjon,
            smokeTest: updates.smokeTest
              ? [...(version.processData.smokeTest || []), ...updates.smokeTest]
              : version.processData.smokeTest,
            generateDerivative: updates.generateDerivative
              ? { ...version.processData.generateDerivative, ...updates.generateDerivative }
              : version.processData.generateDerivative,
            releases: updates.releases
              ? [...(version.processData.releases || []), ...updates.releases]
              : version.processData.releases,
          }
        : {
            version: version.id,
            timeCreated: new Date().toISOString(),
            status: VersionProcessStatus.Opprettet, // Bruk enum her
            norskEkstensjon: updates.norskEkstensjon || [],
            smokeTest: updates.smokeTest || [],
            generateDerivative: updates.generateDerivative || { LM: [], INC: [], FD: [] },
            releases: updates.releases || [],
            // Initialiser andre felter etter behov
          },
    };
  };
