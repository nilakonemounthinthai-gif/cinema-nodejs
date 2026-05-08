const db = require('../config/db');
const nodemailer = require('nodemailer');

// Helper: MySQL TINYINT(1) returns a plain JS number; BIT(1) returns a Buffer.
// This handles both cases safely.
const readIsConfirm = (val) => {
    if (val === null || val === undefined) return false;
    if (Buffer.isBuffer(val)) return val.readInt8() === 1;
    return val === 1;
};

const thayDoiTrangThaiDatVe = (req, res) => {
    console.log('RUN', req.body.maGhe, req.body.taiKhoanNguoiDat);
    db.query(
        'update nodejsapi.datve set isConfirm = 1 where maGhe = ? and taiKhoanNguoiDat = ?',
        [req.body.maGhe, req.body.taiKhoanNguoiDat],
        function (error) {
            if (error) return res.status(500).send(error.message);
            return res.send('Success');
        }
    );
};

const layDanhSachVeDaMuaCuaKhachHang = (req, res) => {
    db.query(
        'SELECT * FROM lichchieuinsert JOIN phiminsertvalichchieuinsert ON lichchieuinsert.maLichChieu = phiminsertvalichchieuinsert.lichchieuinsert JOIN phiminsert ON phiminsert.maPhim = phiminsertvalichchieuinsert.phiminsert JOIN cumrapvalichchieuinsert ON lichchieuinsert.maLichChieu = cumrapvalichchieuinsert.lichchieuinsert JOIN cumrap ON cumrap.cid = cumrapvalichchieuinsert.cumrap JOIN datve ON datve.maLichChieu = lichchieuinsert.maLichChieu ORDER BY ngayChieuGioChieu DESC',
        async (error, results) => {
            if (error) return res.status(500).send(error.message);
            const danhSachVe = [];
            for (let i = 0; i < results.length; i++) {
                danhSachVe.push({
                    maLichChieu: results[i].maLichChieu,
                    tenCumRap: results[i].tenCumRap,
                    tenRap: results[i].tenRap,
                    diaChi: results[i].diaChi,
                    tenPhim: results[i].tenPhim,
                    hinhAnh: results[i].hinhAnh,
                    ngayChieu: results[i].ngayChieuGioChieu,
                    gioChieu: results[i].ngayChieuGioChieu,
                    maGhe: results[i].maGhe,
                    tenGhe: results[i].tenGhe,
                    tenDayDu: results[i].tenDayDu,
                    loaiGhe: results[i].giaVe > 75000 ? 'Vip' : 'Thường',
                    giaVe: results[i].giaVe,
                    tenTaiKhoan: results[i].taiKhoanNguoiDat,
                    isConfirm: readIsConfirm(results[i].isConfirm),
                });
            }
            return res.send(danhSachVe);
        }
    );
};

const layVeTheoMaGhe = (req, res) => {
    db.query(
        'SELECT * FROM lichchieuinsert JOIN phiminsertvalichchieuinsert ON lichchieuinsert.maLichChieu = phiminsertvalichchieuinsert.lichchieuinsert JOIN phiminsert ON phiminsert.maPhim = phiminsertvalichchieuinsert.phiminsert JOIN cumrapvalichchieuinsert ON lichchieuinsert.maLichChieu = cumrapvalichchieuinsert.lichchieuinsert JOIN cumrap ON cumrap.cid = cumrapvalichchieuinsert.cumrap JOIN datve ON datve.maLichChieu = lichchieuinsert.maLichChieu where datve.maGhe = ? and datve.taiKhoanNguoiDat = ?',
        [req.query.maGhe, req.query.taiKhoanNguoiDat],
        async (error, results) => {
            if (error) return res.status(500).send(error.message);
            const danhSachVe = [];
            for (let i = 0; i < results.length; i++) {
                danhSachVe.push({
                    maLichChieu: results[i].maLichChieu,
                    tenCumRap: results[i].tenCumRap,
                    tenRap: results[i].tenRap,
                    diaChi: results[i].diaChi,
                    tenPhim: results[i].tenPhim,
                    hinhAnh: results[i].hinhAnh,
                    ngayChieu: results[i].ngayChieuGioChieu,
                    gioChieu: results[i].ngayChieuGioChieu,
                    maGhe: results[i].maGhe,
                    tenGhe: results[i].tenGhe,
                    tenDayDu: results[i].tenDayDu,
                    loaiGhe: results[i].giaVe > 75000 ? 'Vip' : 'Thường',
                    giaVe: results[i].giaVe,
                    tenTaiKhoan: results[i].taiKhoanNguoiDat,
                    isConfirm: readIsConfirm(results[i].isConfirm),
                });
            }
            return res.send(danhSachVe);
        }
    );
};

