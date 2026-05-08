const db = require('../config/db');

// Convert an ISO 8601 string (e.g. "2026-05-08T07:00:00.000Z") to MySQL DATETIME
// format "YYYY-MM-DD HH:MM:SS". MySQL DATETIME does not support the 'Z' timezone
// designator, so passing the raw ISO string can result in NULL being stored when
// MySQL is running in strict mode or simply discards unparseable trailing characters.
const toMySQLDate = (isoStr) => {
    if (!isoStr) return null;
    const d = new Date(isoStr);
    if (isNaN(d.getTime())) return null;
    // Always store in UTC so retrieval is consistent
    return d.toISOString().slice(0, 19).replace('T', ' ');
};

const layDanhSachPhim = (req, res) => {
    db.query('SELECT * FROM phiminsert', [], function (error, results) {
        if (error) return res.status(500).send(error.message);
        for (let i = 0; i < results.length; i++) {
            const img = results[i].hinhAnh;
            results[i].hinhAnh = img
                ? (Buffer.isBuffer(img) ? img.toString() : String(img))
                : '';
        }
        return res.send(results);
    });
};

const layDanhSachPhimTheoNgay = (req, res) => {
    const { tuNgay, denNgay } = req.query;
    if (!tuNgay || !denNgay) {
        return res.status(400).send('tuNgay and denNgay are required');
    }
    db.query(
        'SELECT * FROM phiminsert WHERE ngayKhoiChieu BETWEEN ? AND ?',
        [tuNgay, denNgay],
        function (error, results) {
            if (error) return res.status(500).send(error.message);
            for (let i = 0; i < results.length; i++) {
                const img = results[i].hinhAnh;
                results[i].hinhAnh = img ? (Buffer.isBuffer(img) ? img.toString() : String(img)) : '';
            }
            return res.send(results);
        }
    );
};

const layDanhSachPhimPhanTrang = (req, res) => {
    const soTrang = parseInt(req.query.soTrang) || 1;
    const soPhanTuTrenTrang = parseInt(req.query.soPhanTuTrenTrang) || 10;
    const offset = (soTrang - 1) * soPhanTuTrenTrang;
    db.query('SELECT COUNT(*) AS total FROM phiminsert', [], function (error, countResult) {
        if (error) return res.status(500).send(error.message);
        const total = countResult[0].total;
        db.query(
            'SELECT * FROM phiminsert LIMIT ? OFFSET ?',
            [soPhanTuTrenTrang, offset],
            function (error, results) {
                if (error) return res.status(500).send(error.message);
                for (let i = 0; i < results.length; i++) {
                    const img = results[i].hinhAnh;
                    results[i].hinhAnh = img ? (Buffer.isBuffer(img) ? img.toString() : String(img)) : '';
                }
                return res.send({ totalCount: total, items: results, soTrang, soPhanTuTrenTrang });
            }
        );
    });
};

const layThongTinPhim = (req, res) => {
    db.query(
        'SELECT * FROM phiminsert JOIN phiminsertvalichchieuinsert ON phiminsert.maPhim = phiminsertvalichchieuinsert.phiminsert JOIN lichchieuinsert ON lichchieuinsert.maLichChieu = phiminsertvalichchieuinsert.lichchieuinsert WHERE phiminsert.maPhim = ?',
        [req.query.MaPhim],
        async (error, results0) => {
            if (error) return res.status(500).send(error.message);
            let lichchieu = [];
            for (const result0 of results0) {
                lichchieu = await new Promise((resolve) => {
                    db.query(
                        'SELECT * FROM lichchieuinsert JOIN cumrapvalichchieuinsert ON lichchieuinsert.maLichChieu = cumrapvalichchieuinsert.lichchieuinsert JOIN cumrap ON cumrap.cid = cumrapvalichchieuinsert.cumrap WHERE lichchieuinsert.maLichChieu = ?',
                        [result0.maLichChieu],
                        async (error, results1) => {
                            if (error) return resolve(res.status(500).send(error.message));
                            let thongtinrap = {};
                            for (const result1 of results1) {
                                thongtinrap = await new Promise((resolve) => {
                                    db.query(
                                        'SELECT * FROM danhsachrap JOIN cumrap ON danhsachrap.maCumRap = cumrap.cid JOIN hethongrapvacumrap ON cumrap.cid = hethongrapvacumrap.cumrap JOIN hethongrap ON hethongrap.hid = hethongrapvacumrap.hethongrap WHERE danhsachrap.maRap = ?',
                                        [result1.maRap],
                                        async (error, results2) => {
                                            if (error) return resolve(res.status(500).send(error.message));
                                            // BUG FIX: no theater row found — skip rather than crash
                                            if (!results2 || results2.length === 0) return resolve({});
                                            thongtinrap = {
                                                maRap: parseInt(results2[0].maRap),
                                                tenRap: results2[0].tenRap,
                                                maCumRap: results2[0].maCumRap,
                                                tenCumRap: results2[0].tenCumRap,
                                                maHeThongRap: results2[0].maHeThongRap,
                                                tenHeThongRap: results2[0].tenHeThongRap,
                                            };
                                            resolve(thongtinrap);
                                        }
                                    );
                                });
                                const val = {
                                    thongTinRap: thongtinrap,
                                    maLichChieu: result1.maLichChieu,
                                    maRap: result1.maRap,
                                    maPhim: result0.maPhim,
                                    tenPhim: result0.tenPhim,
                                    ngayChieuGioChieu: result1.ngayChieuGioChieu,
                                    giaVe: result1.giaVe,
                                    thoiLuong: result1.thoiLuong,
                                };
                                lichchieu.push(val);
                            }
                            resolve(lichchieu);
                        }
                    );
                });
            }
            if (results0[0]) {
                const final = {
                    lichchieu,
                    maPhim: results0[0].maPhim,
                    tenPhim: results0[0].tenPhim,
                    biDanh: results0[0].biDanh,
                    trailer: results0[0].trailer,
                    // BUG FIX: Buffer.from(null) throws TypeError and crashes the server.
                    // Use null-safe conversion: Buffer → string, string → string, null → ''.
                    hinhAnh: results0[0].hinhAnh
                        ? (Buffer.isBuffer(results0[0].hinhAnh)
                            ? results0[0].hinhAnh.toString()
                            : String(results0[0].hinhAnh))
                        : '',
                    moTa: results0[0].moTa,
                    maNhom: 'GP09',
                    ngayKhoiChieu: results0[0].ngayKhoiChieu,
                    danhGia: results0[0].danhGia,
                    nhaSanXuat: results0[0].nhaSanXuat,
                    daoDien: results0[0].daoDien,
                    dienVien: results0[0].dienVien,
                    maTheLoaiPhim: results0[0].maTheLoaiPhim,
                    dinhDang: results0[0].dinhDang,
                };
                return res.send(final);
            }
        }
    );
};

