const express = require('express');

const router = express.Router();

const MsgController = require('../controllers/msgController');

// const Authenticate = require('../middlewares/auth/isAuth');

//routers
router.post('/send', MsgController.sendMessage);
// router.post('/order-call-data', Authenticate, RetailerController.OrderCallDataSubmit);
// router.post('/get-retailer', Authenticate, RetailerController.getRetailer);
// router.post('/updateNumber', Authenticate, RetailerController.updateRetailerNumber);

module.exports = router;