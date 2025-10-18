
import { GoogleGenAI, Type } from "@google/genai";
import { IrisMeasurements, PredictionResponse, IrisSpecies } from '../types';

// FIX: Initialize the Gemini AI client.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const model = 'gemini-2.5-flash';
const imageModel = 'imagen-4.0-generate-001';

export const predictIrisSpecies = async (measurements: IrisMeasurements): Promise<PredictionResponse> => {
  const prompt = `
    Based on the following measurements of an iris flower, classify its species.
    Sepal Length: ${measurements.sepalLength} cm
    Sepal Width: ${measurements.sepalWidth} cm
    Petal Length: ${measurements.petalLength} cm
    Petal Width: ${measurements.petalWidth} cm

    Return the species as one of the following exact values: "setosa", "versicolor", or "virginica".
  `;

  // FIX: Use Gemini API to generate content with a JSON response schema.
  const response = await ai.models.generateContent({
    model: model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          species: {
            type: Type.STRING,
            description: 'The predicted iris species. Must be one of "setosa", "versicolor", or "virginica".'
          }
        },
        required: ['species']
      },
    },
  });

  const text = response.text.trim();
  const result = JSON.parse(text);

  if (!Object.values(IrisSpecies).includes(result.species)) {
    throw new Error(`Invalid species returned: ${result.species}`);
  }

  return result as PredictionResponse;
};

export const generateIrisImage = async (species: IrisSpecies): Promise<string | null> => {
  const prompt = `A photorealistic, high-quality image of a single Iris ${species} flower, in a natural garden setting, with a blurred background.`;

  try {
    // FIX: Use Gemini API to generate an image.
    const response = await ai.models.generateImages({
        model: imageModel,
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/png',
          aspectRatio: '1:1',
        },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes = response.generatedImages[0].image.imageBytes;
      return `data:image/png;base64,${base64ImageBytes}`;
    }
    return null;
  } catch (error) {
    console.error(`Failed to generate image for ${species}:`, error);
    return null;
  }
};
