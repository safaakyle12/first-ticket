const Discord = require("discord.js")
const { ownerID, prefix } = require('../../config')
const { MessageEmbed } = require('discord.js')
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { Message, Client } = require("discord.js");

module.exports = {
    name: "help",
    aliases: ['p'],
    memberPermissions: ['SEND_MESSAGES'], // Member Permission Check
    botPerms: ['SEND_MESSAGES'], // Bot Permission check in server
    botChannelPerms: ['SEND_MESSAGES'], // Bot permission check in Channel
    owner: false, // Owner Only check
    serverOwner: false, // Server Owner check

    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message) => {

        var args = message.content.split(" ");
      

        if (ownerID.includes(message.author.id) ) {

            var types = ["ticket", "owner"]
            let em = new MessageEmbed()
                .setAuthor({ name: "Commands of " + client.user.username })
                .setColor("AQUA")
                .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))

            for (let i = 0; i < types.length; i++) {
                var cmd = client.commands.filter(c => c.type && c.type == types[i])
                if (cmd.size != 0) {
                    em.addField(`__${types[i].toUpperCase()}__:`, `${cmd.map(c => `\`${c.name}:\` ${c.description}`).join(`,\n`)}`)
                }
            }
            message.author.send({ embeds: [em] }).then(() =>
                message.react("✅")
            ).catch(err => {
                console.log(err)
                message.react("❌")
            })

        } else if (!ownerID.includes(message.author.id)) {

            var types = ["ticket"];
            let em1 = new MessageEmbed()
                .setAuthor({ name: "Commands of " + client.user.username })
                .setColor("AQUA")
                .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))

            for (let i = 0; i < types.length; i++) {
                var cmd = client.commands.filter(c => c.type && c.type == types[i])
                if (cmd.size != 0) {
                    em1.addField(`__${types[i].toUpperCase()}__:`, `${cmd.map(c => `\`${c.name}:\` ${c.description}`).join(`,\n`)}`)
                }
            }

            message.author.send({ embeds: [em1] }).then(() =>
                message.react("✅")
            ).catch(err => {
                console.log(err)
                message.react("❌")
            })
        }
    }
}