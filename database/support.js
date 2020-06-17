const Sequelize = require('sequelize');
const db = require('./connection');

const support = db.define('support', {
    discordid: {
        type: Sequelize.STRING
    },
    channelid: {
        type: Sequelize.STRING
    },
    messageid: {
        type: Sequelize.STRING
    },
    claimed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    claimedby: {
        type: Sequelize.STRING,
        allowNull: true
    }
});



module.exports = support;