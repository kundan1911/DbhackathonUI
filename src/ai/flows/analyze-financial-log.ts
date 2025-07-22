'use server';

/**
 * @fileOverview A flow that analyzes financial logs to identify patterns and suggest improvements.
 *
 * - analyzeFinancialLog - Analyzes financial log data and provides insights.
 * - AnalyzeFinancialLogInput - The input type for the analyzeFinancialLog function.
 * - AnalyzeFinancialLogOutput - The return type for the analyzeFinancialLog function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeFinancialLogInputSchema = z.object({
  logData: z
    .string()
    .describe(
      'A string containing the user\u2019s logged financial data, including savings and spending.'
    ),
});
export type AnalyzeFinancialLogInput = z.infer<typeof AnalyzeFinancialLogInputSchema>;

const AnalyzeFinancialLogOutputSchema = z.object({
  summary: z
    .string()
    .describe('A summary of the financial log data, including key patterns.'),
  suggestions: z
    .string()
    .describe(
      'Suggestions for improvements based on the identified patterns in the financial log data.'
    ),
});
export type AnalyzeFinancialLogOutput = z.infer<typeof AnalyzeFinancialLogOutputSchema>;

export async function analyzeFinancialLog(
  input: AnalyzeFinancialLogInput
): Promise<AnalyzeFinancialLogOutput> {
  return analyzeFinancialLogFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeFinancialLogPrompt',
  input: {schema: AnalyzeFinancialLogInputSchema},
  output: {schema: AnalyzeFinancialLogOutputSchema},
  prompt: `You are a financial advisor. Analyze the following financial log data to provide a summary of the user\'s spending and saving habits, identify any patterns, and suggest improvements.

Financial Log Data:
{{{logData}}}

Summary:
{{{summary}}}
Suggestions:
{{{suggestions}}}`, // Make sure to include Summary and Suggestions in the prompt.
});

const analyzeFinancialLogFlow = ai.defineFlow(
  {
    name: 'analyzeFinancialLogFlow',
    inputSchema: AnalyzeFinancialLogInputSchema,
    outputSchema: AnalyzeFinancialLogOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
