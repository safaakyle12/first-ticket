const { Message, Client } = require("discord.js");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")

// Quick.db 
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: "delete",
    aliases: ['end'],
    memberPermissions: ['MANAGE_CHANNELS'], // Member Permission Check
    botPerms: ['MANAGE_CHANNELS'], // Bot Permission check in server
    botChannelPerms: ['MANAGE_CHANNELS'], // Bot permission check in Channel
    owner: true, // Owner Only check
    serverOwner: true, // Server Owner check
    run: async (client, message, args) => {
        const tic = await db.delete(`wadi3_${message.guild.id}.ballance`)
        message.react("✔")
    }
    }