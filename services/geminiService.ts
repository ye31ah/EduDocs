import { GoogleGenAI } from "@google/genai";
import type { Document, User } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY не установлен. ИИ-помощник не будет работать.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const getAiResponse = async (
    query: string, 
    user: User, 
    documents: Document[]
): Promise<string> => {
    if (!API_KEY) {
        return "ИИ-помощник в данный момент недоступен, так как ключ API не настроен.";
    }

    const model = 'gemini-2.5-flash';
    
    // Create a concise summary of documents for the prompt context
    const documentContext = documents.map(doc => 
        `- Документ: "${doc.fileName}" (Тип: ${doc.documentType}), Статус: ${doc.status}, Последнее обновление: ${doc.updatedAt.toLocaleDateString()}`
    ).join('\n');

    const prompt = `
        Ты — ИИ-помощник для EduDocs School, платформы для управления документами.
        Ты помогаешь пользователю по имени ${user.name}, который является ${user.role}.
        Твоя задача — отвечать на вопросы, основываясь на предоставленной ниже информации о документах.
        Будь полезным, кратким и дружелюбным. Если информация недоступна, вежливо сообщи об этом.

        Вот текущий список документов для пользователя ${user.name}:
        ${documentContext.length > 0 ? documentContext : "Для этого пользователя не найдено документов."}

        Вопрос пользователя: "${query}"

        Твой ответ:
    `;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Ошибка при вызове Gemini API:", error);
        return "К сожалению, при обработке вашего запроса произошла ошибка. Пожалуйста, попробуйте еще раз позже.";
    }
};