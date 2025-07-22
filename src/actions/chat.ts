'use server';

import { financialAdviceFromInput } from '@/ai/flows/financial-advice-from-input';
import { translateFinancialAdvice } from '@/ai/flows/translate-financial-advice';

const langMap: { [key: string]: string } = {
  es: 'Spanish',
  hi: 'Hindi',
};

export async function getAIResponse(message: string, language: string): Promise<string> {
  if (!message) {
    return "Please provide some details so I can assist you.";
  }

  try {
    const adviceResponse = await financialAdviceFromInput({
      financialSituation: message,
      financialGoals: 'Provide general financial coaching based on my message. Be conversational and helpful.',
    });

    const advice = adviceResponse.advice;
    if (!advice) {
      return 'I am sorry, but I could not generate a response at this moment. Please try again later.';
    }

    if (language === 'en' || !langMap[language]) {
      return advice;
    }

    const translatedResponse = await translateFinancialAdvice({
      advice: advice,
      language: langMap[language],
    });
    
    return translatedResponse.translatedAdvice || 'I am sorry, but I could not translate the response.';

  } catch (error) {
    console.error('Error in getAIResponse:', error);
    return 'An unexpected error occurred. Please try again later.';
  }
}
