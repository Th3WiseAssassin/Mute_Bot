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

        message.channel.send(embed); //outputs all the infor save in the embed above

        return;
    }

    //!mute @<username> || !mute <user id> command
    if(command === `${prefix}mute`) {

        //Check if the command executor has the right permission to do this command.        
        if(!message.member.hasPermission("MANAGE_MESSAGES")) {
/*Make this message sound more like mute---------------------------
                                                                   |
                                                                   V                             */
         return message.channel.send("You don't have the manage messages permission.")//Checks to make sure that the person executing the !mute command has the permission 
        }

        //Get the mentioned user, return if there is none.
        if (!message.mentions.users.first() && !message.guild.members.get(args[0])) {
/*Make this message sound more like mute---------------------------------
                                                                         |
                                                                         V                             */
            return message.channel.send("You did not specify a user mention or ID!"); //If the the command isn't entered correctly say the message here
        } 

        let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        
        //create a role called muted
        let role = message.guild.roles.find(r => r.name === "Muted");
        if(!role) {
            try {
                role = await message.guild.createRole({
                    name: "Muted",
                    color: "#FF0000",
                    permissions: []
                });
    
                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(role, {
                        ADD_REACTIONS: false,
                        VIEW_CHANNEL: false,
                        READ_MESSAGES: false,
                        SEND_MESSAGES: false,
                        READ_MESSAGE_HISTORY: false
                    });
                });
    
            } catch(e) {
                console.log(e.stack);
            }
        }
/*Make this message sound more like mute---------------------------------------
                                                                               |
                                                                               V                             */
        if(toMute.roles.has(role.id)) return message.channel.send("This user is already muted!");

        await(toMute.addRole(role));
/*Make this message sound more like mute---
                                           |
                                           V                             */
        message.channel.send("I have muted them.");

        return;
    }

    //!unmute @<username> || !unmute <user id> command
    if(command === `${prefix}unmute`) {

        //Check if the command executor has the right permission to do this command.        
        if(!message.member.hasPermission("MANAGE_MESSAGES")) {
/*Make this message sound more like mute---------------------------
                                                                   |
                                                                   V                             */
         return message.channel.send("You don't have the manage messages permission.")//Checks to make sure that the person executing the !mute command has the permission 
        }

        //Get the mentioned user, return if there is none.
        if (!message.mentions.users.first() && !message.guild.members.get(args[0])) {
/*Make this message sound more like mute---------------------------------
                                                                         |
                                                                         V                             */
            return message.channel.send("You did not specify a user mention or ID!"); //If the the command isn't entered correctly say the message here
        } 

        let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        
        //create a role called muted
        let role = message.guild.roles.find(r => r.name === "Muted");
       
 /*Make this message sound more like mute-----------------------------------------------
                                                                                        |
                                                                                        V                             */
        if(!role || !toMute.roles.has(role.id)) return message.channel.send("This user is not muted!");

        await(toMute.removeRole(role));
/*Make this message sound more like mute---
                                           |
                                           V                             */
        message.channel.send("I have unmuted them.");

        return;
    }
});

//bot.login('<Inset Bot Token Here>'); //for running from pc don't change this
bot.login(process.env.BOT_TOKEN); //for running from heroku
