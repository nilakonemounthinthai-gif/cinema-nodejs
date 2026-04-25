import React from 'react'

import useStyles from './style'
import { colorTheater } from '../../constants/theaterData'

export default function TenCumRap({ tenCumRap, testSize }) {

  const classes = useStyles({ color: colorTheater[tenCumRap?.slice(0, 3).toUpperCase()], testSize })
  const parts = tenCumRap?.split("-") || [];

  return (
    <p className={classes.text__first}>
      <span>{parts[0]}</span>
      {parts[1] && <span className={classes.text__second}>-{parts[1]}</span>}
    </p>
  );
}
