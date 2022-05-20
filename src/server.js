const express = require('express');//node js backend framework
const dotenv = require('dotenv');//db environment var


//make express to use json data format instead of using body-parser
const app = express();
app.use(express.json());

//Log requests
const morgan = require('morgan');
app.use(morgan('tiny'));

// Load CRUD Routes
app.use(require('./api/routes/router'))// API


// Setup Front End
const path = require('path');
app.set("view engine", "ejs");//html template engine
app.set("views", path.resolve(__dirname, "frontend/pages"));

// Load Assets
app.use('/css', express.static(path.resolve(__dirname, "frontend/assets/css")));
app.use('/js', express.static(path.resolve(__dirname, "frontend/assets/js")));
// app.use('/img', express.static(path.resolve(__dirname, "frontend/assets/img")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, function(err) {
  console.log(`Server Listening on Port: ${PORT}`)
});