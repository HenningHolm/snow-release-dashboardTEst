import { BlobServiceClient } from "@azure/storage-blob";
import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

// Azure Blob Storage-konfigurasjon
const blobConnectionString = process.env.AZURE_STORAGE_CONNECTION_STRING || "";

export async function listContainers(req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`HTTP-funksjon henter liste over containere i Blob Storage`);

    // Opprett BlobServiceClient
    const blobServiceClient = BlobServiceClient.fromConnectionString(blobConnectionString);

    // Liste over containere og deres blobs
    const containerList: { containerName: string, blobs?: string[] }[] = [];

    // Iterer over hver container
    for await (const container of blobServiceClient.listContainers()) {
        const containerInfo = { containerName: container.name, blobs: [] as string[] };

        // Valgfritt: Hent en liste over blobs i hver container
        const containerClient = blobServiceClient.getContainerClient(container.name);
        for await (const blob of containerClient.listBlobsFlat()) {
            containerInfo.blobs?.push(blob.name);
        }

        containerList.push(containerInfo);
    }

    return { 
        body: JSON.stringify({ containers: containerList }),
        headers: { 
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json" 
        }
    };
}

app.http('listContainers', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: listContainers
});