module.exports.UPLOAD_PATH = 'uploads';

const   express = require("express"),
        router = express.Router(), 
        imageCtrl = require('../image-controller'),
        userCtrl = require("../user-controller"),
        multer = require('multer'), //  upload files / handles form-data submitted by users
        upload = multer({ dest: module.exports.UPLOAD_PATH });

//API Endpoint of Users CRUD 
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


//import render.js
const services = require('../../services/render');

//index render
router.get('/', services.homeRoutes);

//add-user page render
router.get('/add-user',(req, res)=>{
res.render('add_user');
});

//update-user page render
router.get('/update-user',(req, res)=>{
res.render('update_user');
});






module.exports = router;