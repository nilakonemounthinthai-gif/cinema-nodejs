const md5 = require('md5');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const dangKy = async (req, res) => {
    const final = await new Promise((resolve) => {
        db.query('INSERT INTO nguoidungvm SET ?', {
            taiKhoan: req.body.taiKhoan,
            matKhau: md5(req.body.matKhau),
            email: req.body.email,
            soDt: req.body.soDt,
            maNhom: req.body.maNhom,
            maLoaiNguoiDung: req.body.maLoaiNguoiDung,
            hoTen: req.body.hoTen,
        }, function (error) {
            if (error) return resolve(res.status(500).send(error.message));
            resolve(res.send('Success'));
        });
    });
    return final;
};

const dangNhap = (req, res) => {
    db.query(
        'SELECT * FROM nguoidungvm WHERE taiKhoan=? AND matKhau=?',
        [req.body.taiKhoan, md5(req.body.matKhau)],
        function (error, results) {
            if (error) return res.status(500).send(error.message);
            if (results.length > 0) {
                const info = JSON.parse(JSON.stringify(results[0]));
                info['accessToken'] = jwt.sign(info, process.env.JWT_SECRET_KEY);
                return res.send(info);
            }
            return res.status(401).send({ error: true });
        }
    );
};

const layDanhSachNguoiDung = (req, res) => {
    db.query('SELECT * FROM nguoidungvm WHERE maNhom=?', [req.query.MaNhom], function (error, results) {
        if (error) return res.status(500).send(error.message);
        return res.send(results);
    });
};

const themNguoiDung = async (req, res) => {
    const final = await new Promise((resolve) => {
        db.query('INSERT INTO nguoidungvm SET ?', {
            taiKhoan: req.body.taiKhoan,
            matKhau: md5(req.body.matKhau),
            email: req.body.email,
            soDt: req.body.soDt,
            maNhom: req.body.maNhom || 'GP09',
            maLoaiNguoiDung: req.body.maLoaiNguoiDung || 'KhachHang',
            hoTen: req.body.hoTen,
        }, function (error) {
            if (error) {
                if (error.code === 'ER_DUP_ENTRY') {
                    return resolve(res.status(400).send('Tài khoản đã tồn tại'));
                }
                return resolve(res.status(500).send(error.message));
            }
            resolve(res.send('Success'));
        });
    });
    return final;
};

const layDanhSachNguoiDungPhanTrang = (req, res) => {
    const soTrang = parseInt(req.query.soTrang) || 1;
    const soPhanTuTrenTrang = parseInt(req.query.soPhanTuTrenTrang) || 10;
    const maNhom = req.query.MaNhom || 'GP09';
    const offset = (soTrang - 1) * soPhanTuTrenTrang;
    db.query('SELECT COUNT(*) AS total FROM nguoidungvm WHERE maNhom=?', [maNhom], function (error, countResult) {
        if (error) return res.status(500).send(error.message);
        const total = countResult[0].total;
        db.query(
            'SELECT * FROM nguoidungvm WHERE maNhom=? LIMIT ? OFFSET ?',
            [maNhom, soPhanTuTrenTrang, offset],
            function (error, results) {
                if (error) return res.status(500).send(error.message);
                return res.send({ totalCount: total, items: results, soTrang, soPhanTuTrenTrang });
            }
        );
    });
};

const thongTinTaiKhoan = (req, res) => {
    db.query('SELECT * FROM nguoidungvm WHERE taiKhoan = ?', [req.body.taiKhoan], function (error, results) {
        if (error) return res.status(500).send(error.message);
        return res.send(results[0]);
    });
};

const capNhatThongTinNguoiDung = (req, res) => {
    if (req.body.matKhau) {
        db.query('UPDATE nguoidungvm SET ? WHERE taiKhoan = ?', [{
            taiKhoan: req.body.taiKhoan,
            matKhau: md5(req.body.matKhau),
            email: req.body.email,
            soDt: req.body.soDt,
            maNhom: req.body.maNhom,
            maLoaiNguoiDung: req.body.maLoaiNguoiDung,
            hoTen: req.body.hoTen,
        }, req.body.taiKhoan], function (error) {
            if (error) return res.status(500).send(error.message);
            return res.send('Success');
        });
    } else {
        db.query('UPDATE nguoidungvm SET ? WHERE taiKhoan = ?', [{
            taiKhoan: req.body.taiKhoan,
            email: req.body.email,
            soDt: req.body.soDt,
            maNhom: req.body.maNhom,
            maLoaiNguoiDung: req.body.maLoaiNguoiDung,
            hoTen: req.body.hoTen,
        }, req.body.taiKhoan], function (error) {
            if (error) return res.status(500).send(error.message);
            return res.send('Success');
        });
    }
};

const xoaNguoiDung = (req, res) => {
    db.query('DELETE FROM nguoidungvm WHERE taiKhoan=?', [req.query.TaiKhoan], function (error) {
        if (error) return res.status(500).send(error.message);
    });
    db.query(
        'DELETE FROM nodejsapi.datve WHERE taiKhoanNguoiDat = ? AND isConfirm = 0',
        [req.query.TaiKhoan],
        function (error) {
            if (error) return res.status(500).send(error.message);
            return res.send('Success');
        }
    );
};

module.exports = {
    dangKy, dangNhap, layDanhSachNguoiDung, themNguoiDung,
    layDanhSachNguoiDungPhanTrang, thongTinTaiKhoan,
    capNhatThongTinNguoiDung, xoaNguoiDung,
};
