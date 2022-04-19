const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { embed: { color, footer } } = require("../config");

/**
 * @param {Client} client The bot client
 * @param {CommandInteraction} interaction The interaction that caused the event
 */

module.exports = async (client, interaction) => {
    if(!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if(!command) return;

    try {
        await command.execute(client, interaction);
    }
    catch (error) {
        if (error) console.error(error);

        const { guild, user } = interaction;

        await interaction.reply({
            embeds: [
                new MessageEmbed()
                .setColor(color)
                .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL({ format: "png", dynamic: true })})
                .setTitle("An error occured.")
                .setDescription("An error has occured while running this command.\nPlease try again later.\n\nIf the issue persists, join the [Support Server](\"Lott Support\") and contact us.")
                .setFooter({ text: footer(guild.name) })
            ],
            ephemeral: true
        });
    };
};