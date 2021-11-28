const Discord = require("discord.js")
const keepAlive = require("./server")
const client = new Discord.Client()
const { interpretMessage } = require("./interpretation")
const { haveConversation } = require("./conversation")
const sadWords = ["sad", "depressed", "unhappy", "angry"]

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
client.login("OTEzNzc1MDI5ODkwNzQwMjc0.YaDZUA.EKVuaXhZUJu6t8nkQeHCWdR2fMk")