const { MessageEmbed } = require("discord.js");
const { Users } = require('../database/db')

exports.use = async (client, message, args, command) => {
    let msg = new MessageEmbed()
        .setColor(0x731DD8)
        .setFooter("DeepHelp >> Your life matters.")
        .setThumbnail(client.user.avatarURL())
        .setAuthor(client.user.username, client.user.avatarURL())
        .setTimestamp()
        .addField('Our website is Under Development', "Thank you for your interest in our website, currently we have a developer working on the website and we hope to have it done soon. When our website is online, this command will be updated as well as an announcement will be posted. If you are looking for support, please try -support.")
    message.channel.send(msg)
};

exports.command = {
    aliases: ["site"]
};