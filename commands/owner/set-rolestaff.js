const Discord = require("discord.js")
const { Message, Client,MessageEmbed } = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: "setrole",
    description: "اضافه رول لظهور رومات التكت",
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
    if(!dogeguild) return message.reply({content: "setrole staff: \`اضافه رتبه ستاف للمنشن من داخل التكت\`\n\`setrole delete: \` حذف الرنب\`"})

    if(dogeguild == "staff") {
      const role = message.guild.roles.cache.get(args[1])
         if(!role) return message.reply({content: "add role"})
      
      await db.set(`role_${message.guild.id}_staff`,role.id) 
      return message.channel.send(`Role Add Done ${role.name}`)
          }
else if(dogeguild == "delete") {
    await db.delete(`role_${message.guild.id}_staff`) // role
    return message.react("✅")
    }
        }
        }