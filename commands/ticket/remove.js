const { Message, Client } = require("discord.js");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const { StaffRoleId, ownerID } = require("../../config.json")
// Quick.db 
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: "remove",
    aliases: [''],
    description: "حذف اليوزر من التكت",
    type: "ticket",
    memberPermissions: ['MANAGE_CHANNELS'], // Member Permission Check
    botPerms: ['MANAGE_CHANNELS'], // Bot Permission check in server
    botChannelPerms: ['MANAGE_CHANNELS'], // Bot permission check in Channel
    owner: true, // Owner Only check
    serverOwner: true, // Server Owner check

     /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    
    run: async (client, message, args) => {

        if (!message.channel.name.includes("ticket-")) {
            message.channel.send("This is not a ticket channel").then(async function (msg) {
                setTimeout(() => {
                    msg.delete().catch(err => { return })
                }, 1000 * 7);
            })
            return
        }
message.channel.permissionOverwrites.set([{
    id: StaffRoleId,
    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
}, {
    id: StaffRoleId,
    allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
}, {
    id: message.guild.roles.everyone,
    deny: ["VIEW_CHANNEL"]
}]).then(() => {
    message.reply("**✅ Done remove user**")
        .then(async function (msg) {
            setTimeout(() => {
                msg.delete().catch(err => { return })
            }, 1000 * 7);
        })
})
}
}
