const env = require('../.env')
const Telegraf = require('telegraf')
const Markup = require('telegraf/markup')
const bot = new Telegraf(env.token)

bot.start(async (ctx) => 
{
    const nome = ctx.update.message.from.first_name
    console.log(nome)
    await ctx.reply(`Olá ${nome}! Estou aqui para te ajudar em alguns momentos do seu dia! Posso te ajudar quando alguém tocar na sua campainha ou até mesmo posso te avisar quando uma chuva estiver iniciando. Além disso, posso ser chamada quando quiser saber qual a temperatura atual no local da sua residência! Quando quiser saber a temperatura atual, basta me enviar a sua localização!`)
})

bot.hears(`/campainha`, async ctx => {
  const nome = ctx.update.message.from.first_name
  await ctx.replyWithVideo({source : 'C:/Users/letic/Desktop/Gifs_Projeto_A3/campainha.mp4'})
  await ctx.reply(`${nome}, você tem uma visita!`)
})

bot.hears(`/chuva`, async ctx => {
  const nome = ctx.update.message.from.first_name
  await ctx.replyWithVideo({source : 'C:/Users/letic/Desktop/Gifs_Projeto_A3/chuva.mp4'})
  await ctx.reply(`${nome}, acabou de iniciar uma chuva 🌦🌧⛈🌩☔️ na sua casa, e viemos te avisar que é melhor você fechar a sua janela! `)
})

bot.on('location', ctx => {
	const nome = ctx.update.message.from.first_name
	const location = ctx.update.message.location
	console.log(location)

	let request = require('request');
 
	let url = `https://api.hgbrasil.com/weather?key=409df82c&lat=${location.latitude}&lon=${location.longitude}&user_ip=remote`
	let dados ='';
	 
	request(url, function (err, response, body) {
	 if(err)
	 {
	  console.log('error:', error);
	 } 
	 else 
	 {
		let weather = JSON.parse(body);
		let temperatura = ''
		let tempoDescricao = ''

		for (let [tipo, temp] of Object.entries(weather.results)) 
		{
			if(tipo == 'temp')
			{
				temperatura = temp
			}
			if(tipo == 'description')
			{
				tempoDescricao = temp	 
				console.log(`${tempoDescricao}`)
			}
		}
		ctx.reply(`${nome}, neste exato momento, na localização enviada, a temperatura está em: ${temperatura}ºC e o tempo está${tempoDescricao.replace(/Tempo/i, '')}.`)
	}
	});
})

bot.startPolling()