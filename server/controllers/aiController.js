const { OpenAI } = require('openai');

// Initialize OpenAI only if key exists
let openai;
if (process.env.OPENAI_API_KEY) {
    openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });
} else {
    console.warn("OPENAI_API_KEY is missing. AI Chat features will be disabled.");
}

// @desc    Get AI Chat Response
// @route   POST /api/ai/chat
exports.getChatResponse = async (req, res) => {
    const { message } = req.body;

    if (!openai) {
        return res.json({ reply: "I'm currently offline (API Key missing). Please add OPENAI_API_KEY to your .env file to enable AI features." });
    }

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are AGEZY, a helpful AI agricultural assistant. You help farmers with crop advice, weather, government schemes, and farming equipment. Keep answers simple, practical, and in a friendly tone suitable for Indian farmers." },
                { role: "user", content: message }
            ],
            max_tokens: 150,
        });

        res.json({ reply: completion.choices[0].message.content });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ reply: "I'm having trouble connecting right now. Please try again later." });
    }
};
