const { Client } = require("discord.js");
const { readdir } = require("fs");
const { sep } = require("path");

/**
 * @param {Client} client The bot client
 */

module.exports = async (client) => {
    const path = `${process.cwd()}${sep}src${sep}events`;

    readdir(path,
        async (err, files) => {
            for (const file of files) {
                if (!file.endsWith(".js")) continue;

                const event = require(`${path}${sep}${file}`);
                const eventName = file.split(".")[0];

                client.on(eventName, event.bind(null, client));
                delete require.cache[require.resolve(`${path}${sep}${file}`)];
            };
        }
    );
};