// uploadFile.ts

import { BlobServiceClient } from "@azure/storage-blob";
import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import formidable from "formidable";
import * as fs from "fs";
import { promisify } from "util";

const blobConnectionString = process.env.AZURE_STORAGE_CONNECTION_STRING || "";

// Promisify fs.readFile og fs.unlink for enklere async/await bruk
const readFile = promisify(fs.readFile);
const unlink = promisify(fs.unlink);

export async function uploadFile(req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
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
    context.log(`Klar for å parse form-data`);	
    // Pars innkommende form-data
    const form = new formidable.IncomingForm();
    console.log("form loaded");

    const parseForm = () => {
        return new Promise<{ fields: formidable.Fields; files: formidable.Files }>((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve({ fields, files });
            });
        });
    };

    let fields: formidable.Fields;
    let files: formidable.Files;

    try {
        ({ fields, files } = await parseForm());
    } catch (error) {
        context.log('Feil ved parsing av form-data:', error);
        return {
            status: 400,
            body: JSON.stringify({ error: "Feil ved parsing av form-data." }),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            }
        };
    }

    const containerName = fields.containerName as string;
    const file = files.file as formidable.File;

    if (!containerName || !file) {
        return {
            status: 400,
            body: JSON.stringify({ error: "Parameterne 'containerName' og 'file' må spesifiseres." }),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            }
        };
    }

    try {
        const blobServiceClient = BlobServiceClient.fromConnectionString(blobConnectionString);
        const containerClient = blobServiceClient.getContainerClient(containerName);

        // Sørg for at containeren eksisterer
        await containerClient.createIfNotExists({
            access: 'container',
        });

        const blobClient = containerClient.getBlockBlobClient(file.originalFilename || file.newFilename || "uploaded_file");

        // Les filinnholdet
        const fileContent = await readFile(file.filepath);

        // Last opp filen til Blob Storage
        await blobClient.uploadData(fileContent, {
            blobHTTPHeaders: { blobContentType: file.mimetype || "application/octet-stream" }
        });

        // Fjern midlertidig fil
        try {
            await unlink(file.filepath);
        } catch (err) {
            context.log('Feil ved sletting av midlertidig fil:', err);
        }

        return {
            status: 200,
            body: JSON.stringify({ message: "Fil lastet opp suksessfullt.", blobUrl: blobClient.url }),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            }
        };
    } catch (error) {
        context.log('Feil ved opplasting av fil til Blob Storage:', error);
        return {
            status: 500,
            body: JSON.stringify({ error: "En feil oppstod ved opplasting av filen." }),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            }
        };
    }
}

// Definer HTTP-triggere for funksjonen
app.http('uploadFile', {
    methods: ['POST', 'OPTIONS'],
    authLevel: 'anonymous',
    handler: uploadFile
});
