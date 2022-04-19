require("dotenv").config({ path: `${process.cwd()}/src/.env`});

const { Client, Intents, Collection } = require("discord.js");
const loadCore = require("./core/loader.js");

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();

loadCore(client);

client.login(process.env.TOKEN);