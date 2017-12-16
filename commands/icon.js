module.exports.run = async (bot, message,args) => {
   let msg = await message.channel.send("Generating icon...");

/*Make this message sound more like mute----------
                                                  |
                                                  V                             */
   if(!message.guild.iconURL) return msg.edit("No icon.");
   
    await message.channel.send({files: [
        {
            attachment: message.guild.iconURL,
            name: "avatar.png"
        }
   ]});

   msg.delete();
}

module.exports.help = {
    name: "icon"
}
