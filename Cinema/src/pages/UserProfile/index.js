import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";
import * as yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import "./style.css";
import { FAKE_AVATAR } from "../../constants/config";
import {
    getInfoUser,
    putUserUpdate,
    resetUserList,
} from "../../reducers/actions/UsersManagement";
import { BOOK_TICKET_RESET_SUCCESS } from "../../reducers/constants/BookTicket";
import usersApi from "../../api/usersApi";
import { getImageUrl } from "../../utilities/imageUrl";

const formatShowtime = (val) => {
    if (!val) return '';
    const d = new Date(val);
    if (isNaN(d.getTime())) return String(val);
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const mo = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${hh}:${mm} - ${dd}/${mo}/${yyyy}`;
};

const loaiGheLabel = (lg) => {
    if (!lg) return '';
    if (lg === 'Vip' || lg === 'VIP') return 'VIP';
    return 'Thường';
};

const useStyles = makeStyles((theme) => ({
    appBar: {
        backgroundColor: "transparent",
        color: "black",
        boxShadow: "none",
        "& .MuiTabs-indicator": {
            height: 0,
        },
    },
    field: {
        maxWidth: 500,
        paddingRight: 16,
        paddingLeft: 16,
    },
    password: {
        position: "relative",
    },
    eye: {
        position: "absolute",
        top: 31,
        right: 9,
        cursor: "pointer",
    },
    tabButton: {
        opacity: 1,
        color: "#000",
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        "& > span": {
            transition: "all 0.2s",
            "&:hover": {
                fontSize: "15px",
            },
        },
    },

    tabSelected: {
        color: "#fa5238",
    },
    td: {
        "& td": {
            whiteSpace: "nowrap",
        },
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

function TabPanel(props) {
    const { children, value, index, isDesktop, ...other } = props;
    return (
        <div hidden={value !== index} {...other}>
            {value === index && (
                <Box style={{ padding: isDesktop ? "24px" : "24px 0px 0px" }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

export default function Index() {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
    const classes = useStyles();
    const dispatch = useDispatch();
    const { successInfoUser } = useSelector(
        (state) => state.usersManagementReducer
    );
    const { currentUser } = useSelector((state) => state.authReducer);
    const { bookingSuccess } = useSelector((state) => state.BookTicketReducer);
    console.log("User", currentUser?.soDt)
    const { commentList } = useSelector((state) => state.movieDetailReducer);
    const [dataShort, setDataShort] = useState({
        ticket: 0,
        posts: 0,
        likePosts: 0,
        total: 0,
    });
    const [dataVeDaDat, setDataVeDaDat] = useState([]);
    const { successUpdateUser, errorUpdateUser, loadingUpdateUser } = useSelector(
        (state) => state.usersManagementReducer
    );
    const [typePassword, setTypePassword] = useState("password");
    useEffect(() => {
        dispatch(getInfoUser({ taiKhoan: currentUser?.taiKhoan }));

        usersApi.getDanhSachVeDaDat(currentUser?.taiKhoan).then((result) => {
            setDataVeDaDat(result.data);
            console.log("VE", result.data);
        });

        return () => dispatch(resetUserList());
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Refetch tickets when bookingSuccess becomes true
    useEffect(() => {
        if (bookingSuccess) {
            usersApi.getDanhSachVeDaDat(currentUser?.taiKhoan).then((result) => {
                setDataVeDaDat(result.data);
                console.log("VE updated after booking", result.data);
            });
            // Reset bookingSuccess flag
            dispatch({ type: BOOK_TICKET_RESET_SUCCESS });
        }
    }, [bookingSuccess, currentUser?.taiKhoan, dispatch]);
    
    useEffect(() => {
        if (commentList) {
            const { posts, likePosts } = commentList.reduce(
                (obj, post) => {
                    let posts = obj.posts;
                    let likePosts = obj.likePosts;
                    if (post.avtId === currentUser.taiKhoan) {
                        posts++;
                        likePosts += post.userLikeThisComment.length;
                    }
                    return { ...obj, posts, likePosts };
                },
                { posts: 0, likePosts: 0 }
            );
            setDataShort((data) => ({ ...data, posts, likePosts }));
        }
        if (successInfoUser) {
            // const ticket = successInfoUser.thongTinDatVe.length;
            // const total = successInfoUser.thongTinDatVe.reduce((total, ticket) => {
            //   return total + ticket.danhSachGhe.length * ticket.giaVe;
            // }, 0);
            // setdataShort((data) => ({ ...data, ticket, total }));
        }
    }, [commentList, successInfoUser]); // eslint-disable-line react-hooks/exhaustive-deps
    
    useEffect(() => {
        if (successUpdateUser) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Cập nhật thành công",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    }, [successUpdateUser]);

    const phoneRegExp =
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    const updateUserSchema = yup.object().shape({
        taiKhoan: yup.string().required("*Tài khoản không được bỏ trống !"),
        // FIX F4: password is optional – only validate when user actually enters something
        matKhau: yup
            .string()
            .required("*Email không được bỏ trống !")
            .email("* Email không hợp lệ "),
        soDt: yup
            .string()
            .required("*Số điện thoại không được bỏ trống !")
            .matches(phoneRegExp, "Số điện thoại không hợp lệ!"),
        hoTen: yup.string().required("*Tên không được bỏ trống !"),
    });

    const handleSubmit = (user) => {
        if (loadingUpdateUser) {
            return;
        }
        // FIX F4: If the user left the password field blank, remove it so the
        // backend branch that does NOT re-hash runs (preserving the existing password).
        const payload = { ...user };
        if (!payload.matKhau || payload.matKhau.trim() === "") {
            delete payload.matKhau;
        }
        dispatch(putUserUpdate(payload));
    };
    const handleToggleHidePassword = () => {
        if (typePassword === "password") {
            setTypePassword("text");
        } else {
            setTypePassword("password");
        }
    };
    const [selectedTicket, setSelectedTicket] = useState(null);

    const handleDeleteTicket = (maGhe, taiKhoanNguoiDat) => {
        console.log("delete")
        usersApi.deleteTicketOfUser({ maGhe: maGhe, taiKhoanNguoiDat: taiKhoanNguoiDat })
            .then(() => usersApi.getDanhSachVeDaDat(currentUser?.taiKhoan)
                .then(r => setDataVeDaDat(r.data)));
    }
    return (
        <div className="container rounded mb-5">
            <div className="row bg-white ">
                <div className="col-md-3 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                        <img
                            src={FAKE_AVATAR}
                            className={`avatar rounded-circle img-thumbnail ${isDesktop ? "w-100" : "w-50"
                                }`}
                            alt="avatar"
                        />
                        <h1 className="my-2">{successInfoUser?.taiKhoan}</h1>
                    </div>
                </div>
                <div className="col-md-5 border-right">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right">Profile Settings</h4>
                        </div>
                        <Formik
                            initialValues={{
                                taiKhoan: successInfoUser?.taiKhoan ?? "",
                                // FIX F4: Don't pre-fill the md5 hash. Leave blank so user
                                // only sets a new password if they type one.
                                matKhau: "",
                                email: successInfoUser?.email ?? "",
                                soDt: successInfoUser?.soDt ?? "",
                                maNhom: "GP09",
                                maLoaiNguoiDung: "KhachHang",
                                hoTen: successInfoUser?.hoTen ?? "",
                            }}
                            enableReinitialize // cho phép cập nhật giá trị initialValues
                            validationSchema={updateUserSchema}
                            onSubmit={handleSubmit}
                        >
                            {(props) => (
                                <Form className={`${classes.field}`}>
                                    <div className="form-group">
                                        <label>Tài khoản&nbsp;</label>
                                        <ErrorMessage
                                            name="taiKhoan"
                                            render={(msg) => (
                                                <span className="text-danger">{msg}</span>
                                            )}
                                        />
                                        <Field
                                            disabled
                                            name="taiKhoan"
                                            type="text"
                                            className="form-control"
                                            onChange={props.handleChange}
                                        />
                                    </div>
                                    <div className={`form-group ${classes.password}`}>
                                        <label>Mật khẩu&nbsp;</label>
                                        <ErrorMessage
                                            name="matKhau"
                                            render={(msg) => (
                                                <span className="text-danger">{msg}</span>
                                            )}
                                        />
                                        <Field
                                            name="matKhau"
                                            type={typePassword}
                                            className="form-control"
                                            onChange={props.handleChange}
                                        />
                                        <div
                                            className={classes.eye}
                                            onClick={handleToggleHidePassword}
                                        >
                                            {typePassword !== "password" ? (
                                                <i className="fa fa-eye-slash"></i>
                                            ) : (
                                                <i className="fa fa-eye"></i>
                                            )}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Họ và tên&nbsp;</label>
                                        <ErrorMessage
                                            name="hoTen"
                                            render={(msg) => (
                                                <span className="text-danger">{msg}</span>
                                            )}
                                        />
                                        <Field
                                            name="hoTen"
                                            type="text"
                                            className="form-control"
                                            onChange={props.handleChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Email&nbsp;</label>
                                        <ErrorMessage
                                            name="email"
                                            render={(msg) => (
                                                <span className="text-danger">{msg}</span>
                                            )}
                                        />
                                        <Field
                                            name="email"
                                            type="email"
                                            className="form-control"
                                            onChange={props.handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Số điện thoại&nbsp;</label>
                                        <ErrorMessage
                                            name="soDt"
                                            render={(msg) => (
                                                <span className="text-danger">{msg}</span>
                                            )}
                                        />
                                        <Field
                                            name="soDt"
                                            type="text"
                                            className="form-control"
                                            onChange={props.handleChange}
                                        />
                                    </div>
                                    <div className="text-left">
                                        <button
                                            type="submit"
                                            className="btn btn-success"
                                            disabled={loadingUpdateUser}
                                        >
                                            Cập nhật
                                        </button>
                                        {errorUpdateUser && (
                                            <div className="alert alert-danger">
                                                <span>{errorUpdateUser}</span>
                                            </div>
                                        )}
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
                <div style={{ marginTop: "40px" }} className="col-md-4">
                    <ul className="list-group">
                        {" "}
                        <li className="list-group-item text-muted">Hoạt động</li>{" "}
                        <li className="list-group-item text-right">
                            {" "}
                            <span className="float-left">
                                {" "}
                                <strong>Bình luận</strong>{" "}
                            </span>{" "}
                            {dataShort.posts}{" "}
                        </li>{" "}
                        <li className="list-group-item text-right">
                            {" "}
                            <span className="float-left">
                                {" "}
                                <strong>Bình luận được thích </strong>{" "}
                            </span>{" "}
                            {dataShort.likePosts}{" "}
                        </li>{" "}
                        <li className="list-group-item text-right">
                            <span className="float-left">
                                <strong>Số lần thanh toán</strong>
                            </span>
                            {dataShort.ticket}
                        </li>
                        <li className="list-group-item text-right">
                            <span className="float-left">
                                <strong>Tổng tiền $</strong>
                            </span>
                            {dataShort.total}
                        </li>
                    </ul>
                </div>
                <div className="col-md-12" style={{ marginTop: 24 }}>
                    <h5 style={{ marginBottom: 16, fontWeight: 700 }}>Lịch sử đặt vé</h5>

                    {/* Empty state */}
                    {dataVeDaDat.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '40px 0', color: '#888' }}>
                            <p style={{ fontSize: 18, marginBottom: 12 }}>Bạn chưa có vé nào. Hãy đặt vé ngay!</p>
                            <a href="/" className="btn btn-danger">Về trang chủ</a>
                        </div>
                    )}

                    {/* Ticket cards */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                        {dataVeDaDat.map((item) => (
                            <div
                                key={item.maGhe}
                                onClick={() => setSelectedTicket(item)}
                                style={{
                                    cursor: 'pointer',
                                    display: 'flex',
                                    background: '#1a1a2e',
                                    color: '#fff',
                                    borderRadius: 12,
                                    overflow: 'hidden',
                                    width: 'calc(50% - 8px)',
                                    minWidth: 300,
                                    boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
                                    transition: 'transform 0.15s',
                                }}
                                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                <img
                                    src={getImageUrl(item.hinhAnh)}
                                    alt={item.tenPhim}
                                    style={{ width: 90, objectFit: 'cover', flexShrink: 0 }}
                                    onError={e => { e.target.style.display = 'none'; }}
                                />
                                <div style={{ padding: '12px 14px', flex: 1, overflow: 'hidden' }}>
                                    <p style={{ fontWeight: 700, fontSize: 15, margin: '0 0 4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {item.tenPhim}
                                    </p>
                                    <p style={{ fontSize: 12, color: '#aaa', margin: '0 0 2px' }}>{item.tenCumRap}</p>
                                    <p style={{ fontSize: 12, color: '#aaa', margin: '0 0 6px' }}>{item.tenRap}</p>
                                    <p style={{ fontSize: 12, margin: '0 0 4px' }}>🕐 {formatShowtime(item.gioChieu)}</p>
                                    <p style={{ fontSize: 12, margin: '0 0 4px' }}>
                                        💺 <strong>{item.tenDayDu}</strong>
                                        <span style={{ marginLeft: 6, color: item.loaiGhe === 'Vip' ? '#f7b500' : '#aaa', fontSize: 11 }}>
                                            ({loaiGheLabel(item.loaiGhe)})
                                        </span>
                                    </p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
                                        <span style={{ fontWeight: 700, color: '#e8572a' }}>{Number(item.giaVe).toLocaleString('vi-VN')} đ</span>
                                        <span style={{
                                            fontSize: 11,
                                            padding: '2px 8px',
                                            borderRadius: 20,
                                            background: item.status ? '#22543d' : '#744210',
                                            color: item.status ? '#68d391' : '#f6ad55',
                                        }}>
                                            {item.status ? 'Đã xác nhận' : 'Chờ xác nhận'}
                                        </span>
                                    </div>
                                    {item.maDatVe && (
                                        <p style={{ fontSize: 11, color: '#44c020', marginTop: 4, fontFamily: 'monospace' }}>
                                            {item.maDatVe}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Detail modal */}
                    <Dialog
                        open={!!selectedTicket}
                        onClose={() => setSelectedTicket(null)}
                        maxWidth="sm"
                        fullWidth
                        PaperProps={{ style: { background: '#1a1a2e', color: '#fff', borderRadius: 16 } }}
                    >
                        {selectedTicket && (
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {/* Header with poster */}
                                <div style={{ display: 'flex', gap: 16, padding: '20px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                    <img
                                        src={getImageUrl(selectedTicket.hinhAnh)}
                                        alt={selectedTicket.tenPhim}
                                        style={{ width: 110, borderRadius: 8, objectFit: 'cover' }}
                                        onError={e => { e.target.style.display = 'none'; }}
                                    />
                                    <div>
                                        <h5 style={{ fontWeight: 700, margin: '0 0 6px' }}>{selectedTicket.tenPhim}</h5>
                                        <p style={{ color: '#aaa', fontSize: 13, margin: '0 0 3px' }}>{selectedTicket.tenCumRap}</p>
                                        <p style={{ color: '#aaa', fontSize: 13, margin: '0 0 3px' }}>{selectedTicket.tenRap}</p>
                                        <p style={{ color: '#888', fontSize: 12, margin: 0 }}>{selectedTicket.diaChi}</p>
                                    </div>
                                </div>

                                {/* Detail body */}
                                <div style={{ padding: '16px 20px' }}>
                                    <table style={{ width: '100%', fontSize: 14, borderCollapse: 'collapse' }}>
                                        <tbody>
                                            <tr><td style={{ color: '#aaa', padding: '5px 0', width: 130 }}>Suất chiếu:</td><td>{formatShowtime(selectedTicket.gioChieu)}</td></tr>
                                            <tr><td style={{ color: '#aaa', padding: '5px 0' }}>Ghế:</td><td><strong>{selectedTicket.tenDayDu}</strong> ({loaiGheLabel(selectedTicket.loaiGhe)})</td></tr>
                                            <tr><td style={{ color: '#aaa', padding: '5px 0' }}>Giá vé:</td><td style={{ fontWeight: 700, color: '#e8572a' }}>{Number(selectedTicket.giaVe).toLocaleString('vi-VN')} đ</td></tr>
                                            <tr><td style={{ color: '#aaa', padding: '5px 0' }}>Trạng thái:</td><td>
                                                <span style={{ color: selectedTicket.status ? '#68d391' : '#f6ad55', fontWeight: 600 }}>
                                                    {selectedTicket.status ? 'Đã xác nhận' : 'Chờ xác nhận'}
                                                </span>
                                            </td></tr>
                                        </tbody>
                                    </table>

                                    {/* Booking code block */}
                                    {selectedTicket.maDatVe && (
                                        <div style={{ marginTop: 16, padding: 14, background: 'rgba(255,255,255,0.05)', borderRadius: 10, textAlign: 'center' }}>
                                            <p style={{ color: '#aaa', fontSize: 12, margin: '0 0 6px' }}>Mã đặt vé</p>
                                            <p style={{ color: '#44c020', fontSize: 24, fontWeight: 700, letterSpacing: 3, fontFamily: 'monospace', margin: '0 0 8px' }}>
                                                {selectedTicket.maDatVe}
                                            </p>
                                            {!selectedTicket.status && (
                                                <p style={{ color: '#f7b500', fontSize: 13, margin: 0 }}>
                                                    Xuất trình mã này tại quầy để nhận vé
                                                </p>
                                            )}
                                            {selectedTicket.status && (
                                                <p style={{ color: '#68d391', fontSize: 13, margin: 0 }}>
                                                    ✓ Vé đã được xác nhận
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Footer */}
                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, padding: '0 20px 20px' }}>
                                    {!selectedTicket.status && (
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteTicket(selectedTicket.maGhe, selectedTicket.taiKhoanNguoiDat);
                                                setSelectedTicket(null);
                                            }}
                                        >
                                            Hủy vé
                                        </button>
                                    )}
                                    <button className="btn btn-secondary btn-sm" onClick={() => setSelectedTicket(null)}>Đóng</button>
                                </div>
                            </div>
                        )}
                    </Dialog>
                </div>
            </div>
        </div>
    );
}