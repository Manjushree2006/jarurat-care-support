const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenAI } = require("@google/genai");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.post("/api/chat", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        error: "Question is required",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: question,
      config: {
        systemInstruction:
          "You are Jarurat Care's healthcare support FAQ assistant. " +
          "Answer questions about patient support, caregivers, volunteers, " +
          "and general information about Jarurat Care. " +
          "Give clear and simple answers. " +
          "Do not diagnose diseases, prescribe medicines, or provide emergency medical advice. " +
          "For medical emergencies, advise the user to contact local emergency services or a qualified healthcare professional.",
      },
    });

    res.json({
      answer: response.text,
    });
  } catch (error) {
    console.error("Gemini API Error:", error);

    res.status(500).json({
      error: "Unable to get a response from the AI assistant.",
    });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`AI server running on http://localhost:${PORT}`);
});