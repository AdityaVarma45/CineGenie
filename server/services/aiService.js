import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";
import axios from "axios";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export const generateMovieInsights = async (movies) => {

  const movieList = movies
    .map((m, i) => `${i + 1}. ${m.title}: ${m.overview}`)
    .join("\n");

  const prompt = `
Explain why these movies are good recommendations.

Movies:
${movieList}

Return one short explanation for each movie.
`;

  /* ---------- TRY GROQ FIRST ---------- */

  try {

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    });

    console.log("AI Provider: Groq");

    return response.choices[0].message.content;

  } catch (groqError) {

    console.log("Groq failed, switching to Gemini...");

  }

  /* ---------- FALLBACK TO GEMINI ---------- */

  try {

    const url =
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const response = await axios.post(url, {
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ]
    });

    console.log("AI Provider: Gemini");

    return response.data.candidates[0].content.parts[0].text;

  } catch (geminiError) {

    console.log("Gemini also failed");

    return "AI explanation unavailable";

  }

};