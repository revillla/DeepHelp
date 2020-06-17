const Sequelize = require('sequelize');

// Create the database connection
const con = new Sequelize({
    dialect: 'sqlite',
    storage: '../databasesssssssssssssssss.db'
});

// Export
module.exports = con;