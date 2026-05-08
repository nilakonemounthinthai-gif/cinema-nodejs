const router = require('express').Router();
const ctrl = require('../controllers/vnpay');

router.get('/create_payment_url', ctrl.createPaymentUrl);

module.exports = router;
