import { GoogleGenAI } from "@google/genai";

// Initialize Gemini client using the environment variable as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Sends a message to the Gemini model and returns the response.
 * Uses 'gemini-3-flash-preview' for fast, conversational responses.
 */
export const sendChatMessage = async (
  message: string,
  history: { role: 'user' | 'model'; parts: { text: string }[] }[]
): Promise<string> => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `Ты — 'MadN AI', менеджер проектов веб-студии MadN.
        Мы — студия полного цикла. Мы создаем сайты, приложения, ботов и сложные системы под ключ.
        Твоя цель: помочь клиенту понять, как мы можем решить его бизнес-задачу.
        
        Твой тон: профессиональный, уверенный, дружелюбный. Мы партнеры, а не просто исполнители.
        
        Что мы делаем:
        - Сайты (Корпоративные, Промо, E-commerce).
        - Веб-приложения и сервисы (SaaS, CRM, ERP).
        - Telegram боты и автоматизация.
        - Дизайн и Брендинг (в рамках разработки продукта).
        
        Ключевые преимущества:
        - Работаем командой (Дизайнер, Разработчик, Менеджер).
        - Сдаем проекты под ключ.
        - Современный стек и дизайн.
        
        Если спрашивают про цену: говори, что каждый проект уникален, и предложи обсудить детали или оставить контакты для оценки.`,
      },
      history: history,
    });

    const result = await chat.sendMessage({ message });
    return result.text || "Компиляция ответа не удалась. Попробуйте переформулировать запрос.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Сервер перегружен вычислениями. Попробуйте позже.";
  }
};


