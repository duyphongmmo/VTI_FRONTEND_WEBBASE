const style = (theme) => ({
  root: {
    marginLeft: 'auto',
  },
  paper: {
    width: 360,
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: theme.spacing(1),
    padding: theme.spacing(1, 2),
    marginTop: theme.spacing(1),
    borderTop: `1px solid ${theme.palette.divider}`,
  },
})

export default style
