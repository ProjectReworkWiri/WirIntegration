<<<<<<< HEAD
const N8N_BASE = process.env.N8N_WEBHOOK_BASE; // ej: https://n8n-riwi.emausoft.com/webhook
 
/**
 * Llama a un webhook de n8n enviando datos del usuario.
 * Si falla, solo loguea el error — nunca bloquea el flujo principal.
 */
const notifyN8n = async (path, payload) => {
    console.log(`[n8n] Llamando a: ${process.env.N8N_WEBHOOK_BASE}/${path}`);
    console.log(`[n8n] Payload:`, payload);
    try {
        const res = await fetch(`${process.env.N8N_WEBHOOK_BASE}/${path}`, {
=======
import "dotenv/config";

// Base URL for n8n webhooks (stored in environment variables)
const N8N_BASE = process.env.N8N_WEBHOOK_BASE; 


const notifyN8n = async (path, payload) => {

    // Log the webhook endpoint and payload for debugging
    console.log(`[n8n] Calling: ${N8N_BASE}/${path}`);
    console.log(`[n8n] Payload:`, payload);

    try {
        // Send POST request to the webhook
        const res = await fetch(`${N8N_BASE}/${path}`, {
>>>>>>> 6ce25b36f8885c6b442e86ef96400980d33a1d8c
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
<<<<<<< HEAD
        console.log(`[n8n] Respuesta:`, res.status);
    } catch (error) {
        console.error(`[n8n] Error:`, error.message);
    }
};
 
export const notifyRegister = (name, email) =>
    notifyN8n("zenith-register", { name, email });
 
export const notifyLogin = (name, email) =>
    notifyN8n("zenith-login", { name, email });
 
=======

        // Log response status
        /* console.log(`[n8n] Response:`, res.status); */

    } catch (error) {
        // Log error without interrupting the main application flow
        console.error(`[n8n] Error:`, error.message);
    }
};

// Notify n8n when a user logs in
export const notifyLogin = (name, email) =>
    notifyN8n("Zenith-login", { name, email });

// NUEVO: Notify n8n to send the email confirmation with the token
export const notifyEmailConfirmation = (name, email, token) =>
    notifyN8n("Zenith-email", { name, email, token });
>>>>>>> 6ce25b36f8885c6b442e86ef96400980d33a1d8c
