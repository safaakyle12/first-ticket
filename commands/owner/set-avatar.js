const Discord = require("discord.js")
const { owner, prefix } = require('../../config.json')
const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "set-avatar",
  description: "تغير صوره البوت",
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
  run: async (client, message, args) => {


    let Attachment = message.attachments.size > 0 ? message.attachments.array()[0].proxyURL : null
    const i = message.content.split(" ").slice(1).join(" ");
    if (!Attachment && !i.startsWith("https://") && !i.startsWith("http://")) return message.channel.send(`> 🚫 **${prefix}avatar <url - image>**`)
    if (i.startsWith("https://") || i.startsWith("http://")) {
      client.user.setAvatar(i).then(i => {
        message.channel.send("Done | This is New Avatar bot")
      }).catch(error => {
        if (error.code == Discord.Constants.APIErrors.INVALID_FORM_BODY) {
          message.channel.send("You are changing your avatar too fast. Try again later.")
        } else if (error.code !== Discord.Constants.APIErrors.INVALID_FORM_BODY) {
          message.channel.send("Something has gone wrong")
        }
      })
      return;
    } else if (Attachment) {
      client.user.setAvatar(message.attachments.first().url).then(i => {
        message.channel.send("Done | This is New Avatar bot")
      }).catch(error => {
        if (error.code == Discord.Constants.APIErrors.INVALID_FORM_BODY) {
          message.channel.send("You are changing your avatar too fast. Try again later.")
        } else if (error.code !== Discord.Constants.APIErrors.INVALID_FORM_BODY) {
          message.channel.send("Something has gone wrong")
        }
      })
      return;
    }
  }
}
