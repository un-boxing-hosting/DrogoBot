const Discord = require('discord.js');
const {
    prefix,
    token,
    GIPHYtoken,
    channelID,
    nodes,
    consoleid
} = require('./config.json');
//const defaultSettings = require(`./commands/setings.json`)
const ytdl = require('ytdl-core');
const ffmpeg = require('ffmpeg');
const GphApiClient = require('giphy-js-sdk-core');
const search = require('youtube-search');
//const GBL = require('gblapi.js');
const fs = require('fs');
//const ErelaClient = Manager;
const bot = new Discord.Client({
    partials: ["MESSAGE", "CHANNEL", "REACTION"]
});
const {
    Manager
} = require("erela.js");

const client = new Discord.Client();
const Giphy = GphApiClient(GIPHYtoken);
const cooldowns = new Discord.Collection();
const db = require('quick.db');
//const Enmap = require('enmap');
//const fs = require('fs-extra');
bot.commands = new Discord.Collection();
bot.Discord = Discord;


const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const functionFiles = fs.readdirSync('./util').filter(file => file.endsWith('.js'));



bot.on('message', async dmmessage => {

    if (!dmmessage.channel.type === 'dm') return;
    if (dmmessage.channel.type === 'dm') {
        //if (dmmessage.author.bot) return
        const dms = dmmessage.content;
        const dmauthor = dmmessage.author.tag;
        //console.log(`message ${dms} sent by ${dmauthor} in dm`)
        const channel = bot.channels.cache.get(`${channelID}`);
        const dmEmbed = new Discord.MessageEmbed()

            .setColor('GREEN')
            .setTitle('new DM')
            .setURL('http://www.unboxingman.com')
            .setAuthor('un boxing bot', 'http://unpix.nwpixs.com/logo.png', 'http://www.unboxingman.com')
            .setDescription(` Received: ${dms}`)
            .setThumbnail('http://unpix.nwpixs.com/logo.png')
            .addFields(
                //{ name: 'new dm message', value: `${dms}` }, 
                {
                    name: `by ${dmauthor}`,
                    value: `.`
                },
            )
            .setTimestamp()
            .setFooter('made by un boxing man yt', 'http://unpix.nwpixs.com/unboxingman%20logo%201.1.png')

        channel.send(dmEmbed)
        console.log(`message ${dms} sent by ${dmmessage.author.tag} in dm`)
    }
});

bot.on('messageDelete', async message => {

    // const args = message.content.slice(prefix.length).trim().split(/ +/g);
    // const command = args.shift().toLowerCase();

    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }

    }

    if (message.guild) {
        if (message.member == null) return;
        if (message.member.user.bot) return;
       // var y = db.get('messagedelete_' + message.guild.id)
        //if (y !== `enabled`) return;
      //  var x = db.get('loggingchannel_' + message.guild.id)
     //   x = bot.channels.cache.get(x)
        const fetchedLogs = await message.guild.fetchAuditLogs({
            limit: 1,
            type: 'MESSAGE_DELETE',

        });
        const deletionLog = fetchedLogs.entries.first();
        const {
            executor,
            target
        } = deletionLog;
        if (message.channel == x) {
            var embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setAuthor('message deleted', message.guild.iconURL)
                .addField('user', message.member.user.bot)
            if (!deletionLog) {
                embed.addField(`was deleted, but no relevant audit logs were found.`)
            }
            if (deletionLog) {
                embed.addField('deleteed by', executor.tag)

            }
            if (message.content) {

                embed.addField('message', message.content)

            }

            embed.addField('channel', message.channel)
            embed.setTimestamp()
            message.guild.owner.send(embed).catch()
            x.send(`dmed the guild owner :)`)
            return;
        }
        var embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor('message deleted', message.guild.iconURL)
            .addField('user', message.author.username)
        if (!deletionLog) {
            embed.addField(`was deleted, but no relevant audit logs were found.`)
        } else {
            embed.addField('deleteed by', executor.tag)
        }
        embed.addField('message', message.content)
        embed.addField('channel', message.channel)
        embed.setTimestamp()
        x.send(embed).catch()
    }

});






