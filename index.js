const TelegramBot = require('node-telegram-bot-api')

const BOT_TOKEN = '534912162:AAH3xupuDJEhetwqZatv9o3w2Q2T8H3u1eA'

const bot = new TelegramBot(BOT_TOKEN, {polling: true})

bot.on('message', msg => {
    bot.sendMessage(msg.chat.id, 'Hello from HEROKU. Bot says: "Hi, ${msg.from.first_name}')
})