const deleteTicketOfUser = (req, res) => {
    console.log(req.query.maGhe, req.query.taiKhoanNguoiDat, 'DELETE');
    db.query(
        'DELETE FROM nodejsapi.datve WHERE maGhe= ? AND taiKhoanNguoiDat = ?',
        [req.query.maGhe, req.query.taiKhoanNguoiDat],
        async (error) => {
            if (error) return res.status(500).send(error.message);
            return res.send('Success');
        }
    );
};

const layDanhSachVeDaMua = (req, res) => {
    db.query(
        'SELECT * FROM lichchieuinsert JOIN phiminsertvalichchieuinsert ON lichchieuinsert.maLichChieu = phiminsertvalichchieuinsert.lichchieuinsert JOIN phiminsert ON phiminsert.maPhim = phiminsertvalichchieuinsert.phiminsert JOIN cumrapvalichchieuinsert ON lichchieuinsert.maLichChieu = cumrapvalichchieuinsert.lichchieuinsert JOIN cumrap ON cumrap.cid = cumrapvalichchieuinsert.cumrap JOIN datve ON datve.maLichChieu = lichchieuinsert.maLichChieu WHERE datve.taiKhoanNguoiDat = ? ORDER BY ngayChieuGioChieu DESC',
        [req.query.taiKhoanNguoiDat],
        async (error, results) => {
            if (error) return res.status(500).send(error.message);
            const danhSachVe = [];
            for (let i = 0; i < results.length; i++) {
                danhSachVe.push({
                    maGhe: results[i].maGhe,
                    maLichChieu: results[i].maLichChieu,
                    tenCumRap: results[i].tenCumRap,
                    tenRap: results[i].tenRap,
                    diaChi: results[i].diaChi,
                    tenPhim: results[i].tenPhim,
                    hinhAnh: results[i].hinhAnh
                        ? (Buffer.isBuffer(results[i].hinhAnh) ? results[i].hinhAnh.toString() : String(results[i].hinhAnh))
                        : '',
                    ngayChieu: results[i].ngayChieuGioChieu,
                    gioChieu: results[i].ngayChieuGioChieu,
                    tenGhe: results[i].tenGhe,
                    tenDayDu: results[i].tenDayDu,
                    loaiGhe: results[i].loaiGhe,
                    giaVe: results[i].giaVe,
                    maDatVe: results[i].maDatVe || null,
                    status: readIsConfirm(results[i].isConfirm),
                    taiKhoanNguoiDat: results[i].taiKhoanNguoiDat,
                });
            }
            return res.send(danhSachVe);
        }
    );
};

const layDanhSachPhongVe = (req, res) => {
    db.query(
        'SELECT * FROM lichchieuinsert JOIN phiminsertvalichchieuinsert ON lichchieuinsert.maLichChieu = phiminsertvalichchieuinsert.lichchieuinsert JOIN phiminsert ON phiminsert.maPhim = phiminsertvalichchieuinsert.phiminsert JOIN cumrapvalichchieuinsert ON lichchieuinsert.maLichChieu = cumrapvalichchieuinsert.lichchieuinsert JOIN cumrap ON cumrap.cid = cumrapvalichchieuinsert.cumrap WHERE maLichChieu = ?',
        [req.query.MaLichChieu],
        async (error, results) => {
            if (error) return res.status(500).send(error.message);
            // BUG FIX: if no showtime found, accessing results[0] crashes the server
            if (!results || results.length === 0) {
                return res.status(404).send('Lịch chiếu không tồn tại');
            }
            let danhSachGhe = Array.apply(null, Array(160)).map(function () {});
            danhSachGhe = await new Promise((resolve) => {
                db.query('SELECT * FROM datve WHERE maLichChieu = ?', [req.query.MaLichChieu], async (error, results1) => {
                    if (error) return resolve(res.status(500).send(error.message));
                    for (const result1 of results1) {
                        danhSachGhe[result1.tenGhe] = {
                            maGhe: result1.maGhe,
                            tenGhe: result1.tenGhe,
                            maRap: result1.maRap,
                            loaiGhe: result1.loaiGhe,
                            stt: result1.tenGhe,
                            giaVe: result1.giaVe,
                            daDat: true,
                            taiKhoanNguoiDat: result1.taiKhoanNguoiDat,
                        };
                    }
                    resolve(danhSachGhe);
                });
            });
            for (let i = 0; i < 160; i++) {
                if (danhSachGhe[i] === undefined) {
                    danhSachGhe[i] = {
                        maGhe: i,
                        tenGhe: i > 9 ? String(i) : '0' + String(i),
                        maRap: results[0].maRap,
                        loaiGhe: i > 44 && i < 90 ? 'Vip' : 'Thuong',
                        stt: i > 9 ? String(i) : '0' + String(i),
                        giaVe: i > 44 && i < 90 ? results[0].giaVe + 15000 : results[0].giaVe,
                        daDat: false,
                        taiKhoanNguoiDat: null,
                    };
                }
            }
            return res.send({
                thongTinPhim: {
                    maLichChieu: results[0].maLichChieu,
                    tenCumRap: results[0].tenCumRap,
                    tenRap: results[0].tenRap,
                    diaChi: results[0].diaChi,
                    tenPhim: results[0].tenPhim,
                    hinhAnh: results[0].hinhAnh
                        ? (Buffer.isBuffer(results[0].hinhAnh) ? results[0].hinhAnh.toString() : String(results[0].hinhAnh))
                        : '',
                    ngayChieu: results[0].ngayChieuGioChieu,
                    gioChieu: results[0].ngayChieuGioChieu,
                },
                danhSachGhe,
            });
        }
    );
};

