module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Setting", {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      module: { type: DataTypes.STRING, allowNull: false },
      key: { type: DataTypes.STRING, allowNull: false },
      value: { type: DataTypes.JSON, allowNull: false },
      updatedBy: { type: DataTypes.STRING },
      updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    });
  };
  