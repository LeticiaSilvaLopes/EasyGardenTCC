const env = require('../.env')
const Telegraf = require('telegraf')
const Markup = require('telegraf/markup')
const Telegram = require('telegraf/telegram')
const Extra = require('telegraf/extra')
const bot = new Telegraf(env.token)
const telegram = new Telegram(env.token)
const { connect } = require("./connect");
const schedule = require('node-schedule')

const data = new Date(Date.year, Date.month, Date.day, 03, 12)

async function pesquisaTodosUsuarios() 
{
    const client = await connect();
    const res = await client.query(`SELECT * FROM tb_Usuario`);
	// console.log(res.rows)
	return res
}

async function avisoManha() 
{
	console.log(`entrou`)

	var resultado = await pesquisaTodosUsuarios()

	for(let item of resultado.rows)
	{
		console.log(item)
		console.log(item.idtelegram)
		console.log(item.apelido)

		const apelidoDoDono = item.apelido

		if(clima = `Ideal`)
		{
			telegram.sendMessage(item.IdTelegram, `Bom Dia, ${apelidoDoDono}!! Como o clima está gostoso hoje né?! Está ${graus} e para mim esse tempo é perfeito! Amo o ${calorOuFrio}. Espero que essa ${estacao} não acabe tão cedo!`)
		}
		else
		{
			telegram.sendMessage(item.IdTelegram, `Bom Dia, ${apelidoDoDono}!! Como o clima está estranho hoje né?! Está ${graus} e para mim esse tempo é um pouco ruim. Gosto mais do ${calorOuFrio}, esse ${calorOuFrio} me deixa irritada. Espero que essa ${estacao} não acabe tão cedo!`)
		}
		
		if(umidade = `Ideal`)
		{
			telegram.sendMessage(item.IdTelegram, `E pelo o que vejo aqui, a umidade da minha terra está maravilhosa!`)
		}
		else
		{
			telegram.sendMessage(item.IdTelegram, `E pelo o que vejo aqui, a umidade da minha terra está péssima! Jaja essa irrigação vai ligar para me deixar 100% saudável de novo.`)
		}
		
		if(luminosidade = `Ideal`)
		{
			telegram.sendMessage(item.IdTelegram, `E hoje é o meu dia para a luz! Ela está do jeitinho que eu gosto!`)
		}
		else
		{
			telegram.sendMessage(item.IdTelegram, `É, infelizmente hoje não é um bom dia para a minha luz, ela não está muito boa hoje para mim.`)
		}
	}

	
} 

const notificacao = new schedule.scheduleJob(data, avisoManha())

async function pesquisaUsuario(usuarioId) 
{
    const client = await connect();
    const res = await client.query(`SELECT * FROM tb_Usuario where idTelegram = ${usuarioId}`);
	console.log(res.rows);
	return res.rows
}



const plantasMedicinais = Markup.keyboard([
    ['Alecrim', 'Erva-cidreira', 'Camomila', 'Boldo']
]).resize().extra()

const cadastroPlatMais = Markup.keyboard([
    ['Sim', 'Não']
]).resize().extra()

const opcoesCuidadoUsuario = Markup.keyboard([
    [`${apelidoDaPlanta} está limpinha!`, `${apelidoDaPlanta} está com terra nova e adubo novo!`, `${apelidoDaPlanta} está com novos fertilizantes!`, `${apelidoDaPlanta} está com a casa maior!`]
]).resize().extra()

var clima = `Ideal`
var umidade = `Ideal`
var luminosidade = `Ideal`

var apelidoDaPlanta = pesquisaUsuario()
var apelidoDoDono = `PEGAR VALOR DA BASE DE DADOS`

var graus = `Pegar pela localização`
var calorOuFrio = `Pelos graus determinar se está calor ou frio`
var estacao = `Pesquisar estação de acordo com a época do ano`

var diasUltimaPoda = `CALCULAR DADOS DA BASE`

var avisosDaManha = `MARCAR UM RELOGIO QUE MANDE MENSAGEM TODOS OS DIAS`
var podar = `RECEBER AVISO DO ARDUINO`
var regando = `RECEBER AVISO DO ARDUINO`
var aduboETerra = `RECEBER AVISO DO ARDUINO`
var fertilizantes = `RECEBER AVISO DO ARDUINO`
var temperaturaAlta = `RECEBER AVISO DO ARDUINO OU VERIFICAR PELA LOCALIZACAO A CADA CERTO TEMPO`

bot.start(async (ctx) => 
{
    const idUsuario = ctx.update.message.from.id
	const nome = ctx.update.message.from.first_name
	console.log(apelidoDaPlanta)
	// pesquisaUsuario(idUsuario)
    console.log(idUsuario)
    await ctx.reply(`	Olá, ${nome}! 
	Meu nome é Easy Garden, e estou aqui para te mostrar que cuidar da sua plantinha nunca foi tão fácil e gratificante! 
	O primeiro passo que precisaremos fazer é casdastrar qual a sua plantinha. 
	Neste cadastro coletaremos as seguintes informações:
	Qual a sua plantinha;
	Qual o apelido da sua plantinha;
	Como você gostaria de ser chamado pela sua plantinha;
	E qual o número do nosso Easy Garden. Este número encontra-se no manual de primeiros passos.
	Após o cadastro sempre te avisaremos quando ela for irrigada, e sempre que ela precisar de cuidados e além de te avisarmos, também falaremos quais cuidados você precisará ter! 
	Estaremos aqui para te ajudar a cuidar da sua plantinha ❤️🪴`)
	await ctx.reply(`Para cadastrarmos a sua plantinha, selecione quais dessas é ela:`, plantasMedicinais)
})

