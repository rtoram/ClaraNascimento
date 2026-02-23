import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeContent = async (content: string): Promise<AnalysisResult> => {
  const model = 'gemini-3-flash-preview';
  
  const response = await ai.models.generateContent({
    model,
    contents: `Você é o consultor de arquitetura sênior do escritório de Clara Nascimento. 
    Analise o conteúdo extraído e forneça um estudo de viabilidade técnica e estética.
    
    INSTRUÇÕES ESPECÍFICAS:
    1. Extraia URLs de imagens de projetos.
    2. Identifique projetos específicos mencionados, incluindo NOME, ANO e LOCALIZAÇÃO se disponíveis.
    3. Foque em tendências de design (ex: Sustentabilidade, Tropical Modernism).
    
    Conteúdo para análise: \n\n${content}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          keyInsights: { type: Type.ARRAY, items: { type: Type.STRING } },
          entities: { type: Type.ARRAY, items: { type: Type.STRING } },
          suggestedActions: { type: Type.ARRAY, items: { type: Type.STRING } },
          imageUrlReferences: { type: Type.ARRAY, items: { type: Type.STRING } },
          projects: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                year: { type: Type.STRING },
                location: { type: Type.STRING },
                description: { type: Type.STRING }
              }
            }
          }
        },
        required: ["summary", "keyInsights", "entities", "suggestedActions"]
      }
    }
  });

  return JSON.parse(response.text.trim()) as AnalysisResult;
};

export const chatWithContent = async (content: string, userMessage: string, history: any[]) => {
  const model = 'gemini-3-flash-preview';
  
  const chat = ai.chats.create({
    model,
    config: {
      systemInstruction: `Você é a assistente inteligente da Arquiteta Clara Nascimento. Você tem acesso a este conteúdo técnico: \n\n${content}\n\nResponda sempre em Português Brasil, de forma elegante, profissional e técnica.`,
    }
  });

  const result = await chat.sendMessage({ message: userMessage });
  return result.text;
};