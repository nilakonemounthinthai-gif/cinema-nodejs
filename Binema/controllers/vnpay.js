const moment = require('moment');

function sortObject(obj) {
    const sorted = {};
    const str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
    }
    return sorted;
}

const createPaymentUrl = (req, res) => {
    process.env.TZ = 'Asia/Ho_Chi_Minh';

    const date = new Date();
    const createDate = moment(date).format('YYYYMMDDHHmmss');

    const ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    const config = require('config');
    const { amount, maLichChieu, danhSachVe, taiKhoanNguoiDung } = req.query;
    const tmnCode = config.get('vnp_TmnCode');
    const secretKey = config.get('vnp_HashSecret');
    let vnpUrl = config.get('vnp_Url');
    const returnUrl = config.get('vnp_ReturnUrl');
    const orderId = moment(date).format('DDHHmmss');

    const querystring = require('qs');
    const returnUrlParams = querystring.stringify(
        { danhSachVe, taiKhoanNguoiDung, maLichChieu },
        { encode: false }
    );

    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = 'vn';
    vnp_Params['vnp_CurrCode'] = 'VND';
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl + maLichChieu + '?' + returnUrlParams;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;

    console.log('Amount:', amount);
    console.log('Ma Lich Chieu:', maLichChieu);
    console.log('Tai Khoan: ', taiKhoanNguoiDung);
    console.log('Danh sach ve: ', danhSachVe);

    vnp_Params = sortObject(vnp_Params);

    const signData = querystring.stringify(vnp_Params, { encode: false });
    const crypto = require('crypto');
    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

    console.log(vnpUrl);
    res.send(vnpUrl);
};

module.exports = { createPaymentUrl };
