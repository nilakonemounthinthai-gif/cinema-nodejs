import React from 'react'
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import Slider from "react-slick";

import MovieItem from './MovieItem';
import useStyles from './style';

export function NextArrow(props) {
  const classes = useStyles();
  const { onClick } = props;
  return (
    <ArrowForwardIosRoundedIcon style={{ right: "-82px" }} onClick={onClick} className={classes.Arrow} />
  );
}

export function PrevArrow(props) {
  const classes = useStyles();
  const { onClick } = props;
  return (
    <ArrowBackIosRoundedIcon style={{ left: "-82px" }} onClick={onClick} className={classes.Arrow} />
  );
}

export default function Desktop({ arrayData, value }) {
  const classes = useStyles();
  const settings = {
    className: "center",
    centerPadding: "60px",
    slidesToShow: 1,
    speed: 500,
    rows: 2,
    slidesPerRow: 4,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  // Show empty state when "Sắp chiếu" tab is active and list has loaded but is empty
  if (value.value === 1 && arrayData.comingMovieList !== null && arrayData.comingMovieList.length === 0) {
    return (
      <div className={classes.container} style={{ textAlign: 'center', padding: '60px 0', color: '#aaa', fontSize: 18 }}>
        Chưa có phim sắp chiếu
      </div>
    );
  }

  return (
    <div className={classes.container}>
      {/* key={value.value} forces Slider to fully remount when switching tabs.
          Without this, react-slick reuses its internal cloned slides, causing
          stale images from the previous tab to appear in the new tab. */}
      <Slider key={value.value} {...settings}>
        {value.value === 0 ?
          arrayData.dailyMovieList?.map((movie) => {
            return (
              <div className="px-1 align-top" key={movie.maPhim}>
                <MovieItem
                  movie={movie}
                />
              </div>
            )
          }) :
          arrayData.comingMovieList?.map((movie) => {
            return (
              <div className="px-1 align-top" key={movie.maPhim}>
                <MovieItem
                  movie={movie}
                  comingMovie
                />
              </div>
            )
          })
        }
      </Slider>
    </div >
  );
}

