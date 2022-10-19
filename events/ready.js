const client = require("../index");
const moment = require("moment");
var colors = require('colors');

// Quick.db 
const { QuickDB } = require("quick.db");
const db = new QuickDB();

client.on("ready", () => {
  client.guilds.cache.forEach(async guild => {
    let pre = await db.get(`prefix_${guild.id}`) || client.config.prefix;
    console.log(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`.bgGreen)
  console.log(`${moment().format("hh:mm").cyan} | ${client.user.tag} is ready`.magenta)
 client.user.setPresence({ activities: [{ name: "مالو هاظ", type: "STREAMING", url: "https://www.twitch.tv/vice-stor" }] });
  client.user.setStatus("online")

  })
});