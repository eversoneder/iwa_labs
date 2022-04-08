module.exports.UPLOAD_PATH = 'uploads';

const   express = require("express"),
        router = express.Router(),
        imageCtrl = require('./image-controller'),
        userCtrl = require("./user-controller"),
        multer = require('multer'),
        upload = multer({ dest: module.exports.UPLOAD_PATH });

router.post('/users', userCtrl.createUser);
router.get('/users', userCtrl.getUsers);
router.get('/users/:id', userCtrl.getUser);
router.put('/users/:id', userCtrl.updateUser);
router.delete('/users/:id', userCtrl.deleteUser);

router.post('/images', upload.single('image'), imageCtrl.uploadImage);
router.get('/images', imageCtrl.getImages);
router.get('/images/:id', imageCtrl.getImage);
router.delete('/images/:id', imageCtrl.deleteImage);

module.exports = router;