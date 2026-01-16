const style = () => (theme) => ({
  root: {
    '& .MuiFormLabel-root': {
      wordBreak: 'break-word',
    },
    '& .MuiFormHelperText-root': {
      margin: theme.spacing(1 / 3, 0, 0),
    },
  },
  vertical: {
    '& .MuiFormLabel-root': {
      fontSize: 12,
      paddingBottom: 8,

      '&:not(.Mui-error)': {
        color: theme.palette.subText.main,
      },
    },
  },
  horizontal: {
    display: 'flex',
    flexDirection: 'row',

    '& .MuiFormLabel-root': {
      color: theme.palette.text.main,
      paddingTop: 10,
      marginRight: theme.spacing(2),
      boxSizing: 'border-box',
    },
  },
})

export default style
