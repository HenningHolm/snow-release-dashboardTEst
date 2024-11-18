enum ReleaseProcessStatus {
    CREATED = 'CREATED',
    DEPLOYED = 'DEPLOYED',
    DEPRECATED = 'DEPRECATED',
}

interface ReleaseProcessDocument {
    version: string;
    status: ReleaseProcessStatus;
    timeCreated: string;
    norskEkstensjon: any[];
    smokeTest: any[];
    generateDerivative: any;
}


export class StepHandler {
    private releaseProcessObj: ReleaseProcessDocument;
  
    constructor() {
      //fetch release process object from API
      this.releaseProcessObj = {
        version: '',
        status: ReleaseProcessStatus.CREATED,
        timeCreated: '',
        norskEkstensjon: [],
        smokeTest: [],
        generateDerivative: {},
      };
    }
  
    // Metode for å opprette en ny release
    async createRelease(versionName: string): Promise<void> {


      // For nå, oppdaterer vi bare state lokalt
      this.releaseProcessObj.version = versionName;
      this.releaseProcessObj.status = ReleaseProcessStatus.CREATED;
      this.releaseProcessObj.timeCreated = new Date().toISOString();
  
      // Senere kan du legge til API-kallet her
      // const response = await apiService.createRelease(versionName);
      // Håndter responsen og oppdater state hvis nødvendig
  
      console.log(`Release opprettet med navn: ${versionName}`);
    }
  
    // Metode for å sette eller hente en eksisterende release
    setRelease(data: ReleaseProcessDocument): void {
      this.releaseProcessObj = data;
      console.log('Release satt:', this.releaseProcessObj);
    }
  
    // Metode for å hente tilstanden
    getState(): any {
      return this.releaseProcessObj;
    }
  
    // Legg til flere metoder for andre steg
    // For eksempel:
    async uploadNorskEkstensjon(file: File): Promise<void> {
      // Oppdater state lokalt
      const newEkstensjon = {
        id: Date.now(),
        fileName: file.name,
        selected: true,
      };
      this.releaseProcessObj.norskEkstensjon.push(newEkstensjon);
      // Senere kan du legge til API-kall for opplasting her
      console.log('Norsk ekstensjon lastet opp:', file.name);
    }

    // Metoder for smoke test, generate derivative, etc.
  }
  
  export const stepHandler = new StepHandler();
  