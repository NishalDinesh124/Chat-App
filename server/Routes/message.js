
const {addMsg, getMsg} = require("../Controllers/MessageController");

const router = require('express').Router();

router.post('/addMsg',addMsg);
router.post('/getMsg',getMsg);

module.exports = router;