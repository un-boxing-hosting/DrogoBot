const Discord = require('discord.js');
const { prefix, token, GIPHYtoken, channelID, channelID2, channelID3, consoleid, boatsid, me } =require(`./config.json`);
const client = new Discord.Client();
const ytdl = require('ytdl-core');
const { join } = require("path");
//const bot = new Discord.Client();
const gac = require('giphy-js-sdk-core');
const Giphy = gac(GIPHYtoken);
const fs = require('fs-extra');
const { IncomingMessage } = require('http');
const { ifError } = require('assert');
const BOATS = require('boats.js');
const Boats = new BOATS(boatsid);

client.on("ready", () => {
	(function(){
  var	oldlog = console.log;
  var t = new Date()
  var d = t.getDate();
  var m = t.getMonth();
  var y = t.getFullYear();
  var file = `F:/botlog/DrogoBot/log-${`${m}-${d}-${y}`}.txt`
  const channelll = client.channels.cache.get(consoleid)
  //fs.createFile(file, function(err){console.log(`${err} help me`);});
  var stream = fs.createWriteStream(file, {flags: 'a'})
  console.log = function (message) {
	  channelll.send(message)
    stream.write(message + "\n")
    oldlog.apply(console, arguments);
  };
  })();
	console.log('Ready!');
	const channel3 = client.channels.cache.get(`${channelID3}`)
	channel3.send(`DrogoBot now online.`)
	const channel2 = client.channels.cache.get(`${channelID2}`)
  channel2.send(`DrogoBot restarted and is currently ${client.guilds.cache.size} servers.`)
	client.user.setActivity(`"${prefix}help" for help. Currently in  ${client.guilds.cache.size} servers. `)
  .then(presence => console.log(`Activity set to "${prefix}help" for help. Currently in  ${client.guilds.cache.size} servers.`))
  .catch(console.error);
  Boats.postStats(client.guilds.cache.size, '754398565748441318')
  .then (console.log("Discord Boats API Updated."));
  
  
return;
  });
 /* client.on('messageDelete', async message => {
    // ignore direct messages
    if (!message.guild) return;
    if (message.guild.id == "685312384574685186", "439866052684283905") return;
    const fetchedLogs = await message.guild.fetchAuditLogs({
      limit: 1,
      type: 'MESSAGE_DELETE',
    });
    // Since we only have 1 audit log entry in this collection, we can simply grab the first one
    const deletionLog = fetchedLogs.entries.first();
  
    // Let's perform a coherence check here and make sure we got *something*
    if (!deletionLog) return console.log(`A message by ${message.author.tag} was deleted, but no relevant audit logs were found.`);
  
    // We now grab the user object of the person who deleted the message
    // Let us also grab the target of this action to double check things
    const { executor, target } = deletionLog;
  
  
    // And now we can update our output with a bit more information
    // We will also run a check to make sure the log we got was for the same author's message
    if (target.id === message.author.id) {
      console.log(`A message by ${message.author.tag} was deleted by ${executor.tag} in ${message.guild.name}.`);
    }	else {
      console.log(`A message by ${message.author.tag} was deleted in ${message.guild.name}, but we don't know by who.`);
    }
  });*/

  client.on("guildCreate", guild => {
	// This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  const channel2 = client.channels.cache.get(`${channelID2}`)
  channel2.send(`<:Drogo_RemYeah:826612412115320903> DrogoBot joined ${guild.name}! DrogoBot is now in ${client.guilds.cache.size} servers.`)
	client.user.setActivity(`"${prefix}help" for help. Currently in  ${client.guilds.cache.size} servers. `);
  //channel.createInvite()
 // .then(invite => console.log(`Created an invite with a code of ${invite.code}`))
 // .catch(console.error);
 Boats.postStats(client.guilds.cache.size, '754398565748441318')
 .then (console.log("Discord Boats API Updated."));
  });
  
  client.on("guildDelete", guild => {
	// this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  const channel2 = client.channels.cache.get(`${channelID2}`)
  channel2.send(`<a:Drogo_PepeSad:827642584503418963> DrogoBot left ${guild.name}. DrogoBot is now in ${client.guilds.cache.size} servers.`)
	client.user.setActivity(`"${prefix}help" for help. Currently in  ${client.guilds.cache.size} servers. `);
  Boats.postStats(client.guilds.cache.size, '754398565748441318')
  .then (console.log("Discord Boats API Updated."));
  });

client.once('reconnecting', () => {
	console.log('Reconnecting!');
});

client.once('disconnect', () => {
	console.log('Disconnect!');
});

