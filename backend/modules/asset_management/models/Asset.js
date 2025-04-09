module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Asset", {
      AssetID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      AssetType: DataTypes.STRING,
      SerialNumber: DataTypes.STRING,
      createdAt: DataTypes.DATE, // ✅ Now you're managing it manually
    }, {
      timestamps: false, // ✅ Disable Sequelize’s automatic timestamps
    });
  };
  