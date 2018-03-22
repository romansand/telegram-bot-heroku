const TelegramBot = require('node-telegram-bot-api')
const http = require('http')
const db = require('./db')

const BOT_TOKEN = process.env.BOT_TOKEN;

http.createServer().listen(process.env.PORT || 5000).on('request', (req, res) => {
    res.end('')
})

const bot = new TelegramBot(BOT_TOKEN, {polling: true})

bot.on('message', msg => {
    db.addLog({
        name: msg.from.first_name,
        id: msg.from.id
    }, {
        chat_id: msg.chat.id,
        id: msg.message_id,
        text: msg.text
    })
    // console.log(`${msg.from.first_name}: ${msg.text}`)
    console.log(db.getLogs(res))
    bot.sendMessage(msg.chat.id, `Hello ${msg.from.first_name}`)
})