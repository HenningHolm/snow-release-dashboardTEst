// message.ts
import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

export async function message(req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${req.url}"`);
    
    return { 
        body: JSON.stringify({ text: "Hello from the API" }),
        headers: { 
            
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json" 
        }
    };
}

app.http('message', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: message
});