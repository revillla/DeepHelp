const Sequelize = require('sequelize');
const db = require('./connection');

const toggle = db.define('toggle', {
    support: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    }
});



module.exports = toggle;