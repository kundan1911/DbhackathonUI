'use server';
/**
 * @fileOverview This file defines a Genkit flow for providing personalized financial advice based on user input.
 *
 * - financialAdviceFromInput - A function that takes user's financial details and goals as input and returns personalized financial advice.
 * - FinancialAdviceFromInputType - The input type for the financialAdviceFromInput function.
 * - FinancialAdviceFromOutputType - The return type for the financialAdviceFromInput function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FinancialAdviceFromInputSchema = z.object({
  financialSituation: z.string().describe('A detailed description of the user\'s current financial situation, including income, expenses, debts, and assets.'),
  financialGoals: z.string().describe('The user\'s financial goals, such as retirement planning, saving for a down payment, or paying off debt.'),
});
export type FinancialAdviceFromInputType = z.infer<typeof FinancialAdviceFromInputSchema>;

const FinancialAdviceFromOutputSchema = z.object({
  advice: z.string().describe('Personalized financial advice and recommendations based on the user\'s input.'),
});
export type FinancialAdviceFromOutputType = z.infer<typeof FinancialAdviceFromOutputSchema>;

export async function financialAdviceFromInput(input: FinancialAdviceFromInputType): Promise<FinancialAdviceFromOutputType> {
  return financialAdviceFromInputFlow(input);
}

const prompt = ai.definePrompt({
  name: 'financialAdviceFromInputPrompt',
  input: {schema: FinancialAdviceFromInputSchema},
  output: {schema: FinancialAdviceFromOutputSchema},
  prompt: `You are an AI financial advisor. A user will provide you with their financial situation and goals, and you will provide them with personalized financial advice and recommendations.

Financial Situation: {{{financialSituation}}}
Financial Goals: {{{financialGoals}}}

Provide detailed and actionable advice, considering their situation and goals. Be specific and avoid general advice.
`,
});

const financialAdviceFromInputFlow = ai.defineFlow(
  {
    name: 'financialAdviceFromInputFlow',
    inputSchema: FinancialAdviceFromInputSchema,
    outputSchema: FinancialAdviceFromOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
