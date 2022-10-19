const Discord = require("discord.js")
const { owner , prefix} = require('../../config.json')
const { Message, Client,MessageEmbed } = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: "setlog",
    description: "لوق التكت",
    aliases: [''],
    type: "owner",
    memberPermissions: ['ADMINISTRATION'], // Member Permission Check
    botPerms: ['ADMINISTRATION'], // Bot Permission check in server
    botChannelPerms: [''], // Bot permission check in Channel
    owner: true, // Owner Only check
    serverOwner: true, // Server Owner check

    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async (client, message) => {
        //let args = message.content.split(" ");

        let channel = message.mentions.channels.first();
  
      // if (channel.length) return message.channel.send(`Please Mention the channel first`);

  
  await db.set(`channel_${message.guild.id}_log`, channel.id);
   message.channel.send(`Channel is setup as <#${channel.id}>`)
        }
        }