const style = (readOnly, getColorText) => (theme) => ({
  root: {
    '& .MuiOutlinedInput-root': {
      boxShadow: '0px 8px 8px rgba(102, 102, 102, 0.05)',
      borderRadius: 3,
      paddingRight: 0,
      boxSizing: 'border-box',
      color: getColorText ? getColorText : theme.palette.text.main,
      background: '#fff',
      border: 'none',
      input: {
        padding: '9px 8px',
      },
    },
    '& .MuiOutlinedInput-root .MuiInputBase-input::placeholder': {
      color: theme.palette.text.main,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderWidth: '1px !important',
      borderColor: theme.palette.borderGray,
    },
    '& .MuiFormLabel-root': {
      wordBreak: 'break-word',
    },
    '& .MuiFormHelperText-root': {
      margin: theme.spacing(1 / 3, 0, 0),
    },
    '& .MuiInputBase-multiline': {
      padding: '16.5px 8px',
    },
  },
  normal: {
    '& .MuiOutlinedInput-root': {
      '&:hover .MuiOutlinedInput-notchedOutline, &.Mui-focused .MuiOutlinedInput-notchedOutline':
        {
          borderColor: readOnly
            ? theme.palette.borderGray
            : theme.palette.borderField,
        },
    },
  },
  disabled: {
    '& .MuiOutlinedInput-root': {
      background: theme.palette.grayF4.main,
      fieldset: {
        borderColor: `${theme.palette.borderGray} !important`,
      },
      '.Mui-disabled': {
        color: theme.palette.text.main,
        WebkitTextFillColor: theme.palette.text.main,
      },
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
