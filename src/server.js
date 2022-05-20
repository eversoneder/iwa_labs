const express = require('express');          // Node.JS Backend Framework
const app = express()

//make express to use json data format
app.use(express.json());

// Log All Requests
const morgan = require('morgan');
app.use(morgan('tiny'));

// Load Routers
app.use(require('./api/routes/router'))        // API


// Setup Front End
const path = require('path');
app.set("view engine", "ejs")
app.set("views", path.resolve(__dirname, "frontend/pages"))

// Load Assets
app.use('/css', express.static(path.resolve(__dirname, "frontend/assets/css")));
app.use('/js', express.static(path.resolve(__dirname, "frontend/assets/js")));
// app.use('/img', express.static(path.resolve(__dirname, "frontend/assets/img")));

const port = 3000
app.listen(port, function(err) {
  console.log(`Server Listening on Port: ${port}`)
});