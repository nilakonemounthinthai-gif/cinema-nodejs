import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

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
        rootDataGrid: {
            "& .MuiDataGrid-cellEditing": {
                backgroundColor: "rgb(255,215,115, 0.19)",
                color: "#1a3e72",
            },
            "& .Mui-error": {
                backgroundColor: `rgb(126,10,15,0.1})`,
                color: "#750f0f",
            },

            "& .isadmin--true": {
                backgroundColor: "rgb(250, 179, 174)",
                "&:hover": {
                    backgroundColor: "rgb(249, 161, 154)",
                },
            },
        },
        button: {
            width: "100%",
            height: "100%",
        },
        userQuanTri: {
            backgroundColor: "rgb(250, 179, 174)",
            "&:hover": {
                backgroundColor: "rgb(249, 161, 154)",
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
        addUser: {
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
        }

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

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

export { useStyles, DialogContent, DialogTitle };