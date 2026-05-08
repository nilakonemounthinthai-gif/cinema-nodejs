import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { createMuiTheme } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
    return {
        control: {
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
            padding: '12px 0',
            marginBottom: 8,
        },
        addMovie: {
            fontSize: "14px",
            borderRadius: "6px",
            padding: "7px 18px",
            transition: "background-color .2s",
            width: 'auto',
            minWidth: 130,
            backgroundColor: "rgb(238, 130, 59)",
            border: "none",
            color: "#fff",
            fontWeight: '600',
            cursor: 'pointer',
            "&:hover": {
                backgroundColor: "#c0601a",
            },
            "&:disabled": {
                backgroundColor: "#cccccc",
                cursor: "not-allowed",
            },
        },
        itemCtro: {
            paddingRight: 16,
            paddingLeft: 16,
            [theme.breakpoints.up("md")]: {
                paddingRight: 32,
                paddingLeft: 32,
            },
        },
        search: {
            position: "relative",
            borderRadius: 6,
            backgroundColor: '#ffffff',
            border: '1px solid #dfe1e6',
            "&:hover": {
                borderColor: 'rgb(238, 130, 59)',
            },
            minWidth: 220,
            maxWidth: 360,
        },
        searchIcon: {
            padding: theme.spacing(0, 1.5),
            height: "100%",
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: '#6b778c',
            pointerEvents: 'none',
        },
        inputRoot: {
            color: "inherit",
            textOverflow: "ellipsis",
            overflow: "hidden",
            display: "flex",
        },
        inputInput: {
            padding: "8px 8px 8px 0",
            paddingLeft: `calc(1em + ${theme.spacing(3)}px)`,
            width: "100%",
            fontSize: 14,
        },
        button: {
            margin: theme.spacing(1),
            width: 270,
        },

        rootTrailer: {
            cursor: "pointer",
            display: "inline-block",
            width: 50,
            height: 50,
            position: "relative",
            "&:hover > div": {
                opacity: 1,
            },
            "& > div > img": {
                verticalAlign: "top",
            },
        },
        imgTrailer: {
            width: "100%",
            height: "100%",
            borderRadius: 4,
        },

        rootCellExpand: {
            alignItems: "center",
            lineHeight: "24px",
            width: "100%",
            height: "100%",
            position: "relative",
            display: "flex",
            "& .cellValue": {
                width: "100%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
            },
        },
        contentImage: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
        },
        divImage: {
            flex: "50%",
        },
        image: {
            width: "auto",
            maxWidth: 50,
            height: 50,
            borderRadius: 4,
        },
        rootSlider: {
            flex: "50%",
            verticalAlign: "middle",
        },
        formControl: {
            display: "block",
            width: "100%",
            height: "calc(1.5em + .75rem + 2px)",
            padding: ".375rem .75rem",
            fontSize: "1rem",
            fontWeight: 400,
            lineHeight: 1.5,
            color: "#495057",
            backgroundColor: "#fff",
            backgroundClip: "padding-box",
            border: "1px solid #ced4da",
            borderRadius: ".25rem",
            transition: "border-color .15s ease-in-out,box-shadow .15s ease-in-out",
            "& > div": {
                display: "block",
            },
        },
    };
});

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
        backgroundColor: '#001529',
        color: '#ffffff',
    },
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: '#ffffff',
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const materialTheme = createMuiTheme({
    overrides: {
        MuiPickersToolbar: {
            toolbar: {
                backgroundColor: "rgb(238, 130, 59)",
            },
        },
        MuiPickerDTTabs: {
            tabs: {
                backgroundColor: "rgb(238, 130, 59)",
            },
        },
        MuiPickersDay: {
            day: {
                color: "rgb(238, 130, 59)",
            },
            daySelected: {
                backgroundColor: "rgb(238, 130, 59)",
            },
        },
        MuiButton: {
            textPrimary: {
                color: "rgb(238, 130, 59)",
            },
        },
        PrivateTabIndicator: {
            colorSecondary: {
                backgroundColor: "rgb(238, 130, 59)",
            },
        },
        MuiInputBase: {
            input: {
                padding: "3px 0 2px",
            },
        },
        MuiInput: {
            underline: {
                display: "flex",
                "&:before": {
                    content: "",
                },
                "&:after": {
                    content: "",
                },
            },
        },
    },
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

export { useStyles, DialogContent, DialogTitle, materialTheme };
