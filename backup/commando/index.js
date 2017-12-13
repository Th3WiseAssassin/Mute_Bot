const botSettings = require("./botSettings.json"); //import the bot settings from botSettings.json file
const prefix = botSettings.prefix;
const commando = require('discord.js-commando'); //imports the discord.js-commando library
const bot = new commando.Client(); //creates a new commando client called bot

bot.registry.registerGroup('random', 'Random');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

//bot.login('<Insert Bot Token Here>'); //for running from pc don't change this
bot.login(process.env.BOT_TOKEN); //for running from heroku
