
import { GoogleGenAI, Type } from "@google/genai";
import { AxisScore, Category } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generatePersonalizedRoadmap(
  totalScore: number,
  category: Category,
  axisScores: AxisScore[]
): Promise<string> {
  const modelName = "gemini-3-flash-preview";
  
  const scoresStr = axisScores.map(s => `${s.axis}: ${(s.score/s.maxScore*100).toFixed(0)}%`).join(', ');
  
  const prompt = `
    Analiza este perfil de profesional respecto a su capacidad de ser un Embajador de IA en su empresa:
    - Puntaje Total: ${totalScore}/100
    - Categoría: ${category.name}
    - Desglose por ejes: ${scoresStr}

    Por favor, genera un plan de acción estratégico personalizado de 3 pasos concretos en formato Markdown. 
    El tono debe ser motivador, profesional y visionario. 
    Incluye un consejo final de "Power Move" para destacar en su organización.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        systemInstruction: "Eres un Consultor Senior de Transformación Digital y RRHH experto en Inteligencia Artificial. Tu objetivo es empoderar a los empleados para liderar el cambio tecnológico.",
        temperature: 0.7,
      }
    });

    return response.text || "No se pudo generar el plan personalizado. Inténtalo de nuevo.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Ocurrió un error consultando a la IA. Pero recuerda: ¡tu potencial es ilimitado!";
  }
}
