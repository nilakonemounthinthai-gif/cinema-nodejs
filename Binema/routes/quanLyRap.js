const router = require('express').Router();
const ctrl = require('../controllers/quanLyRap');

router.get('/LayThongTinHeThongRap', ctrl.layThongTinHeThongRap);
router.get('/LayThongTinCumRapTheoHeThong', ctrl.layThongTinCumRapTheoHeThong);
router.get('/LayThongTinRap', ctrl.layThongTinRap);
router.get('/LayThongTinCumRap', ctrl.layThongTinCumRap);
router.get('/LayThongTinTheLoaiPhim', ctrl.layThongTinTheLoaiPhim);
router.post('/AddTheLoaiPhim', ctrl.addTheLoaiPhim);
router.put('/UpdateTheLoaiPhim', ctrl.updateTheLoaiPhim);
router.post('/DeleteTheLoaiPhim', ctrl.deleteTheLoaiPhim);
router.get('/LayThongTinLichChieuHeThongRap', ctrl.layThongTinLichChieuHeThongRap);
router.get('/LayThongTinLichChieuPhim', ctrl.layThongTinLichChieuPhim);
router.post('/AddCumRap', ctrl.addCumRap);
router.put('/SuaCumRap', ctrl.suaCumRap);
router.post('/XoaCumRap', ctrl.xoaCumRap);
router.put('/SuaRap', ctrl.suaRap);
router.post('/XoaRap', ctrl.xoaRap);
router.post('/ThemRap', ctrl.themRap);

module.exports = router;
