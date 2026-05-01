const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/", async (req, res) => {
    const { message } = req.body;

    try {
        const response = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                model: "llama-3.1-8b-instant",
                messages: [
                    {
                        role: "system",
                        content:
                            "You are BuildBazaar AI assistant. Help users choose PC components, builds, and tech advice.",
                    },
                    {
                        role: "user",
                        content: message,
                    },
                ],
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                    "Content-Type": "application/json",
                },
            },
        );

        const reply = response.data.choices[0].message.content;

        res.json({ response: reply });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "AI request failed" });
    }
});

module.exports = router;
