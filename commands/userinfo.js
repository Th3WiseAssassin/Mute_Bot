const Discord = module.require("discord.js"); //imports the discord.js library

module.exports.run = async (bot, message,args) => {
    let embed = new Discord.RichEmbed()
            .setAuthor(message.author.username)
            .setDescription("This is the user's info!")
            .setColor("#008000") //sets the color of the side bar
            .addField("Full Username", message.author.username + "#" + message.author.discriminator) //outputs the users full name including there name and discriminator (ex: Stephen#9557)
            .addField("ID", message.author.id) //outputs the users id #
            .addField("Created At", message.author.createdAt) //outputs when the user created their Discord account
            .addField("Avatar","")
            .setImage(message.author.displayAvatarURL);

        message.channel.send(embed); //outputs all the infor save in the embed above
}

module.exports.help = {
    name: "userinfo"
}
