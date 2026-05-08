const router = require('express').Router();
const ctrl = require('../controllers/thongKe');

router.get('/getMonth', ctrl.getMonth);
router.get('/getPhim', ctrl.getPhim);

module.exports = router;
