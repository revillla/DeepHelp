const { Client, MessageEmbed } = require("discord.js");
const client = new Client();
client.login("NTM5MjgzNzQ5NjA3NzAyNTI5.Xe2q6w.VBptA_prsdCVRduHz1jZnJBHqSs")
const { toggleable } = require("./utils/variables")
const fs = require("fs");
const moment = require('moment')
const { Users, Toggle, Support, Inactivity } = require('./database/db')
const { checkInactivity } = require("./utils/functions")

client.once("ready", () => {
  console.log(client.user.tag + " is online.");
  setTimeout(function () {
    checkInactivity(client)
  }, 5 * 60 * 1000)
});

client.commands = new Map();
client.aliases = new Map();

fs.readdir("./commands/", (err, files) => {
  let jsfiles = files.filter(f => f.split(".").pop() === "js");
  if (jsfiles.length <= 0) {
    return;
  }
  jsfiles.forEach(f => {
    let props = require(`./commands/${f}`);
    props.fileName = f;
    client.commands.set(f.slice(0, -3), props);
    props.command.aliases.forEach(alias => {
      client.aliases.set(alias, f.slice(0, -3));
    });
  });
  console.log("Loaded " + jsfiles.length + " commands.");
});

client.on("message", async message => {
  if (message.author.bot) return;

  if (!message.guild) {
    let data = await Support.findOne({ where: { discordid: message.author.id } })
    if (!data || data == null) return
    data = data.dataValues;
    if (data.claimed) {
      let guildss = client.guilds.get("648718560515981312")
      let channel = guildss.channels.get(data.channelid)
      updateInactivity(data.channelid)
      let image
      if (message.attachments.size > 0) {
        let attachement_image = message.attachments.first()
        image = attachement_image.url
      }
      if (message.content != "" && image) {
        return channel.send(`**${message.author.username}:** ` + message.content, image)
      }
      if (message.content != "" && !image) {
        return channel.send(`**${message.author.username}:** ` + message.content)
      }
      if (message.content == "" && image) {
        return channel.send(`**${message.author.username}:** ` + image)
      }
    } else {
      message.author.send("The support request hasnt been claimed by a Support Member. Please wait.")
    }
  }

  let prefix = "-";
  if (!message.content.startsWith(prefix)) {
    if (message.channel.name.includes('support-')) {
      let guildss = client.guilds.get("538830604544770108")

      let member = guildss.members.get(message.channel.topic)
      let image = false;
      updateInactivity(message.channel.id)
      let data = await Support.findOne({ where: { claimedby: message.author.id } })
      if (!data || data == null) return
      data = data.dataValues;
      if (data.claimed) {
        if (message.attachments.size > 0) {
          let attachement_image = message.attachments.first()
          image = attachement_image.url
        }
        if (message.content != "" && image) {
          return member.send('**Support Staff:** ' + message.content, image)
        }
        if (message.content != "" && !image) {
          return member.send('**Support Staff:** ' + message.content)
        }
        if (message.content == "" && image) {
          return member.send('**Support Staff:** ' + image)
        }

      } else {
        return
      }
    }
  } else {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    let command = args.shift().toLowerCase();
    let cmd;

    if (client.commands.has(command)) {
      cmd = client.commands.get(command);
    } else if (client.aliases.has(command)) {
      cmd = client.commands.get(client.aliases.get(command));
    }
    if (!cmd) {
      return;
    }
    cmd.use(client, message, args, command);
  }
});

async function updateInactivity(ticket) {
  Inactivity.findOne({ where: { supportid: ticket } }).then(c => {
    if (!c || c == null) {
      return
    } else {
      let close = moment().add(2, 'minutes').format("YYYY-MM-DD kk:mm:ss")
      c.update({ closeSupport: close })
    }
  })
}

client.on("raw", async raw => {
  if (raw.t == "MESSAGE_REACTION_ADD") {
    if (raw.d.user_id == client.user.id) return;
    let info = raw.d;

    Support.findOne({ where: { messageid: info.message_id } }).then(async res => {
      res2 = res.dataValues;
      if (res2.claimed) {
        console.log(res2)
        return
      } else {
        if (info.emoji.name == "✅") {
          let memberGuild = client.guilds.get("538830604544770108")
          let staffGuild = client.guilds.get("648718560515981312")
          let channel = staffGuild.channels.get(info.channel_id)

          let member = memberGuild.members.get(channel.topic)

          channel.overwritePermissions(
            [{
              id: "650405807686418433",
              deny: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS']
            }, {
              id: info.user_id,
              allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS']
            }
            ]
          ).then(async c => {
            let close = moment().add(2, 'minutes').format("YYYY-MM-DD kk:mm:ss")
            let data = await res.update({ claimed: true, claimedby: info.user_id })
            console.log(data)
            member.send("We have found you some help. You can now talk through this bot.")
            Inactivity.create({ supportid: channel.id, closeSupport: close })
          })
        }
      }
    })


  }

  if (raw.t == "MESSAGE_REACTION_REMOVE") {
    if (raw.d.user_id == client.user.id) return;
    let info = raw.d;

    Support.findOne({ where: { messageid: info.message_id } }).then(res => {
      res2 = res.dataValues;
      if (info.emoji.name == "✅") {



        res.update({ claimed: false, claimedby: info.user_id })
      }
    })

  }
});
