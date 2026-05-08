const db = require('../config/db');

const getMonth = (req, res) => {
    db.query(
        'SELECT MONTH(ngayMuaVe) AS thang, YEAR(ngayMuaVe) AS nam, SUM(amount) AS doanhSo FROM nodejsapi.thongke GROUP BY YEAR(ngayMuaVe), MONTH(ngayMuaVe) ORDER BY nam, thang',
        [],
        function (error, results) {
            if (error) return res.status(500).send(error.message);
            return res.send(results);
        }
    );
};

const getPhim = (req, res) => {
    db.query(
        'SELECT tenPhim, COUNT(*) AS soLuong from nodejsapi.thongke GROUP BY tenPhim',
        [],
        function (error, results) {
            if (error) return res.status(500).send(error.message);
            return res.send(results);
        }
    );
};

module.exports = { getMonth, getPhim };
