const db = require('../config/db');

const layThongTinHeThongRap = (req, res) => {
    db.query('SELECT * FROM hethongrap', [], function (error, results) {
        if (error) return res.status(500).send(error.message);
        return res.send(results);
    });
};

const layThongTinCumRapTheoHeThong = async (req, res) => {
    const final = [];
    db.query(
        'SELECT * FROM cumrap JOIN hethongrapvacumrap ON cumrap.cid = hethongrapvacumrap.cumrap JOIN hethongrap ON hethongrap.hid = hethongrapvacumrap.hethongrap WHERE hethongrap.maHeThongRap = ?',
        [req.query.maHeThongRap],
        async (error, results) => {
            if (error) return res.status(500).send(error.message);
            for (const result of results) {
                let danhSachRap = [];
                danhSachRap = await new Promise((resolve) => {
                    db.query('SELECT * FROM danhsachrap WHERE maCumRap = ?', [result.cid], async (error, results1) => {
                        if (error) return resolve(res.status(500).send(error.message));
                        for (const result1 of results1) {
                            danhSachRap.push({ maRap: result1.maRap, tenRap: result1.tenRap });
                        }
                        resolve(danhSachRap);
                    });
                });
                final.push({
                    danhSachRap,
                    maCumRap: result.maCumRap,
                    tenCumRap: result.tenCumRap,
                    diaChi: result.diaChi,
                });
            }
            return res.send(final);
        }
    );
};

const layThongTinRap = async (req, res) => {
    db.query(
        'select * from danhsachrap d join cumrap c on d.maCumRap = c.cid join hethongrapvacumrap h on h.cumrap = c.cid  join hethongrap hr on hr.hid = h.hethongrap',
        async (error, results) => {
            if (error) return res.status(500).send(error.message);
            return res.send(results);
        }
    );
};

const layThongTinCumRap = (req, res) => {
    db.query('SELECT * FROM cumrap', [], function (error, results) {
        if (error) return res.status(500).send(error.message);
        return res.send(results);
    });
};

const layThongTinTheLoaiPhim = (req, res) => {
    db.query('SELECT * FROM nodejsapi.theloaiphim', [], function (error, results) {
        if (error) return res.status(500).send(error.message);
        return res.send(results);
    });
};

const addTheLoaiPhim = (req, res) => {
    db.query('INSERT INTO nodejsapi.theloaiphim (tenTheLoai) VALUES(?)', [req.body.tenTheLoai], function (error, results) {
        if (error) return res.status(500).send(error.message);
        return res.send(results);
    });
};

const updateTheLoaiPhim = (req, res) => {
    db.query('UPDATE nodejsapi.theloaiphim SET tenTheLoai=? WHERE id=?', [req.body.tenTheLoai, req.body.id], function (error, results) {
        if (error) return res.status(500).send(error.message);
        return res.send(results);
    });
};

const deleteTheLoaiPhim = (req, res) => {
    db.query('DELETE FROM nodejsapi.theloaiphim WHERE id=?', [req.body.id], function (error, results) {
        if (error) return res.status(500).send(error.message);
        return res.send(results);
    });
};

