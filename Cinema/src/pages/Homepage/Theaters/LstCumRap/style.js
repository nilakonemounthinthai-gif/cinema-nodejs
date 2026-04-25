import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
  flexCumRap: {
    display: 'flex',
  },
  lstCumRap: props => ({
    flex: "0 0 40%",
    overflowY: 'auto',
    height: 705,
    overflowX: 'hidden',
    borderLeft: "none",
    borderRight: "1px solid rgba(255,255,255,0.07)",
    borderBottom: 'none',
    backgroundColor: "#0d0d14",
    '&::-webkit-scrollbar': { width: 5, backgroundColor: 'rgba(255,255,255,0.05)' },
    '&::-webkit-scrollbar-thumb': { background: 'rgba(255,255,255,0.15)', borderRadius: 5 },
  }),

  cumRap: () => ({
    display: 'flex',
    cursor: "pointer",
    padding: "16px 15px 16px 16px",
    opacity: 0.5,
    transition: "all .2s",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    '&:hover': {
      opacity: [[1], '!important'],
      backgroundColor: 'rgba(255,255,255,0.04)',
    },
  }),
  cumRap__img: {
    width: 50, height: 50,
    borderRadius: 6,
    objectFit: 'cover',
  },
  cumRap__info: {
    paddingLeft: 10,
    width: 'calc(100% - 50px)',
  },
  cumRap__address: {
    fontSize: "12px",
    color: "#666",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
});
export default useStyles