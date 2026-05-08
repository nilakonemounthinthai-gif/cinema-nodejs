const router = require('express').Router();
const ctrl = require('../controllers/quanLyNguoiDung');
const { validateToken } = require('../middleware/auth');

router.post('/DangKy', ctrl.dangKy);
router.post('/DangNhap', ctrl.dangNhap);
router.get('/LayDanhSachNguoiDung', ctrl.layDanhSachNguoiDung);
router.post('/ThemNguoiDung', ctrl.themNguoiDung);
router.get('/LayDanhSachNguoiDungPhanTrang', ctrl.layDanhSachNguoiDungPhanTrang);
router.post('/ThongTinTaiKhoan', validateToken, ctrl.thongTinTaiKhoan);
router.put('/CapNhatThongTinNguoiDung', validateToken, ctrl.capNhatThongTinNguoiDung);
router.delete('/XoaNguoiDung', ctrl.xoaNguoiDung);

module.exports = router;
