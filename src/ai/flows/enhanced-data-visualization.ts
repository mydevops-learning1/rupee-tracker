'use server';

/**
 * @fileOverview Generates insightful graph visualizations based on user's past expense and income data.
 *
 * - generateDataVisualization - A function that analyzes financial data and suggests relevant graph visualizations.
 * - GenerateDataVisualizationInput - The input type for the generateDataVisualization function.
 * - GenerateDataVisualizationOutput - The return type for the generateDataVisualization function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDataVisualizationInputSchema = z.object({
  historicalData: z
    .string()
    .describe(
      'Historical expense and income data in JSON format.  Each entry should include date, description, type (income/expense), and amount. Example: [{\