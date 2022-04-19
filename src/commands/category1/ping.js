const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, CommandInteraction, Client } = require("discord.js");
const { embed } = require("../../config.js");

/**
 * @param {Client} client The bot client
 * @param {CommandInteraction} interaction The command interaction
 */

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Displays the bot's ping."),
    
    async execute (client, interaction) {
        const { guild, user } = interaction;        
        
        const msg = await interaction.reply({
            embeds: [
                new MessageEmbed()
                .setColor(embed.color)
                .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }) })
                .setTitle("Ping")
                .setDescription("Calculating ping...")
                .setFooter({ text: embed.footer(guild.name) })
            ],
            fetchReply: true
        });

        var botPing = msg.createdTimestamp - interaction.createdTimestamp;
        var apiPing = client.ws.ping;

        botPing = botPing < 500 ? `\🟢 ${botPing}ms` : botPing < 1000 ? `\🟠 ${botPing}ms` : `\🔴 ${botPing}ms`;
        apiPing = apiPing < 500 ? `\🟢 ${apiPing}ms` : apiPing < 1000 ? `\🟠 ${apiPing}ms` : `\🔴 ${apiPing}ms`;

        interaction.editReply({
            embeds: [
                new MessageEmbed()
                .setColor(embed.color)
                .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }) })
                .setTitle("Ping")
                .setDescription(`Bot ping: \`${botPing}\`\nAPI ping: \`${apiPing}\``)
                .setFooter({ text: embed.footer(guild.name) })
            ]
        });
    }
};

module.exports.help = {
    name: "ping",
    description: "Displays the bot's ping",
    usage: ""
};