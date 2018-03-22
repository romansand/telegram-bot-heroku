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
    bot.sendMessage(msg.chat.id, `Hello ${msg.from.first_name}`)
    db.getLogs((res) => {
        console.log(res)
    })
})

bot.onText(/^\/get_logs$/, function (msg, match) {
    db.getLogs((res) => {
        res
            .sort((a, b) => new Date(a.timestamp).getTime() > new Date(b.timestamp).getTime())
            .map((el, idx) => {
                bot.sendMessage(msg.chat.id, 'Current element: ' + JSON.stringify(el))
                console.log(el.message.text);
                // setTimeout(() => bot.forwardMessage(msg.chat.id, el.message.chat_id, el.message.id), idx * 100)
            })
    })
})