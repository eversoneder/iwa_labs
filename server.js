const express = require('express'),//node js backend framework
      dotenv = require('dotenv'),//db environment var
      morgan = require('morgan'),//req logger
      path = require('path');//path directory

const connectDB = require('./api/model/database');
// connectDB();

// Make express to use json data format instead of using body-parser
const app = express();
app.use(express.json());

//load environment vars from heroku
const PORT = process.env.PORT || 3000;

// Log requests
app.use(morgan('tiny'));


// Setup Front End
app.set("view engine", "ejs");//html template engine
app.set("views", path.resolve(__dirname, "./views"));

// Load Assets  
app.use('/css', express.static(path.resolve(__dirname, "views/assets/css")));
// app.use('/js', express.static(path.resolve(__dirname, "views/assets/js")));
// app.use('/img', express.static(path.resolve(__dirname, "frontend/assets/img")));

// Load CRUD Routes
app.use(require('./api/controller/routes/router'))// back-end route

app.listen(PORT, function(err) {
  console.log(`Server Listening on Port: ${PORT}`)
});