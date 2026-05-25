import React from 'react'
import { useHistory } from "react-router-dom";
import useStyles from './styles'

export default function BtnGoToCheckout({ lichChieuTheoPhim }) {
  const classes = useStyles()
  const history = useHistory()

  const calculateTimeout = (ngayChieuGioChieu, thoiLuong) => {
    const duration = thoiLuong || 120;
    const [h, m] = ngayChieuGioChieu.slice(11, 16).split(':').map(Number);
    const totalMins = h * 60 + m + duration;
    const outH = String(Math.floor(totalMins / 60) % 24).padStart(2, '0');
    const outM = String(totalMins % 60).padStart(2, '0');
    return `${outH}:${outM}`;
  }

  return (
    <button className={classes.button} onClick={() => history.push(`/datve/${lichChieuTheoPhim.maLichChieu}`, `/datve/${lichChieuTheoPhim.maLichChieu}`)}>
      <span className={classes.inTime}>{lichChieuTheoPhim.ngayChieuGioChieu.slice(11, 16)}</span>
      <span className={classes.outTime}>{` ~ ${calculateTimeout(lichChieuTheoPhim.ngayChieuGioChieu, lichChieuTheoPhim.thoiLuong)}`}</span>
    </button>
  )
}
