module.exports.info = {
    testGuild: process.env.GUILD,
    clientId: process.env.CLIENT,
    authorId: process.env.AUTHOR,
    mongoURI: process.env.MONGO_URI
};

module.exports.embed = {
    color: "#color",
    footer: (guildName) => {
        return `CX 💖 ${guildName}`;
    }
}