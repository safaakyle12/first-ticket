const Discord = require("discord.js")
const { owner , prefix} = require('../../config.json')
const { Message, Client,MessageEmbed } = require("discord.js");

module.exports = {
    name: "set-prefix",
    description: "تغير برفكس",
    aliases: ['prefix'],
    type: "owner",
    memberPermissions: ['ADMINISTRATION'], // Member Permission Check
    botPerms: ['ADMINISTRATION'], // Bot Permission check in server
    botChannelPerms: ['ADMINISTRATION'], // Bot permission check in Channel
    owner: true, // Owner Only check
    serverOwner: true, // Server Owner check

    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

    let dogeguild = args[0];
      if(!dogeguild) return 
   if(dogeguild == "add") {
   const newprefix = args[1]
 if(!newprefix) return message.reply('Enter New Prefix')
 if(newprefix.length > 3) return message.channel.send("Invalid Prefix, Prefix Is Too Long")
  await db.set(`prefix_${message.guild.id}`, newprefix)
  message.channel.send(`New Prefix Set To \`${newprefix}\``)
   
 } else if(dogeguild == "delete") {
    await db.delete(`prefix_${message.guild.id}`)
    return message.react("✅")
 }
}
}