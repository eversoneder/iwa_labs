const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.dbURI)
        .then((result) => console.log("Connected to DB"))
        .catch((err) => console.log(err));

module.exports = mongoose;