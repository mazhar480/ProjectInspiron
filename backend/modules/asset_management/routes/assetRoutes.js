const express = require("express");
const router = express.Router();

// Sample route
router.get("/", (req, res) => {
  res.send("Asset API Working");
});

module.exports = router;