// Initiate the Manager with some options and listen to some events.
bot.manager = new Manager({
        // Pass an array of node. Note: You do not need to pass any if you are using the default values (ones shown below).
        nodes: [
            // If you pass a object like so the "host" property is required
            {
                host: "localhost", // Optional if Lavalink is local
                port: 2333, // Optional if Lavalink is set to default
                password: "youshallnotpass", // Optional if Lavalink is set to default
            },
        ],
        // A send method to send data to the Discord WebSocket using your library.
        // Getting the shard for the guild and sending the data to the WebSocket.
        send(id, payload) {
            const guild = bot.guilds.cache.get(id);
            if (guild) guild.shard.send(payload);
        },
    })
    .on("nodeConnect", node => console.log(`Node ${node.options.identifier} connected`))
    .on("nodeError", (node, error) => console.log(`Node ${node.options.identifier} had an error: ${error.message}`))
    .on("trackStart", (player, track) => {
        bot.channels.cache
            .get(player.textChannel)
            .send(`Now playing: ${track.title}`);
    })
    .on("queueEnd", (player) => {
        bot.channels.cache
            .get(player.textChannel)
            .send("Queue has ended.");

        player.destroy();
    });


// Ready event fires when the Discord.JS client is ready.
// Use EventEmitter#once() so it only fires once.
bot.once("ready", () => {
    console.log("I am ready!");
    // Initiate the manager.
    bot.manager.init(bot.user.id);
});

// Here we send voice data to lavalink whenever the bot joins a voice channel to play audio in the channel.
bot.on("raw", (d) => bot.manager.updateVoiceState(d));

bot.on("message", async (message) => {
    if (message.content.startsWith("!!play")) {
        // Note: This example only works for retrieving tracks using a query, such as "Rick Astley - Never Gonna Give You Up".

        // Retrieves tracks with your query and the requester of the tracks.
        // Note: This retrieves tracks from youtube by default, to get from other sources you must enable them in application.yml and provide a link for the source.
        // Note: If you want to "search" for tracks you must provide an object with a "query" property being the query to use, and "source" being one of "youtube", "soundcloud".
        const res = await bot.manager.search(
            message.content.slice(7),
            message.author
        );
        console.log(message.content.slice(7))
        console.log(res)

        // Create a new player. This will return the player if it already exists.
        const player = bot.manager.create({
            guild: message.guild.id,
            voiceChannel: message.member.voice.channel.id,
            textChannel: message.channel.id,
        });

        // Connect to the voice channel.
        player.connect();

        // Adds the first track to the queue.
        player.queue.add(res.tracks[0]);
        message.channel.send(`Enqueuing track ${res.tracks[0].title}.`);

        // Plays the player (plays the first track in the queue).
        // The if statement is needed else it will play the current track again
        if (!player.playing && !player.paused && !player.queue.size)
            player.play();

        // For playlists you'll have to use slightly different if statement
        if (
            !player.playing &&
            !player.paused &&
            player.queue.totalSize === res.tracks.length
        )
            player.play();
    }
});





bot.once("ready", () => {

    console.log(`Bot has started, with ${bot.users.cache.size} users, in ${bot.channels.cache.size} channels of ${bot.guilds.cache.size} guilds.`);
    (function () {
        var oldlog = console.log;
        var t = new Date()
        var d = t.getDate();
        var m = t.getMonth();
        var y = t.getFullYear();
        var file = `F:/botlog/DrogoBot/music-log-${`${m}-${d}-${y}`}.txt`
        const channell = bot.channels.cache.get(consoleid)
        //fs.createFile(file, function(err){console.log(`${err} help me`);});
        var stream = fs.createWriteStream(file, {
            flags: 'a'
        })
        console.log = function (message) {
            channell.send(message)
            stream.write(message + "\n")
            oldlog.apply(console, arguments);
        };
    })();
    // console.log(countdownTimer())
   // bot.user.setActivity(`"${prefix}help" for help`);
    //bot.user.setActivity('🦃happy thanksgiving🦃')
    //bot.user.setActivity(`🍰 happy b-day un boxing man 🍰`, { type: `WATCHING`})
});

bot.arrayDiff = require(`./util/arrayDiff.js`);




