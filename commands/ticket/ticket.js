const { Message, Client } = require("discord.js");
const {MessageEmbed , MessageActionRow , MessageButton} = require("discord.js")
const { image, description } = require("../../config.json")

// Quick.db 
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: "setup",
    aliases: ['setup'],
    description: "انشاء التكت",
    type: "ticket",
    memberPermissions: ['SEND_MESSAGES'], // Member Permission Check
    botPerms: ['SEND_MESSAGES'], // Bot Permission check in server
    botChannelPerms: ['SEND_MESSAGES'], // Bot permission check in Channel
    owner: true, // Owner Only check
    serverOwner: true, // Server Owner check
    
     /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async (client, message, args) => {
        
        message.delete()
         const text = await db.get(`textTiketCreate_${message.guild.id}`) || "لفتح التكت اظغط الزر"
      
        const OpenTicket = new MessageEmbed()
        .setColor("DARK_BLUE")
        .setDescription(text)
        .setImage(image || null)

        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId("ticket-open")
            .setEmoji('1029791300314206308')
            .setStyle('PRIMARY')
         )
         message.channel.send({embeds: [OpenTicket], components: [row], ephemeral: true})
         }
    }
