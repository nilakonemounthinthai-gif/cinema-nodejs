import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  pageWrapper: {
    backgroundColor: '#141414',
    minHeight: '100vh',
  },

  // ── Hero banner ──────────────────────────────────────────────────────────
  heroBanner: {
    position: 'relative',
    width: '100%',
    minHeight: '70vh',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    paddingTop: 90,
    paddingBottom: 48,
  },
  // Blurred poster background — extends beyond container to hide blur edges
  heroBannerBg: {
    position: 'absolute',
    top: '-15%',
    right: '-5%',
    bottom: '-15%',
    left: '-5%',
    backgroundImage: props => `url(${props.bannerImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'blur(28px)',
    zIndex: 0,
  },
  // Dark overlay over the blurred bg for readability
  heroBannerOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: 'rgba(0,0,0,0.72)',
    zIndex: 1,
  },
  // Content row: poster + info
  heroContent: {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    alignItems: 'flex-start',
    gap: 40,
    maxWidth: 1100,
    margin: '0 auto',
    padding: '0 32px',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  // ── Poster ───────────────────────────────────────────────────────────────
  posterWrapper: {
    flexShrink: 0,
    width: 220,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      maxWidth: 200,
    },
  },
  posterImg: {
    width: '100%',
    borderRadius: 8,
    boxShadow: '0 8px 32px rgba(0,0,0,0.75)',
    display: 'block',
  },

  // ── Info panel (right side) ───────────────────────────────────────────────
  infoWrapper: {
    flex: 1,
    color: '#fff',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  movieTitle: {
    fontSize: 30,
    fontWeight: 700,
    color: '#fff',
    marginBottom: 12,
    lineHeight: 1.3,
    margin: '0 0 12px',
  },
  c18: {
    marginRight: 8,
    verticalAlign: '13%',
    backgroundColor: 'rgb(238, 130, 59)',
    color: '#fff',
    fontSize: 14,
    borderRadius: 4,
    padding: '1px 6px',
    display: 'inline-block',
    textAlign: 'center',
  },

  // Rating + duration row
  ratingRow: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  rateStar: {
    '& .MuiRating-iconEmpty': {
      color: 'rgba(255, 180, 0, 0.3)',
    },
  },
  ratingValue: {
    color: '#ffc107',
    fontWeight: 700,
    fontSize: 18,
    lineHeight: 1,
  },
  duration: {
    color: '#ccc',
    fontSize: 13,
    background: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
    padding: '3px 10px',
  },

  // Info rows (label + value)
  infoRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 16,
    marginBottom: 8,
  },
  infoLabel: {
    minWidth: 130,
    color: '#aaa',
    fontSize: 14,
    flexShrink: 0,
    lineHeight: 1.6,
  },
  infoValue: {
    color: '#fff',
    fontSize: 14,
    flex: 1,
    lineHeight: 1.6,
  },
  moTaText: {
    color: '#ccc',
  },

  // Action buttons
  actionButtons: {
    display: 'flex',
    gap: 12,
    marginTop: 28,
    flexWrap: 'wrap',
  },
  btnMuaVe: {
    fontSize: 15,
    fontWeight: 700,
    borderRadius: 6,
    padding: '12px 32px',
    backgroundColor: '#fa5238',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    transition: 'all .2s',
    '&:hover': {
      backgroundColor: '#c73520',
    },
  },
  btnTrailer: {
    fontSize: 15,
    fontWeight: 700,
    borderRadius: 6,
    padding: '12px 32px',
    backgroundColor: 'transparent',
    border: '2px solid rgba(255,255,255,0.7)',
    color: '#fff',
    cursor: 'pointer',
    transition: 'all .2s',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.1)',
    },
  },

  // Placeholder animation when poster fails to load
  withOutImage: {
    borderRadius: 8,
    width: '100%',
    height: 320,
    animationName: '$myEffect',
    animationDuration: '3s',
    animationTimingFunction: theme.transitions.easing.easeInOut,
    animationIterationCount: 'infinite',
    background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
    backgroundSize: '400% 400%',
  },
  '@keyframes myEffect': {
    '0%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
    '100%': { backgroundPosition: '0% 50%' },
  },
}))
export default useStyles
