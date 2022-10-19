const { Message, Client } = require("discord.js");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const { StaffRoleId, ownerID } = require("../../config.json")

// Quick.db 
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: "add",
    aliases: ['add'],
    description: "اضافه عضو",
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
            message.reply("This is not a ticket channel").then(async function (msg) {
                setTimeout(() => {
                    msg.delete().catch(err => { return })
                }, 1000 * 7);
            })
            return
        }
    

        var member = message.mentions.members.first() ||
            message.guild.members.cache.find(u => u.id == args[0]) ||
            message.guild.members.cache.find(u => u.user.username == args[0]) ||
            message.guild.members.cache.find(u => u.nickname == args[0]) ||
            message.guild.roles.cache.find(r => r.id == args[0]) ||
            message.guild.roles.cache.find(r => r.name == args[0]) ||
            message.mentions.roles.first();
        if (!args[0]) {
            message.channel.send("you have to specify the role/member you wont to make him join's the ticket!").then(async function (msg) {
                setTimeout(() => {
                    msg.delete().catch(err => { return })
                }, 1000 * 7);
            })
            return
        }
        var txt;
        var mem = member.name;
        if (!mem || mem == null || mem == undefined) {
            txt = '<@!' + member.id + '>'
        } else {
            txt = '<@&' + member.id + '> role'
        }
        message.channel.permissionOverwrites.set([{
            id: StaffRoleId,
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
        }, {
            id: member.id,
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY']
        }, {
            id: message.guild.roles.everyone,
            deny: ["VIEW_CHANNEL"]
        }]).then(() => {
            message.reply(`✅ ${txt} **has been added to this ticket**`).then(async function (msg) {
                setTimeout(() => {
                    msg.delete().catch(err => { return })
                }, 1000 * 15);
            })
        })
    }
}