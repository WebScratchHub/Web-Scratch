import { GoogleGenAI } from "@google/genai";

// IMPORTANT: Make sure to set VITE_GEMINI_API_KEY in your .env file
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
    throw new Error("VITE_GEMINI_API_KEY is not set in the environment variables.");
}

const ai = new GoogleGenAI({ apiKey });

export const generateImages = async ({
  prompt,
  negativePrompt,
  style,
  aspectRatio,
  numberOfImages,
}) => {
    const fullPrompt = `${prompt}, ${style}${negativePrompt ? `, avoid ${negativePrompt}` : ''}`;

    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: fullPrompt,
        config: {
            numberOfImages: numberOfImages,
            outputMimeType: 'image/jpeg',
            aspectRatio: aspectRatio,
        },
    });

    if (!response.generatedImages || response.generatedImages.length === 0) {
        throw new Error("Image generation failed. No images were returned.");
    }
    
    return response.generatedImages.map(img => `data:image/jpeg;base64,${img.image.imageBytes}`);
};

// ... other Gemini service functions would be converted and added here ...
