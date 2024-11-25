import { BlobServiceClient } from "@azure/storage-blob";
import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

const blobConnectionString = process.env.AZURE_STORAGE_CONNECTION_STRING || "";

export async function getBlobContent(req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`HTTP-funksjon henter JSON-filinnhold fra Blob Storage`);

    // Håndter preflight-sjekk
    if (req.method === "OPTIONS") {
        return {
            status: 204,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
        };
    }

    console.log("req.query lala", req.query);

    // Hent verdiene fra URLSearchParams
    const containerName = req.query.get('containerName');
    const blobName = req.query.get('blobName');

    if (!containerName || !blobName) {
        console.log("there is no containerName or blobName, containerName:", containerName, "blobName:", blobName);
        return {
            status: 400,
            body: JSON.stringify({ error: "Parameterne 'containerName' og 'blobName' må spesifiseres." }),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            }
        };
    }

    try {
        const blobServiceClient = BlobServiceClient.fromConnectionString(blobConnectionString);
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blobClient = containerClient.getBlobClient(blobName);

        const downloadBlockBlobResponse = await blobClient.download();
        const downloaded = await streamToString(downloadBlockBlobResponse.readableStreamBody);

        const jsonData = JSON.parse(downloaded);
        return {
            status: 200,
            body: JSON.stringify(jsonData),
            headers: {
                "Access-Control-Allow-Origin": "*", // Tillater tilgang fra alle domener
                "Content-Type": "application/json"
            }
        };
    } catch (error) {
        context.log('Feil ved henting av JSON-filinnhold:', error);

        return {
            status: 500,
            body: JSON.stringify({ error: 'En feil oppstod ved henting av JSON-filinnhold.' }),
            headers: {
                "Access-Control-Allow-Origin": "*", // Tillater tilgang fra alle domener
                "Content-Type": "application/json"
            }
        };
    }
}

// Hjelpefunksjon for å konvertere stream til string
async function streamToString(readableStream: NodeJS.ReadableStream | null): Promise<string> {
    return new Promise((resolve, reject) => {
        const chunks: any[] = [];
        readableStream?.on("data", (data) => {
            chunks.push(data.toString());
        });
        readableStream?.on("end", () => {
            resolve(chunks.join(""));
        });
        readableStream?.on("error", reject);
    });
}

app.http('getBlobContent', {
    methods: ['GET', 'OPTIONS'], // Inkluderer OPTIONS for preflight-sjekk
    authLevel: 'anonymous',
    handler: getBlobContent
});
