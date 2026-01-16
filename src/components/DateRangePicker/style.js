const style = (theme) => ({
  root: {
    width: '100%',
    boxShadow: '0px 8px 8px rgb(102 102 102 / 5%)',
    display: 'flex',
    borderRadius: 3,
    border: `1px solid ${theme.palette.borderGray}`,
    cursor: 'pointer',
    background: '#fff',
    '& span': {
      lineHeight: 20 / 14,
    },
    '&: hover': {
      borderColor: theme.palette.borderField,
      '& span': {
        opacity: 1,
      },
    },
    '& .MuiOutlinedInput-root': {
      input: {
        padding: '9px 0px !important',
      },
    },
  },
  error: {
    border: `1px solid ${theme.palette.error.main}`,
    '&: hover': {
      borderColor: theme.palette.error.main,
    },
  },
  focus: {
    borderColor: theme.palette.borderField,
    '&: hover': {
      borderColor: theme.palette.borderField,
    },
  },
  textField: {
    display: 'flex',
    flex: 1,
    padding: '9px 0 9px 8px',
    alignItems: 'center',
    minWidth: 0,
  },
  iconCalendar: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 10px',
  },
  paper: {
    marginTop: 12,
    boxShadow: '0px 8px 8px rgba(102, 102, 102, 0.05)',
  },
  formControl: {
    '& .MuiFormHelperText-root': {
      margin: theme.spacing(1 / 3, 0, 0),
    },
  },
  disabled: {
    background: theme.palette.grayF4.main,
    borderColor: `${theme.palette.borderGray} !important`,
    cursor: 'not-allowed',
    '& input': {
      background: theme.palette.grayF4.main,
      pointerEvents: 'none',
      color: theme.palette.text.main,
      WebkitTextFillColor: theme.palette.text.main,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: `${theme.palette.borderGray} !important`,
    },
  },
  vertical: {
    '& .MuiFormLabel-root': {
      fontSize: 12,
      marginBottom: 8,

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
      marginTop: 10,
      marginRight: theme.spacing(2),
      boxSizing: 'border-box',
    },
  },
  input: {
    border: 'none !important',
    outline: 'none !important',
    boxShadow: 'none !important',
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    '&:focus': { boxShadow: 'none !important' },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none !important',
    },
  },
  inputError: {
    color: theme.palette.error.main,
    // '& input': {
    //   color: theme.palette.error.main,
    // },
    '& .MuiInputBase-root': {
      border: `1px solid ${theme.palette.error.main} !important`,
    },
  },
})

export default style
