const Discord = require("discord.js")
const { owner , prefix} = require('../../config.json')
const { Message, Client,MessageEmbed } = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: "set",
    description: "اضافه الكاتوجري التكت",
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

    run: async (client, message,args) => {

 let dogeguild = args[0];
 if(!dogeguild) return message.channel.send({ embeds: [new MessageEmbed()
   .setTitle(`${prefix}set ca \`[ID]\``)
   .setColor('RED')
 ]});

if(dogeguild == "ca") {
const room = message.guild.channels.cache.get(args[1]);
console.log(room)
if (!room) return message?.reply("add category id")
   if (room?.type == "**GUILD_CATEGORY**") return;
   if (db.get(`channel_${message.guild.id}_category`) == room.id) return 
  const v = await db.set(`channel_${message.guild.id}_category`, room.id);
console.log(v)
 message.reply(`set Room Done ${room.name}`)

} else if(dogeguild == "delete") {
 await db.delete(`channel_${message.guild.id}_category`)
 

return message.react("✅")
} 

}
}