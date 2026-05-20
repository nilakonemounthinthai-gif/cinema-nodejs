import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getTheaters } from "../../reducers/actions/Theater";
import { localLogoBySystem, allCumRapImg } from "../../constants/theaterData";
import LstNgayChieu from "../Homepage/Theaters/LstPhim/LstNgayChieu";
import formatDate from "../../utilities/formatDate";
import { getImageUrl } from "../../utilities/imageUrl";
import "./style.css";

// Lấy ngày hôm nay dạng YYYY-MM-DD
const getTodayStr = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

// Tạo mảng 7 ngày cố định bắt đầu từ hôm nay
const SEVEN_DAYS = (() => {
    const days = [];
    for (let i = 0; i < 7; i++) {
        const d = new Date();
        d.setDate(d.getDate() + i);
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        days.push(`${yyyy}-${mm}-${dd}`);
    }
    return days;
})();

export default function CumRap() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { theaterList, loadingTheaterList, errorTheaterList } = useSelector(
        (state) => state.theaterReducer
    );
    const [activeSystem, setActiveSystem] = useState(0);
    const [activeCumRap, setActiveCumRap] = useState(null);
    // Mặc định là hôm nay, không reset khi đổi rạp/hệ thống
    const [selectedDate, setSelectedDate] = useState(getTodayStr);

    useEffect(() => {
        if (!theaterList.length) {
            dispatch(getTheaters());
        }
    }, []);

    // Reset cụm rạp được chọn khi đổi hệ thống rạp (không reset selectedDate)
    useEffect(() => {
        setActiveCumRap(null);
    }, [activeSystem]);

    if (loadingTheaterList) {
        return (
            <div className="cr-page">
                <div className="cr-loading">Đang tải dữ liệu...</div>
            </div>
        );
    }
    if (errorTheaterList) {
        return (
            <div className="cr-page">
                <div className="cr-loading" style={{ color: "#fa5238" }}>
                    Lỗi: {errorTheaterList}
                </div>
            </div>
        );
    }

    const currentSystem = theaterList[activeSystem];
    const lstCumRap = currentSystem?.lstCumRap || [];
    const selectedCumRap =
        activeCumRap !== null ? lstCumRap[activeCumRap] : null;

    // Lọc phim theo ngày đang chọn, chỉ giữ phim có ít nhất 1 suất chiếu
    const filteredPhimList = selectedCumRap
        ? (selectedCumRap.danhSachPhim || [])
              .map((phim) => ({
                  ...phim,
                  lstLichChieuTheoPhim: (phim.lstLichChieuTheoPhim || []).filter(
                      (item) => item.ngayChieuGioChieu.slice(0, 10) === selectedDate
                  ),
              }))
              .filter((phim) => phim.lstLichChieuTheoPhim.length > 0)
        : [];

    return (
        <div className="cr-page">
            {/* HEADER */}
            <div className="cr-header">
                <button className="cr-back" onClick={() => history.push("/")}>
                    ← Trang chủ
                </button>
                <h1 className="cr-title">Hệ thống rạp chiếu phim</h1>
            </div>

            {/* THEATER SYSTEM TABS */}
            <div className="cr-system-tabs">
                {theaterList.map((sys, idx) => (
                    <button
                        key={sys.maHeThongRap}
                        className={`cr-system-btn ${activeSystem === idx ? "cr-system-btn--active" : ""}`}
                        onClick={() => setActiveSystem(idx)}
                    >
                        <img
                            src={localLogoBySystem[sys.maHeThongRap] || sys.logo}
                            alt={sys.tenHeThongRap}
                            className="cr-system-logo"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/img/logo-theater/cgv.png";
                            }}
                        />
                        <span className="cr-system-name">{sys.tenHeThongRap}</span>
                    </button>
                ))}
            </div>

            {/* MAIN CONTENT: 2 columns on desktop, stacked on mobile */}
            <div className="cr-body">
                {/* LEFT: Danh sách cụm rạp */}
                <div className="cr-left">
                    <h2 className="cr-section-title">Cụm rạp — {currentSystem?.tenHeThongRap}</h2>
                    <div className="cr-cumrap-list">
                        {lstCumRap.map((cumRap, idx) => (
                            <div
                                key={cumRap.maCumRap}
                                className={`cr-cumrap-card ${activeCumRap === idx ? "cr-cumrap-card--active" : ""}`}
                                onClick={() => setActiveCumRap(idx)}
                            >
                                <div className="cr-cumrap-img-wrap">
                                    <img
                                        src={allCumRapImg[idx % allCumRapImg.length]}
                                        alt={cumRap.tenCumRap}
                                        className="cr-cumrap-img"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src =
                                                "/img/cumRap/lotte-cinema-cong-hoa-15383860949090.jpg";
                                        }}
                                    />
                                </div>
                                <div className="cr-cumrap-info">
                                    <p className="cr-cumrap-name">{cumRap.tenCumRap}</p>
                                    <p className="cr-cumrap-addr">{cumRap.diaChi}</p>
                                    <span className="cr-cumrap-count">
                                        {cumRap.danhSachPhim?.length || 0} phim đang chiếu
                                    </span>
                                </div>
                                <span className="cr-cumrap-arrow">›</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT: Danh sách phim của cụm rạp được chọn */}
                <div className="cr-right">
                    {selectedCumRap ? (
                        <>
                            <h2 className="cr-section-title">{selectedCumRap.tenCumRap}</h2>
                            <p className="cr-right-addr">{selectedCumRap.diaChi}</p>

                            {/* DATE SELECTOR BAR — 7 ngày cố định từ hôm nay */}
                            <div className="cr-date-bar">
                                {SEVEN_DAYS.map((date) => {
                                    const fmt = formatDate(date);
                                    const parts = date.split("-");
                                    const displayDate = `${parts[2]}/${parts[1]}`;
                                    return (
                                        <button
                                            key={date}
                                            className={`cr-date-tab${selectedDate === date ? " cr-date-tab--active" : ""}`}
                                            onClick={() => setSelectedDate(date)}
                                        >
                                            <span className="cr-date-tab__day">{fmt.dayToday}</span>
                                            <span className="cr-date-tab__date">{displayDate}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* MOVIE LIST — đã lọc theo selectedDate */}
                            <div className="cr-phim-list">
                                {filteredPhimList.length === 0 ? (
                                    <div className="cr-no-showtime">
                                        <div className="cr-no-showtime__icon">🎭</div>
                                        <p className="cr-no-showtime__text">
                                            Không có suất chiếu trong ngày này
                                        </p>
                                        <p className="cr-no-showtime__sub">Vui lòng chọn ngày khác</p>
                                    </div>
                                ) : (
                                    filteredPhimList.map((phim) => (
                                        <div
                                            key={phim.maPhim}
                                            className="cr-phim-card"
                                            onClick={() => history.push(`/detail/${phim.maPhim}`)}
                                        >
                                            <img
                                                src={getImageUrl(phim.hinhAnh)}
                                                alt={phim.tenPhim}
                                                className="cr-phim-img"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = "/img/unknowUser.png";
                                                }}
                                            />
                                            <div className="cr-phim-info">
                                                <p className="cr-phim-name">{phim.tenPhim}</p>
                                                <div
                                                    className="cr-phim-schedule"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <LstNgayChieu
                                                        lstLichChieuTheoPhim={phim.lstLichChieuTheoPhim}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="cr-placeholder">
                            <div className="cr-placeholder-icon">🎬</div>
                            <p>Chọn một cụm rạp để xem lịch chiếu</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
