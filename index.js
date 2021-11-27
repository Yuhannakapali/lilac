const Discord = require("discord.js")
const fetch = require("node-fetch")
const keepAlive = require("./server")
const client = new Discord.Client()
const sadWords = ["sad", "depressed", "unhappy", "angry"]
function getQuote() {
    return fetch("https://zenquotes.io/api/random")
        .then(res => {
            return res.json()
        })
        .then(data => {
            return data[0]["q"] + " -" + data[0]["a"]
        })
}
client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
})
client.on("message", msg => {
    if (msg.author.bot) return
    if (msg.content === "$inspire") {
        getQuote().then(quote => msg.channel.send(quote))
    }
    if (msg.content.startsWith("$new")) {
        encouragingMessage = msg.content.split("$new ")[1]
        updateEncouragements(encouragingMessage)
        msg.channel.send("New encouraging message added.")
    }
    if (msg.content.startsWith("$del")) {
        index = parseInt(msg.content.split("$del ")[1])
        deleteEncouragement(index)
        msg.channel.send("Encouraging message deleted.")
    }
    if (msg.content.startsWith("$list")) {
        db.get("encouragements").then(encouragements => {
            msg.channel.send(encouragements)
        })
    }
    if (msg.content.startsWith("$responding")) {
        value = msg.content.split("$responding ")[1]
        if (value.toLowerCase() == "true") {
            db.set("responding", true)
            msg.channel.send("Responding is on.")
        } else {
            db.set("responding", false)
            msg.channel.send("Responding is off.")
        }
    }
})
keepAlive()
client.login("OTEzNzc1MDI5ODkwNzQwMjc0.YaDZUA.YYcBuQCOfBHsm1BxEdH03tzcTz8")