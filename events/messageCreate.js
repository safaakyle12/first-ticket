const client = require("../index");
const { ownerID, prefix } = require("../config.json")
const Discord = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();

client.on("messageCreate", async (message) => {

    if (message.author.bot || !message.guild || !message.guild.me.permissions.has('SEND_MESSAGES') || !message.guild.me.permissionsIn(message.channel).has('SEND_MESSAGES')) return;
    var dprefix = prefix; //default prefix
    const pre = await db.get(`prefix_${message.guild.id}`)

    if (pre) {
      const prefix = pre;
      if (!message.content.toLowerCase().startsWith(prefix)) return;
      const args = message.content.slice(prefix.length).trim().split(/ +/);
      const cmd = args.shift();

      const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

      // Command User Permissions Check
      if (command?.memberPermissions && !message.member.permissions.has(command?.memberPermissions)) return message.channel.send({ content: `I need **\`${command.memberPermissions}\`** to use this command!` });

      // Bot Developer Permissions Commands
      if (command?.DeveloperUser === true && !owner.includes(message.author.id)) return message.channel.send({ content: `This command is only accessible by the owner bot.` }).catch(_ => { });

      // Server Owner Permissions Check
      if (command?.serverOwner === true && message.author.id !== message?.guild.fetchOwner().then(u => u?.id).catch(_ => { return }));

      // Bot Server Permissions Check
      if (!message.guild.me.permissions.has(command?.botPerms || [])) return message.channel.send({ content: `I need **\`${command.botPerms}\`** to use this command.` });


      if (!command) return;

      await command.run(client, message, args).catch(async (error) => {
        // Error handler
        console.log(error);
      });
      
    } else if (!pre) {
      const prefix = dprefix;
      if (!message.content.toLowerCase().startsWith(prefix)) return;
      const args = message.content.slice(prefix.length).trim().split(/ +/);
      const cmd = args.shift();

      const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

      // Command User Permissions Check
      if (command?.memberPermissions && !message.member.permissions.has(command?.memberPermissions)) return message.channel.send({ content: `I need **\`${command.memberPermissions}\`** to use this command!` });

      // Bot Developer Permissions Commands
      if (command?.DeveloperUser === true && !owner.includes(message.author.id)) return message.channel.send({ content: `This command is only accessible by the owner bot.` }).catch(_ => { });

      // Server Owner Permissions Check
      if (command?.serverOwner === true && message.author.id !== message?.guild.fetchOwner().then(u => u?.id).catch(_ => { return }));

      // Bot Server Permissions Check
      if (!message.guild.me.permissions.has(command?.botPerms || [])) return message.channel.send({ content: `I need **\`${command.botPerms}\`** to use this command.` });


      if (!command) return;

      await command.run(client, message, args).catch(async (error) => {
        // Error handler
        console.log(error);
      })
    }
});