const datVe = async (req, res) => {
    const listVe = [];
    let email = '';
    let tenPhim = '';
    let tenRap = '';
    let tenCumRap = '';
    let time = '';
    const paymentMethod = req.body.paymentMethod || 'COUNTER';

    // Generate unique booking code: BK-YYYYMMDD-XXXX
    const now = new Date();
    const datePart = now.toISOString().slice(0, 10).replace(/-/g, '');
    const randPart = Math.floor(1000 + Math.random() * 9000);
    const maDatVe = `BK-${datePart}-${randPart}`;
    for (const ve of req.body.danhSachVe) {
        listVe.push(ve);
        await new Promise((resolve) => {
            db.query('INSERT INTO datve SET ?', {
                tenGhe: ve.maGhe,
                loaiGhe: ve.giaVe > 75000 ? 'Vip' : 'Thuong',
                giaVe: ve.giaVe,
                taiKhoanNguoiDat: req.body.taiKhoanNguoiDung,
                maLichChieu: req.body.maLichChieu,
                tenDayDu: ve.tenDayDu,
                isConfirm: paymentMethod === 'VNPAY' ? 1 : 0,
                maRap: ve.maRap,
                maDatVe,
            }, function (error) {
                if (error) {
                    // Send error only once; mark response as sent and exit loop
                    if (!res.headersSent) res.status(500).send(error.message);
                    return resolve();
                }
                resolve();
            });
        });
    }
    db.query(
        'SELECT * FROM nguoidungvm n WHERE n.taiKhoan = ?',
        [req.body.taiKhoanNguoiDung],
        function (error, results3) {
            console.log('QUERY', results3);
            if (error) { console.error(error.message); return; }
            for (const result1 of results3) {
                email = result1.email;
                db.query(
                    'SELECT * FROM lichchieuinsert JOIN phiminsertvalichchieuinsert ON lichchieuinsert.maLichChieu = phiminsertvalichchieuinsert.lichchieuinsert JOIN phiminsert ON phiminsert.maPhim = phiminsertvalichchieuinsert.phiminsert JOIN cumrapvalichchieuinsert ON lichchieuinsert.maLichChieu = cumrapvalichchieuinsert.lichchieuinsert JOIN cumrap ON cumrap.cid = cumrapvalichchieuinsert.cumrap JOIN datve ON datve.maLichChieu = lichchieuinsert.maLichChieu WHERE datve.taiKhoanNguoiDat = ? AND lichchieuinsert.maLichChieu = ? LIMIT 1',
                    [req.body.taiKhoanNguoiDung, req.body.maLichChieu],
                    function (error, results2) {
                        console.log('QUERY', results2);
                        if (error) { console.error(error.message); return; }
                        for (const result2 of results2) {
                            tenCumRap = result2.tenCumRap;
                            tenRap = result2.tenRap;
                            tenPhim = result2.tenPhim;
                            time = result2.ngayChieuGioChieu;
                            db.query('INSERT INTO nodejsapi.thongke SET ?', {
                                tenPhim: result2.tenPhim,
                                ngayMuaVe: new Date(),
                                amount: req.body.amount / 100,
                            }, function (error) { if (error) console.error(error.message); });
                            console.log('LOG DAT VE', email, req.body.maLichChieu, listVe, tenRap, tenCumRap, tenPhim, time);
                            const transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: { user: 'khanhhn.hoang@gmail.com', pass: 'rmjgjdgtziwhvmai' },
                            });
                            const mailOptions = {
                                from: 'admin@gmail.com',
                                to: email,
                                subject: 'Bạn đặt vé thành công',
                                text: 'Đặt vé thành công!\n' +
                                    'Mã đặt vé: ' + maDatVe + '\n' +
                                    'Phương thức thanh toán: ' + (paymentMethod === 'VNPAY' ? 'VNPay' : 'Thanh toán tại quầy') + '\n' +
                                    '------------------------\n' +
                                    'Tên Phim: ' + tenPhim + '\n' +
                                    'Mã Ghế: ' + listVe.map(ve => ve.tenDayDu).join(', ') + '\n' +
                                    'Tên Rạp: ' + tenRap + '\n' +
                                    'Tên Cụm Rạp: ' + tenCumRap + '\n' +
                                    'Thời gian chiếu: ' + time + '\n' +
                                    (paymentMethod !== 'VNPAY' ? '------------------------\nVui lòng xuất trình mã đặt vé tại quầy.' : ''),
                            };
                            transporter.sendMail(mailOptions, function (error, info) {
                                if (error) { console.log(error); }
                                else { console.log('Email sent: ' + info.response); }
                            });
                        }
                    }
                );
            }
        }
    );
    // Return booking code to frontend
    if (!res.headersSent) return res.json({ message: 'Đặt vé thành công', maDatVe });
};