bot.hears(`Alecrim`, async ctx => {
  const nome = ctx.update.message.from.first_name
	await ctx.replyWithPhoto({source : `D:\\Leticia\\Documentos\\Estudos\\Faculdade\\TCC\\Alecrim.jpg`})
	await ctx.reply(`${nome}, ficamos muito felizes que a sua plantinha seja o alecrim, pois ele é muito utilizado no preparo de compressas, ajudando a aliviar hematomas e contusões, além de diminuir as dores provenientes das doenças reumáticas e articulares. Os seus princípios ativos ainda parecem combater enxaquecas, lapsos de memória e até baixa imunidade.`)
	await ctx.reply(`${nome}, agora nós vamos cadastrar o apelido da sua plantinha, qual o nome você quer dar para ela?`)
	await ctx.reply(`${nome}, agora toda vez que você quiser saber qualquer coisa sobre a sua plantinha, basta chamar ela aqui com o apelido que você criou. Só que faltou uma coisinha... Agora você tem uma plantinha para cuidar, e ela te ama muito, por isso ela gostaria muito de te chamar por um apelido, qual apelido você escolhe para ela te chamar?`)
	await ctx.reply(`E por fim nós precisamos do número que você recebeu no manual de primeiros passos. Você pode digitar o número pra gente?`)
	await ctx.reply(`A sua plantinha ${apelidoDaPlanta} está cadastrada! Você gostaria de cadastrar mais alguma plantinha?`, cadastroPlatMais)
})

bot.hears(`Erva-cidreira`, async ctx => {
  const nome = ctx.update.message.from.first_name
	await ctx.replyWithPhoto({source : `D:\\Leticia\\Documentos\\Estudos\\Faculdade\\TCC\\erva-cidreira.jpg`})
	await ctx.reply(`${nome}, ficamos muito felizes que a sua plantinha seja a Erva-Cidreira. O chá de erva-cidreira é excelente no combate de gases e cólicas, além de ser um relaxante natural, pois a planta possui efeito calmante, graças aos seus óleos essenciais. Outros benefícios garantidos com o seu uso são o poder analgésico e antiespasmódico, além de ser um bom combatente da herpes labial.`)
	await ctx.reply(`${nome}, agora nós vamos cadastrar o apelido da sua plantinha, qual o nome você quer dar para ela?`)
	await ctx.reply(`${nome}, agora toda vez que você quiser saber qualquer coisa sobre a sua plantinha, basta chamar ela aqui com o apelido que você criou. Só que faltou uma coisinha... Agora você tem uma plantinha para cuidar, e ela te ama muito, por isso ela gostaria muito de te chamar por um apelido, qual apelido você escolhe para ela te chamar?`)
	await ctx.reply(`E por fim nós precisamos do número que você recebeu no manual de primeiros passos. Você pode digitar o número pra gente?`)
	await ctx.reply(`A sua plantinha ${apelidoDaPlanta} está cadastrada! Você gostaria de cadastrar mais alguma plantinha?`, cadastroPlatMais)
})

bot.hears(`Camomila`, async ctx => {
	const nome = ctx.update.message.from.first_name
	await ctx.replyWithPhoto({source : `D:\\Leticia\\Documentos\\Estudos\\Faculdade\\TCC\\camomila.webp`})
	await ctx.reply(`${nome}, ficamos muito felizes que a sua plantinha seja a Camomila, pois ela é utilizada com a finalidade de diminuir cólicas, agindo ainda como um anti-inflamatório natural. As flores da camomila ainda garantem substâncias emolientes, que ajudam a pele a se manter hidratada. A planta também é utilizada como tônico digestivo, facilitando assim a eliminação dos gases e estimulando o apetite.`)
	await ctx.reply(`${nome}, agora nós vamos cadastrar o apelido da sua plantinha, qual o nome você quer dar para ela?`)
	await ctx.reply(`${nome}, agora toda vez que você quiser saber qualquer coisa sobre a sua plantinha, basta chamar ela aqui com o apelido que você criou. Só que faltou uma coisinha... Agora você tem uma plantinha para cuidar, e ela te ama muito, por isso ela gostaria muito de te chamar por um apelido, qual apelido você escolhe para ela te chamar?`)
	await ctx.reply(`E por fim nós precisamos do número que você recebeu no manual de primeiros passos. Você pode digitar o número pra gente?`)
	await ctx.reply(`A sua plantinha ${apelidoDaPlanta} está cadastrada! Você gostaria de cadastrar mais alguma plantinha?`, cadastroPlatMais)
})

