const SettingsService = require("../services/SettingsService");

exports.getModuleSettings = async (req, res) => {
  try {
    const { module } = req.params;
    const settings = await SettingsService.getByModule(module);
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: "Failed to load settings" });
  }
};

exports.saveOrUpdateSetting = async (req, res) => {
  try {
    const setting = await SettingsService.save(req.body);
    res.json(setting);
  } catch (err) {
    res.status(500).json({ error: "Failed to save setting" });
  }
};