const layLichChieu = async (req, res) => {
    db.query('select * from lichchieuinsert l where l.maLichChieu = ?', [req.query.MaLichChieu], function (error, results) {
        if (error) return res.status(500).send(error.message);
        return res.send(results);
    });
};

const suaLichChieu = async (req, res) => {
    db.query(
        'UPDATE nodejsapi.lichchieuinsert SET ngayChieuGioChieu= ?, giaVe= ? WHERE maLichChieu= ?',
        [req.body.time, req.body.gia, req.query.MaLichChieu],
        function (error, results) {
            if (error) return res.status(500).send(error.message);
            return res.send(results);
        }
    );
};

const taoLichChieu = async (req, res) => {
    db.query('INSERT INTO lichchieuinsert SET ?', {
        ngayChieuGioChieu: req.body.ngayChieuGioChieu,
        maRap: req.body.maRap,
        tenRap: req.body.tenRap,
        giaVe: req.body.giaVe,
        thoiLuong: 120,
    }, function (error, results) {
        if (error) return res.status(500).send(error.message);
        db.query('INSERT INTO phiminsertvalichchieuinsert SET ?', {
            phiminsert: req.body.maPhim,
            lichchieuinsert: results.insertId,
        }, function (error) { if (error) console.error(error.message); });
        db.query(
            'SELECT * FROM cumrap JOIN hethongrapvacumrap ON cumrap.cid = hethongrapvacumrap.cumrap WHERE tenCumRap = ?',
            [req.body.cumRap],
            function (error, results1) {
                if (error) { console.error(error.message); return; }
                db.query('INSERT INTO cumrapvalichchieuinsert SET ?', {
                    cumrap: results1[0].cid,
                    lichchieuinsert: results.insertId,
                }, function (error) {
                    if (error) { console.error(error.message); return; }
                    console.log(results1[0].hethongrap);
                    db.query(
                        'SELECT * FROM hethongrapvaphim WHERE maHeThongRap = ? AND maPhim = ?',
                        [results1[0].hethongrap, req.body.maPhim],
                        function (error, results3) {
                            if (error) { console.error(error.message); return; }
                            if (!(results3.length > 0)) {
                                db.query('INSERT INTO hethongrapvaphim SET ?', {
                                    maHeThongRap: results1[0].hethongrap,
                                    maPhim: req.body.maPhim,
                                }, function (error) { if (error) console.error(error.message); });
                            }
                        }
                    );
                });
            }
        );
        return res.send('Success');
    });
};

const xoaLichChieu = (req, res) => {
    db.query('DELETE FROM lichchieuinsert WHERE maLichChieu=?', [req.query.maLichChieu], function (error, results) {
        if (error) return res.status(500).send(error.message);
        return res.send(results);
    });
};

module.exports = {
    thayDoiTrangThaiDatVe, layDanhSachVeDaMuaCuaKhachHang, layVeTheoMaGhe,
    deleteTicketOfUser, layDanhSachVeDaMua, layDanhSachPhongVe,
    datVe, layLichChieu, suaLichChieu, taoLichChieu, xoaLichChieu,
};
