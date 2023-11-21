const Sequelize = require("sequelize");

const sequelize = new Sequelize("group-chat-app","root","@k45264*",{dialect:"mysql",host:"localhost"});

module.exports = sequelize;