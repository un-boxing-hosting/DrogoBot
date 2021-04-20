const humanizeDuration = require("humanize-duration");
const {
    MessageEmbed
} = require("discord.js");
module.exports = {
    name: 'play',
    aliases: ['p'],
    description: 'Play a song/playlist or search for a song from youtube"',
    cooldown: 5,
    usage: '(song link/name)',
    guildOnly: true,
    args: true,
    async execute(bot, message, args) {
        const Member = message.member;
        const voiceChannel = Member.voice.channel;
        if (!voiceChannel) return message.channel.send("You need to be in a voice channel to play music.");

        const permissions = voiceChannel.permissionsFor(bot.user);
        if (!permissions.has("CONNECT")) return message.channel.send("I cannot connect to your voice channel, make sure I have permission to!");
        if (!permissions.has("SPEAK")) return message.channel.send("I cannot connect to your voice channel, make sure I have permission to!");

        if (!args[0]) return message.channel.send("Please provide a song name or link to search.");

        const player = bot.manager.create({
            guild: message.guild.id,
            textChannel: message.channel.id,
            voiceChannel: message.member.voice.channel.id,
        });

        bot.manager.search(args.join(" "), message.author).then(async res => {
                switch (res.loadType) {
                    case "TRACK_LOADED":
                        player.queue.add(res.tracks[0]);
                        message.channel.send(`Enqueuing \`${res.tracks[0].title}\` \`${humanizeDuration(res.tracks[0].duration, true)}\``);


                        if (!player.playing) {
                            player.connect();
                            player.play()
                        }
                        break;

                    case "SEARCH_RESULT":
                        let index = 1;
                        const tracks = res.tracks.slice(0, 5);
                        const embed = new MessageEmbed()
                            .setAuthor("Song Selection.", message.author.displayAvatarURL)
                            .setDescription(tracks.map(video => `**${index++} -** ${video.title}`))
                            .setFooter("Your response time closes within the next 30 seconds. Type 'cancel' to cancel the selection");

                        await message.channel.send(embed);

                        const collector = message.channel.createMessageCollector(m => {
                            return m.author.id === message.author.id && new RegExp(`^([1-5]|cancel)$`, "i").test(m.content)
                        }, {
                            time: 30000,
                            max: 1
                        });

                        collector.on("collect", m => {
                            if (/cancel/i.test(m.content)) return collector.stop("cancelled")

                            const track = tracks[Number(m.content) - 1];
                            player.queue.add(track)
                            message.channel.send(`Enqueuing \`${track.title}\` \`${humanizeDuration(track.duration, true)}\``);
                            if (!player.playing) {
                                player.connect();
                                player.play()
                            }
                        });

                        collector.on("end", (_, reason) => {
                            if (["time", "cancelled"].includes(reason)) return message.channel.send("Cancelled selection.")
                        });
                        break;

                    case "PLAYLIST_LOADED":
                        //console.log(res.tracks)
                        //res.Playlist.forEach(track => player.queue.add(track));
                        player.queue.add(res.tracks)
                        /*
                        const duration = humanizeDuration(res.Playlist.duration((acc, cur) => ({
                            duration: acc.duration + cur.duration
                        })).duration, true);
                        */
                        //message.channel.send(`Enqueuing \`${res.PlaylistInfo.length}\` \`${duration}\` tracks in playlist \`${res.PlaylistInfo.name}\``);
                        if (!player.playing) {
                            player.connect();
                            player.play()
                        }
                        break;
                    case "LOAD_FAILED":
                        message.channel.send(`LOAD_FAILED`);
                        console.log(res);
                }
            }).catch(err => console.log(err))
            .catch(err => console.log(err.message))

    },
};