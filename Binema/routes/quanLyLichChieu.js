const router = require('express').Router();
const ctrl = require('../controllers/quanLyDatVe');

router.delete('/XoaLichChieu', ctrl.xoaLichChieu);

module.exports = router;
