import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fetchAccurateIHerbLink from "../config/fetchAccurateIHerbLink";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

const extractVitamins = (responseText: string) => {
  const matches = responseText.match(/\*\*(.*?)\*\*\s*-\s*(.*?)(?:\n|$)/g);
  if (!matches || matches.length < 2) return null;

  return matches.map((match) => {
    const vitaminMatch = match.match(/\*\*(.*?)\*\*/);
    const descriptionMatch = match.match(/-\s*(.*)/);

    return {
      name: vitaminMatch ? vitaminMatch[1].trim() : "Unknown",
      description: descriptionMatch
        ? descriptionMatch[1].trim()
        : "No description available",
    };
  });
};

export const getRecommendations = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { symptoms } = req.body;
    if (!symptoms) {
      res.status(400).json({ message: "Please provide symptoms" });
      return;
    }

    console.log("🟢 Received symptoms:", symptoms);

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

    const prompt = `Given the symptoms: ${symptoms}, suggest two relevant vitamins that can help. 
    For each vitamin, provide a **precise name** and **short description**, but do NOT provide any links. 
    Format your response as:

    1. **Vitamin Name** - Short description.
    2. **Vitamin Name** - Short description.`;

    // 🔹 Generate response from Gemini AI
    console.log("🟢 Sending prompt to Gemini AI...");
    const result = await model.generateContent(prompt);
    console.log("🟢 AI Response received:", result);
    const aiResponse = result.response.text();
    console.log("🟢 AI Response text:", aiResponse);

    // ✅ Extract vitamin names & descriptions correctly
    const extractedVitamins = extractVitamins(aiResponse);
    if (!extractedVitamins || extractedVitamins.length < 2) {
      console.error("🔴 ERROR: Could not extract vitamins correctly");
      res.status(500).json({ message: "Could not extract vitamins correctly" });
      return;
    }

    console.log("🟢 Extracted vitamins:", extractedVitamins);

    const vitamin1 = extractedVitamins[0];
    const vitamin2 = extractedVitamins[1];

    console.log(
      "🟢 Fetching iHerb links for:",
      vitamin1.name,
      "and",
      vitamin2.name
    );

    const vitamin1Link = await fetchAccurateIHerbLink(vitamin1.name);
    const vitamin2Link = await fetchAccurateIHerbLink(vitamin2.name);

    console.log("🟢 iHerb Links:", vitamin1Link, vitamin2Link);

    // ✅ Properly formatted response
    const recommendations = `
      **${vitamin1.name}** - ${vitamin1.description}
      [Product Link](${vitamin1Link})

      **${vitamin2.name}** - ${vitamin2.description}
      [Product Link](${vitamin2Link})`;

    res.json({ recommendations });
  } catch (error) {
    console.error("AI Recommendation Error:", error);
    res.status(500).json({ message: "Error fetching AI recommendations" });
  }
};
