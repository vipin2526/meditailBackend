const axios = require("axios");
const config = require('config');


const consult = async (req, res) => {
    const userInput = req.body.input;
    const custom = 'Act as a Doctor and try to give small response';
    const options = {
        method: 'POST',
        url: 'https://chatgpt-42.p.rapidapi.com/chatbotapi',
        headers: {
            'x-rapidapi-key': config.get('rapidApiKey'),
            'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        data: {
            bot_id: 'OEXJ8qFp5E5AwRwymfPts90vrHnmr8yZgNE171101852010w2S0bCtN3THp448W7kDSfyTf3OpW5TUVefz',
            messages: [
                {
                    role: 'user',
                    content: custom + userInput
                }
            ],
            user_id: '',
            temperature: 0.9,
            top_k: 5,
            top_p: 0.9,
            max_tokens: 256,
            model: 'gpt 3.5'
        }
    };

    try {
        const response = await axios.request(options);
        res.json(response.data);
    } catch (error) {
        console.error(error);
    }
}

module.exports = { consult }