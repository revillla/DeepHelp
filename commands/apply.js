const { MessageEmbed } = require("discord.js");
const { Users } = require('../database/db')

exports.use = async (client, message, args, command) => {
    let msg = new MessageEmbed()
        .setColor(0x731DD8)
        .setFooter("DeepHelp >> Your life matters.")
        .setThumbnail(client.user.avatarURL())
        .setAuthor(client.user.username, client.user.avatarURL())
        .setTimestamp()
        .setDescription("We are actively looking for members to join our Support Team! The Deep Support Team are the members who volunteer their time to talk with and counsel others in need. If you are interested in joining our Support Team, please fill out by clicking this [link](https://placeholder.com/). \n\n We also have a need for people in positions such as Administraton Staff, Chat Moderators, Web Developers, and Graphic Designers. If one of those fit you, feel free to apply using the following [link](https://placeholder.com/).\n\n We thank you for your interest in advance and are excited to train and on-board you as a member of our team")
    message.channel.send(msg)
};

exports.command = {
    aliases: [""]
};