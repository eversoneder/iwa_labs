const UPLOAD_PATH = require('./routes').UPLOAD_PATH,
Image = require('./models/image'),
path = require('path'),
fs = require('fs'),
del = require('del');