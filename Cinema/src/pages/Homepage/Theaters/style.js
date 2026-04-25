import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  theater: {
    display: (props) => (props.isMobileTheater ? "block" : "flex"),
    width: "100%",          // 👈 thêm dòng này (quan trọng)
    maxWidth: "100%",
    maxHeight: 705,
    margin: 0,              // 👈 bỏ auto
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 8,
    backgroundColor: "#12121d",
    padding: "0 40px",      // 👈 thêm cho đẹp (không dính mép)
  },
  taps: {
    borderBottom: "none",
    minWidth: 92,
    backgroundColor: "#0d0d14",
    borderRight: "1px solid rgba(255,255,255,0.07)",
  },
  cumRap: {
    minWidth: "calc(100% - 92px)",
    backgroundColor: "#12121d",
  },
  tabs__indicator: {
    backgroundColor: "transparent",
  },
  tap: (props) => ({
    padding: 20,
    minWidth: 92,
    margin: "auto",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  }),
  textColorInherit: {
    opacity: 0.35,
    filter: "brightness(2)",
    "&:hover": {
      transition: "all .2s",
      opacity: 1,
      filter: "brightness(1.5)",
    },
  },
});
export default useStyles;
