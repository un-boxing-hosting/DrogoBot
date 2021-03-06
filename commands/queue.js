const {
    MessageEmbed
} = require("discord.js")
module.exports = {
    name: 'queue',
    aliases: ['q'],
    description: 'Displays what the current queue is.',
    cooldown: 5,
    usage: '',
    guildOnly: true,
    args: false,
    async execute(bot, message, args) {
        const player = bot.manager.players.get(message.guild.id);
        if (!player || !player.queue[0]) return message.channel.send("No song currently playing in this guild.");

        let index = 1;
        let string = "";

        if (player.queue[0]) string += `__**Currently Playing**__\n ${player.queue[0].title} - **Requested by ${player.queue[0].requester.username}**. \n`;
        if (player.queue[1]) string += `__**Rest of queue:**__\n ${player.queue.slice(1, 10).map(x => `**${index++})** ${x.title} - **Requested by ${x.requester.username}**.`).join("\n")}`;

        const embed = new MessageEmbed()
            .setAuthor(`Current Queue for ${message.guild.name}`, message.guild.iconURL)
            .setThumbnail(player.queue[0].thumbnail)
            .setDescription(string);

        return message.channel.send(embed);
    },
};