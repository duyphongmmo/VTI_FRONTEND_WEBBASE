const style = (theme) => ({
  root: {},
  form: {
    flex: 1,
    '&>.MuiGrid-container > div': {
      paddingLeft: theme.spacing(1),
      paddingTop: theme.spacing(1),
      flexGrow: 0,
      boxSizing: 'border-box',
      margin: 0,
      flexBasis: '20%',
      maxWidth: '20%',

      [theme.breakpoints.down('xl')]: {
        flexBasis: '25%',
        maxWidth: '25%',
      },
      [theme.breakpoints.down('lg')]: {
        flexBasis: '50%',
        maxWidth: '50%',
      },
      [theme.breakpoints.down('md')]: {
        flexBasis: '100%',
        maxWidth: '100%',
      },
    },
  },
})

export default style
