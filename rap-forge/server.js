import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json({ limit: "2mb" }));

app.post("/api/generate", async (req, res) => {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: req.body.messages,
      max_tokens: 1400,
    }),
  });
  const data = await response.json();
  const text = data.choices[0].message.content;
  res.json({ content: [{ text }] });
});

app.listen(3001, () => console.log("✅ Proxy running on :3001"));