import { makeStyles } from "@material-ui/core"
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';

const useStyles = makeStyles((theme) => ({
  rootCumRap: {
    overflow: "auto",
    maxHeight: 400,
    direction: "rtl",
    backgroundColor: "#0d0d14",
    '&::-webkit-scrollbar': { width: 5, backgroundColor: 'rgba(255,255,255,0.05)' },
    '&::-webkit-scrollbar-thumb': { background: 'rgba(255,255,255,0.15)', borderRadius: 5 },
  },

  imgTheater: {
    width: 50,
    float: "left",
    display: "inline-block",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 6,
  },
  wrapInfo: {
    paddingLeft: 3
  },

}));

const Accordion = withStyles({
  root: {
    backgroundColor: "#12121d",
    color: "#e0e0e0",
    border: '1px solid rgba(255,255,255,0.07)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "#0d0d14",
    borderBottom: '1px solid rgba(255,255,255,0.07)',
    color: "#e0e0e0",
    marginBottom: -1,
    minHeight: 56,
    '& .MuiSvgIcon-root': {
      color: '#aaa',
    },
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    alignItems: "center",
    gap: 12,
    '& > img': {
      width: 50,
    },
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: 0,
    flexDirection: "column",
    backgroundColor: "#12121d",
  },
}))(MuiAccordionDetails);

export { useStyles, Accordion, AccordionSummary, AccordionDetails }