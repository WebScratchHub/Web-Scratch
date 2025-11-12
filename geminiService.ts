import { GoogleGenAI, Modality, Type, Chat, GenerateContentResponse } from "@google/genai";
import { AIToolDetails, ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

interface GenerateImagesParams {
  prompt: string;
  negativePrompt: string;
  style: string;
  aspectRatio: "1:1" | "16:9" | "9:16" | "4:3" | "3:4";
  numberOfImages: number;
}

export const generateImages = async ({
  prompt,
  negativePrompt,
  style,
  aspectRatio,
  numberOfImages,
}: GenerateImagesParams): Promise<string[]> => {
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

export const generateSpeech = async (text: string, voiceName: string): Promise<string> => {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: { parts: [{ text: text }] },
        config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
                voiceConfig: {
                    prebuiltVoiceConfig: { voiceName: voiceName },
                },
            },
        },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
        throw new Error("Speech generation failed. No audio data was returned.");
    }
    return base64Audio;
};

export const generateWebsiteCode = async (prompt: string, deviceMode: 'pc' | 'mobile'): Promise<string> => {
    const designFocus = deviceMode === 'pc'
        ? "The layout MUST BE DESKTOP-FIRST, optimized for wide screens. It should look polished and spacious on a large monitor. It must also be fully responsive to look great on tablets and mobile devices."
        : "The layout MUST BE MOBILE-FIRST, optimized for narrow screens. It should look compact and touch-friendly on a phone. It must also be fully responsive to adapt gracefully to tablets and desktops.";

    const fullPrompt = `
      You are an expert web developer and UI/UX designer specializing in modern, single-page websites.
      Your task is to generate the complete HTML code for a website based on the user's prompt.
      
      **CRITICAL INSTRUCTIONS:**
      1.  **THEME INDEPENDENCE:** Your most important task is to create a unique color palette and theme that perfectly matches the user's prompt. **DO NOT** use a futuristic neon theme with colors like violet (#7B61FF) or cyan (#00E5FF) unless the prompt specifically asks for it. Be creative and versatile. For example:
          - "a pastel-themed bakery site": Use soft pinks, creams, and light browns.
          - "a corporate tech startup page": Use clean whites, grays, and a professional blue.
          - "a luxury brand website": Use black, gold, and elegant off-whites.
      2.  **CSS VARIABLES:** You MUST define the generated color palette using CSS variables in a \`:root\` block inside a \`<style>\` tag in the \`<head>\`. This makes the theme easy to manage.
          - Example: \`:root { --primary-color: #4A90E2; --background-color: #FFFFFF; --text-color: #333333; }\`
      3.  **VIEWPORT META TAG:** You MUST include the viewport meta tag in the \`<head>\` for proper responsiveness on mobile devices: \`<meta name="viewport" content="width=device-width, initial-scale=1.0">\`.
      4.  **STICKY NAVIGATION:** The website's main navigation bar MUST be sticky. Use CSS like \`position: sticky; top: 0; z-index: 50;\` and add a subtle background color or blur effect to distinguish it when scrolling.
      5.  **SINGLE HTML FILE:** The entire website must be contained within a single HTML file.
      6.  **TAILWIND CSS:** Use Tailwind CSS for all styling. You MUST include the Tailwind CDN script in the \`<head>\`: \`<script src="https://cdn.tailwindcss.com"></script>\`.
      7.  **RESPONSIVE DESIGN:** ${designFocus} Use modern CSS techniques like flexbox and grid for all layouts.
      8.  **VISUAL HIERARCHY & DESIGN:** Ensure good visual hierarchy, readable text with high contrast, and proper spacing between sections.
      9.  **SMOOTH SCROLL:** You MUST include \`html { scroll-behavior: smooth; }\` in a style tag for a better user experience.
      10. **CONTENT:** Use placeholder text and images (from unsplash.com or placeholder.com) that are relevant to the prompt.
      11. **OUTPUT FORMAT:** Provide ONLY the raw HTML code, starting with \`<!DOCTYPE html>\` and ending with \`</html>\`. Do not wrap it in markdown backticks or any other text.

      **User Prompt:** "${prompt}"
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: fullPrompt,
    });
    
    let code = response.text.trim();
    if (code.startsWith('```html')) code = code.substring(7);
    if (code.endsWith('```')) code = code.substring(0, code.length - 3);
    if (!code.toLowerCase().includes('<!doctype html>')) throw new Error("AI failed to generate a valid HTML structure.");
    return code.trim();
};

