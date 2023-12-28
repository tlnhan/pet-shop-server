const OpenAI = require('openai');
const dotenv = require('dotenv');
dotenv.config();

const configuration = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAI(configuration);

exports.ChatOpenAi = async (req, res) => {
    const { message } = req.body;

    try {
        const chatCompletion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: message }]
        });

        const reply = chatCompletion.choices[0].message.content.trim();

        res.json({ reply });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong.' });
    }
};