const layThongTinLichChieuHeThongRap = (req, res) => {
    const final = [];
    db.query('SELECT * FROM hethongrap', [], async (error, results) => {
        if (error) return res.status(500).send(error.message);
        for (const result of results) {
            let lstCumRap = [];
            lstCumRap = await new Promise((resolve) => {
                db.query(
                    'SELECT * FROM hethongrap JOIN hethongrapvacumrap ON hethongrap.hid = hethongrapvacumrap.hethongrap JOIN cumrap ON cumrap.cid = hethongrapvacumrap.cumrap WHERE hethongrap.hid = ?',
                    [result.hid],
                    async (error, results0) => {
                        if (error) return resolve(res.status(500).send(error.message));
                        for (const result0 of results0) {
                            let danhSachPhim = [];
                            danhSachPhim = await new Promise((resolve) => {
                                db.query(
                                    'SELECT * FROM phiminsert JOIN hethongrapvaphim ON phiminsert.maPhim = hethongrapvaphim.maPhim JOIN hethongrap ON hethongrap.hid = hethongrapvaphim.maHeThongRap JOIN phiminsertvalichchieuinsert ON phiminsert.maPhim = phiminsertvalichchieuinsert.phiminsert JOIN cumrapvalichchieuinsert ON phiminsertvalichchieuinsert.lichchieuinsert = cumrapvalichchieuinsert.lichchieuinsert WHERE hethongrap.hid = ? AND cumrapvalichchieuinsert.cumrap = ?',
                                    [result0.hid, result0.cid],
                                    async (error, results1) => {
                                        if (error) return resolve(res.status(500).send(error.message));
                                        for (const result1 of results1) {
                                            let lstLichChieuTheoPhim = [];
                                            lstLichChieuTheoPhim = await new Promise((resolve) => {
                                                db.query(
                                                    'SELECT * FROM lichchieuinsert JOIN phiminsertvalichchieuinsert ON lichchieuinsert.maLichChieu = phiminsertvalichchieuinsert.lichchieuinsert JOIN phiminsert ON phiminsert.maPhim = phiminsertvalichchieuinsert.phiminsert WHERE phiminsertvalichchieuinsert.phiminsert = ?',
                                                    [result1.maPhim],
                                                    async (error, results2) => {
                                                        if (error) return resolve(res.status(500).send(error.message));
                                                        for (const result2 of results2) {
                                                            lstLichChieuTheoPhim.push({
                                                                maLichChieu: result2.maLichChieu,
                                                                maRap: result2.maRap,
                                                                tenRap: result2.tenRap,
                                                                ngayChieuGioChieu: result2.ngayChieuGioChieu,
                                                                giaVe: result2.giaVe,
                                                            });
                                                        }
                                                        resolve(lstLichChieuTheoPhim);
                                                    }
                                                );
                                            });
                                            const phim = {
                                                lstLichChieuTheoPhim,
                                                maPhim: result1.maPhim,
                                                tenPhim: result1.tenPhim,
                                                hinhAnh: result1.hinhAnh ? result1.hinhAnh.toString() : '',
                                            };
                                            console.log('PHIM', phim);
                                            danhSachPhim.push(phim);
                                        }
                                        resolve(danhSachPhim);
                                    }
                                );
                            });
                            let danhSachRap = [];
                            danhSachRap = await new Promise((resolve) => {
                                db.query(
                                    'SELECT * FROM danhsachrap WHERE danhsachrap.maCumRap = ?',
                                    [result0.cid],
                                    async (error, results1) => {
                                        if (error) return resolve(res.status(500).send(error.message));
                                        for (const result1 of results1) {
                                            danhSachRap.push({ maRap: result1.maRap });
                                        }
                                        resolve(danhSachRap);
                                    }
                                );
                            });
                            const cumrap = {
                                danhSachPhim,
                                danhSachRap,
                                maCumRap: result0.maCumRap,
                                tenCumRap: result0.tenCumRap,
                                diaChi: result0.diaChi,
                            };
                            lstCumRap.push(cumrap);
                        }
                        resolve(lstCumRap);
                    }
                );
            });
            final.push({
                lstCumRap,
                maHeThongRap: result.maHeThongRap,
                tenHeThongRap: result.tenHeThongRap,
                logo: result.logo,
                mahom: 'GP09',
            });
        }
        return res.send(final);
    });
};

