const router = require('express').Router();
const datVeCtrl = require('../controllers/quanLyDatVe');

router.use('/QuanLyNguoiDung', require('./quanLyNguoiDung'));
router.use('/QuanLyPhim', require('./quanLyPhim'));
router.use('/QuanLyRap', require('./quanLyRap'));
router.use('/QuanLyDatVe', require('./quanLyDatVe'));
router.use('/QuanLyLichChieu', require('./quanLyLichChieu'));
router.use('/ThongKe', require('./thongKe'));

// Stand-alone route (no sub-prefix)
router.delete('/DeleteTicketOfUser', datVeCtrl.deleteTicketOfUser);

// VNPay
router.use('/', require('./vnpay'));

module.exports = router;
