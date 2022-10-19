const { Client, Collection } = require("discord.js");
const Discord = require("discord.js");
const client = new Client({
  intents: 32767,
  allowedMentions: {
    repliedUser: false, parse: []
  }
});
var colors = require('colors');

// Quick.db 
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = client;

// Global Variables
client.commands = new Collection();
//client.slashCommands = new Collection();
client.config = require("./config.json");

// Initializing the project
require("./handler")(client);


client.on("guildCreate", async (guild) => {
  // let channel = await client.channels.cache.get(guild.channels.cache.filter(c => c.permissionsFor(client.user).has("SEND_MESSAGES") && c.type === "GUILD_TEXT").first().id);
  var member = await guild.members.cache.get(guild.ownerId);
  member.send(`شكرا الك على اضافه البوت لا تنسى تستعمل امر\n${client.config.prefix}start + setrole staff [ID] + set catergory [ID]`)
});


//Event: Guild Add
client.on('guildCreate', async (guild) => {
  let id = await db.get(`add_${guild.id}_guilds`);
  console.log("guildCreate | ".red, id)
  if (guild.id == id) return
  else guild.leave();
});

client.on('message', async message => {
  if (message.author.bot || !message.guild) return;
  const args = message.content.trim().split(/ +/);
  const command = args.shift().toLowerCase();
  if (command == client.config.prefix + 'start') {
   await db.set(`add_${message.guild.id}_guilds`, message.guild.id)
    return message.react("✅")
  }
  else if (command == client.config.prefix + 'delete') {
   await db.delete(`add_${message.guild.id}_guilds`)
   await db.set(`old_${message.guild.id}_guilds`, message.guild.id)
    return message.react("✅")

  }
});


client.on('messageCreate',async msg => {
  const pmention = new RegExp(`^<@!?${client.user.id}>( || )$`);
  if (msg.content.match(pmention)) {
    let pre = await db.get(`prefix_${msg.guild.id}`) || client.config.prefix;
 
    return msg.reply({ embeds: [ new Discord.MessageEmbed()
      .setColor(`${msg.guild.me.displayHexColor}`)
      .setTitle(`Hey **${msg.author.tag}**, my prefix for this server is ${pre}
      Want more info? then do \`${pre}\`**help**`)]})
  }
});

// Crash Bot 
client.on('error', error => console.log(error));
client.on('warn', info => console.log(info));
process.on('unhandledRejection', (reason, p) => {
  console.log(reason.stack ? reason.stack : reason)
});
process.on("uncaughtException", (err, origin) => {
  console.log(err.stack ? err.stack : err)
})
process.on('uncaughtExceptionMonitor', (err, origin) => {
  console.log(err.stack ? err.stack : err)
});


client.login(client.config.token);
