import React, { useState, useMemo } from 'react'

import { Link, useHistory } from 'react-router-dom'

import BtnPlay from '../../../../../components/BtnPlay';
import useStyles from './styles';
import useApiThoiLuongDanhGia from '../../../../../utilities/useApiThoiLuongDanhGia';
import { DEFAULT_IMG } from '../../../../../constants/config';
import { getImageUrl } from '../../../../../utilities/imageUrl';

import './movie.css'

function formatNgayKhoiChieu(ngayKhoiChieu) {
  if (!ngayKhoiChieu) return null;
  const d = new Date(ngayKhoiChieu);
  if (isNaN(d.getTime())) return null;
  const dd = String(d.getUTCDate()).padStart(2, '0');
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
  const yyyy = d.getUTCFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

function MovieItem({ movie, comingMovie }) {
  const [imgSrc, setImgSrc] = useState(getImageUrl(movie.hinhAnh));
  const classes = useStyles({ bg: imgSrc, comingMovie });
  const history = useHistory();
  const { thoiLuong } = useApiThoiLuongDanhGia(movie.maPhim)
  const ngayKhoiChieuFormatted = useMemo(
    () => formatNgayKhoiChieu(movie.ngayKhoiChieu),
    [movie.ngayKhoiChieu]
  );

  // Sync imgSrc if the movie prop changes after mount (e.g., data arrives late
  // from Redux or the same component instance is reused with different props).
  React.useEffect(() => {
    setImgSrc(getImageUrl(movie.hinhAnh));
  }, [movie.hinhAnh]);
  return (
    <div style={{
      padding: '15px',
      cursor: 'pointer',
    }} >
      {/* Hidden img used solely to detect broken image URL and trigger fallback */}
      <img
        src={imgSrc}
        style={{ display: 'none' }}
        alt=""
        onError={() => setImgSrc(DEFAULT_IMG)}
      />
      <div className="film">
        <div className="film__img">
          <div className={`film__poster ${classes.addbg}`}>
            {comingMovie && (
              <div className="film__badge film__badge--coming">Sắp chiếu</div>
            )}
            <div className="film__overlay" onClick={() => history.push(`/detail/${movie.maPhim}`, { comingMovie })} />
            <div className="play__trailer">
              <BtnPlay cssRoot={"play"} width={48} height={48} urlYoutube={movie.trailer} />
            </div>
          </div>
        </div>
        <div className="film__content">
          <div className={`film__name ${(thoiLuong || comingMovie) ? "" : "not_hide"}`}>
            <div className="name">
              <p><span className="c18">C18</span>{movie.tenPhim}</p>
            </div>
            <p className="pt-2">
              {thoiLuong ? <span className="text_info">{thoiLuong} phút - {movie.danhGia}</span> : <span className="text_info">{movie.danhGia}</span>}
            </p>
            {comingMovie && ngayKhoiChieuFormatted && (
              <p className="film__release-date">Khởi chiếu: {ngayKhoiChieuFormatted}</p>
            )}
          </div>
          <div className={`film__button`}>
            {comingMovie ? (
              movie.trailer
                ? <a
                    href={movie.trailer}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ background: "#00b4d8" }}
                    className="film__button-link"
                  >XEM TRAILER</a>
                : <Link
                    style={{ background: "#60c5ef" }}
                    to={{ pathname: `/detail/${movie.maPhim}`, state: { comingMovie } }}
                  >THÔNG TIN PHIM</Link>
            ) : (
              thoiLuong && <Link style={{ background: "rgb(238, 130, 59)" }} to={{ pathname: `/detail/${movie.maPhim}` }}>MUA VÉ</Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )

}
export default MovieItem
