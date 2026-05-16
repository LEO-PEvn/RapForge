export default async function handler(req, res) {
  try {
    const prompt = req.body?.messages?.[0]?.content || "";
    const isFrenchArtist = /Origin:\s*.*\b(France|Belgique|Québec)\b/i.test(prompt);
    const useMistral = isFrenchArtist && Boolean(process.env.MISTRAL_API_KEY);
    const url = useMistral
      ? "https://api.mistral.ai/v1/chat/completions"
      : "https://api.groq.com/openai/v1/chat/completions";
    const apiKey = useMistral ? process.env.MISTRAL_API_KEY : process.env.GROQ_API_KEY;
    const model = useMistral ? "mistral-large-latest" : "llama-3.3-70b-versatile";

    if (!apiKey) {
      throw new Error(useMistral ? "Missing MISTRAL_API_KEY" : "Missing GROQ_API_KEY");
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        ...req.body,
        model,
      }),
    });
    const data = await response.json();
    console.log(`${useMistral ? "Mistral" : "Groq"} response:`, JSON.stringify(data).slice(0, 200));
    const text = data.choices[0].message.content;
    res.json({ content: [{ text }] });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: err.message });
  }
}