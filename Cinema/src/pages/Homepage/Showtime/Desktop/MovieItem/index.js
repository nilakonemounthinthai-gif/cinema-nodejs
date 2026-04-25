import React, { useState } from 'react'

import { Link, useHistory } from 'react-router-dom'

import BtnPlay from '../../../../../components/BtnPlay';
import useStyles from './styles';
import useApiThoiLuongDanhGia from '../../../../../utilities/useApiThoiLuongDanhGia';
import { DEFAULT_IMG } from '../../../../../constants/config';

import './movie.css'

function MovieItem({ movie, comingMovie }) {
  const [imgSrc, setImgSrc] = useState(movie.hinhAnh || DEFAULT_IMG);
  const classes = useStyles({ bg: imgSrc, comingMovie });
  const history = useHistory();
  const { thoiLuong } = useApiThoiLuongDanhGia(movie.maPhim)
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
            <div className="film__overlay" onClick={() => history.push(`/detail/${movie.maPhim}`, { comingMovie })} />
            <div className="play__trailer">
              <BtnPlay cssRoot={"play"} width={48} height={48} urlYoutube={movie.trailer} />
            </div>
          </div>
        </div>
        <div className="film__content">
          <div className={`film__name ${thoiLuong ? "" : "not_hide"}`}>
            <div className="name">
              <p><span className="c18">C18</span>{movie.tenPhim}</p>
            </div>
            <p className="pt-2">
              {thoiLuong ? <span className="text_info">{thoiLuong} phút - {movie.danhGia}</span> : <span className="text_info">{movie.danhGia}</span>}
            </p>
          </div>
          <div className={`film__button`}>
            {(thoiLuong || comingMovie) && <Link style={{ background: comingMovie ? "#60c5ef" : "rgb(238, 130, 59)", }} to={{ pathname: `/datve/${movie.maPhim}`, state: { comingMovie } }}>{comingMovie ? "THÔNG TIN PHIM" : "MUA VÉ"}</Link>}
          </div>
        </div>
      </div>
    </div>
  )

}
export default MovieItem
