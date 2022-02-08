const OpenAI = require('openai-api');


let chatLog = 'Human: who are you? \n AI:  I am Ryu, \n Human:where do you work? \n AI: I work at anicafe\n Human: do you have girlfriend? \n AI: yes, her name is Anah\n Human: do you fuck her ?\n AI: everyday.\n';

const OPENAI_API_KEY = process.env.AITOKEN;

const openai = new OpenAI(OPENAI_API_KEY);

async function haveConversation(msg) {
    const question = `${msg.content.substring(msg.content.indexOf(">") + 1)} \n`;
    const sanitizedQuestion = clean(question);
    const prompt = `${chatLog}Human: ${sanitizedQuestion}`;
    const gptResponse = await openai.complete({
        engine: 'davinci',
        prompt,
        maxTokens: 150,
        temperature: 0.9,
        topP: 1,
        presencePenalty: 0,
        frequencyPenalty: 0,
        stop: ["Human:"]
    });


    const response = gptResponse.data;
    chatLog = `${prompt}${response.choices[0].text} \n`;
    const message = response.choices[0].text.replace("AI:", "")
    msg.channel.send(message);

}

function clean(str) {
    return str.replace(/[^0-9a-z-A-Z ]/g, "").replace(/ +/, " ")
}

module.exports = {
    haveConversation,
}