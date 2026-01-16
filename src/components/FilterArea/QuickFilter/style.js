const style = (theme) => ({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'flex-start',
    gap: theme.spacing(1),
    minWidth: 0,
    '&>div:not(:last-child)': {
      flexGrow: 0,
      boxSizing: 'border-box',
      margin: 0,
      flex: 1,
      maxWidth: 260,
      minWidth: 0,
    },
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    whiteSpace: 'nowrap',
  },
})

export default style
