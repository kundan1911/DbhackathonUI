'use server';

/**
 * @fileOverview This file defines a Genkit flow for translating financial advice into different languages.
 *
 * - translateFinancialAdvice - A function that translates financial advice to a specified language.
 * - TranslateFinancialAdviceInput - The input type for the translateFinancialAdvice function.
 * - TranslateFinancialAdviceOutput - The return type for the translateFinancialAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranslateFinancialAdviceInputSchema = z.object({
  advice: z.string().describe('The financial advice to translate.'),
  language: z.string().describe('The target language for translation (e.g., Spanish, Hindi).'),
});
export type TranslateFinancialAdviceInput = z.infer<typeof TranslateFinancialAdviceInputSchema>;

const TranslateFinancialAdviceOutputSchema = z.object({
  translatedAdvice: z.string().describe('The translated financial advice.'),
});
export type TranslateFinancialAdviceOutput = z.infer<typeof TranslateFinancialAdviceOutputSchema>;

export async function translateFinancialAdvice(input: TranslateFinancialAdviceInput): Promise<TranslateFinancialAdviceOutput> {
  return translateFinancialAdviceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'translateFinancialAdvicePrompt',
  input: {schema: TranslateFinancialAdviceInputSchema},
  output: {schema: TranslateFinancialAdviceOutputSchema},
  prompt: `Translate the following financial advice to {{language}}:\n\n{{advice}}`,
});

const translateFinancialAdviceFlow = ai.defineFlow(
  {
    name: 'translateFinancialAdviceFlow',
    inputSchema: TranslateFinancialAdviceInputSchema,
    outputSchema: TranslateFinancialAdviceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
