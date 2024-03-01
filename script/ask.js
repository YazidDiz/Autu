const axios = require('axios');

module.exports.config = {
	name: "ask",
	role: 0,
	version: 1.0,
	credits: "OtinXSandip",
	description: "AI",
	usages: "{p} [prompt]",
	cooldown: 5,
	hasPrefix: false,
	aliases: ['ai', 'Salut', 'nemoo', 'gpt4', 'Wendy', 'Ai', 'ask'],
};

module.exports.run = async function ({ api, event, args, message }) {
	try {
		const prefix = module.exports.config.aliases.find((p) => event.body && event.body.toLowerCase().startsWith(p));
		if (!prefix) {
			return; // Invalid prefix, ignore the command
		}
		const prompt = event.body.substring(prefix.length).trim();
		if (!prompt) {
			await message.reply("Hey I'm your virtual assistant , ask you a question.");
			return;
		}

		const response = await axios.get(`https://sandipbaruwal.onrender.com/gpt?prompt=${encodeURIComponent(prompt)}`);
		const answer = response.data.answer;

		await message.reply(answer);
	} catch (error) {
		console.error("Error:", error.message);
	}
};
