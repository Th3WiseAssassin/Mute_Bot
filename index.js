const botSettings = require("./botSettings.json"); //import the bot settings from botSettings.json file
const prefix = botSettings.prefix; //sets the prefix from the botSettings.json into a variable called prefix to save keystrokes
const Discord = require('discord.js'); //imports the discord.js library
const bot = new Discord.Client(); //creates a new Discord client called bot

bot.on("message", async message => {
    if(message.author.bot) return; //ignore messages from bot accounts
    if(message.channel.type === "dm") return; //ignore dm's

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if(!command.startsWith(prefix)) return; //if message doesn't start with the prefix ignore the command

    //!userinfo command
    if(command === `${prefix}userinfo`){
        let embed = new Discord.RichEmbed()
            .setAuthor(message.author.username)
            .setDescription("This is the user's info!")
            .setColor("#008000")
            .addField("Full Username", message.author.username + "#" + message.author.discriminator)
            .addField("ID", message.author.id)
            //worked to here
            .addField("Created At", message.author.createdAt);

        message.channel.sendEmbed(embed);

        return;
    }
});

//bot.login('Mzg5MjQxNDg5MjgyMDM5ODE4.DQ4-3A.3DUBhTxufrncpz5CtaYRTRkGECI'); //for running from pc don't change this
bot.login(process.env.BOT_TOKEN); //for running from heroku
