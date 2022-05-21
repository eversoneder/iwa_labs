const express = require('express'),//node js backend framework
      dotenv = require('dotenv'),//db environment var
      morgan = require('morgan'),//req logger
      path = require('path');//path directory


// Make express to use json data format instead of using body-parser
const app = express();
app.use(express.json());

// Log requests
app.use(morgan('tiny'));

// Load CRUD Routes
app.use(require('./api/routes/router'))// back-end route


// Setup Front End
app.set("view engine", "ejs");//html template engine
app.set("views", path.resolve(__dirname, "frontend/pages"));

// Load Assets
app.use('/css', express.static(path.resolve(__dirname, "frontend/assets/css")));
app.use('/js', express.static(path.resolve(__dirname, "frontend/assets/js")));
// app.use('/img', express.static(path.resolve(__dirname, "frontend/assets/img")));

dotenv.config();
const PORT = process.env.PORT || 3000;
app.listen(PORT, function(err) {
  console.log(`Server Listening on Port: ${PORT}`)
});