const layThongTinLichChieuPhim = (req, res) => {
    // Step 1: fetch movie info directly — works even when movie has no showtimes yet
    db.query('SELECT * FROM phiminsert WHERE maPhim = ?', [req.query.MaPhim], (err, phimRows) => {
        if (err) return res.status(500).send(err.message);
        if (!phimRows || !phimRows[0]) return res.status(404).send('Không tìm thấy phim');
        const phim = phimRows[0];
        const hinhAnh = phim.hinhAnh
            ? (Buffer.isBuffer(phim.hinhAnh) ? phim.hinhAnh.toString() : String(phim.hinhAnh))
            : '';

        // Step 2: fetch theater/showtime associations (empty array is fine — movie may not have showtimes yet)
        db.query(
            'SELECT * FROM phiminsert JOIN hethongrapvaphim ON phiminsert.maPhim = hethongrapvaphim.maPhim JOIN hethongrap ON hethongrap.hid = hethongrapvaphim.maHeThongRap WHERE phiminsert.maPhim = ?',
            [req.query.MaPhim],
            async (error, results0) => {
                if (error) return res.status(500).send(error.message);
                let heThongRapChieu = [];
                for (const result0 of results0) {
                    heThongRapChieu = await new Promise((resolve) => {
                        db.query(
                            'SELECT * FROM hethongrap JOIN hethongrapvacumrap ON hethongrap.hid = hethongrapvacumrap.hethongrap JOIN cumrap ON cumrap.cid = hethongrapvacumrap.cumrap JOIN cumrapvalichchieuinsert ON cumrap.cid = cumrapvalichchieuinsert.cumrap JOIN phiminsertvalichchieuinsert ON cumrapvalichchieuinsert.lichchieuinsert = phiminsertvalichchieuinsert.lichchieuinsert WHERE hethongrap.hid = ? AND phiminsertvalichchieuinsert.phiminsert = ?',
                            [result0.hid, result0.maPhim],
                            async (error, results1) => {
                                if (error) return resolve(res.status(500).send(error.message));
                                let cumRapChieu = [];
                                for (const result1 of results1) {
                                    cumRapChieu = await new Promise((resolve) => {
                                        db.query(
                                            'SELECT * FROM lichchieuinsert JOIN cumrapvalichchieuinsert ON lichchieuinsert.maLichChieu = cumrapvalichchieuinsert.lichchieuinsert JOIN cumrap ON cumrap.cid = cumrapvalichchieuinsert.cumrap JOIN phiminsertvalichchieuinsert ON cumrapvalichchieuinsert.lichchieuinsert = phiminsertvalichchieuinsert.lichchieuinsert WHERE cumrap.cid = ? AND phiminsertvalichchieuinsert.phiminsert = ?',
                                            [result1.cumrap, result0.maPhim],
                                            async (error, results2) => {
                                                if (error) return resolve(res.status(500).send(error.message));
                                                let lichChieuPhim = [];
                                                for (const result2 of results2) {
                                                    lichChieuPhim.push({
                                                        maLichChieu: result2.maLichChieu,
                                                        maRap: result2.maRap,
                                                        tenRap: result2.tenRap,
                                                        ngayChieuGioChieu: result2.ngayChieuGioChieu,
                                                        giaVe: result2.giaVe,
                                                        thoiLuong: result2.thoiLuong,
                                                    });
                                                }
                                                const cumrap = {
                                                    lichChieuPhim,
                                                    maCumRap: result1.maCumRap,
                                                    tenCumRap: result1.tenCumRap,
                                                    hinhAnh: null,
                                                };
                                                cumRapChieu.push(cumrap);
                                                resolve(cumRapChieu);
                                            }
                                        );
                                    });
                                }
                                const hethong = {
                                    cumRapChieu,
                                    maHeThongRap: results1[0]?.maHeThongRap,
                                    tenHeThongRap: results1[0]?.tenHeThongRap,
                                    logo: results1[0]?.logo,
                                };
                                heThongRapChieu.push(hethong);
                                resolve(heThongRapChieu);
                            }
                        );
                    });
                }
                // Build response from phim — works even when results0 is empty (no showtimes yet)
                const final = {
                    heThongRapChieu,
                    maPhim: phim.maPhim,
                    tenPhim: phim.tenPhim,
                    biDanh: phim.biDanh,
                    trailer: phim.trailer,
                    hinhAnh,
                    moTa: phim.moTa,
                    maNhom: 'GP09',
                    ngayKhoiChieu: phim.ngayKhoiChieu,
                    danhGia: phim.danhGia,
                    nhaSanXuat: phim.nhaSanXuat,
                    daoDien: phim.daoDien,
                    dienVien: phim.dienVien,
                    maTheLoaiPhim: phim.maTheLoaiPhim,
                    dinhDang: phim.dinhDang,
                };
                return res.send(final);
            }
        );
    });
};

