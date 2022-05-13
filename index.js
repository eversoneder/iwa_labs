const   http = require("http"), //application protocol
        logger = require("morgan"), //creates log files for easy debugging
        express = require("express"), //node.js back-end framework
        mongoose = require("mongoose"), //js library to connect mongodb to express
        dotenv = require("dotenv"), //environment variable

//setting up front-end
        //to set up view / client side
        fs = require('fs'), //Working with the file system (read and write files)
        path = require('path'), //Utility that allows us to work with directory paths
        xml2js = require('xml2js'), //This is XML <-> JSON converter
        xmlParse = require('xslt-processor').xmlParse, //Parsing XML
        xsltProcess = require('xslt-processor').xsltProcess; //Processing XSLT

const   router = express(), //Instantiating Express
        server = http.createServer(router); //Instantiating the server
        
router.use(express.static(path.resolve(__dirname,'views'))); //Serving static content from "views" folder
router.use(express.json());
//setting up front-end


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