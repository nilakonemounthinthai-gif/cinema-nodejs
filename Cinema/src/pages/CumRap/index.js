import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getTheaters } from "../../reducers/actions/Theater";
import { localLogoBySystem, allCumRapImg } from "../../constants/theaterData";
import LstNgayChieu from "../Homepage/Theaters/LstPhim/LstNgayChieu";
import "./style.css";

export default function CumRap() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { theaterList, loadingTheaterList, errorTheaterList } = useSelector(
        (state) => state.theaterReducer
    );
    const [activeSystem, setActiveSystem] = useState(0);
    const [activeCumRap, setActiveCumRap] = useState(null);

    useEffect(() => {
        if (!theaterList.length) {
            dispatch(getTheaters());
        }
    }, []);

    // Reset cụm rạp được chọn khi đổi hệ thống rạp
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
                            <div className="cr-phim-list">
                                {selectedCumRap.danhSachPhim?.length === 0 && (
                                    <p className="cr-empty">Không có phim đang chiếu tại cụm rạp này.</p>
                                )}
                                {selectedCumRap.danhSachPhim?.map((phim) => (
                                    <div
                                        key={phim.maPhim}
                                        className="cr-phim-card"
                                        onClick={() => history.push(`/detail/${phim.maPhim}`)}
                                    >
                                        <img
                                            src={phim.hinhAnh || "/img/unknowUser.png"}
                                            alt={phim.tenPhim}
                                            className="cr-phim-img"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "/img/unknowUser.png";
                                            }}
                                        />
                                        <div className="cr-phim-info">
                                            <p className="cr-phim-name">{phim.tenPhim}</p>
                                            <div className="cr-phim-schedule" onClick={(e) => e.stopPropagation()}>
                                                <LstNgayChieu lstLichChieuTheoPhim={phim.lstLichChieuTheoPhim || []} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
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
