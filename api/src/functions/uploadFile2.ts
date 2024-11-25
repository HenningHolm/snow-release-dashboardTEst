// uploadFile2.ts

import { BlobServiceClient } from "@azure/storage-blob";
import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import Busboy from 'busboy';
import { Readable } from 'stream';
import { promises as fs } from 'fs';

const blobConnectionString = process.env.AZURE_STORAGE_CONNECTION_STRING || "";

export async function uploadFile2(req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`HTTP-funksjon for filopplasting til Blob Storage`);

    // Håndter preflight-sjekk
    if (req.method === "OPTIONS") {
        return {
            status: 204,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
        };
    }

    if (req.method !== "POST") {
        return {
            status: 405,
            body: JSON.stringify({ error: "Method not allowed. Use POST." }),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            }
        };
    }

    return new Promise<HttpResponseInit>((resolve) => {
        const busboy = new Busboy({ headers: req.headers });
        let containerName = '';
        let filePath = '';
        let mimetype = '';

        busboy.on('field', (fieldname, val) => {
            if (fieldname === 'containerName') {
                containerName = val;
                context.log(`Container Name: ${containerName}`);
            }
        });

        busboy.on('file', (fieldname, file, filename, encoding, mimetype_) => {
            context.log(`Laster opp fil: ${filename}`);
            const tempFilePath = `/tmp/${filename}`;
            const writeStream = fs.createWriteStream(tempFilePath);
            file.pipe(writeStream);
            filePath = tempFilePath;
            mimetype = mimetype_;
        });

        busboy.on('finish', async () => {
            context.log('Parsing fullført med busboy');

            if (!containerName || !filePath) {
                resolve({
                    status: 400,
                    body: JSON.stringify({ error: "Parameterne 'containerName' og 'file' må spesifiseres." }),
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json"
                    }
                });
                return;
            }

            try {
                const blobServiceClient = BlobServiceClient.fromConnectionString(blobConnectionString);
                const containerClient = blobServiceClient.getContainerClient(containerName);

                // Sørg for at containeren eksisterer
                await containerClient.createIfNotExists({
                    access: 'container',
                });
                context.log('Container sjekket/opprettet');

                const blobClient = containerClient.getBlockBlobClient(filePath.split('/').pop() || "uploaded_file");
                context.log('Blob client opprettet');

                // Les filinnholdet asynkront
                const fileContent = await fs.readFile(filePath);
                context.log('Filinnhold lest');

                // Last opp filen til Blob Storage
                await blobClient.uploadData(fileContent, {
                    blobHTTPHeaders: { blobContentType: mimetype || "application/octet-stream" }
                });
                context.log('Fil lastet opp til Blob Storage');

                // Fjern midlertidig fil
                try {
                    await fs.unlink(filePath);
                    context.log('Midlertidig fil slettet');
                } catch (err) {
                    context.log('Feil ved sletting av midlertidig fil:', err);
                }

                resolve({
                    status: 200,
                    body: JSON.stringify({ message: "Fil lastet opp suksessfullt.", blobUrl: blobClient.url }),
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json"
                    }
                });
            } catch (error) {
                context.log('Feil ved opplasting av fil til Blob Storage:', error);
                resolve({
                    status: 500,
                    body: JSON.stringify({ error: "En feil oppstod ved opplasting av filen." }),
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json"
                    }
                });
            }
        });

        // Konverter req.body til Readable Stream og pipe til busboy
        const readable = Readable.from(req.body as Buffer);
        context.log('Piper body til busboy');
        readable.pipe(busboy);
    });
}

// Definer HTTP-triggere for funksjonen
app.http('uploadFile2', {
    methods: ['POST', 'OPTIONS'],
    authLevel: 'anonymous',
    handler: uploadFile2
});
