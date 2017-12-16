const Discord = module.require("discord.js"); //imports the discord.js library

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
/*Make this message sound more like mute---
                                           |
                                           V                             */
        message.channel.send("I have unmuted them.");

}

module.exports.help = {
    name: "unmute"
}
