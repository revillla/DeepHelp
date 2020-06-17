const { Users, Toggle, Support, Inactivity } = require('../database/db')
const moment = require('moment')

exports.checkInactivity = async function (client) {
    let channels = await Inactivity.findAll()
    channels.forEach(c => {
        c = c.dataValues;
        let expire = moment().format("YYYY-MM-DD kk:mm:ss")
        if (expire > c.closeSupport) {
            let staffGuild = client.guilds.get("648718560515981312")
            let memberGuild = client.guilds.get("538830604544770108")
            let channel = staffGuild.channels.get(c.supportid)
            channel.delete()
            Support.findOne({ where: { channelid: c.supportid } }).then(data => {
                if (!data || data == null) {
                    Inactivity.destroy({ where: { supportid: c.supportid } })
                } else {
                    Inactivity.destroy({ where: { supportid: c.supportid } })
                    let member = memberGuild.members.get(data.dataValues.discordid)
                    member.send("This support request has been closed. If you are ever in need of help again don’t hesitate to message us.")
                    data.destroy()
                }
            })
        }
    })
}