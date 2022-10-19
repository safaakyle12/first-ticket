const client = require("../index");
const Discord = require("discord.js")

client.on("interactionCreate", async (interaction) => {
    const activity = client.presence?.activities[0];
    if (interaction.customId === "playing") {

        client.user.setPresence({activities: [{ name: activity.name, type: "PLAYING" }] });
        interaction.reply({
            content: "Updated the bot status",
            ephemeral: true
        });
    }

    if (interaction.customId === "strem") {
        client.user.setPresence({ activities: [{ name: activity.name, type: "STREAMING", url: "https://www.twitch.tv/vice-stor" }] })
        interaction.reply({
            content: "Updated the bot status",
            ephemeral: true
        });
    }

    if (interaction.customId === "lisin") {
        client.user.setPresence({ activities: [{ name: activity.name, type: "LISTENING" }] })
        interaction.reply({
            content: "Updated the bot status",
            ephemeral: true
        });
    }

    if (interaction.customId === "watc") {
        client.user.setPresence({ activities: [{ name: activity.name, type: "WATCHING" }] })
        interaction.reply({
            content: "> **Updated the bot status**",
            ephemeral: true
        });

    }

})