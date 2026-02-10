
import { GoogleGenAI, Modality } from "@google/genai";
import type { Product } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

// Helper to convert File object to Base64 string
const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = (error) => reject(error);
    });
};

// Helper to fetch an image from a URL and convert it to a Base64 string
const imageUrlToBase64 = async (url: string): Promise<{ base64: string, mimeType: string }> => {
    // Using a proxy to bypass CORS issues when fetching images from external domains.
    const proxyUrl = `https://images.weserv.nl/?url=${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl);
    if (!response.ok) {
        throw new Error(`Failed to fetch image from ${url} via proxy: ${response.statusText}`);
    }
    const blob = await response.blob();
    const mimeType = blob.type;
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = () => {
            const base64 = (reader.result as string).split(',')[1];
            resolve({ base64, mimeType });
        };
        reader.onerror = (error) => reject(error);
    });
};

export const virtualTryOn = async (
    userImageFile: File,
    product: Product
): Promise<string> => {
    const userImageBase64 = await fileToBase64(userImageFile);
    const { base64: productImageBase64, mimeType: productMimeType } = await imageUrlToBase64(product.imageUrl);

    const prompt = `Perform a virtual try-on. Use the first provided image of a person and dress them in the clothing item from the second provided image. The clothing should fit the person's body naturally, matching their pose, body shape, and the lighting of the original photo. Preserve the original background and subjects body from the first image also preserve the original outfit style and color from the second image. The output must be only the generated image with no extra text.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-image-preview',
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: userImageBase64,
                            mimeType: userImageFile.type,
                        },
                    },
                    {
                        inlineData: {
                            data: productImageBase64,
                            mimeType: productMimeType,
                        },
                    },
                    {
                        text: prompt,
                    },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });

        const imagePart = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData);

        if (imagePart && imagePart.inlineData) {
            return imagePart.inlineData.data;
        } else {
            // Check for text response which might contain an error or refusal
            const textPart = response.candidates?.[0]?.content?.parts?.find(part => part.text);
            const safetyRatings = response.candidates?.[0]?.safetyRatings;
            console.error("Safety Ratings:", safetyRatings);
            throw new Error(`AI model did not return an image. Reason: ${textPart?.text || 'Unknown, potentially a safety block.'}`);
        }
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to generate virtual try-on image.");
    }
};
