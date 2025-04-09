// services/AssetService.js
const { Asset } = require("../models");

exports.getAll = () => Asset.findAll();
exports.create = (data) => Asset.create(data);
