const mongoose = require("../database");

const imageSchema = new mongoose.Schema({
    filename: String,
    originalName: String,
    desc: String,
    created: Date
});

module.exports = mongoose.model('Image', imageSchema);