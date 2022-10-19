const { Message, Client} = require("discord.js");
const Discord = require("discord.js");
const discordTranscripts = require('discord-html-transcripts');
const moment = require("moment");

// Quick.db 
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: "close",
    aliases: ['end'],
    description: "حذف التكت",
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
        try {
            if (!message.channel.name.includes("ticket-")) {
                message.channel.send("This is not a ticket channel").then(async function (msg) {
                    setTimeout(() => {
                        msg.delete().catch(err => { return })
                    }, 1000 * 15);
                })
                return
            }
    
            message.reply({content: "**Delete ticket in 3 seconds...**" , ephemeral: true})
            .then(async function (msg) {
                let CatergoryID = await db.get(`channel_${msg.guild.id}_catergory`);
                const log = await db.get(`channel_${msg.guild.id}_log`)
                var logChannel = msg.guild.channels.cache.find(channel => channel.id === log);
                if (!logChannel) return

                // send room channel
                const attachment = await discordTranscripts.createTranscript(msg.channel, {
                    limit: -1,
                    returnType: 'attachment',
                    fileName: `${msg.channel.topic}.html`,
                    minify: true,
                    saveImages: true, // Download all images and include the image data in the HTML (allows viewing the image even after it has been deleted) (! WILL INCREASE FILE SIZE !)
                    useCDN: true // Uses a CDN to serve discord styles rather than bundling it in HTML (saves ~8kb when minified)
                });
                const embedClosedTicket = new Discord.MessageEmbed()
                    .setColor("DARKER_GREY")
                    .setTitle("Ticket Closed")
                    .addFields({
                        name: "Ticket ID",
                        value: `${await db.get(`wadi3_${msg.guild.id}.ballance`)}`
                    })
                    .addFields({
                        name: "Ticket by",
                        value: `<@${msg.channel.topic}> - ${msg.channel.topic}`
                    })
                    .addFields({
                        name: "Ticket has been closed",
                        value: `<@${msg.author.id}>`
                    })
                    .addFields({
                        name: "Open Time",
                        value: `${moment(Date.now()).format("MM-DD-YYYY, HH:mm:ss A")}`
                    })
                    .setTimestamp()
                logChannel.send({ embeds: [embedClosedTicket], files: [attachment] })

                // send user
                var member = await msg.guild.members.cache.get(msg.channel.topic);
                const userClosedTicket = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle("Ticket Closed")
                    .addFields({
                        name: "Ticket ID",
                        value: `${await db.get(`wadi3_${msg.guild.id}.ballance`)}`
                    })
                    .addFields({
                        name: "Ticket has been closed",
                        value: `<@${msg.author.id}>`
                    })
                    .addFields({
                        name: "Open Time",
                        value: `${moment(Date.now()).format("MM-DD-YYYY, HH:mm:ss A")}`
                    })
                    .setTimestamp()
                member.user.send({ embeds: [userClosedTicket], files: [attachment] });
              
                setTimeout(() => {
                    msg.channel.delete()
                }, 3000);
               
            })
        } catch (err) {
            return;
        }
    }
}