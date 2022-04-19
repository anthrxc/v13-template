const { Client } = require("discord.js");
const loadCommands = require("./commands.js");
const loadEvents = require("./events.js");

/**
 * @param {Client} client The bot client.
 */

module.exports = (client) => {
    loadCommands(client);
    loadEvents(client);
};