//const botSettings = require("./botSettings.json"); //import the bot settings from botSettings.json file
const Discord = require('discord.js'); //imports the discord.js library
const fs = require("fs");
const prefix = "!"; //botSettings.prefix; //sets the prefix from the botSettings.json into a variable called prefix to save keystrokes
const bot = new Discord.Client(); //creates a new Discord client called bot

bot.commands = new Discord.Collection();
bot.muted = require("./commands/muted.json");

fs.readdir("./commands/", (err, files) => {
    if(err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <= 0) {
        console.log("No commands to load!");
        return;
    }

    console.log('loading ${jsfiles.length} commands');


    jsfiles.forEach((f, i) => {
        let props = require(`./commands/${f}`)
        console.log(`${i + 1}: ${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
});

bot.on("ready", () => {
    console.log(`Bot is ready! ${bot.user.username}`);

    bot.setInterval(() => {
        for(let i in bot.muted) {
            let time = bot.muted[i].time;
            let guildId = bot.muted[i].guild;
            let guild = bot.guilds.get(guildId);
            let member;
            let mutedRole;
            if(guildId && guild) {
                member = guild.members.get(i);
                mutedRole = guild.roles.find(r => r.name === "Muted");
            }            
            
            if(!guildId || !guild || !member || !mutedRole) {
                delete bot.muted[i];

                fs.writeFile("./commands/muted.json", JSON.stringify(bot.muted, null, 4), err => {
                    if(err) throw err;
                });
console.log("i removed an invalid entry");
                continue;
            }

            if(Date.now() > time) {
                console.log(`${i} is now able to be unmuted!`);

                member.removeRole(mutedRole);
                delete bot.muted[i];

                fs.writeFile("./commands/muted.json", JSON.stringify(bot.muted, null, 4), err => {
                    if(err) throw err;
                    console.log(`I have unmuted ${member.user.tag}.`);
                });
            }
        }
    }, 5000);
});

bot.on("message", async message => {
    if(message.author.bot) return; //ignore messages from bot accounts
    if(message.channel.type === "dm") return; //ignore dm's

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if(!command.startsWith(prefix)) return; //if message doesn't start with the prefix ignore the command

    let cmd = bot.commands.get(command.slice(prefix.length));
    if(cmd) cmd.run(bot, message, args);

});

//bot.login('<Inset Bot Token Here>'); //for running from pc don't change this
bot.login(process.env.BOT_TOKEN); //for running from heroku
