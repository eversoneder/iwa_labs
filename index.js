require(/db/mongoose.js);
// mongoose = require("mongoose"), //js library to connect mongodb to express
// dotenv = require("dotenv"), //environment variable

const   http = require("http"), //application protocol
        logger = require("morgan"), //creates log files for easy debugging
        express = require("express"), //node.js back-end framework

//SETTING UP FRONT-END @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        
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


//XML TO JSON PARSER
function XMLtoJSON(filename, cb){
        let filepath = path.normalize(path.join(__dirname, filename));
        fs.readFile(filepath, 'utf8', function(err, xmlStr){
            if(err) throw (err);
            xml2js.parseString(xmlStr, {}, cb);
        });
}

//JSON TO XML PARSER
function JSONtoXML (filename, obj, cb){
let filepath = path.normalize(path.join(__dirname, filename));
let builder = new xml2js.Builder();
let xml = builder.buildObject(obj);
fs.unlinkSync(filepath);
fs.writeFile(filepath, xml, cb);
}

//GET FUNCTION
router.get('/get/html', function(req, res) {

        res.writeHead(200, {'Content-Type' : 'text/html'}); //Tell the user that the resource exists and which type that is

        let xml = fs.readFileSync('PaddysCafe.xml', 'utf8'), //read in the XML file
        xsl = fs.readFileSync('PaddysCafe.xsl', 'utf8'); //read in the XSL file

        console.log(xml);
        console.log(xsl);

        let doc = xmlParse(xml), //Parse the XML file
        stylesheet = xmlParse(xsl); //Parse the XSL file

        let result = xsltProcess(doc, stylesheet); //Performing XSLT

        console.log(result);

        res.end(result.toString()); //Serve back the user

});

//UPDATE FUNCTION
router.post('/post/json', function(req, res){
console.log(req.body);

        function appendJSON(obj){

        console.log(JSON.stringify(obj, null, " "));

        XMLtoJSON('PaddysCafe.xml', function (err, result){
                if (err) throw (err);

                result.menu.section[obj.sec_n].entry.push({'item': obj.item, 'price': obj.price});
                console.log(JSON.stringify(result, null, " "));

                JSONtoXML('PaddysCafe.xml', result, function(err){
                if (err) console.log(err);
                });
        });
        };

        appendJSON(req.body);
        res.redirect('back');
});

//DELETE FUNCTION
router.post('/post/delete', function(req, res){

        function deleteJSON(obj){

        console.log(obj);

        XMLtoJSON('PaddysCafe.xml', function(err, result){
                if(err) throw(err);
                
                delete result.menu.section[obj.section].entry[obj.entry];

                JSONtoXML('PaddysCafe.xml', result, function(err){
                if (err) throw (err);
                });
        });
        };

        deleteJSON(req.body);
        res.redirect('back');
});
//SETTING UP FRONT-END @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@







let app = express();
let port = process.env.PORT || 8000;

// dotenv.config(); //already within mongoose.js

app.use(express.json());
app.use(logger("tiny")); //info preset to be shown
app.use(require('./routes'));

mongoose.connect(process.env.dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((result) => console.log('connected to db'))
        .catch((err) => console.log(err));
        
app.listen(port, function(err){
    console.log("Listening on port: " + port)
});