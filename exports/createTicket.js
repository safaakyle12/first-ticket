const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const moment = require("moment");
const { image2, description_open } = require("../config.json")
const Discord = require("discord.js");
const discordTranscripts = require('discord-html-transcripts');
const client = require("../index");

// Quick.db 
const { QuickDB } = require("quick.db");
const db = new QuickDB();


client.on("interactionCreate", async (interaction, message, user, guildDoc) => {
    if (interaction.isButton()) {
        let staff = await db.get(`role_${interaction.guild.id}_staff`) || " ";
        let CatergoryID = await db.get(`channel_${interaction.guild.id}_category`);

        if (interaction.customId === "ticket-open") {
            await interaction.deferReply({ ephemeral: true })
            var userChannel = interaction.guild.channels.cache.find(e => e.topic == interaction.user.id)
            if (userChannel) {
                return interaction.followUp({
                    content: `You already have a ticket open! <#${userChannel.id}>`,
                    ephemeral: true
                })
            }
            const user = await db.set(`user_${interaction.guild.id}`, interaction.user.id)
            await db.add(`wadi3_${interaction.guild.id}.ballance`, 1)
            const channelMade = interaction.guild.channels.create(`ticket-${await db.get(`wadi3_${interaction.guild.id}.ballance`)}`, {
                parent: CatergoryID,
                topic: interaction.user.id,
                permissionOverwrites: [{
                    id: interaction.user.id,
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                }, {
                    id: staff,
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                }, {
                    id: interaction.guild.roles.everyone,
                    deny: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                }],
                type: "GUILD_TEXT"
            }).then(async c => {

                interaction.followUp({ content: `This Chat Ticket Open ${c}`, ephemeral: true })
                const textOpen = await db.get(`textTiketOpen_${c.guild.id}`);
                const imagOpen = await db.get(`img_${c.guild.id}_open`) || "https://media.discordapp.net/attachments/1014982006276366388/1015906197154582538/banner_-1.png";
                const newtic = new Discord.MessageEmbed()
                    .setColor("BLURPLE")
                    .setImage(imagOpen) 

                let button1 = new Discord.MessageButton()
                    .setCustomId("Lock")
                    .setEmoji("🔒")
                    .setStyle("SECONDARY")

                let button4 = new Discord.MessageButton()
                    .setCustomId("ticket-delete")
                    .setEmoji("🗑")
                    .setStyle("SECONDARY")

                const row = new Discord.MessageActionRow()
                    .addComponents(button1, button4)

                c.send({
                    content: `<@&${staff || " "}> | <@${interaction.user.id}>\n ${textOpen || `- Welcome to ${interaction.guild.name} ticket service, we love to serve you.`}`,
                    embeds: [newtic],
                    components: [row]
                })//.then(msg => msg.pin())
            })

        } else if (interaction.customId === 'Lock') {
            const StaffPeople = interaction.guild.roles.cache.get(staff)
            if (!interaction.member.roles.cache.has(StaffPeople.id && interaction.user.id && interaction.guild.ownerId)) {
                //   interaction.reply({ content: "You do not have permissiont to lock the ticket!", ephemeral: true })
            } else {
                interaction.channel.permissionOverwrites[{
                    id: interaction.user.id,
                    deny: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                }, {
                    id: client.user.id,
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                }, {
                    id: staff,
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                }, {
                    id: interaction.guild.roles.everyone,
                    deny: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                }].then(interaction.reply({
                    embeds: [new Discord.MessageEmbed()
                        .setColor("GREY")
                        .setDescription("I have archieved the ticket for further reviewing!")
                    ], ephemeral: true
                }))
            }

        } else if (interaction.customId === "ticket-delete") {

            const StaffPeople = interaction.guild.roles.cache.get(staff)
            if (!interaction.member.roles.cache.has(StaffPeople.id || interaction.guild.ownerId)) {
                interaction.reply({ content: "You do not have permissiont to close the ticket!", ephemeral: true })
            } else {

                if (((interaction.channel.topic === interaction.user.id)) === interaction.user.id && StaffPeople !== interaction.user.id) {
                    return interaction.followUp({
                        content: `This ticket can only be closed by owner members.`,
                        ephemeral: true
                    })
                }
                await interaction.reply({ content: "**Delete ticket in 3 seconds...**", ephemeral: true })
                const log = await db?.get(`channel_${interaction.guild.id}_log`)
                var logChannel = interaction.guild.channels.cache.find(channel => channel?.id === log);
                if (!logChannel) return

                // send room channel
                const attachment = await discordTranscripts.createTranscript(interaction.channel, {
                    limit: -1,
                    returnType: 'attachment',
                    fileName: `${interaction.channel.topic}.html`,
                    minify: true,
                    saveImages: true, // Download all images and include the image data in the HTML (allows viewing the image even after it has been deleted) (! WILL INCREASE FILE SIZE !)
                    useCDN: true // Uses a CDN to serve discord styles rather than bundling it in HTML (saves ~8kb when minified)
                });
                const embedClosedTicket = new Discord.MessageEmbed()
                    .setColor("DARKER_GREY")
                    .setTitle("Ticket Closed")
                    .addFields({
                        name: "Ticket ID",
                        value: `${await db.get(`wadi3_${interaction.guild.id}.ballance`)}`
                    })
                    .addFields({
                        name: "Ticket by",
                        value: `<@${interaction.channel.topic}> - ${interaction.channel.topic}`
                    })
                    .addFields({
                        name: "Ticket has been closed",
                        value: `<@${interaction.user.id}>`
                    })
                    .addFields({
                        name: "Open Time",
                        value: `${moment(Date.now()).format("MM-DD-YYYY, HH:mm:ss A")}`
                    })
                    .setTimestamp()
                logChannel?.send({ embeds: [embedClosedTicket], files: [attachment] })

                // send user
                var member = await interaction.guild.members.cache.get(interaction.channel.topic);
                const userClosedTicket = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle("Ticket Closed")
                    .addFields({
                        name: "Ticket ID",
                        value: `${await db.get(`wadi3_${interaction.guild.id}.ballance`)}`
                    })
                    .addFields({
                        name: "Ticket has been closed",
                        value: `<@${interaction.user.id}>`
                    })
                    .addFields({
                        name: "Open Time",
                        value: `${moment(Date.now()).format("MM-DD-YYYY, HH:mm:ss A")}`
                    })
                    .setTimestamp()
                member.user.send({ embeds: [userClosedTicket], files: [attachment] });

                setTimeout(() => {
                    interaction.channel.delete()
                }, 3000)
            }
        }
    }
})