for (const file of eventFiles) {

    const event = require(`./events/${file}`);
    if (event.once) {
        bot.once(event.name, (...args) => event.execute(...args, db, bot));
    } else {
        bot.on(event.name, (...args) => event.execute(...args, db, bot));
    }
}

bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}
bot.prefix = prefix;

bot.on('message', async message => {
    if (message.author.bot) return;

    //const guildConf = bot.settings.ensure(message.guild.id, defaultSettings);
    if (!message.content.startsWith(prefix)) return;
    //const voicechannel = Member.voice.channel;
    //const serverQueue = queue.get(message.guild.id);
    const args = message.content.split(/\s+/g);
    const commandName = args.shift().slice(prefix.length).toLowerCase();

    //const args = message.content.slice(prefix.length).split(/ +/);
    //const commandName = args.shift().toLowerCase();

    const command = bot.commands.get(commandName) ||
        bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;
    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply('I can\'t execute that command inside DMs!');

    }
    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;

        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);

    }
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }


    }
    try {
        command.execute(bot, message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }

});



function countdownTimer() {
    var endDate = new Date('2020-12-25 00:00:00');

    //defining the lengths of time differences
    var second = 1000;
    var minute = second * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var timer;

    function showRemaining() {
        var currentDate = new Date();
        //finds the distance between the desired date and current date
        var distance = endDate - currentDate;

        //if thhe distance is less thsn 0 (aka, it's already here) sets that
        if (distance < 0) {
            clearInterval(timer);
            document.getElementById('countdown').innerHTML = '<h1 id="datePassed">CHRISTMAS IS HERE!!</h1>';

            return;
        }
        var days = Math.floor(distance / day);
        var hours = Math.floor((distance % day) / hour);
        var minutes = Math.floor((distance % hour) / minute);
        var seconds = Math.floor((distance % minute) / second);

        var day1 = (days + verifyPlurals(days, 'day'));
        var hour1 = (hours + verifyPlurals(hours, 'hour'));
        var minute1 = (minutes + verifyPlurals(minutes, 'minute'));
        var second1 = (seconds + verifyPlurals(seconds, 'second'));


        //return (day1 + ` ` + hour1 + ` ` + minute1 + ` ` + second1);
        bot.user.setActivity(day1 + ` ` + hour1 + ` ` + minute1 + ` ` + second1 + ` to xmass 🎉🎉🎉🎉 `)
        //client.user.setActivity(days + verifyPlurals(days, 'day') + `hi`);

        //client.user.setActivity(`${days + verifyPlurals(days,'day') + ` ` + hours + verifyPlurals(hours, 'hour') + ` ` + minutes + verifyPlurals(minutes, 'minute') + ` ` + seconds + verifyPlurals(seconds, 'second')} `);
        //console.log(days + verifyPlurals(days, 'day') + ` ` + hours + verifyPlurals(hours, 'hour') + ` ` + minutes + verifyPlurals(minutes, 'minute') + ` ` + seconds + verifyPlurals(seconds, 'second'));
        // document.getElementById('countdown').innerHTML = days + ' ' + verifyPlurals(days, 'day');
        // document.getElementById('countdown').innerHTML += ', ' + hours + ' ' + verifyPlurals(hours, 'hour');
        //  document.getElementById('countdown').innerHTML += '<br>' + minutes + ' ' + verifyPlurals(minutes, 'minute');
        //  document.getElementById('countdown').innerHTML +=  ', ' + seconds + ' ' + verifyPlurals(seconds, 'second');
        //  document.getElementById('countdown').innerHTML += '<br><br><b>' + (days+1) + ' ' + verifyPlurals((days+1), 'sleep') + ' to go!</b>';
    };
    timer = setInterval(showRemaining, 10000)
    //return( day1 + ` ` + hour1 + ` ` + minute1 + ` ` + second1);
};

function verifyPlurals(value, type) {
    if (value > 1) {
        return type + 's';
    } else if (value == 1) {
        return type;
    } else if (value == 0) {
        return type + 's';
    } else {
        return null;
    }
}




bot.on('error', e => {
    console.log(e)
})
bot.login(token).catch(e => console.log(e));