const Sequelize = require('sequelize');
const db = require('./connection');

const inactivity = db.define('inactivity', {
    supportid: {
        type: Sequelize.STRING
    },
    closeSupport: {
        type: Sequelize.STRING
    }
});



module.exports = inactivity;