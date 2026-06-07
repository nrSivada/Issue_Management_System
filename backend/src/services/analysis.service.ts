import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

export const analyzeIssueWithAI = async (
  title: string,
  description: string
) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
Analyze this software issue.

Title:
${title}

Description:
${description}

Return ONLY valid JSON.

{
  "summary": "",
  "recommendation": ""
}
`;

  const result =
  await model.generateContent(prompt);



  const response =
  result.response.text();

const cleanedResponse = response
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

return JSON.parse(cleanedResponse);
};


import { db } from "../db";
import { analyses } from "../db/schema";

export const saveAnalysis = async (
  issueId: string,
  summary: string,
  recommendation: string
) => {
  const result = await db
    .insert(analyses)
    .values({
      issueId,
      summary,
      recommendation,
    })
    .returning();

  return result[0];
};