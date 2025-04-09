require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const assetRoutes = require("./modules/asset_management/routes/assetRoutes");
const settingsRoutes = require("./core/settings/routes/settingsRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/assets", assetRoutes);
app.use("/api/settings", settingsRoutes);

app.listen(5000, () => {
  console.log("🚀 API running at http://localhost:5000");
});