bot.hears(`Boldo`, async ctx => {
	const nome = ctx.update.message.from.first_name
	await ctx.replyWithPhoto({source : `D:\\Leticia\\Documentos\\Estudos\\Faculdade\\TCC\\boldo.jpg`})
	await ctx.reply(`${nome}, ficamos muito felizes que a sua plantinha seja o Boldo, pois o boldo contribui na digestão e, indiretamente, nas funções hepáticas. Atua também como anti-inflamatório, inibindo a síntese da prostaglandina. No Chile, os frutos da planta são consumidos como alimento, e não devemos confundir o Boldo-do-Chile com o falso-boldo, uma espécie facilmente encontrada em jardins e hortas no Brasil.`)
	await ctx.reply(`${nome}, agora nós vamos cadastrar o apelido da sua plantinha, qual o nome você quer dar para ela?`)
	await ctx.reply(`${nome}, agora toda vez que você quiser saber qualquer coisa sobre a sua plantinha, basta chamar ela aqui com o apelido que você criou. Só que faltou uma coisinha... Agora você tem uma plantinha para cuidar, e ela te ama muito, por isso ela gostaria muito de te chamar por um apelido, qual apelido você escolhe para ela te chamar?`)
	await ctx.reply(`E por fim nós precisamos do número que você recebeu no manual de primeiros passos. Você pode digitar o número pra gente?`)
	await ctx.reply(`A sua plantinha ${apelidoDaPlanta} está cadastrada! Você gostaria de cadastrar mais alguma plantinha?`, cadastroPlatMais)
})

bot.hears(avisosDaManha, async ctx => {
	const nome = ctx.update.message.from.first_name
	if(clima = `Ideal`)
	{
		await ctx.reply(`Bom Dia, ${apelidoDoDono}!! Como o clima está gostoso hoje né?! Está ${graus} e para mim esse tempo é perfeito! Amo o ${calorOuFrio}. Espero que essa ${estacao} não acabe tão cedo!`)
	}
	else
	{
		await ctx.reply(`Bom Dia, ${apelidoDoDono}!! Como o clima está estranho hoje né?! Está ${graus} e para mim esse tempo é um pouco ruim. Gosto mais do ${calorOuFrio}, esse ${calorOuFrio} me deixa irritada. Espero que essa ${estacao} não acabe tão cedo!`)
	}

	if(umidade = `Ideal`)
	{
		await ctx.reply(`E pelo o que vejo aqui, a umidade da minha terra está maravilhosa!`)
	}
	else
	{
		await ctx.reply(`E pelo o que vejo aqui, a umidade da minha terra está péssima! Jaja essa irrigação vai ligar para me deixar 100% saudável de novo.`)
	}

	if(luminosidade = `Ideal`)
	{
		await ctx.reply(`E hoje é o meu dia para a luz! Ela está do jeitinho que eu gosto!`)
	}
	else
	{
		await ctx.reply(`É, infelizmente hoje não é um bom dia para a minha luz, ela não está muito boa hoje para mim.`)
	}
	
})

bot.hears(regando, async ctx => {
	await ctx.reply(`Era tudo o que eu precisava! Uma boa aguinha, eu já estava quase morrendo de sede! Que bom que eu tenho sensores que ajudam a me irrigar assim que eu sinto vontade de beber água, a tecnologia é tudo!`)
})

bot.hears(podar, async ctx => {
	await ctx.reply(`Ei ${apelidoDoDono}! Eu acho que preciso de você nesse momento. Já fazem ${diasUltimaPoda} dias que você não me poda, eu preciso dessa ajudinha para que eu continue crescendo muuito saudável e para que nenhum bichinho queira pousar em mim e estragar toda a minha beleza.`)
})

bot.hears(aduboETerra, async ctx => {
	await ctx.reply(`Ei ${apelidoDoDono}! Eu acho que preciso de você nesse momento. Já fazem ${diasUltimaPoda} dias que você não troca a minha terra e coloca adubo. O adubo e a terra nova fazem com que eu continue crescendo muito saudável, e essa troca é essencial para mim! Assim que você finalizar a troca, me avisa, eu vou ficar muito feliz em ter sido cuidada!`)
})

bot.hears(fertilizantes, async ctx => {
	await ctx.reply(`Ei ${apelidoDoDono}! Eu acho que preciso de você nesse momento. Já fazem ${diasUltimaPoda} dias que você não troca a minha terra e coloca adubo. O adubo e a terra nova fazem com que eu continue crescendo muito saudável, e essa troca é essencial para mim! Assim que você finalizar a troca, me avisa, eu vou ficar muito feliz em ter sido cuidada!`)
})

bot.hears(temperaturaAlta, async ctx => {
	await ctx.reply(`Nossa, que calor!! Eu espero que não tenha bichinhos em mim, as vezes eles me deixam doente.`)
})

bot.hears(apelidoDaPlanta, async ctx => {
	await ctx.reply(`Oi ${apelidoDaPlanta}! Qual novidade você tem pra mim?`, opcoesCuidadoUsuario)
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