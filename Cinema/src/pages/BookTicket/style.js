import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  bookTicked: {
    display: 'flex',
    paddingTop: '80px',
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
  left: {
    flex: "75%",
    [theme.breakpoints.down("md")]: {
      flex: "100%",
      width: "100%",
    },
  },
  right: {
    flex: "25%",
    [theme.breakpoints.down("md")]: {
      flex: "100%",
      width: "100%",
    },
  },

}))
export default useStyles