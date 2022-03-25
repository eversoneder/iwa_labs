const   express = require("express"),
        router = express.Router(),
        itemCtrl = require("./item-controller");

router.get("/:foo/:bar", itemCtrl.helloWorld);

module.exports = router;
