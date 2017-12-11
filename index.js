const commando = require('discord.js-commando');
const bot = new commando.Client();

bot.registry.registerGroup('random', 'Random');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

//bot.login('Mzg5MjQxNDg5MjgyMDM5ODE4.DQ4-3A.3DUBhTxufrncpz5CtaYRTRkGECI'); //for running from pc don't change this
client.login(process.env.BOT_TOKEN); //for running from heroku
