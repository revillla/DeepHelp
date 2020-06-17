// Load Dependencies
const Sequelize = require('sequelize');
const db = require('./connection');

// Load Models
const Users = require("./users")
const Toggle = require("./toggle")
const Support = require("./support")
const Inactivity = require("./inactivity")



db.sync().catch(error => console.log('Database error:', error));
// Export Models

module.exports = { Users, Toggle, Support, Inactivity }