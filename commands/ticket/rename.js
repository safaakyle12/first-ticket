const { Message, Client } = require("discord.js");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")

// Quick.db 
const { QuickDB } = require("quick.db");
const db = new QuickDB();


module.exports = {
    name: "rename",
    aliases: ['name'],
    description: "تغير اسم التكت",
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
        setTimeout(() => {
            message.delete().catch(err => { return })
        }, 1000 * 15);
        try {
            var renameMessage = args.join(' ');
            if (!message.channel.name.includes("ticket-")) {
                message.channel.send("❌ This is not a ticket channel").then(async function (msg) {
                    setTimeout(() => {
                        msg.delete().catch(err => { return })
                    }, 1000 * 15);
                })
                return
            }
            
            if (!renameMessage) {
                message.channel.send("❌ you need same permissions to use this command")
                .then(async function (msg) {
                    setTimeout(() => {
                        msg.delete().catch(err => { return })
                    }, 1000 * 15);
                })
                return 
            }
            
            message.reply({content: "Done edit name ticket" ,  ephemeral: true })
            .then(async function (msg) {
                setTimeout(() => {
                    msg.delete().catch(err => { return })
                }, 1000 * 15)
              await message.channel.setName(`${renameMessage}`)
            })
        } catch (err) {
            return;
        }
    }
}