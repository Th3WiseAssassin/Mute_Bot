const Discord = module.require("discord.js"); //imports the discord.js library
const fs = require("fs"); //imports the fs library

module.exports.run = async (bot, message,args) => {
        //Check if the command executor has the right permission to do this command.        
        if(!message.member.hasPermission("MANAGE_MESSAGES")) {
/*Make this message sound more like mute----------------------
                                                              |
                                                              V                             */
         return message.channel.send("You don't have the manage messages permission.")//Checks to make sure that the person executing the !mute command has the permission 
        }

        //Get the mentioned user, return if there is none.
        if (!message.mentions.users.first() && !message.guild.members.get(args[0])) {
/*Make this message sound more like mute-------------------------
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

        //delete the custom permissions given to a user effected by the !mute command
        message.guild.channels.forEach(async (channel, id) => {
                toOverwrite = channel.permissionOverwrites.get(toMute.id);
                toOverwrite.delete();
        });

        delete bot.muted[toMute.id];

        fs.writeFile("./commands/muted.json", JSON.stringify(bot.muted, null, 4), err => {
                if(err) throw err;
                console.log(`I have unmuted ${toMute.user.tag}.`);
        });
/*Make this message sound more like mute---
                                           |
                                           V                             */
        message.channel.send("I have unmuted them.");

}

module.exports.help = {
    name: "unmute"
}
