const express = require("express");
const router = express.Router();
const controller = require("../controllers/SettingsController");

router.get("/:module", controller.getModuleSettings);
router.post("/", controller.saveOrUpdateSetting);

module.exports = router; // ✅ Required!
