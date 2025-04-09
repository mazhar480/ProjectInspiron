const { Setting } = require("../../../models");

exports.getByModule = (module) => {
  return Setting.findAll({ where: { module } });
};

exports.save = async ({ module, key, value, updatedBy }) => {
  const [setting, created] = await Setting.findOrCreate({
    where: { module, key },
    defaults: { value, updatedBy }
  });

  if (!created) {
    setting.value = value;
    setting.updatedBy = updatedBy;
    setting.updatedAt = new Date();
    await setting.save();
  }

  return setting;
};
