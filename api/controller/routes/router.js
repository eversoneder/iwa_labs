module.exports.UPLOAD_PATH = 'uploads';

const   express = require("express"),
        router = express.Router(), 
        imageCtrl = require('../image-controller'),
        userCtrl = require("../user-controller"),
        multer = require('multer'), //  upload files / handles form-data submitted by users
        upload = multer({ dest: module.exports.UPLOAD_PATH });

//API Endpoint of Users CRUD 
router.post('/api/users', userCtrl.createUser);
router.get('/api/users', userCtrl.getUsers);
router.get('/api/users/:id', userCtrl.getUser);
router.put('/api/users/:id', userCtrl.updateUser);
router.delete('/api/users/:id', userCtrl.deleteUser);

//API Endpoint of Images CRUD 
router.post('/api/images', upload.single('image'), imageCtrl.uploadImage);
router.get('/api/images', imageCtrl.getImages);
router.get('/api/images/:id', imageCtrl.getImage);
router.delete('/api/images/:id', imageCtrl.deleteImage);

module.exports = router;