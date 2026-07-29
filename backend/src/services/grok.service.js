import { GROQ } from "groq-sdk";
import ApiError from "../utils/ApiError";

if (!process.env.GROQ_API_KEY) {
  throw new ApiError(500, "Groq API key missing — check .env");
}

const groq = new GROQ({ apiKey: process.env.GROQ_API_KEY });

const prompt = `Above are the customer's transactions.

Your task is to analyze the transactions and provide a smart insight.

Provide:
- Summary
- Spending pattern
- Largest transaction
- One suggestion

Limit to 120 words.`;

export { groq, prompt };