client.on('message', async dmmessage => {
    
    if (!dmmessage.channel.type === 'dm') return;
	if (dmmessage.channel.type === 'dm'){
        if (dmmessage.author.bot) {
          const dms = dmmessage.content;
        const dmauthor = dmmessage.author.tag;
        console.log(`message ${dms} sent by ${dmauthor} in dm`)
        const channel = client.channels.cache.get(`${channelID}`)
        const dmbEmbed = new Discord.MessageEmbed()
        
        .setColor('GREEN')
      .setTitle('bot sent dm')
      .setURL('http://dro.unboxingman.com')
      .setAuthor('drogobot', 'http://play.unboxingman.com/dro/DrogoLogo.png', 'http://dro.unboxingman.com')
      .setDescription(` sent: ${dms}`)
      .setThumbnail('http://play.unboxingman.com/dro/DrogoLogo.png')
      .addFields(
          //{ name: 'new dm message', value: `${dms}` }, 
          { name:`${dmauthor}`,  value: `.`},
      )
      .setTimestamp()
      .setFooter('made by un boxing man yt and Drogoton', 'http://unpix.nwpixs.com/logo.png')

	   channel.send(dmbEmbed)
	   //console.log(`message ${dms} sent by ${dmmessage.author.tag} in dm`)
	} else {
        
        const dms = dmmessage.content;
        const dmauthor = dmmessage.author.tag;
        console.log(`message ${dms} sent by ${dmauthor} in dm`)
        const channel = client.channels.cache.get(`${channelID}`)
        const dmEmbed = new Discord.MessageEmbed()
        
        .setColor('GREEN')
      .setTitle('new DM')
      .setURL('http://dro.unboxingman.com')
      .setAuthor('drogobot', 'http://play.unboxingman.com/dro/DrogoLogo.png', 'http://dro.unboxingman.com')
      .setDescription(` Received: ${dms}`)
      .setThumbnail('http://play.unboxingman.com/dro/DrogoLogo.png')
      .addFields(
          //{ name: 'new dm message', value: `${dms}` }, 
          { name:`by ${dmauthor}`,  value: `.`},
      )
      .setTimestamp()
      .setFooter('made by un boxing man yt and Drogoton', 'http://unpix.nwpixs.com/logo.png')

	   channel.send(dmEmbed)
	   console.log(`message ${dms} sent by ${dmmessage.author.tag} in dm`)
  }
  }
});

