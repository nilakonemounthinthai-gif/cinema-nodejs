import React, { useState } from "react";

import { useParams } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useLocation } from "react-router-dom";
import "./style.css"
import useStyles from "./style";
import formatDate from "../../../utilities/formatDate";
import useApiThoiLuongDanhGia from "../../../utilities/useApiThoiLuongDanhGia";
import Tap from "../Tap";
import { useDispatch } from 'react-redux';
import { OPEN_MODAL } from '../../../reducers/constants/ModalTrailer';
import { getImageUrl } from '../../../utilities/imageUrl';
const play = '/img/carousel/play-video.png';
export default function Desktop({ movieDetailShowtimes: data, isMobile }) {
  const [onClickBtnMuave, setOnClickBtnMuave] = useState(0);
  const param = useParams();
  const [quantityComment, setQuantityComment] = useState(0);
  const { thoiLuong, danhGia } = useApiThoiLuongDanhGia(param.maPhim);
  const resolvedImg = getImageUrl(data?.hinhAnh);
  const classes = useStyles({ bannerImg: resolvedImg });
  const [imagePage404, setImagePage404] = useState(false);
  let location = useLocation();

  const handleBtnMuaVe = () => {
    setOnClickBtnMuave(Date.now());
  };
  const onIncreaseQuantityComment = (value) => {
    setQuantityComment(value);
  };
  const dispatch = useDispatch()

  const openModal = () => {
    dispatch({
      type: OPEN_MODAL, payload: {
        open: true,
        urlYoutube: data.trailer
      }
    })
  };


  console.log(data,"data")
  return (
    <div className={classes.pageWrapper}>
      {/* ── Hero Banner ── */}
      <div className={classes.heroBanner}>
        {/* Blurred poster background */}
        <div className={classes.heroBannerBg} />
        {/* Dark overlay */}
        <div className={classes.heroBannerOverlay} />
        {/* Foreground: poster + info */}
        <div className={classes.heroContent}>
          {/* Poster */}
          <div className={classes.posterWrapper}>
            {imagePage404
              ? <div className={classes.withOutImage} />
              : <img
                  className={classes.posterImg}
                  src={resolvedImg}
                  alt="poster"
                  onError={() => setImagePage404(true)}
                />
            }
          </div>

          {/* Info panel */}
          <div className={classes.infoWrapper}>
            {/* Movie title */}
            <h1 className={classes.movieTitle}>
              <span className={classes.c18}>C18</span>
              {data?.tenPhim}
            </h1>

            {/* Rating + duration */}
            <div className={classes.ratingRow}>
              {danhGia && (
                <>
                  <Rating
                    className={classes.rateStar}
                    value={Number(danhGia) / 2}
                    precision={0.5}
                    size="small"
                    readOnly
                  />
                  <span className={classes.ratingValue}>{danhGia}</span>
                </>
              )}
              {thoiLuong && (
                <span className={classes.duration}>{thoiLuong} phút</span>
              )}
            </div>

            {/* Info rows */}
            <div className={classes.infoRow}>
              <span className={classes.infoLabel}>Khởi chiếu</span>
              <span className={classes.infoValue}>
                {formatDate(data?.ngayKhoiChieu?.slice(0, 10)).YyMmDd}
              </span>
            </div>
            <div className={classes.infoRow}>
              <span className={classes.infoLabel}>Đạo diễn</span>
              <span className={classes.infoValue}>{data?.daoDien}</span>
            </div>
            <div className={classes.infoRow}>
              <span className={classes.infoLabel}>Diễn viên</span>
              <span className={classes.infoValue}>{data?.dienVien}</span>
            </div>
            <div className={classes.infoRow}>
              <span className={classes.infoLabel}>Thể loại</span>
              <span className={classes.infoValue}>{data?.maTheLoaiPhim}</span>
            </div>
            <div className={classes.infoRow}>
              <span className={classes.infoLabel}>Định dạng</span>
              <span className={classes.infoValue}>{data?.dinhDang}</span>
            </div>
            <div className={classes.infoRow}>
              <span className={classes.infoLabel}>Quốc gia SX</span>
              <span className={classes.infoValue}>{data?.nhaSanXuat}</span>
            </div>
            <div className={classes.infoRow}>
              <span className={classes.infoLabel}>Nội dung</span>
              <span className={`${classes.infoValue} ${classes.moTaText}`}>{data?.moTa}</span>
            </div>

            {/* Action buttons */}
            <div className={classes.actionButtons}>
              <button className={classes.btnMuaVe} onClick={handleBtnMuaVe}>
                {location.state?.comingMovie ? "Thông tin phim" : "Mua vé"}
              </button>
              <button className={classes.btnTrailer} onClick={() => openModal()}>
                {location.state?.comingMovie ? "Thông tin phim" : "Xem trailer"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Tap
        data={data}
        onClickBtnMuave={onClickBtnMuave}
        onIncreaseQuantityComment={onIncreaseQuantityComment}
        isMobile={isMobile}
      />
    </div>
  );
}

