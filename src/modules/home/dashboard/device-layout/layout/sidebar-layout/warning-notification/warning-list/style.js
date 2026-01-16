const style = (theme) => ({
  list: {
    minHeight: 100,
    maxHeight: 300,
    overflow: 'auto',
    padding: 0,
    position: 'relative',
    [theme.breakpoints.down('md')]: {
      maxHeight: 200,
    },
  },
})

export default style
