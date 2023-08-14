const Sequelize = require('sequelize');

const sequelize = new Sequelize('postapp', 'postgres', 'tmazleo', {
    host: "localhost",
    dialect: 'postgres'
});
module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}