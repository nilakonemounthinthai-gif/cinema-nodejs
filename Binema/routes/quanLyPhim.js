const router = require('express').Router();
const ctrl = require('../controllers/quanLyPhim');
const upload = require('../middleware/upload');

router.get('/LayDanhSachPhim', ctrl.layDanhSachPhim);
router.get('/LayDanhSachPhimTheoNgay', ctrl.layDanhSachPhimTheoNgay);
router.get('/LayDanhSachPhimPhanTrang', ctrl.layDanhSachPhimPhanTrang);
router.get('/LayThongTinPhim', ctrl.layThongTinPhim);
router.post('/ThemPhim', upload.single('hinhAnh'), ctrl.themPhim);
router.post('/CapNhatPhim', upload.single('hinhAnh'), ctrl.capNhatPhim);
router.delete('/XoaPhim', ctrl.xoaPhim);

module.exports = router;
