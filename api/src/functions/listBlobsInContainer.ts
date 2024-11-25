import { BlobServiceClient } from "@azure/storage-blob";
import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

// Azure Blob Storage-konfigurasjon
const blobConnectionString = process.env.AZURE_STORAGE_CONNECTION_STRING || "";

export async function listBlobsInContainer(req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`HTTP-funksjon henter liste over blobs i en container`);

    // Hent 'containerName' fra forespørselens query-parametere
    const containerName = req.query.get('containerName');

    if (!containerName) {
        return {
            status: 400,
            body: JSON.stringify({ error: "Parameter 'containerName' mangler i forespørselen." }),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            }
        };
    }

    try {
        // Opprett BlobServiceClient
        const blobServiceClient = BlobServiceClient.fromConnectionString(blobConnectionString);

        // Hent ContainerClient for den gitte containeren
        const containerClient = blobServiceClient.getContainerClient(containerName);

        // Sjekk om containeren eksisterer
        const exists = await containerClient.exists();
        if (!exists) {
            return {
                status: 404,
                body: JSON.stringify({ error: `Container med navnet '${containerName}' ble ikke funnet.` }),
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json"
                }
            };
        }

        // Liste over blob-navn
        const blobsList: string[] = [];

        // Iterer over blobs i containeren
        for await (const blob of containerClient.listBlobsFlat()) {
            blobsList.push(blob.name);
        }

        return {
            status: 200,
            body: JSON.stringify({ blobs: blobsList }),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            }
        };

    } catch (error) {
        context.log('Feil ved henting av blobs:', error);

        return {
            status: 500,
            body: JSON.stringify({ error: 'En feil oppstod ved henting av blobs.' }),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            }
        };
    }
}

app.http('listBlobsInContainer', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: listBlobsInContainer
});
