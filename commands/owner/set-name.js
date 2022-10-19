const Discord = require("discord.js")
const { owner , prefix} = require('../../config.json')
const { Message, Client,MessageEmbed } = require("discord.js");

module.exports = {
    name: "set-name",
    description: "تغير اسم البوت",
    aliases: [''],
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
    run: async (client, message) => {

  let args = message.content.split(" ").slice(1).join(" ")
  if (!args) return message.reply("write name bot new")
  client.user.setUsername(args)
  
message.channel.send(`> **${client.user.username}** name has been channged to **${args}**`)
}
}