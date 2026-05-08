import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'

import useStyles from './style'
import { colorTheater } from '../../../constants/theaterData'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import { getImageUrl } from '../../../utilities/imageUrl'

const formatShowtime = (val) => {
    if (!val) return '';
    const d = new Date(val);
    if (isNaN(d.getTime())) return String(val);
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const mo = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${hh}:${mm} ${dd}/${mo}/${yyyy}`;
};

export default function ResultBookTicket() {
    const location = useLocation();
    const {
        isMobile, amount, email, paymentMethod,
        listSeatSelected, maDatVe,
        successBookTicketTicketMessage, errorBookTicketMessage,
        danhSachPhongVe: { thongTinPhim }
    } = useSelector((state) => state.BookTicketReducer)
    const { currentUser } = useSelector((state) => state.authReducer)
    const classes = useStyles({ thongTinPhim: { ...thongTinPhim, hinhAnh: getImageUrl(thongTinPhim?.hinhAnh) }, color: colorTheater[thongTinPhim?.tenCumRap?.slice(0, 3)?.toUpperCase()], isMobile })
    const [ghe, setGhe] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const vnpAmount = searchParams.get('vnp_Amount');

        // VNPay callback: read seats and amount from URL params
        if (vnpAmount) {
            setTotal(Number(vnpAmount) / 100);
            const danhSachVeFromUrl = [];
            searchParams.forEach((value, key) => {
                if (key.startsWith('danhSachVe')) {
                    const match = key.match(/\[(\d+)\]/);
                    if (match) danhSachVeFromUrl[Number(match[1])] = JSON.parse(value);
                }
            });
            const extractedGhe = danhSachVeFromUrl.map(ve => ve?.tenDayDu).filter(Boolean);
            if (extractedGhe.length > 0) {
                setGhe(extractedGhe);
                return;
            }
        }

        // COUNTER (or fallback): read from Redux state
        setTotal(Number(amount) || 0);
        setGhe(listSeatSelected || []);
    }, [location.search, amount, listSeatSelected]);

    const gioChieuDisplay = formatShowtime(thongTinPhim?.gioChieu);
    const isCounter = paymentMethod === 'COUNTER';
    // Split tenCumRap safely regardless of whether it contains '-'
    const cumRapParts = thongTinPhim?.tenCumRap?.split('-') || [];
    const cumRapFirst = cumRapParts[0] || '';
    const cumRapRest = cumRapParts.length > 1 ? '-' + cumRapParts.slice(1).join('-') : '';

    return (
        <div className={classes.resultBookTicket}>
            {/* Booking code */}
            {successBookTicketTicketMessage && maDatVe && (
                <div style={{ textAlign: 'center', padding: '12px 0 10px', borderBottom: '1px solid rgba(255,255,255,0.15)', marginBottom: 8 }}>
                    <p style={{ color: '#aaa', fontSize: 12, margin: 0 }}>Mã đặt vé</p>
                    <p style={{ color: '#44c020', fontSize: 22, fontWeight: 700, letterSpacing: 3, margin: '4px 0 2px' }}>{maDatVe}</p>
                    {isCounter && (
                        <p style={{ color: '#f7b500', fontSize: 12, margin: 0 }}>Vui lòng xuất trình mã này tại quầy</p>
                    )}
                </div>
            )}
            <div className={classes.infoTicked} >
                <div className={classes.infoTicked__img}>
                </div>
                <div className={classes.infoTicked__txt}>
                    <p className={classes.tenPhim}>
                        {thongTinPhim?.tenPhim}
                    </p>
                    <p className={classes.text__first}>
                        <span>{cumRapFirst}</span>
                        <span className={classes.text__second}>{cumRapRest}</span>
                    </p>
                    <p className={classes.diaChi} >{thongTinPhim?.diaChi}</p>
                    <table className={classes.table}>
                        <tbody>
                            <tr>
                                <td valign='top' >Suất chiếu:</td>
                                <td valign='top'>{gioChieuDisplay}</td>
                            </tr>
                            <tr>
                                <td valign='top'>Phòng:</td>
                                <td>{thongTinPhim?.tenRap}</td>
                            </tr>
                            <tr>
                                <td valign='top'>Ghế:</td>
                                <td>{ghe.join(', ')}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <div>
                    <h3 className={classes.infoResult_label}>Thông tin đặt vé</h3>
                    <table className={`${classes.table} table`}>
                        <tbody>
                            <tr>
                                <td valign='top' >Họ tên:</td>
                                <td>{currentUser?.hoTen}</td>
                            </tr>
                            <tr>
                                <td valign='top'>Điện thoại:</td>
                                <td valign='top'>{currentUser?.soDt}</td>
                            </tr>
                            <tr>
                                <td valign='top'>Email:</td>
                                <td>{email}</td>
                            </tr>
                            <tr>
                                <td valign='top'>Trạng thái:</td>
                                <td>
                                    {successBookTicketTicketMessage && (
                                        <span>
                                            {isCounter
                                                ? 'Đặt vé thành công'
                                                : <span>Thanh toán thành công qua <span className={classes.paymentColor}>VNPay</span></span>
                                            }
                                        </span>
                                    )}
                                    {errorBookTicketMessage && <span>Đặt vé thất bại: <span className={classes.errorColor}>{errorBookTicketMessage}</span></span>}
                                </td>
                            </tr>
                            <tr>
                                <td valign='top' >Tổng tiền:</td>
                                <td valign='top'><span>{`${Number(total).toLocaleString('vi-VN')} đ`}</span></td>
                            </tr>
                        </tbody>
                    </table>
                    {successBookTicketTicketMessage && (
                        <p className={classes.noteresult}>
                            {isCounter
                                ? 'Vui lòng xuất trình mã đặt vé tại quầy !'
                                : 'Kiểm tra lại vé đã mua trong thông tin tài khoản của bạn !'}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}
