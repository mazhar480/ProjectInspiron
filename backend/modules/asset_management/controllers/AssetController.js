// controllers/AssetController.js
const AssetService = require("../services/AssetService");

exports.getAllAssets = async (req, res) => {
  const assets = await AssetService.getAll();
  res.json(assets);
};

exports.createAsset = async (req, res) => {
  const asset = await AssetService.create(req.body);
  res.status(201).json(asset);
};
