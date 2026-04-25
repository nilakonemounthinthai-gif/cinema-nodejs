import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
  lstPhim: () => ({
    flex: "0 0 60%",
    height: "705px",
    overflowY: 'auto',
    backgroundColor: "#12121d",
    '&::-webkit-scrollbar': { width: 5, backgroundColor: 'rgba(255,255,255,0.05)' },
    '&::-webkit-scrollbar-thumb': { background: 'rgba(255,255,255,0.15)', borderRadius: 5 },
  }),
  phim: () => ({
    paddingBottom: "17px",
    paddingTop: "20px",
    paddingRight: "15px",
    paddingLeft: "20px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  }),
  phim__info: {
    display: 'flex',
    borderRadius: 6,
    padding: 4,
    transition: 'all .2s',
    '&:hover': {
      border: '1px solid rgba(250,82,56,0.6)',
      cursor: 'pointer',
      backgroundColor: 'rgba(250,82,56,0.06)',
    }
  },
  phim__img: {
    width: 50,
    height: 50,
    objectFit: "cover",
    borderRadius: 4,
  },
  phim__text: {
    paddingLeft: "15px", paddingTop: "6px",
    width: "calc(100% - 50px)",
  },
  phim__text_name: {
    fontWeight: 500,
    textTransform: "capitalize",
    color: "#e0e0e0",
  },

});
export default useStyles