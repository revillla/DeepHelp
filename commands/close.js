const { MessageEmbed } = require("discord.js");
const { Users, Toggle, Support, Inactivity } = require('../database/db')

exports.use = async (client, message, args, command) => {
    if (message.channel.name.includes("support-")) {
        Support.findOne({ where: { discordid: message.channel.topic } }).then(c => {
            if (!c || c == null) {
                return
            } else {
                let guildss = client.guilds.get("538830604544770108")
                let member = guildss.members.get(message.channel.topic)
                member.send("This support request has been closed. If you are ever in need of help again don’t hesitate to message us.")
                message.channel.delete()
                c.destroy()
                Inactivity.findOne({ where: { supportid: message.channel.id } }).then(c => {
                    if (!c || c == null) {
                        return
                    } else {
                        c.destroy()
                    }
                })
            }

        })
    }

};

exports.command = {
    aliases: [""]
};