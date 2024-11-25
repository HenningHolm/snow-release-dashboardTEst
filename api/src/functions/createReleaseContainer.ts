import { BlobServiceClient } from "@azure/storage-blob";
import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

const blobConnectionString = process.env.AZURE_STORAGE_CONNECTION_STRING || "";

interface RequestBody {
    containerName: string;
}

export async function createReleaseContainer(req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`HTTP function creating new release container in Blob Storage`);

    // Handle preflight check
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
            body: JSON.stringify({ error: "Parameter 'containerName' missing in request body." }),
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
                body: JSON.stringify({ error: `Container with name '${containerName}' already exists.` }),
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json"
                }
            };
        }

        await containerClient.create();

        // Now create the initial releaseProcess.json blob inside the container

        const initialData = {
            version: containerName,
            timeCreated: new Date().toISOString(),
            status: "Opprettet",
            norskEkstensjon: [],
            smokeTest: [],
            generateDerivative: {
                LM: [],
                INC: [],
                FD: []
            },
            releases: []
        };

        const blockBlobClient = containerClient.getBlockBlobClient('releaseProcess.json');

        await blockBlobClient.upload(
            Buffer.from(JSON.stringify(initialData), 'utf-8'),
            Buffer.byteLength(JSON.stringify(initialData))
        );

        return {
            status: 201,
            body: JSON.stringify({ 
                message: `Container with name '${containerName}' created and releaseProcess.json initialized.`,
                containerName : containerName    
            }),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            }
        };
    } catch (error) {
        context.log('Error creating release container:', error);

        return {
            status: 500,
            body: JSON.stringify({ error: 'An error occurred while creating the release container.' }),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            }
        };
    }
}

app.http('createReleaseContainer', {
    methods: ['POST', 'OPTIONS'],
    authLevel: 'anonymous',
    handler: createReleaseContainer
});