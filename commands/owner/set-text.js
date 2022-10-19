const { Message, Client } = require("discord.js");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const { prefix } = require('../../config.json')
// Quick.db 
const { QuickDB } = require("quick.db");
const db = new QuickDB();


module.exports = {
    name: "text",
    aliases: [''],
    description: "تحديد رسائل التكت فتح التكت",
    type: "Owner",
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

        let dogeguild = args[0];
        if (!dogeguild) return message.reply({
            embeds: [new MessageEmbed()
                .setTitle(`text tic \`[text]\`: كتابه الوصف تبع انشاء التكت\ntext open \`[text]\`: كتابه وصف لما تفتح تكت\ntext imag \`[image]\`: اضافه صوره لما تفتح تكت`)
                .setColor("DARKER_GREY")
            ]
        });

        if (dogeguild == "tic") {
            if (!args[1]) return message.channel.send("Write text");

            if (args.join(" ").length > 100) {
                message.reply(`Please add the text for your bio (max 100.)`)
            }
            const textTiketCreate = await db.set(`textTiketCreate_${message.guild.id}`, args.slice(1).join(" "));
            await message.reply(`successfully! , \`${textTiketCreate}\``)
        }
        else if (dogeguild == "open") {
            if (!args[1]) return message.channel.send("Write text");

            if (args.join(" ").length > 100) {
                message.reply(`Please add the text for your bio (max 100.)`)
            }
            const textTiketOpen = await db.set(`textTiketOpen_${message.guild.id}`, args[1])
            await message.reply(`successfully! , \`${textTiketOpen}\``)
        }
        else if (dogeguild == "imag") {
            const img = message.attachments.first() ? message.attachments.first().url : args[1]; 
            if(!img) return message.channel.send("Add image")
        
        await db.set(`img_${message.guild.id}_open`, img) // add image colors
            return message.channel.send(`Done add image colors`)

        }

    }
}