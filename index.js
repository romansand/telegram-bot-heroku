const TelegramBot = require('node-telegram-bot-api')
const http = require('http')

const BOT_TOKEN = process.env.BOT_TOKEN;

http.createServer().listen(process.env.PORT || 5000).on('request', (req, res) => {
    res.end('')
})

const bot = new TelegramBot(BOT_TOKEN, {polling: true})

bot.on('message', msg => {
    console.log(`${msg.from.first_name}: ${msg.text}`)
    bot.sendMessage(msg.chat.id, `Hello ${msg.from.first_name}`)
})