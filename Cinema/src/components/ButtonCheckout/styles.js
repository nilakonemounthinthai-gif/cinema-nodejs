import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
  button: {
    fontWeight: 400,
    padding: "5px 8px",
    transition: "all .2s",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: "7px",
    color: "#aaa",
    border: "1px solid rgba(255,255,255,0.12)",
    cursor: "pointer",
    '&:hover': {
      backgroundColor: "rgba(250,82,56,0.15)",
      borderColor: "rgba(250,82,56,0.6)",
      color: "#fff",
    },
    '&:hover $inTime': {
      color: "#fa5238",
    },
    fontSize: 13,
  },
  inTime: {
    fontSize: 13,
    fontWeight: 600,
    color: "#4ade80",
  },
});
export default useStyles