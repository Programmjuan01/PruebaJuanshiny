
import { GoogleGenAI, Type } from "@google/genai";
import { Budget, Expense } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getFinancialAudit = async (budget: Budget, expenses: Expense[]) => {
  const prompt = `
    Analiza este presupuesto y gastos. Proporciona 3 consejos prácticos en español.
    Presupuesto mensual: ${budget.totalIncome} ${budget.currency}
    Gastos fijos: ${JSON.stringify(budget.fixedCosts)}
    Ahorro objetivo: ${budget.savingsTarget}
    Gastos reales registrados: ${JSON.stringify(expenses)}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              message: { type: Type.STRING },
              type: { type: Type.STRING, enum: ['success', 'warning', 'info'] }
            },
            required: ['title', 'message', 'type']
          }
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return [
      { title: "Error de IA", message: "No pudimos generar insights en este momento.", type: "warning" }
    ];
  }
};
