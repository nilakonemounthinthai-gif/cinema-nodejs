/**
 * Shared styles for all admin CRUD pages.
 * Import into each page's styles.js to avoid duplication.
 *
 * Usage:
 *   import { adminPageStyles, adminDialogStyles } from '../../styles/adminPage';
 *   const useStyles = makeStyles((theme) => ({
 *     ...adminPageStyles(theme),
 *     // page-specific overrides here
 *   }));
 */
import { fade, withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import React from 'react';

/* ─────────────────────────────────────────────
   Design tokens (single source of truth)
───────────────────────────────────────────── */
export const ADMIN_COLORS = {
  primary: 'rgb(238, 130, 59)',
  primaryHover: '#c0601a',
  pageBg: '#f4f6f8',
  cardBg: '#ffffff',
  textPrimary: '#172b4d',
  textSecondary: '#6b778c',
  border: '#dfe1e6',
  headerBg: '#001529',
};

export const ADMIN_SPACING = {
  pagepadding: 24,
  toolbarHeight: 64,
};

/* ─────────────────────────────────────────────
   Shared makeStyles factory
───────────────────────────────────────────── */
export const adminPageStyles = (theme) => ({
  /* Page wrapper — gives each admin page consistent height */
  pageRoot: {
    height: 'calc(100vh - 64px)',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: ADMIN_COLORS.pageBg,
  },

  /* Toolbar row above the DataGrid */
  control: {
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
    padding: '12px 0',
  },

  /* "Add" button */
  addButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    fontSize: 14,
    fontWeight: 600,
    borderRadius: 6,
    padding: '7px 18px',
    minWidth: 120,
    backgroundColor: ADMIN_COLORS.primary,
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    '&:hover': {
      backgroundColor: ADMIN_COLORS.primaryHover,
    },
    '&:disabled': {
      backgroundColor: '#cccccc',
      cursor: 'not-allowed',
    },
  },

  /* Search box */
  search: {
    position: 'relative',
    borderRadius: 6,
    backgroundColor: '#fff',
    border: `1px solid ${ADMIN_COLORS.border}`,
    '&:hover': {
      borderColor: ADMIN_COLORS.primary,
    },
    minWidth: 220,
    maxWidth: 360,
  },
  searchIcon: {
    padding: theme.spacing(0, 1.5),
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: ADMIN_COLORS.textSecondary,
    pointerEvents: 'none',
  },
  inputRoot: {
    color: ADMIN_COLORS.textPrimary,
    width: '100%',
  },
  inputInput: {
    padding: '8px 8px 8px 0',
    paddingLeft: `calc(1em + ${theme.spacing(3)}px)`,
    width: '100%',
    fontSize: 14,
  },

  /* DataGrid grows to fill remaining height */
  dataGridWrapper: {
    flex: 1,
    minHeight: 0,
    '& .custom-header': {
      backgroundColor: ADMIN_COLORS.headerBg,
      color: '#ffffff',
      fontWeight: 600,
      fontSize: 13,
    },
    '& .MuiDataGrid-root': {
      border: 'none',
      borderRadius: 8,
      backgroundColor: ADMIN_COLORS.cardBg,
      boxShadow: '0 1px 3px rgba(0,0,0,.08)',
    },
    '& .MuiDataGrid-columnHeader': {
      backgroundColor: ADMIN_COLORS.headerBg,
      color: '#ffffff',
    },
    '& .MuiDataGrid-columnHeaderTitle': {
      fontWeight: 600,
    },
    '& .MuiDataGrid-row:hover': {
      backgroundColor: 'rgba(238, 130, 59, 0.06)',
    },
    '& .MuiDataGrid-cell': {
      borderBottom: `1px solid ${ADMIN_COLORS.border}`,
    },
  },
});

/* ─────────────────────────────────────────────
   Shared Dialog components (title + content)
───────────────────────────────────────────── */
const dialogTitleStyles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    backgroundColor: ADMIN_COLORS.headerBg,
    color: '#fff',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: '#fff',
  },
});

export const DialogTitle = withStyles(dialogTitleStyles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

export const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);
