import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
  text__first: props => ({
    color: props.color ? `${props.color}` : '#e9e9e9',
    fontWeight: "500",
    fontSize: props.testSize ? props.testSize : 14,
  }),
  text__second: {
    color: "#aaa",
    fontWeight: "500",
  },
});
export default useStyles