const addCumRap = (req, res) => {
    db.query(
        'INSERT INTO nodejsapi.cumrap SET ?',
        { maCumRap: req.body.maCumRap, tenCumRap: req.body.tenCumRap, diaChi: req.body.diaChi },
        function (error) { if (error) console.error(error.message); }
    );
    db.query('SELECT * FROM nodejsapi.cumrap WHERE maCumRap = ?', [req.body.maCumRap], async (error, results0) => {
        if (error) { console.error(error.message); return; }
        for (const result0 of results0) {
            db.query(
                'INSERT INTO nodejsapi.hethongrapvacumrap (hethongrap, cumrap) VALUES(?, ?)',
                [req.body.hid, result0.cid],
                async (error) => { if (error) console.error(error.message); }
            );
        }
    });
    return res.send('Thêm cụm rạp thành công.');
};

const suaCumRap = (req, res) => {
    db.query(
        'UPDATE nodejsapi.cumrap SET maCumRap=?, tenCumRap=?, diaChi=? WHERE maCumRap = ?',
        [req.body.maCumRap, req.body.tenCumRap, req.body.diaChi, req.body.maCumRap],
        function (error) {
            if (error) return res.status(500).send(error.message);
            return res.send('Success');
        }
    );
};

const xoaCumRap = (req, res) => {
    db.query('DELETE FROM nodejsapi.cumrap WHERE maCumRap = ?', [req.body.maCumRap], function (error) {
        if (error) console.error(error.message);
    });
    db.query('SELECT * FROM nodejsapi.cumrap WHERE maCumRap = ?', [req.body.maCumRap], async (error, results0) => {
        if (error) return res.status(500).send(error.message);
        for (const result0 of results0) {
            db.query('DELETE FROM nodejsapi.hethongrapvacumrap WHERE maCumRap = ?', [result0.cid], async (error) => {
                if (error) console.error(error.message);
            });
        }
        return res.send('Success');
    });
};

const suaRap = (req, res) => {
    db.query(
        'UPDATE nodejsapi.danhsachrap SET tenRap=? WHERE maRap = ?',
        [req.body.tenRap, req.body.maRap],
        function (error) {
            if (error) return res.status(500).send(error.message);
            return res.send('Success');
        }
    );
};

const xoaRap = (req, res) => {
    db.query('DELETE FROM nodejsapi.danhsachrap WHERE maRap = ?', [req.body.maRap], function (error) {
        if (error) return res.status(500).send(error.message);
        return res.send('Success');
    });
};

const themRap = (req, res) => {
    db.query('SELECT * FROM nodejsapi.cumrap WHERE maCumRap = ?', [req.body.maCumRap], async (error, results0) => {
        if (error) { console.error(error.message); return; }
        for (const result0 of results0) {
            db.query(
                'INSERT INTO nodejsapi.danhsachrap SET ?',
                { maRap: Math.floor(Math.random() * 1000000), tenRap: req.body.tenRap, maCumRap: result0.cid },
                async (error) => { if (error) console.error(error.message); }
            );
        }
    });
    return res.send('Thêm rạp thành công.');
};

module.exports = {
    layThongTinHeThongRap, layThongTinCumRapTheoHeThong, layThongTinRap,
    layThongTinCumRap, layThongTinTheLoaiPhim, addTheLoaiPhim,
    updateTheLoaiPhim, deleteTheLoaiPhim, layThongTinLichChieuHeThongRap,
    layThongTinLichChieuPhim, addCumRap, suaCumRap, xoaCumRap,
    suaRap, xoaRap, themRap,
};
