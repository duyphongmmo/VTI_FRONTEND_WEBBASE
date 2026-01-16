import Background from '~/assets/images/home/bg.png'

const style = (theme) => ({
  root: {
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundImage: `url(${Background})`,
    BackgroundSize: 'cover',
    backgroundPosition: 'center center',
    padding: '40px 5.5%',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    color: '#fff',

    [theme.breakpoints.down('lg')]: {
      alignItems: 'flex-start',
    },
  },

  intro: {
    marginBottom: 60,

    h2: { fontSize: 36, lineHeight: 1.22, margin: 0 },
    h1: { fontSize: 56, lineHeight: 1.22, margin: '5px 0 48px 0' },

    [theme.breakpoints.down('lg')]: {
      h2: { fontSize: 30 },
      h1: { fontSize: 46 },
    },
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(2),
      h2: { fontSize: 24 },
      h1: { fontSize: 36 },
    },
  },
  overview: {
    '>div:not(:last-child)': {
      borderRight: '1px solid rgba(255,255,255,0.3)',
    },
    span: {
      whiteSpace: 'pre-line',
    },

    [theme.breakpoints.down('sm')]: {
      '>div:not(:last-child)': {
        borderRight: 'none',
      },
    },
  },
  overviewItem: {
    padding: theme.spacing(0, 1),
    textAlign: 'center',
    '>div': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 24,
      fontWeight: 700,
      marginBottom: 2,

      img: { marginRight: 8 },
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
  },

  ecoSystem: {
    textAlign: 'center',
    img: {
      maxWidth: '100%',
      maxHeight: '80vh',
    },
  },
})

export default style
