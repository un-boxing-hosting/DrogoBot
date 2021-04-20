const humanizeDuration = require("humanize-duration");
const {
    MessageEmbed
} = require("discord.js")
const {
    stripIndents
} = require("common-tags")
module.exports = {
    name: 'nowplaying',
    aliases: ['np', 'now'],
    description: 'Displays what the bot is currently playing.',
    cooldown: 5,
    usage: '',
    guildOnly: true,
    args: false,
    async execute(bot, message, args) {
        const player = bot.manager.players.get(message.guild.id);
        if (!player || !player.queue[0]) return message.channel.send("No song/s currently playing within this guild.");
        const {
            title,
            author,
            duration,
            thumbnail
        } = player.queue[0];

        const embed = new MessageEmbed()
            .setAuthor("Current Song Playing.", message.author.displayAvatarURL)
            .setThumbnail(thumbnail)
            .setDescription(stripIndents `
            ${player.playing ? "▶️" : "⏸️"} ** ${title} ** \`${ humanizeDuration(duration, true)}\` by ${author}`);

        return message.channel.send(embed);
    },
};