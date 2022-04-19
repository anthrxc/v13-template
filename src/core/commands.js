const { Client } = require("discord.js");
const { readdir, readdirSync } = require("fs");
const { sep } = require("path");

process.exitCode = 1;

/**
 * @param {Client} client The bot client
 */

const commands = [];

module.exports = (client) => {
    var dir = `${process.cwd()}${sep}src${sep}commands`;

    try {
        readdir(dir, (err, subDirs) => {
            if (err) throw err;

            subDirs.forEach(
                sub => {
                    dir = `${process.cwd()}${sep}src${sep}commands${sep}${sub}${sep}`;
                    const commandFiles = readdirSync(dir).filter(file => file.endsWith(".js"));

                    for (const file of commandFiles) {
                        const command = require(`${dir}${file}`);
                        commands.push(command.data.toJSON());
                        client.commands.set(command.data.name, command);
                    };
                }
            );
        });
    }
    catch (error) {
        if (error) throw error;
    }
};

module.exports.commands = commands;