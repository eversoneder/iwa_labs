const   http = require("http"), //application protocol
        logger = require("morgan"), //creates log files for easy debugging
        express = require("express"), //node.js back-end framework
        mongoose = require("mongoose"), //js library to connect mongodb to express
        dotenv = require("dotenv"); //environment variable

let app = express();
let port = process.env.PORT || 8000;

dotenv.config();

app.use(express.json());
app.use(logger("tiny")); //info preset to be shown
app.use(require('./routes'));



mongoose.connect(process.env.dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((result) => console.log('connected to db'))
        .catch((err) => console.log(err));
        
app.listen(port, function(err){
    console.log("Listening on port: " + port)
});