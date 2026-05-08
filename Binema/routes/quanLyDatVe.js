const router = require('express').Router();
const ctrl = require('../controllers/quanLyDatVe');

router.put('/ThayDoiTrangThaiDatVe', ctrl.thayDoiTrangThaiDatVe);
router.get('/LayDanhSachVeDaMuaCuaKhachHang', ctrl.layDanhSachVeDaMuaCuaKhachHang);
router.get('/LayVeTheoMaGhe', ctrl.layVeTheoMaGhe);
router.get('/LayDanhSachVeDaMua', ctrl.layDanhSachVeDaMua);
router.get('/LayDanhSachPhongVe', ctrl.layDanhSachPhongVe);
router.post('/DatVe', ctrl.datVe);
router.get('/LayLichChieu', ctrl.layLichChieu);
router.put('/SuaLichChieu', ctrl.suaLichChieu);
router.post('/TaoLichChieu', ctrl.taoLichChieu);

module.exports = router;
