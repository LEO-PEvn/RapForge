export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        ...req.body,
        model: "llama-3.3-70b-versatile",
      }),
    });
    const data = await response.json();
    console.log("Groq response:", JSON.stringify(data).slice(0, 200));
    const text = data.choices[0].message.content;
    res.json({ content: [{ text }] });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: err.message });
  }
}