const themPhim = (req, res) => {
    const hinhAnh = req.file
        ? `/images/${req.file.filename}`
        : (req.body.hinhAnh || '');
    console.log('[ThemPhim] START tenPhim=%s hinhAnh=%s', req.body.tenPhim, hinhAnh.slice(0, 60));
    db.query('INSERT INTO phiminsert SET ?', {
        tenPhim: req.body.tenPhim,
        biDanh: req.body.biDanh,
        trailer: req.body.trailer,
        hinhAnh,
        moTa: req.body.moTa,
        maNhom: req.body.maNhom || 'GP09',
        ngayKhoiChieu: toMySQLDate(req.body.ngayKhoiChieu),
        danhGia: req.body.danhGia ?? 0,
        nhaSanXuat: req.body.quocGiaSX,
        daoDien: req.body.daoDien,
        dienVien: req.body.dienVien,
        maTheLoaiPhim: req.body.maTheLoaiPhim,
        dinhDang: req.body.dinhDang,
    }, function (error, result) {
        if (error) {
            console.error('[ThemPhim] DB ERROR', error.code, error.message);
            return res.status(500).send(error.message);
        }
        console.log('[ThemPhim] SUCCESS maPhim=%d', result.insertId);
        return res.send('Success');
    });
};

const capNhatPhim = (req, res) => {
    const hinhAnh = req.file
        ? `/images/${req.file.filename}`
        : (req.body.hinhAnh || '');
    console.log('[CapNhatPhim] START maPhim=%s hinhAnh=%s', req.body.maPhim, hinhAnh.slice(0, 60));
    db.query('UPDATE phiminsert SET ? WHERE maPhim = ?', [{
        tenPhim: req.body.tenPhim,
        biDanh: req.body.biDanh,
        trailer: req.body.trailer,
        hinhAnh,
        moTa: req.body.moTa,
        maNhom: req.body.maNhom || 'GP09',
        ngayKhoiChieu: toMySQLDate(req.body.ngayKhoiChieu),
        danhGia: req.body.danhGia ?? 0,
        nhaSanXuat: req.body.quocGiaSX,
        daoDien: req.body.daoDien,
        dienVien: req.body.dienVien,
        maTheLoaiPhim: req.body.maTheLoaiPhim,
        dinhDang: req.body.dinhDang,
    }, req.body.maPhim], function (error) {
        if (error) {
            console.error('[CapNhatPhim] DB ERROR', error.code, error.message);
            return res.status(500).send(error.message);
        }
        console.log('[CapNhatPhim] SUCCESS');
        return res.send('Success');
    });
};

const xoaPhim = (req, res) => {
    db.query('DELETE FROM phiminsert WHERE maPhim=?', [req.query.MaPhim], function (error, results) {
        if (error) return res.status(500).send(error.message);
        return res.send(results);
    });
};

module.exports = {
    layDanhSachPhim, layDanhSachPhimTheoNgay, layDanhSachPhimPhanTrang,
    layThongTinPhim, themPhim, capNhatPhim, xoaPhim,
};
