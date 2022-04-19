const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, CommandInteraction, Client } = require("discord.js");
const ms = require("ms");
const { embed } = require("../../config.js");
const { startupTime } = require("../../events/ready.js");

/**
 * @param {Client} client The bot client
 * @param {CommandInteraction} interaction The command interaction
 */

module.exports = {
    data: new SlashCommandBuilder()
        .setName("stats")
        .setDescription("Displays the bot's statistics."),
    async execute (client, interaction) {
        const { guild, user } = interaction;

        interaction.reply({
            embeds: [
                new MessageEmbed()
                .setColor(embed.color)
                .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL({ format: "png", dynamic: true }) })
                .setTitle("Statistics")
                .addFields(
                    {
                        name: "Author",
                        value: "[cx]( \"GitHub\")", // edit thsi
                        inline: true
                    },
                    {
                        name: "Support server",
                        value: "inv", // chagne this
                        inline: true
                    },
                    {
                        name: "Hosting service",
                        value: "my laptop", // :)
                        inline: true
                    },
                    {
                        name: "Server count",
                        value: `\`${client.guilds.cache.size}\` servers`,
                        inline: true
                    },
                    {
                        name: "User count",
                        value: `\`${client.users.cache.size}\` users`,
                        inline: true
                    },
                    {
                        name: "Uptime",
                        value: `\`${ms(Date.now() - startupTime, { long: true })}\``,
                        inline: true
                    }
                )
                .setFooter({ text: embed.footer(guild) })
            ]
        });
    }
};

module.exports.help = {
    name: "stats",
    description: "Displays the bot's statistics.",
    usage: ""
};