client.on('message' , async message => {
  if (message.author.bot) return;
  if (message.webhookID) return;
 // if (message.user.id === moron) return;
  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = message.content.toLocaleLowerCase();
  const mention = message.mentions.users.first();
  const Member = message.member;
	const voicechannel = Member.voice.channel;
    var DrogoYT = "https://www.youtube.com/channel/UCz-zElbMg6wpUnqeT7uiz7A"
  if (command.startsWith(`${prefix}ping`)) { 
        const m = await message.channel.send("Uhh");
         m.edit(`Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`)
         console.log(message.author.tag + " used the ping command in " + message.guild.name)
  }else if (message.content.startsWith(`${prefix}drogoyt`)){
		message.delete().catch(owo=>{});
		const drogoEmbed = new Discord.MessageEmbed()

		.setColor('GREEN')
        .setTitle('click me to sub')
        .setURL(DrogoYT)
        .setAuthor('DrogoBot', 'http://dr.nwpixs.com/media/DrogoLogo.png', 'http://www.unboxingman.com')
        .setDescription(` go sub to Drogoton on yt`)
        .setThumbnail('http://dr.nwpixs.com/media/DrogoLogo.png')
        .addFields(
            //{ name: 'new dm message', value: `${dms}` }, 
            { name:`click the title to go to yt`,  value: `or ${DrogoYT}`},
        )
        .setTimestamp()
        .setFooter('made by un boxing man yt and Drogoton', 'http://unpix.nwpixs.com/logo.png')

       message.channel.send(drogoEmbed)
       console.log(message.author.tag + " used the DrogoYT command in " + message.guild.name)

	}else if (command.startsWith(`${prefix}gif`)){ 
		   var input = message.content;
       var userInput= input.substr('4');
      if (!userInput) {
          message.channel.send(" you nead a gif")
           
      }  else { Giphy.search ('gifs' , {"q":userInput})
              .then((Response) => {
               var totalresponses = Response.data.length;
               var Responseindex = Math.floor((Math.random() * 10) + 1) % totalresponses;
               var Responsefinal = Response.data[Responseindex];
    
                  message.channel.send("",{
                  files: [Responsefinal.images.fixed_height.url]
                  
                })})}
              }else if (command.startsWith(`${prefix}say`)){ 
              if (message.member.hasPermission( 'MANAGE_MESSAGES'), (message.member.id === me)){
					
                // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
                // To get the "message" itself we join the `args` back into a string with spaces: 
                //var sayMessage = args.join(" ");
                var messagesay = message.content;
                  var sayMessage= messagesay.substr('5');
                  if (!sayMessage){
                    message.channel.send("I need something to say!")
                    return
                  }
                // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
                message.delete().catch(O_o=>{}); 
                message.channel.send(sayMessage);
                console.log(`${sayMessage} sent by ${message.author.tag} in channel ${message.channel.name} in guild ${message.guild.name}`)
             } else {
               message.channel.send('you need to have `MANAGE_MESSAGES`')
             }
  }else if (command.startsWith(`${prefix}restart`)){
	  if (message.member.id === me){
      message.channel.send('Restarting...')
      .then(client.user.setActivity("Restarting...", { type: 'PLAYING' }))
      .then(console.log("Restarting..."))
      .then(msg => client.destroy())
      .then(setTimeout(function(){ 
        client.login(token)
        .then(console.log("Done Restarting!"))
	  }, 5000));}
	  else return message.channel.send("No. You aren't Drogoton.")
  }else if (command.startsWith(`${prefix}dm`)){
	if (!message.member.id === me){
     message.channel.send("No, you aren't Drogoton.")
     return
  }
		const mentionmessage = message.content.slice(4);
		if(mention == null) { return; }
		message.delete();
		mentionmessage.slice(mention);
		mention.send(mentionmessage);
    message.channel.send("done!")
    console.log(`A message was sent from the bot by ${message.author.tag}. "${mentionmessage}"`)

	} else if (command.startsWith(`${prefix}subto`)){
		//message.delete().catch(owo=>{});
	
	/*	const coler =args[1];
		const name = args[2];
		const link = args[3];
		const logo = args[4];
		const idk = coler.toLocaleUpperCase();
	
		const Embed = new Discord.MessageEmbed()

		.setColor(`${idk}`)
        .setTitle('click me to sub')
        .setURL(`${link}`)
        .setAuthor('un boxing bot', 'http://unpix.nwpixs.com/logo.png', 'http://www.unboxingman.com')
        .setDescription(` go sub to ${name} on yt`)
        .setThumbnail(`${logo}`)
        .addFields(
            //{ name: 'new dm message', value: `${dms}` }, 
            { name:`click the blue text to go to yt`,  value: `or ${link}`},
        )
        .setTimestamp()
        .setFooter('made by un boxing man yt', 'http://unpix.nwpixs.com/logo.png')

	   message.channel.send(Embed)
	   console.log(`1${name} 2${link} 3${logo} 4${idk}`)*/
  } else if(command.startsWith(`${prefix}welcome`)){ 
    message.delete()
    message.channel.send(`Welcome to the server! My name is DrogoBot and this is ` + message.guild.name + "!")
    console.log(message.author.tag + " used the welcome command in " + message.guild.name)
  } else if(command.startsWith(`${prefix}help`)){ 
    const helpEmbed = new Discord.MessageEmbed()
    .setColor('GREEN')
    .setTitle('Command list:')
    .setURL('http://dr.nwpixs.com')
    .setAuthor('DrogoBot', 'http://dr.nwpixs.com/media/DrogoLogo.png', 'http://dr.nwpixs.com')
    .setDescription('DrogoBot Help Menu')
    .setThumbnail('http://dr.nwpixs.com/media/DrogoLogo.png')
    .addFields(
      {
        name: `${prefix}help`,
        value: `It's this.`,
      }, {
        name: `${prefix}support`,
        value: `Ways to contact the developers.`,
      }, {
        name: `${prefix}gif`,
        value: `Sends a gif depending on what follows after the command.`,
      }, {
        name: `${prefix}welcome`,
        value: `Sends a neat little welcome message.`,
      }, {
        name: `${prefix}vote`,
        value: `Gives you a link to vote for the bot! I would appreciate it if you did!`,
      }, {
        name: `${prefix}ping`,
        value: `API Latency.`,
      }, {
        name: `${prefix}stats`,
        value: `Sends stats based off of Discord Boats.`,
      }, {
        name: `${prefix}say`,
        value: `Let's you speak as the bot. (Requires Manage Messages.)`,
        }, {
        name:`${prefix}drogoyt`,
        value: `Links you to the Drogoton YouTube channel.`,
        }, {
        name:`${prefix}webhook`,
        value: `Creates a webhook in the channel the command was sent in.`,
      }, {
    name: `${prefix}channel`,
        value: `Creates a channel with a name provided afterwards.`,
      },
      //{ name: `${prefix}`, value: `:)`,  },
    )

    .setTimestamp()
    .setFooter('made by un boxing man yt and Drogoton', 'http://play.unboxingman.com/logo.png')
  message.channel.send(helpEmbed)
   console.log(message.author.tag + " used the help command in " + message.guild.name)
  }
   else if(command.startsWith(`${prefix}activity`)){ 
    var input = message.content;
    var userInput= args[1]
    var type = args[2]
    if (!userInput) {
      client.user.setActivity(`"${prefix}help" for help `, { type: 'WATCHING' })
    }
    if (type === `s`){
      var type1 = `STREAMING`
      client.user.setActivity(`gsfgsgfsdgsd`, { type: `STREAMING` })//URL: "https://www.twitch.tv/z1gaming" }) 
      console.log(type1)
      
    }
    if (type === `p`){
      var type2 = `PLAYING`
      client.user.setActivity(`"${userInput}`, { type: `${type2}` }) 
    }
    if (type === `l`){
      var type3 = `LISTENING`
      client.user.setActivity(`"${userInput}`, { type: `${type3}` }) 
      
    }
    if (type === `w`){
      var type4 = `WATCHING`
      client.user.setActivity(`"${userInput}`, { type: `${type4}` }) 
      
    } else if (!type) {

      client.user.setActivity(`"${userInput}`, { type: `CUSTOM_STATUS` }) 
    }
    console.log(`${userInput} ${type}`)
  //}else if(command.startsWith(`${prefix}propose`)){ 
   // message.delete()
   // message.channel.send("<@!280497242714931202>, will you marry me?")
  //  console.log("It happened!")
 // }else if(command.startsWith(`${prefix}fact`)){
  //  message.channel.send("<@!288484543080562688> is better than <@!376540589669351424>. That's true")
   // console.log("DrogoBot be spitting straight facts")
  //}else if(command.startsWith(`${prefix}admin`)){
  //  var input = message.content;
 //   var userInput= args[1]
   }else if(command.startsWith(`${prefix}webhook`)){
	  if(!message.member.hasPermission("MANAGE_WEBHOOKS")){
     message.channel.send("You don't have the right permissions for this command.")
     return
   }
      if(!message.guild.me.hasPermission("MANAGE_WEBHOOKS")){ 
        message.channel.send("I don't have Manage Webooks.")
        return
      }
    message.channel.createWebhook('Webhook made by DrogoBot', {
      avatar: 'http://dr.nwpixs.com/media/DrogoLogo.png',
    })
  message.channel.send("Success! You can find the webhook in my integration or the channel's integration.")}
    else if(command.startsWith(`${prefix}login`)){ 
    var input = message.content;
    var userInput= args[1]
    if (!userInput) {
      message.channel.send("Please choose a bot.")
      client.login(token)
    }
    if (type === `1`){
      var username = DrogoBot
      message.channel.send(`switching to ${username}`)
console.log(`${client.user.username} switching to DrogoBot.`)
client.destroy      
client.login(token)
    }
    if (type === `2`){
      var username = Devgoton
      message.channel.send(`switching to ${username}`)
      console.log(`${client.user.username} switching to Devgoton.`)
      client.destroy
      client.login(token2)
    }
    console.log(`Bot signed in as ${username}`)
  } else if (message.content.startsWith(`${prefix}download`)){
		var arg1 = args[1];
		var arg2 = args[2]
    var vidurl = await ytdl.getURLVideoID(arg1)
    if (!arg1) return message.channel.send("Did you forget the entire command?")
    if (!arg2) return message.channel.send("You need a name!")
		
		ytdl(arg1, { filter: format => format.container === 'mp4' })
	   .pipe(fs.createWriteStream(`F:/Drogobotmp3/${arg2}.mp3`))
	   .on(`error`, err => {
		   console.log(err)
	   })
		message.channel.send(`vid ${vidurl} saveed as ${arg2}.mp3`)
		console.log(`new vid saved by ${message.author.tag} url ${vidurl} named ${arg2}.mp3`)
		console.log(`https://www.youtube.com/watch?v=`+ vidurl)
	}else if (message.content.startsWith(`${prefix}fplay`)){
		if (!message.member.voice.channel) return;
		var arg1 = args[1]
    var connection = await message.member.voice.channel.join()
    message.channel.send(`Started playing ${arg1}.mp3`);
    console.log(`${message.author.tag} started playing ${arg1}.mp3 in channel ${message.channel.name} in guild ${message.guild.name}`);
      connection.play(`F:/Drogobotmp3/${arg1}.mp3`)
			.on(`error`, error => {
				console.log(Error)
      })
			.once(`finish`, end =>{
				
				message.member.voice.channel.leave()
      })
      
    }else if (message.content.startsWith(`${prefix}list`)){
    const dir = fs.readdirSync(join("F:/drogobotmp3")).filter((file) => file.endsWith(".mp3"));
    message.channel.send(dir)
    }else if (message.content.startsWith(`${prefix}membercount`)){
      var memcount =  message.guild.memberCount
      var guildname = message.guild.name
      message.channel.send(`${guildname} has ${memcount} members!`)
    }else if (message.content.startsWith(`${prefix}username`)){
      var arg99 = args[1]
      client.user.setUsername(arg99);
	console.log(`The bot's name was changed to ${arg99} by ${message.author.tag}`)
   console.error;
    }else if (message.content.startsWith(`${prefix}nickname`)){
      const nickname = message.content.slice(prefix.length + `nickname`).split(/ +/);
      message.guild.me.setNickname(nickname);
    }else if (message.content.startsWith(`${prefix}drogopc`)){
	 if (message.member.id === me){
      const arg23 = args[1]
      if (!arg23) return;
	 }else return message.channel.send("No files for you.")
      const dir = fs.readdirSync(join(arg23))
      message.channel.send(dir)
      }else if (message.content.startsWith(`${prefix}join`)){
        if (!message.member.voice.channel) return;
        message.member.voice.channel.join()
    } else if (message.content.startsWith(`${prefix}stop`)){
      if (!message.member.voice.channel) return;
      message.member.voice.channel.leave()
    }else if (message.content.startsWith(`${prefix}role`)){
      const arg1 = args[1]
      const guild = message.guild;
      //var roles = guild.roles;
      const role = guild.roles.cache.find(role => role.name === arg1);
            const member = message.mentions.members.first();
       member.roles.add(role);
    }else if (message.content.startsWith(`${prefix}no`)){
      const arg1 = args[1]
			const guild = message.guild;
			var roles = guild.roles;
			const role = guild.roles.cache.find(role => role.name === arg1);
			  const member = message.mentions.members.first();
        member.roles.remove(role);
    }else if (command.startsWith(`${prefix}restart`)){
      message.channel.send('Restarting...')
      .then(client.user.setActivity("Restarting...", { type: 'PLAYING' }))
      .then(console.log("Restarting..."))
      .then(msg => client.destroy())
      .then(setTimeout(function(){ 
        client.login(token)
        .then(console.log("Done Restarting!"))
     }, 5000));
}else if (command.startsWith(`${prefix}stats`)){
    message.channel.send(`https://discord.boats/api/widget/754398565748441318?type=png`);
  }else if (command.startsWith(`${prefix}vote`)){
message.channel.send("Use this link to vote for DrogoBot! \nhttps://discord.boats/bot/754398565748441318/vote")
  //}else if(`${prefix}lol`){
 //   const idiot = client.users.cache.get(weirdman);
 //   idiot.send("https://discord.boats/bot/754398565748441318/");
  }/*else if(`${prefix}adrogopc`){
    const arg56 = args[1]
    if (!arg56) return;
  const dir2 = fs.readFile(join(arg56))
  message.channel.send(arg56)
  .catch(console.error);
} else if(command.startsWith(`${prefix}mhelp`)){ 
  message.channel.send("DrogoBot Music help menu \n +download (YouTube.com link) (name) saves a YouTube video as an MP3 file, to be played. \n +fplay (name) plays a saved MP3 file. \n+list lists all downloaded MP3 files.")
  console.log(message.author.tag + " used the music help command in " + message.guild.name)
 }*/else if(command.startsWith(`${prefix}support`)){ 
  message.channel.send("To get support for me, you can privately message me, or join my support server! https://discord.gg/fJTNXphadh")
  console.log(message.author.tag + " used the supoort command in " + message.guild.name)
 }else if(command.startsWith(`${prefix}channel`)){
   if(!message.member.hasPermission(`MANAGE_CHANNELS`)){
     message.channel.send("You don't have permission to run this command.")
     return
   }
   if(!message.guild.me.hasPermission(`MANAGE_CHANNELS`)){
     message.channel.send("I don't have permission to do this.")
     return
   }
   const channelname = args[1]
   if(!channelname){
     message.channel.send("There needs to be a name for the channel!")
     return
   }
  message.guild.channels.create(channelname)
  .then(channel => message.channel.send(`Done! <#${channel.id}>`))
  //message.channel.send(`Done! <#${channelname}>`)
 }
})

client.login(token)