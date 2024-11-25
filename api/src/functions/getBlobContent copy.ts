// import { BlobServiceClient } from "@azure/storage-blob";
// import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

// const blobConnectionString = process.env.AZURE_STORAGE_CONNECTION_STRING || "";

// export async function getBlobContent(req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
//     context.log(`HTTP-funksjon henter JSON-filinnhold fra Blob Storage`);

//     if (
//         !req.query || 
//         !Object.prototype.hasOwnProperty.call(req.query, 'containerName') || 
//         !Object.prototype.hasOwnProperty.call(req.query, 'blobName') ||
//         (req.query as any).containerName === undefined || 
//         (req.query as any).blobName === undefined
//     ) {
//         return {
//             status: 400,
//             body: JSON.stringify({ error: "Parameterne 'containerName' og 'blobName' må spesifiseres." }),
//             headers: {
//                 "Access-Control-Allow-Origin": "*",
//                 "Content-Type": "application/json"
//             }
//         };
//     }
    
//     // Sikker måte å hente ut verdiene etter sjekken
//     const containerName = (req.query as any).containerName;
//     const blobName = (req.query as any).blobName;
    

//     console.log("req.query", req.query);
//     if (!containerName || !blobName) {
//         return {
//             status: 400,
//             body: JSON.stringify({ error: "Parameterne 'containerName' og 'blobName' må spesifiseres." }),
//             headers: {
//                 "Access-Control-Allow-Origin": "*",
//                 "Content-Type": "application/json"
//             }
//         };
//     }

//     try {
//         const blobServiceClient = BlobServiceClient.fromConnectionString(blobConnectionString);
//         const containerClient = blobServiceClient.getContainerClient(containerName);
//         const blobClient = containerClient.getBlobClient(blobName);

//         const downloadBlockBlobResponse = await blobClient.download();
//         const downloaded = await streamToString(downloadBlockBlobResponse.readableStreamBody);

//         const jsonData = JSON.parse(downloaded);
//         return {
//             status: 200,
//             body: JSON.stringify(jsonData),
//             headers: {
//                 "Access-Control-Allow-Origin": "*", // Tillater tilgang fra alle domener
//                 "Content-Type": "application/json"
//             }
//         };
//     } catch (error) {
//         context.log('Feil ved henting av JSON-filinnhold:', error);

//         return {
//             status: 500,
//             body: JSON.stringify({ error: 'En feil oppstod ved henting av JSON-filinnhold.' }),
//             headers: {
//                 "Access-Control-Allow-Origin": "*", // Tillater tilgang fra alle domener
//                 "Content-Type": "application/json"
//             }
//         };
//     }
// }

// // Hjelpefunksjon for å konvertere stream til string
// async function streamToString(readableStream: NodeJS.ReadableStream | null): Promise<string> {
//     return new Promise((resolve, reject) => {
//         const chunks: any[] = [];
//         readableStream?.on("data", (data) => {
//             chunks.push(data.toString());
//         });
//         readableStream?.on("end", () => {
//             resolve(chunks.join(""));
//         });
//         readableStream?.on("error", reject);
//     });
// }

// app.http('getBlobContent', {
//     methods: ['GET', 'OPTIONS'], // Inkluderer OPTIONS for preflight-sjekk
//     authLevel: 'anonymous',
//     handler: getBlobContent
// });
