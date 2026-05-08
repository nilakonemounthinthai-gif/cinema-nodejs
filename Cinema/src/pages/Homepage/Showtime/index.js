import React, { useState, useRef, useEffect } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useSelector } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import Desktop from './Desktop';
import useStyles from './style';
// Date ranges are computed dynamically inside the component to avoid stale
// module-level constants that were evaluated only once at app load time.
const filterByDay = (movieList, tuNgay, denNgay) => {
  return movieList.filter(item => {
    if (!item.ngayKhoiChieu) return false;
    // Compare date-only strings (YYYY-MM-DD) so the time component in the stored
    // datetime value never causes a movie to fall outside the expected range.
    const d = new Date(item.ngayKhoiChieu);
    if (isNaN(d.getTime())) return false;
    const dateItem = d.toISOString().slice(0, 10);
    return tuNgay <= dateItem && dateItem <= denNgay;
  })
}

export function SampleNextArrow(props) {
  const classes = useStyles();
  const { onClick } = props;
  return (
    <ArrowForwardIosRoundedIcon style={{ right: "-82px" }} onClick={onClick} className={classes.Arrow} />
  );
}
export function SamplePrevArrow(props) {
  const classes = useStyles();
  const { onClick } = props;
  return (
    <ArrowBackIosRoundedIcon style={{ left: "-82px" }} onClick={onClick} className={classes.Arrow} />
  );
}

export default function SimpleTabs() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const [value, setValue] = useState({ value: 0, fade: true, notDelay: 0 });
  const { errorMovieList, movieList } = useSelector((state) => state.movieReducer);
  const timeout = useRef(null)
  const [arrayData, setarrayData] = useState({ dailyMovieList: null, comingMovieList: null })
  const classes = useStyles({ fade: value.fade, value: value.value, notDelay: value.notDelay });
  useEffect(() => {
    return () => {
      clearTimeout(timeout.current)
    }
  }, [])

  useEffect(() => {
    // Compute date boundaries dynamically every time movieList changes.
    // "Đang chiếu": released from 2024-01-01 up to and including today.
    // "Sắp chiếu": release date is strictly AFTER today (no overlap).
    const todayDate = new Date();
    const today = todayDate.toISOString().slice(0, 10);
    // Compute tomorrow so comingMovieList starts strictly after today,
    // preventing a movie released exactly today from appearing in both tabs.
    const tomorrowDate = new Date(todayDate);
    tomorrowDate.setUTCDate(tomorrowDate.getUTCDate() + 1);
    const tomorrow = tomorrowDate.toISOString().slice(0, 10);
    let dailyMovieList = filterByDay(movieList, '2024-01-01', today)
    dailyMovieList = dailyMovieList?.slice(dailyMovieList.length - 16)
    let comingMovieList = filterByDay(movieList, tomorrow, '2030-12-31')
    comingMovieList = comingMovieList?.slice(comingMovieList.length - 16)
    setarrayData({ dailyMovieList, comingMovieList })
  }, [movieList])

  const handleChange = (e, newValue) => {
    setValue(value => ({ ...value, notDelay: newValue, fade: false }));
    timeout.current = setTimeout(() => {
      setValue(value => ({ ...value, value: newValue, fade: true }))
    }, 100);
  };

  if (errorMovieList) {
    return <div>{errorMovieList}</div>
  }

  return (
    <div
      style={{ paddingTop: "80px" }}
      id="lichchieu"
    >
      <div className="tab-bar">

      <AppBar className={classes.appBar} position="static">
        <Tabs classes={{ root: classes.tabBar, indicator: classes.indicator }} value={value.value} onChange={handleChange}>
          <Tab disableRipple className={`${classes.tabButton} ${classes.tabDangChieu}`} label="Đang chiếu" />
          <Tab disableRipple className={`${classes.tabButton} ${classes.tabSapChieu}`} label="Sắp chiếu" />
        </Tabs>
      </AppBar>
      </div>
      <div className={classes.listMovie}>
        <Desktop arrayData={arrayData} value={value} />
      </div>
    </div >

  );
}

