const { MessageEmbed } = require("discord.js");
const { Users, Toggle } = require('../database/db')
const toggleable = require("../utils/variables")

exports.use = async (client, message, args, command) => {
    if (message.member.roles.has("648718730582556672") && message.guild.id == "648718560515981312") {
        if (args[0] == "off") {
            toggleable.set('support', { enabled: false })
            Toggle.update({ support: false }, { where: { support: true } })
            message.channel.send('You have disabled the ability to request support.')
        } else if (args[0] == "on") {
            toggleable.set('support', { enabled: true })
            Toggle.update({ support: true }, { where: { support: false } })
            message.channel.send('You have enabled the ability to request support.')

        } else {
            message.channel.send('**You forgot to include a arguement.** You can type -status on to enable support requests or -status off to disable support requests.')
        }

    } else {
        message.channel.send("This command can only be executed in the DeepHelp Staff Discord and only by a Board Of Directors Member")
    }

};

exports.command = {
    aliases: [""]
};