import { GoogleGenAI } from "@google/genai";

// Use environment variable for safety

const ai = new GoogleGenAI({
  apiKey: "AIzaSyACKlaiOhjELLipO1slFV1avdoNDsZoD2A",
});

export async function extractReceiptDetails(file) {
  const imageBase64 = await toBase64(file);
  const mimeType = file.type; //"image/jpeg", "image/png"

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        parts: [
          {
            inlineData: {
              mimeType,
              data: imageBase64,
            },
          },
          {
            text: `You are a receipt parser. Extract only this JSON object:
{ amount: number, date: Date Object, description: string, paymentMethod: string  CHECK(payment_method IN ('cash', 'card', 'bank_transfer', 'check', 'UPI')) }
Return ONLY valid JSON, without any explanation, markdown, or backticks.`,
          },
        ],
      },
    ],
  });
  console.log("response from new api => ", response.text);

  console.log("Gemini api", response, JSON.parse(response.text));
  //   const text = result.response.parts[0].text;
  try {
    console.log("text extractedd from the gemini api => ", response.text);
    return JSON.parse(response.text);
  } catch (err) {
    console.error("Error parsing Gemini response", err, response);
    throw new Error("Failed to extract receipt data.");
  }
}

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]); // Strip data:image/...base64,
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
