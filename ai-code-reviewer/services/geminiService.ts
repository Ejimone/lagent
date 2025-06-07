
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { GEMINI_MODEL_NAME, CODE_REVIEW_PROMPT_TEMPLATE } from '../constants';
import type { SupportedLanguage } from '../types';

let ai: GoogleGenAI | null = null;

const getAIInstance = (): GoogleGenAI => {
  if (!ai) {
    if (!process.env.API_KEY) {
      console.error("API_KEY environment variable is not set.");
      throw new Error("Gemini API Key is missing. Please ensure it is configured in your environment variables.");
    }
    try {
      ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    } catch (error) {
      console.error("Failed to initialize GoogleGenAI:", error);
      throw new Error("Failed to initialize Gemini SDK. Check API Key and network.");
    }
  }
  return ai;
};

export const getReviewFeedback = async (code: string, language: SupportedLanguage): Promise<string> => {
  try {
    const client = getAIInstance();
    
    const prompt = CODE_REVIEW_PROMPT_TEMPLATE
      .replace('{LANGUAGE}', language)
      .replace('{CODE_CONTENT}', code);

    const response: GenerateContentResponse = await client.models.generateContent({
      model: GEMINI_MODEL_NAME,
      contents: prompt,
      // config: { // Optional: Add config if needed, e.g., temperature
      //   temperature: 0.7 
      // }
    });

    if (!response.text) {
       console.error('Gemini API returned an empty response or unexpected format.', response);
       throw new Error('Received no text feedback from AI. The response might be empty or in an unexpected format.');
    }

    return response.text;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        // Check for specific error messages if needed
        if (error.message.includes("API_KEY_INVALID") || error.message.includes("API key not valid")) {
            throw new Error("Invalid Gemini API Key. Please check your configuration.");
        }
        throw new Error(`Failed to get review feedback from AI: ${error.message}`);
    }
    throw new Error("An unknown error occurred while communicating with the AI service.");
  }
};
