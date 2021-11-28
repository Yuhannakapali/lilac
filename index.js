const Discord = require("discord.js")
require('dotenv').config()
const keepAlive = require("./server")
const client = new Discord.Client()
const { haveConversation } = require("./conversation")
const token = process.env.TOKEN
console.log("🚀 ~ file: index.js ~ line 7 ~ token", token)

client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
})
client.on("message", msg => {
    if (msg.author.bot) return

    if (msg.content.includes("@here") || msg.content.includes("@everyone")) return;

    if (msg.mentions.has(client.user.id)) {
        haveConversation(msg)
    };
    // interpretMessage(msg);
})
keepAlive()
client.login(token)