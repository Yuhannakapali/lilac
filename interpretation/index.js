const axios = require("axios")
const { sad } = require("../response/sad.json")


function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}




function getQuote() {
    return axios.get("https://zenquotes.io/api/random").then(res => {
        return res.data;
    }).then(data => {
        return data[0]["q"] + " -" + data[0]["a"]
    })

}


const interpretMessage = (msg) => {
    if (msg.content === "$inspire") {
        getQuote().then(quote =>
            msg.channel.send(quote)
        )
    }

    if (msg.content.includes("sad")) {
        const rand = randomIntFromInterval(0, sad.length - 1)
        const response = sad[rand]
        msg.channel.send(response)
    }
}
module.exports = {
    interpretMessage
}