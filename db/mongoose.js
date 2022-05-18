const mongoose = require("mongoose"),
      dotenv = require("dotenv");//config vars from heroku
      
dotenv.config();

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.dbURI);
  }