export const modifyWebsiteCode = async (currentHtml: string, modificationPrompt: string, deviceMode: 'pc' | 'mobile'): Promise<string> => {
    const designFocus = deviceMode === 'pc'
        ? "The existing design is DESKTOP-FIRST. Ensure your modifications maintain this principle, preserving the spacious desktop layout while ensuring it remains responsive."
        : "The existing design is MOBILE-FIRST. Ensure your modifications maintain this principle, preserving the compact mobile layout while ensuring it adapts to larger screens.";

    const fullPrompt = `
      You are an expert web developer. Your task is to modify the provided HTML code based on the user's request.

      **CRITICAL INSTRUCTIONS:**
      1.  **CONTEXT:** The user has provided existing HTML code. You MUST use this as the starting point.
      2.  **MODIFICATION:** Apply the user's requested change to the HTML.
      3.  **PRESERVE STRUCTURE & STYLE:** ${designFocus} Maintain the existing structure, Tailwind CSS classes, color palette, and overall design unless the user specifically asks to change them.
      4.  **ESSENTIAL TAGS:** Ensure the final HTML includes the Tailwind CDN script and the viewport meta tag (\`<meta name="viewport" content="width=device-width, initial-scale=1.0">\`) in the \`<head>\`.
      5.  **SINGLE HTML FILE:** The entire output must be a single, complete HTML file.
      6.  **TAILWIND CSS:** Continue using Tailwind CSS for all styling.
      7.  **OUTPUT FORMAT:** Provide ONLY the raw, updated HTML code, starting with \`<!DOCTYPE html>\` and ending with \`</html>\`. Do not wrap it in markdown backticks or any other text.

      **Existing HTML Code:**
      \`\`\`html
      ${currentHtml}
      \`\`\`

      **User's Modification Request:** "${modificationPrompt}"
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: fullPrompt,
    });

    let code = response.text.trim();
    if (code.startsWith('```html')) code = code.substring(7);
    if (code.endsWith('```')) code = code.substring(0, code.length - 3);
    if (!code.toLowerCase().includes('<!doctype html>')) throw new Error("AI failed to generate a valid HTML structure.");
    return code.trim();
};

export const generateWrittenContent = async (type: string, tone: string, topic: string): Promise<string> => {
    const fullPrompt = `
      You are an expert content writer AI. Your task is to generate high-quality written content based on the user's specifications.

      **INSTRUCTIONS:**
      1.  **Content Type:** Generate a "${type}".
      2.  **Tone:** The tone of the content should be "${tone}".
      3.  **Topic:** The central topic is "${topic}".
      4.  **Formatting:** Use appropriate formatting (like headings, lists, or paragraphs) to make the content readable and well-structured.
      5.  **Output:** Provide only the generated text. Do not include any introductory phrases like "Here is the content you requested:" or any other conversational text.

      Begin generation now.
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: fullPrompt,
    });
    
    return response.text;
};

export const getAIToolDetails = async (toolName: string, toolUrl: string): Promise<AIToolDetails> => {
  const prompt = `
    Provide a concise and structured overview of the AI tool called "${toolName}", which can be found at ${toolUrl}.
    Based on its public website information, generate a JSON object with the following strict keys:
    1. "summary": A one-paragraph summary of what the tool is and its primary use case.
    2. "features": An array of 3 to 5 strings, each describing a key feature.
    3. "pricing": A brief description of its pricing model (e.g., "Offers a free tier with limitations. Paid plans start at $X/month..."). If specific prices aren't available, describe the model (e.g., "Subscription-based," "Credit-based," "Contact for enterprise pricing").

    **IMPORTANT**: Provide only the raw JSON object as the response. Do not include any other text or markdown formatting.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING, description: "A one-paragraph summary of the tool." },
          features: {
            type: Type.ARRAY,
            description: "An array of 3-5 key feature descriptions.",
            items: { type: Type.STRING }
          },
          pricing: { type: Type.STRING, description: "A brief summary of the pricing model." }
        },
        required: ["summary", "features", "pricing"]
      },
    },
  });

  try {
    const jsonString = response.text.trim();
    const details = JSON.parse(jsonString);
    return details;
  } catch (e) {
    console.error("Failed to parse AI tool details from Gemini:", response.text, e);
    throw new Error("Could not retrieve tool details. The AI returned an unexpected format.");
  }
};

export const streamAssistanceResponse = async (context: string, newMessage: string): Promise<AsyncGenerator<GenerateContentResponse>> => {
    const response = await ai.models.generateContentStream({
        model: 'gemini-2.5-flash',
        contents: newMessage,
        config: {
          systemInstruction: context,
        },
    });
    
    return response;
};