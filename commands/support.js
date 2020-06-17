const { MessageEmbed } = require("discord.js");
const { Users, Toggle, Support } = require('../database/db')
const toggleable = require("../utils/variables")
const users = new Map()

let obj = {
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    q6: "",
    q7: "",
    q8: "",
    q9: "",
    q10: ""
}

exports.use = async (client, message, args, command) => {
    if (toggleable.get('support').enabled) {
        const filter = m => m.author.id !== client.user.id && m.author.id == message.author.id;

        const error = new MessageEmbed()
            .setColor(0x731DD8)
            .setDescription("There has been an error, please try again!")
        let supportId = Math.floor(Math.random() * 10000000)

        const moveToDM = new MessageEmbed()
            .setColor(0x731DD8)
            .setThumbnail(client.user.avatarURL)
            .addField('New Support Inquiry', 'Thank you for reaching out for support, I have sent you private message! \n\nIf this is an emergency, please contact your nearest emergency services or call a suicide hotline. Visit http://www.suicide.org/ for a list of international crisis lines.')
            .setTimestamp()
            .setFooter('DeepHelp >> Your life matters.');
        message.channel.send(moveToDM)
        Users.findOne({ where: { discordid: message.author.id } }).then(res => {
            if (!res || res == undefined) {
                const first = new MessageEmbed()
                    .setColor(0x731DD8)
                    .setThumbnail(client.user.avatarURL())
                    .addField('Support Inquiry', 'Thank you again for reaching out to us for Support, we will try to make this process as easy as possible for you, before we connect you with someone for support, we just need some basic information from you. \n\n 1. What is your name?')
                    .setTimestamp()
                    .setFooter('DeepHelp >> Your life matters.');
                users.set(message.author.id, obj)

                message.author.send(first).then(msg => {

                    msg.channel.awaitMessages(filter, {
                        max: 1,
                        time: 300000,
                        errors: ['time']
                    }).then(collected => {
                        collected = collected.map(x => x.content);
                        collected = collected.toString();

                        let obj = users.get(message.author.id)
                        obj.q1 = collected;

                        users.set(message.author.id, obj)

                        let q2 = new MessageEmbed()
                            .setColor(0x731DD8)
                            .setThumbnail(client.user.avatarURL())
                            .setTimestamp()
                            .setFooter('DeepHelp >> Your life matters.')
                            .addField(`Support Inquiry >> Support-${supportId}`, "Question Two: Describe what is going on?");

                        message.author.send(q2)

                        msg.channel.awaitMessages(filter, {
                            max: 1,
                            time: 300000,
                            errors: ['time']
                        }).then(collected => {
                            collected = collected.map(x => x.content);
                            collected = collected.toString();

                            let obj = users.get(message.author.id)
                            obj.q2 = collected

                            users.set(message.author.id, obj)

                            let q3 = new MessageEmbed()
                                .setColor(0x731DD8)
                                .setThumbnail(client.user.avatarURL())
                                .setTimestamp()
                                .setFooter('DeepHelp >> Your life matters.')
                                .addField(`Support Inquiry >> Support-${supportId}`, "Question Three: How upset are you? \n\nPlease respond with the number corresponding with how you are feeling.\n\n 1. I'm Doing ok\n2. A little upset\n3. Moderately Upset\n4.Very upset\n5. Extremely Upset\n6. Prefer not to state");

                            message.author.send(q3)

                            msg.channel.awaitMessages(filter, {
                                max: 1,
                                time: 300000,
                                errors: ['time']
                            }).then(collected => {
                                collected = collected.map(x => x.content);
                                collected = collected.toString();
                                collectednum = parseInt(collected)
                                let number = [1, 2, 3, 4, 5, 6];
                                if (!number.includes(collectednum)) return message.author.send(error);

                                let response = "";

                                if (collectednum == 1) {
                                    response = "I’m doing ok"
                                }
                                if (collectednum == 2) {
                                    response = "A little upset"
                                }
                                if (collectednum == 3) {
                                    response = "Moderately upset"
                                }
                                if (collectednum == 4) {
                                    response = "Very upset"
                                }
                                if (collectednum == 5) {
                                    response = "Extremely upset"
                                }
                                if (collectednum == 6) {
                                    response = "Prefer not to state"
                                }
                                let obj = users.get(message.author.id)
                                obj.q3 = response

                                users.set(message.author.id, obj)

                                let q4 = new MessageEmbed()
                                    .setColor(0x731DD8)
                                    .setThumbnail(client.user.avatarURL())
                                    .setTimestamp()
                                    .setFooter('DeepHelp >> Your life matters.')
                                    .addField(`Support Inquiry >> Support-${supportId}`, "Question Four: Do you have thoughts of suicide? \n\nPlease respond with the corresponding number.\n\n 1. Yes\n2. No");

                                message.author.send(q4)

                                msg.channel.awaitMessages(filter, {
                                    max: 1,
                                    time: 300000,
                                    errors: ['time']
                                }).then(collected => {
                                    collected = collected.map(x => x.content);
                                    collected = collected.toString();
                                    collectednum = parseInt(collected)
                                    let number = [1, 2];
                                    if (!number.includes(collectednum)) return message.author.send(error);


                                    if (collectednum == 1) {
                                        response = "Yes"
                                    }
                                    if (collectednum == 2) {
                                        response = "No"
                                    }

                                    let obj = users.get(message.author.id)
                                    obj.q4 = response

                                    users.set(message.author.id, obj)

                                    let q5 = new MessageEmbed()
                                        .setColor(0x731DD8)
                                        .setThumbnail(client.user.avatarURL())
                                        .setTimestamp()
                                        .setFooter('DeepHelp >> Your life matters.')
                                        .addField(`Support Inquiry >> Support-${supportId}`, "Question Five: Have you previously attempted Suicide? \n\nPlease respond with the corresponding number.\n\n 1. Yes\n2. No");

                                    message.author.send(q5)

                                    msg.channel.awaitMessages(filter, {
                                        max: 1,
                                        time: 300000,
                                        errors: ['time']
                                    }).then(collected => {
                                        collected = collected.map(x => x.content);
                                        collected = collected.toString();
                                        collectednum = parseInt(collected)
                                        let number = [1, 2];
                                        if (!number.includes(collectednum)) return message.author.send(error);


                                        if (collectednum == 1) {
                                            response = "Yes"
                                        }
                                        if (collectednum == 2) {
                                            response = "No"
                                        }

                                        let obj = users.get(message.author.id)
                                        obj.q5 = response

                                        users.set(message.author.id, obj)

                                        let q6 = new MessageEmbed()
                                            .setColor(0x731DD8)
                                            .setThumbnail(client.user.avatarURL())
                                            .setTimestamp()
                                            .setFooter('DeepHelp >> Your life matters.')
                                            .addField(`Support Inquiry >> Support-${supportId}`, "Question Six: What is your sexual orientation? \n\nPlease respond with the corresponding number.\n\n 1. Asexual\n2. Bisexual\n3. Gay\n4. Lesbian\n5. Pansexual\n6. Queer\n7. Questioning\n8. Straight\n9. Not Sure\n10. Not listed above\n11. Prefer not to say");

                                        message.author.send(q6)

                                        msg.channel.awaitMessages(filter, {
                                            max: 1,
                                            time: 300000,
                                            errors: ['time']
                                        }).then(collected => {
                                            collected = collected.map(x => x.content);
                                            collected = collected.toString();
                                            collectednum = parseInt(collected)
                                            let number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
                                            if (!number.includes(collectednum)) return message.author.send(error);


                                            if (collectednum == 1) {
                                                response = "Asexual"
                                            }
                                            if (collectednum == 2) {
                                                response = "Bisexual"
                                            }
                                            if (collectednum == 3) {
                                                response = "Gay"
                                            }
                                            if (collectednum == 4) {
                                                response = "Lesbian"
                                            }
                                            if (collectednum == 5) {
                                                response = "Pansexual"
                                            }
                                            if (collectednum == 6) {
                                                response = "Queer"
                                            }
                                            if (collectednum == 7) {
                                                response = "Questioning"
                                            }
                                            if (collectednum == 8) {
                                                response = "Straight"
                                            }
                                            if (collectednum == 9) {
                                                response = "Not sure"
                                            }
                                            if (collectednum == 10) {
                                                response = "Not listed above"
                                            }
                                            if (collectednum == 11) {
                                                response = "Prefer not to say"
                                            }
                                            let obj = users.get(message.author.id)
                                            obj.q6 = response

                                            users.set(message.author.id, obj)

                                            let q7 = new MessageEmbed()
                                                .setColor(0x731DD8)
                                                .setThumbnail(client.user.avatarURL())
                                                .setTimestamp()
                                                .setFooter('DeepHelp >> Your life matters.')
                                                .addField(`Support Inquiry >> Support-${supportId}`, "Question Seven: What is your Gender Identity? \n\nPlease respond with the corresponding number.\n\n 1. Boy/Man\n 2. Girl/Woman\n 3. Genderfluid\n 4. Non-binary\n 5. Third Gender\n 6. Two Spirit\n 7. Genderqueer\n 8. Transgender\n 9.Gender nonconforming\n 10. Agender\n 11. Questioning\n 12. Not listed above\n 13. Not sure\n 14. Prefer not to say");

                                            message.author.send(q7)

                                            msg.channel.awaitMessages(filter, {
                                                max: 1,
                                                time: 300000,
                                                errors: ['time']
                                            }).then(collected => {
                                                collected = collected.map(x => x.content);
                                                collected = collected.toString();
                                                collectednum = parseInt(collected)
                                                let number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

                                                if (!number.includes(collectednum)) return message.author.send(error);


                                                if (collectednum == 1) {
                                                    response = "Boy/Man"
                                                }
                                                if (collectednum == 2) {
                                                    response = "Girl/Woman"
                                                }
                                                if (collectednum == 3) {
                                                    response = "Genderfluid"
                                                }
                                                if (collectednum == 4) {
                                                    response = "Non-Binary"
                                                }
                                                if (collectednum == 5) {
                                                    response = "Third Gender"
                                                }
                                                if (collectednum == 6) {
                                                    response = "Two Spirit"
                                                }
                                                if (collectednum == 7) {
                                                    response = "Genderqueer"
                                                }
                                                if (collectednum == 8) {
                                                    response = "Transgender"
                                                }
                                                if (collectednum == 9) {
                                                    response = "Gender nonconforming"
                                                }
                                                if (collectednum == 10) {
                                                    response = "Agender"
                                                }
                                                if (collectednum == 11) {
                                                    response = "Questioning"
                                                }
                                                if (collectednum == 12) {
                                                    response = "Not listed above"
                                                }
                                                if (collectednum == 13) {
                                                    response = "Not sure"
                                                }
                                                if (collectednum == 14) {
                                                    response = "Prefer not to say"
                                                }
                                                let obj = users.get(message.author.id)
                                                obj.q7 = response

                                                users.set(message.author.id, obj)

                                                let q8 = new MessageEmbed()
                                                    .setColor(0x731DD8)
                                                    .setThumbnail(client.user.avatarURL())
                                                    .setTimestamp()
                                                    .setFooter('DeepHelp >> Your life matters.')
                                                    .addField(`Support Inquiry >> Support-${supportId}`, "Question Eight: What is your Ethnicity? \n\nPlease respond with the corresponding number.\n\n 1. American Indian or Alaska Native\n 2. Black or African American\n 3. East Asian\n 4. Hispanic or Latinx\n 5. Middle Eastern or North African\n 6. Native Hawaiian or Other Pacific Islander\n 7. South Asian\n 8. South East Asian\n 9.White\n 10. Prefer not to say\n 11. Another race or ethnicity\n 12. Not sure");

                                                message.author.send(q8)

                                                msg.channel.awaitMessages(filter, {
                                                    max: 1,
                                                    time: 300000,
                                                    errors: ['time']
                                                }).then(collected => {
                                                    collected = collected.map(x => x.content);
                                                    collected = collected.toString();
                                                    collectednum = parseInt(collected)
                                                    let number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

                                                    if (!number.includes(collectednum)) return message.author.send(error);


                                                    if (collectednum == 1) {
                                                        response = "American Indian or Alaska Native"
                                                    }
                                                    if (collectednum == 2) {
                                                        response = "Black or African American"
                                                    }
                                                    if (collectednum == 3) {
                                                        response = "East Asian"
                                                    }
                                                    if (collectednum == 4) {
                                                        response = "Hispanic or Latinx"
                                                    }
                                                    if (collectednum == 5) {
                                                        response = "Middle Eastern or North African"
                                                    }
                                                    if (collectednum == 6) {
                                                        response = "Native Hawaiian or Other Pacific Islander"
                                                    }
                                                    if (collectednum == 7) {
                                                        response = "South Asian"
                                                    }
                                                    if (collectednum == 8) {
                                                        response = "South East Asian"
                                                    }
                                                    if (collectednum == 9) {
                                                        response = "White"
                                                    }
                                                    if (collectednum == 10) {
                                                        response = "Prefer not to say"
                                                    }
                                                    if (collectednum == 11) {
                                                        response = "Another race or ethnicity"
                                                    }
                                                    if (collectednum == 12) {
                                                        response = "Not sure"
                                                    }
                                                    let obj = users.get(message.author.id)
                                                    obj.q8 = response

                                                    users.set(message.author.id, obj)

                                                    let q9 = new MessageEmbed()
                                                        .setColor(0x731DD8)
                                                        .setThumbnail(client.user.avatarURL())
                                                        .setTimestamp()
                                                        .setFooter('DeepHelp >> Your life matters.')
                                                        .addField(`Support Inquiry >> Support-${supportId}`, "Question Nine: What is your School Name? \n\n You can type Skip if you would like to skip");

                                                    message.author.send(q9)

                                                    msg.channel.awaitMessages(filter, {
                                                        max: 1,
                                                        time: 300000,
                                                        errors: ['time']
                                                    }).then(collected => {
                                                        collected = collected.map(x => x.content);
                                                        collected = collected.toString();


                                                        let obj = users.get(message.author.id)
                                                        obj.q9 = collected

                                                        users.set(message.author.id, obj)

                                                        let q10 = new MessageEmbed()
                                                            .setColor(0x731DD8)
                                                            .setThumbnail(client.user.avatarURL())
                                                            .setTimestamp()
                                                            .setFooter('DeepHelp >> Your life matters.')
                                                            .addField(`Support Inquiry >> Support-${supportId}`, "Question Nine: What is your Zip Code?");

                                                        message.author.send(q10)

                                                        msg.channel.awaitMessages(filter, {
                                                            max: 1,
                                                            time: 300000,
                                                            errors: ['time']
                                                        }).then(collected => {
                                                            collected = collected.map(x => x.content);
                                                            collected = collected.toString();


                                                            let obj = users.get(message.author.id)
                                                            obj.q10 = collected

                                                            users.set(message.author.id, obj)
                                                            let guilds = client.guilds.get("648718560515981312")
                                                            guilds.channels.create(`support-${supportId}`, {
                                                                type: "text", permissionOverwrites: [{
                                                                    id: guilds.roles.find(role => role.name === "@everyone").id,
                                                                    deny: ['VIEW_CHANNEL', 'MENTION_EVERYONE', 'ADD_REACTIONS']

                                                                }, {
                                                                    id: "650405807686418433",
                                                                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS']
                                                                }
                                                                ]
                                                            }).then(c => {
                                                                c.setParent("650407594434756669").then(() => {
                                                                    c.setTopic(message.author.id)
                                                                    let obj = users.get(message.author.id)
                                                                    let supportMsg = new MessageEmbed()
                                                                        .setColor(0x731DD8)
                                                                        .setThumbnail(client.user.avatarURL())
                                                                        .setTitle(`User Info: ${message.author.username}#${message.author.discriminator}`)
                                                                        .setTimestamp()
                                                                        .setFooter('DeepHelp >> Your life matters.')
                                                                        .addField("1. What is your name?", obj.q1)
                                                                        .addField("2. What is going on?", obj.q2)
                                                                        .addField("3. How upset are you?", obj.q3)
                                                                        .addField("4. Do you have thoughts of Suicide?", obj.q4)
                                                                        .addField("5. Have you previously attempted Suicide?", obj.q5)
                                                                        .addField("6. What is your sexual orientation?", obj.q6)
                                                                        .addField("7. What is your Gender Identity?", obj.q7)
                                                                        .addField("8. What is your Ethnicity?", obj.q8)
                                                                        .addField("9. What is your School Name?", obj.q9)
                                                                        .addField("10. What is your Zip Code?", obj.q10)

                                                                    c.send(supportMsg).then(newMsg => {
                                                                        Users.create({ discordid: message.author.id, supportJson: JSON.stringify(obj) })
                                                                        Support.create({ discordid: message.author.id, channelid: c.id, messageid: newMsg.id })
                                                                        newMsg.react("✅")
                                                                        message.author.send("Your support request has been sent through to our helpers. Some help will be with you shortly")
                                                                    })

                                                                });

                                                            }).catch(err => {
                                                                console.log(err)
                                                            })

                                                            console.log(users.get(message.author.id))

                                                        }).catch(err => {
                                                            console.log(err)
                                                            message.author.send(error)
                                                        })

                                                    }).catch(err => {
                                                        message.author.send(error)
                                                    })

                                                }).catch(err => {
                                                    message.author.send(error)
                                                })
                                            }).catch(err => {
                                                message.author.send(error)
                                            })
                                        }).catch(err => {
                                            message.author.send(error)
                                        })
                                    }).catch(err => {
                                        message.author.send(error)
                                    })
                                }).catch(err => {
                                    message.author.send(error)
                                })
                            }).catch(err => {
                                message.author.send(error)
                            });
                        }).catch(err => {
                            message.author.send(error)
                        });
                    }).catch(err => {
                        message.author.send(error)

                    });

                }).catch(err => {
                    const error = new MessageEmbed()
                        .setColor(0x731DD8)
                        .setThumbnail(client.user.avatarURL)
                        .addField("Enquiry Failed", `Sorry ${message.author},` + ` You must enable direct messages from server members so we can provide you support!`)
                        .setImage('https://i.imgur.com/XHkHKRm.png')
                        .setFooter('DeepHelp >> Your life matters.');
                    message.channel.send(error)
                })
            } else {
                Support.findOne({ where: { discordid: message.author.id } }).then(c => {
                    if (!c || c == null) {
                        let supportId = Math.floor(Math.random() * 10000000)
                        let guilds = client.guilds.get("648718560515981312")
                        guilds.channels.create(`support-${supportId}`, {
                            type: "text", permissionOverwrites: [{
                                id: guilds.roles.find(role => role.name === "@everyone").id,
                                deny: ['VIEW_CHANNEL', 'MENTION_EVERYONE', 'ADD_REACTIONS']

                            }, {
                                id: "650405807686418433",
                                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS']
                            }
                            ]
                        }).then(c => {
                            c.setParent("650407594434756669").then(() => {
                                c.setTopic(message.author.id)
                                let obj = res.dataValues.supportJson
                                console.log(obj)
                                obj = JSON.parse(obj)
                                let supportMsg = new MessageEmbed()
                                    .setColor(0x731DD8)
                                    .setThumbnail(client.user.avatarURL())
                                    .setTitle(`User Info: ${message.author.username}#${message.author.discriminator}`)
                                    .setTimestamp()
                                    .setFooter('DeepHelp >> Your life matters.')
                                    .addField("1. What is your name?", obj.q1)
                                    .addField("2. What is going on?", obj.q2)
                                    .addField("3. How upset are you?", obj.q3)
                                    .addField("4. Do you have thoughts of Suicide?", obj.q4)
                                    .addField("5. Have you previously attempted Suicide?", obj.q5)
                                    .addField("6. What is your sexual orientation?", obj.q6)
                                    .addField("7. What is your Gender Identity?", obj.q7)
                                    .addField("8. What is your Ethnicity?", obj.q8)
                                    .addField("9. What is your School Name?", obj.q9)
                                    .addField("10. What is your Zip Code?", obj.q10)

                                c.send(supportMsg).then(newMsg => {
                                    newMsg.react("✅")
                                    Support.create({ discordid: message.author.id, channelid: c.id, messageid: newMsg.id })

                                    message.author.send("Your support request has been sent through to our helpers. Some help will be with you shortly")
                                })

                            });
                        });
                    } else {
                        return message.member.send("You already have a support request open. Please wait.")


                    }

                }).catch(err => {
                    console.log(err)
                })

            }
        })

    } else {
        const supportClosed = new MessageEmbed()
            .setColor(0x731DD8)
            .setThumbnail(client.user.avatarURL())
            .addField('Support is currently closed.', 'Unfortunatly, our staff team is unavailable to assist you at this current time, however we do recommend that you do call one of the crisis lines avalible to you, you can find your nations crisis line at: http://www.suicide.org/')
            .setTimestamp()
            .setFooter('DeepHelp >> Your life matters.');
        message.channel.send(supportClosed)
    }
};

exports.command = {
    aliases: ["emergency", "sos", "suicidal"]
};