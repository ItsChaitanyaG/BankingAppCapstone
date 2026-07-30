import Groq from "groq-sdk";
import ApiError from "../utils/ApiError.js";

if (!process.env.GROQ_API_KEY) {
  throw new ApiError(500, "Groq API key missing — check .env");
}

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const prompt = `Above are the customer's transactions (Income indicated by positive amounts, expenses by negative amounts).
  Each transaction has:

  Type
  Amount
  Remark
  Date

Your task is to analyze the transactions and provide a smart insight. Do not invent information.

Provide:
- Summary
- Spending pattern
- Largest Expense transaction
- One suggestion

Limit to 120 words.

Format your response in Markdown.

Use:
- ## for headings
- **bold** for important values
- Bullet points for lists

Do not use HTML.
Do not use code blocks.`;

export { groq, prompt };
