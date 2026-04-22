import express from "express";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

let aiClient: GoogleGenAI | null = null;

function getAiClient() {
  if (!aiClient) {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Missing GEMINI_API_KEY environment variable");
    }
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for chat
  app.post("/api/chat", async (req, res) => {
    try {
      const ai = getAiClient();
      const { messages } = req.body;
      
      const systemInstruction = `Eres ExcusasExpress Bot, un asistente humorístico, rápido y creativo. Tu único trabajo es dar a los usuarios excusas PERFECTAS, creíbles pero ingeniosas para librarse de planes, reuniones, citas o trabajo. Mantén respuestas cortas, directas y divertidas. Habla en tono coloquial español. Proporciona la excusa directamente.`;

      const formattedMessages = messages.map((m: any) => ({
        role: m.role === 'bot' ? 'model' : 'user',
        parts: [{ text: m.text }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: formattedMessages,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.8,
        }
      });

      res.json({ reply: response.text });
    } catch (error: any) {
      const errorMessage = error?.message || "";
      if (errorMessage.includes("GEMINI_API_KEY") || errorMessage.includes("API_KEY_INVALID") || errorMessage.includes("API key not valid") || errorMessage.includes("API key not valid. Please pass a valid API key.")) {
         return res.status(400).json({ error: "No se ha configurado una API Key de Gemini válida. Por favor, añádela o corrígela en la configuración de Secrets (icono de llave inglesa)." });
      }
      
      // Log other errors
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: "No se pudo generar la excusa, la IA está descansando." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

