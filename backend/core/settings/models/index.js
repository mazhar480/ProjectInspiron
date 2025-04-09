const { Sequelize, DataTypes } = require("sequelize");
const { DB_NAME, DB_USER, DB_PASS, DB_HOST } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: "mysql",
  logging: false,
});

const SettingModel = require("../core/settings/models/Setting");
const Setting = SettingModel(sequelize, DataTypes);

sequelize.sync({ alter: true }).then(() => {
  console.log("📦 Models synced.");
});

module.exports = { sequelize, Setting };
