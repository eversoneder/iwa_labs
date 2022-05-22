module.exports.UPLOAD_PATH = 'uploads';

const   express = require("express"),
        router = express.Router(), 
        imageCtrl = require('../image-controller'),
        userCtrl = require("../user-controller"),
        multer = require('multer'), //  upload files / handles form-data submitted by users
        upload = multer({ dest: module.exports.UPLOAD_PATH });


//Actions - API Endpoint of Users CRUD 
router.post('/users', userCtrl.createUser);
router.get('/users', userCtrl.getUsers);
router.get('/users/:id', userCtrl.getUser);
router.put('/users/:id', userCtrl.updateUser);
router.delete('/users/:id', userCtrl.deleteUser);

//API Endpoint of Images CRUD 
router.post('/images', upload.single('image'), imageCtrl.uploadImage);
router.get('/images', imageCtrl.getImages);
router.get('/images/:id', imageCtrl.getImage);
router.delete('/images/:id', imageCtrl.deleteImage);


//Render to get back to user

//import render.js
const services = require('../../services/render');

//getting index render route from render.js 
router.get('/', services.homeRoute);

//getting add-user render route from render.js 
router.get('/add-user', services.add_user);

//getting add-update_user render route from render.js 
router.get('/update-user', services.update_user);



module.exports = router;