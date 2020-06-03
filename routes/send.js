const express = require('express');

const router = express.Router();

const MsgController = require('../controllers/msgController');

// const Authenticate = require('../middlewares/auth/isAuth');

//routers
router.post('/send', MsgController.sendMessage);

module.exports = router;