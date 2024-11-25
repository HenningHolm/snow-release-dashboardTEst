import { BlobServiceClient } from "@azure/storage-blob";
import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

const blobConnectionString = process.env.AZURE_STORAGE_CONNECTION_STRING || "";

interface RequestBody {
    containerName: string;
}

export async function createContainer(req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`HTTP-funksjon oppretter ny container i Blob Storage`);

    // Håndter preflight-sjekk
    if (req.method === "OPTIONS") {
        return {
            status: 204,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            }
        };
    }

    const { containerName } = await req.json() as RequestBody;
    if (!containerName) {
        return {
            status: 400,
            body: JSON.stringify({ error: "Parameter 'versionName' mangler i forespørselens body." }),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            }
        };
    }

    try {
        const blobServiceClient = BlobServiceClient.fromConnectionString(blobConnectionString);
        const containerClient = blobServiceClient.getContainerClient(containerName);

        const exists = await containerClient.exists();
        if (exists) {
            return {
                status: 409,
                body: JSON.stringify({ error: `Container med navnet '${containerName}' eksisterer allerede.` }),
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json"
                }
            };
        }

        await containerClient.create();

        return {
            status: 201,
            body: JSON.stringify({ 
                message: `Container with name '${containerName}' er opprettet.`,
                containerName : containerName    
            }),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            }
        };
    } catch (error) {
        context.log('Feil ved opprettelse av container:', error);

        return {
            status: 500,
            body: JSON.stringify({ error: 'En feil oppstod ved opprettelse av container.' }),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            }
        };
    }
}

app.http('createContainer', {
    methods: ['POST', 'OPTIONS'],
    authLevel: 'anonymous',
    handler: createContainer
});
