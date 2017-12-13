//const botSettings = require("./botSettings.json"); //import the bot settings from botSettings.json file
const prefix = "!"; //botSettings.prefix; //sets the prefix from the botSettings.json into a variable called prefix to save keystrokes
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
            .setColor("#008000") //sets the color of the side bar
            .addField("Full Username", message.author.username + "#" + message.author.discriminator) //outputs the users full name including there name and discriminator (ex: Stephen#9557)
            .addField("ID", message.author.id) //outputs the users id #
            .addField("Created At", message.author.createdAt); //outputs when the user created their Discord account

        message.channel.sendEmbed(embed); //outputs all the infor save in the embed above

        return;
    }

    //!mute @<username> || !mute <user id> command
    if(command === `${prefix}jam`) {
        //Get the mentioned user, return if there is none.
        let toMute = message.mentions.users.fisrt() || message.guild.members.get(args[0]);
//Make this message sound more like mute.
        if (!toMute) return message.channel.sendMessage("You did not specify a user mention or ID!"); //If the the command isn't entered correctly say the message here

        return message.reply(toMute.username || toMute.user.username);

        //Check if the command executor has the right permission to do this command.
        //If the mutee has the same or a higher role than the muter, return.
    }
});

//bot.login('<Inset Bot Token Here>'); //for running from pc don't change this
bot.login(process.env.BOT_TOKEN); //for running from heroku
