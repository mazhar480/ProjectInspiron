const { Sequelize, DataTypes } = require("sequelize");
const { DB_NAME, DB_USER, DB_PASS, DB_HOST } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: "mysql",
  logging: false,
});

// Import models
const SettingModel = require("../core/settings/models/Setting");
const AssetModel = require("../modules/asset_management/models/Asset");

// Register models
const Setting = SettingModel(sequelize, DataTypes);
const Asset = AssetModel(sequelize, DataTypes);

// Sync DB (optional)
sequelize.sync({ alter: true }).then(() => {
  console.log("📦 Models synced.");
});

module.exports = {
  sequelize,
  Setting,
  Asset,
};
