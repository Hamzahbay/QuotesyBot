const { Telegraf } = require('telegraf')
const request = require('request')

const bot = new Telegraf('1778296301:AAH1D7xUjKU4TEh549TF89XQ15iUjFwf4jI')

let hiMsg = ['hi', 'Hi', 'hii', 'Hii', 'hai', 'Hai', 'hello', 'Hello', 'hei', 'Hei']
let replyHi = ['Hei There!!', 'What\'s Up Dude!!', 'Hai Pal!!', 'Hey Hey!!', 'Hi!!', 'Hello!!', 'Hi, Can I Help You?']

let frndm
let quoteContainer

const quotesAPI = async url => {
    await request(url, (error, response, body) => {
        const bodyJSON = JSON.parse(body)
        return `"${bodyJSON.quotes[0].text}" - ${bodyJSON.quotes[0].author} \n(${bodyJSON.quotes[0].tag})`
        // console.log(`"${bodyJSON.quotes[0].text}" - ${bodyJSON.quotes[0].author} \n(${bodyJSON.quotes[0].tag})`)
    })
}

bot.start(ctx => ctx.reply('Welcome Quotesy!! \n/quote For Generate Quotes'))

hiMsg.forEach(x => {
    bot.hears(x, ctx => {
        frndm = Math.floor(Math.random() * 7)
        ctx.reply(replyHi[frndm])
    })
})


// bot.command('quote', ctx => ctx.reply(quotesAPI('https://goquotes-api.herokuapp.com/api/v1/random?count=1')))
bot.command('quote', ctx => {
    request('https://goquotes-api.herokuapp.com/api/v1/random?count=1', (error, response, body) => {
        const bodyJSON = JSON.parse(body)

        // bot.command('quote', ctx => ctx.reply(`"${bodyJSON.quotes[0].text}" - ${bodyJSON.quotes[0].author} \n(${bodyJSON.quotes[0].tag})`))
        console.log(`"${bodyJSON.quotes[0].text}" - ${bodyJSON.quotes[0].author} \n(${bodyJSON.quotes[0].tag})`)
        return ctx.reply(`"${bodyJSON.quotes[0].text}" - ${bodyJSON.quotes[0].author} \n(${bodyJSON.quotes[0].tag})`)
    })
})

bot.launch()