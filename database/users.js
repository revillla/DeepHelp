const Sequelize = require('sequelize');
const db = require('./connection');

const users = db.define('users', {
    discordid: {
        type: Sequelize.STRING
    },
    supportJson: {
        type: Sequelize.TEXT('long')
    }
});



module.exports = users;