import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import { useHistory } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import SearchStickets from "./SearchTickets";
import useStyles from "./styles";
import BtnPlay from "../../../components/BtnPlay";
import { LOADING_BACKTO_HOME_COMPLETED } from "../../../reducers/constants/Lazy";
import { DEFAULT_IMG } from "../../../constants/config";
import { getImageUrl } from "../../../utilities/imageUrl";
import "./carousel.css";

export default function Carousel() {
  // FIX F2: Use local movieList from Redux instead of external unreliable API.
  // We pick the most-recent 8 movies (by ngayKhoiChieu) for the banner.
  const { movieList } = useSelector((state) => state.movieReducer);
  const [listFilmBanner, setListFilmBanner] = useState([]);

  useEffect(() => {
    if (movieList && movieList.length > 0) {
      const sorted = [...movieList]
        .sort((a, b) => new Date(b.ngayKhoiChieu) - new Date(a.ngayKhoiChieu))
        .slice(0, 8);
      setListFilmBanner(sorted);
    }
  }, [movieList]);

  const dispatch = useDispatch();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const history = useHistory();
  const classes = useStyles();
  const settings = {
    dots: true,
    infinite: true,
    autoplaySpeed: 5000,
    autoplay: true,
    speed: 500,
    swipeToSlide: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dotsClass: "slickdotsbanner",
  };

  useEffect(() => {
    dispatch({ type: LOADING_BACKTO_HOME_COMPLETED });
  }, []);

  function NextArrow(props) {
    const { onClick } = props;
    return (
      <ArrowForwardIosRoundedIcon
        style={{ right: "15px" }}
        onClick={onClick}
        className={classes.Arrow}
      />
    );
  }

  function PrevArrow(props) {
    const { onClick } = props;
    return (
      <ArrowBackIosRoundedIcon
        style={{ left: "15px" }}
        onClick={onClick}
        className={classes.Arrow}
      />
    );
  }

  return (
    <div id="carousel" className={classes.carousel}>
      <Slider {...settings}>
        {listFilmBanner.map((banner) => {
          return (
            <div key={banner.maPhim} className={classes.itemSlider}>
              <img
                src={getImageUrl(banner?.hinhAnh)}
                alt="banner"
                className={classes.img}
                onError={(e) => { e.target.onerror = null; e.target.src = DEFAULT_IMG; }}
              />
              <div
                className={classes.backgroundLinear}
                onClick={() => history.push(`/detail/${banner.maPhim}`)}
              />
            </div>
          );
        })}
      </Slider>
      <SearchStickets />
    </div>
  );
}
