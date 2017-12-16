const Discord = module.require("discord.js"); //imports the discord.js library

module.exports.run = async (bot, message,args) => {
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

        //check if the person is trying to mute themselves
        if(toMute.id === message.author.id) {
/*Make this message sound more like mute--------------
                                                      |
                                                      V                             */
            return message.channel.send("You can not mute yourself.");
        }

        //check if the person is trying to mute someone with the same role or a higher role than themselves
        if(toMute.highestRole.position >= message.member.highestRole.position) {
/*Make this message sound more like mute------------------------------------
                                                                            |
                                                                            V                             */
            return message.channel.send("You con not mute a member who is the same role or higher then you.");
        }
        
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

}

module.exports.help = {
    name: "mute"
}
