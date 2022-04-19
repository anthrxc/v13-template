const { Client } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { commands } = require("../core/commands.js");

/**
 * @param {Client} client The bot client
 */

module.exports = async (client) => {
    console.clear();

    client.user.setActivity({ name: "your mom's sex tape", type: "WATCHING" });
    
    const rest = new REST({
        version: "9"
    }).setToken(process.env.TOKEN);

    (async () => {
        try {
            if (process.env.ENV.toLowerCase() === "production") {
                console.log("Environment: PRODUCTION");
                console.log("Registering commands globally...");

                await rest.put(Routes.applicationCommands(client.user.id), {
                    body: commands
                });

                console.log("Commands registered successfully.");
            }
            else if (process.env.ENV.toLowerCase() === "testing") {
                console.log("Environment: TESTING");
                console.log("Registering commands locally...");
                
                await rest.put(Routes.applicationGuildCommands(client.user.id, process.env.GUILD), {
                    body: commands
                });
                
                console.log("Commands registered successfully.");
            }
            else {
                console.log("Environment unknown");
                console.log("Shutting down...");
                console.log("------------------");

                process.kill(process.pid, "SIGTERM");
            };
        }
        catch (error) {
            if (error) throw error;
        }
    })();

    setTimeout(() => {
        console.log("CX :o has started up and is ready to use.");
        console.log("-----------------------------------------");
    }, 1500);
};

module.exports.startupTime = Date.now();