const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.NAME,
  process.env.USER,
  process.env.PASSWORD,
  {
    dialect: "mysql",
    host: process.env.HOST,
    logging: false,
  }
);

module.exports = sequelize;
