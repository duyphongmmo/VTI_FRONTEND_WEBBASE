const style = (getColorText) => (theme, renderInputValue) => ({
  root: {
    '& .MuiOutlinedInput-root': {
      padding: 0,
      boxShadow: '0px 8px 8px rgba(102, 102, 102, 0.05)',

      '.MuiAutocomplete-input': {
        padding: '9px 0 9px 8px',
        color: getColorText ? getColorText : theme.palette.text.main,
      },
      // '.MuiAutocomplete-endAdornment': {
      //   right: '4px',
      // },
    },
  },
  rootMultiple: {
    'div.MuiOutlinedInput-root': {
      padding: 0,
      // maxHeight: 118,
      // overflow: 'auto',
      border: '1px solid',
      borderColor: theme.palette.borderGray,

      '&:hover, &.Mui-focused': {
        borderColor: theme.palette.borderField,
      },
      '&.Mui-disabled': {
        borderColor: theme.palette.borderGray,
      },
      '&.Mui-error': {
        borderColor: theme.palette.error.main,
      },

      '.MuiAutocomplete-input': {
        padding: '9px 8px',
      },
      '.MuiChip-root + .MuiAutocomplete-input': {
        paddingLeft: '3px',
        paddingRight: '3px',

        '&.Mui-disabled': {
          display: 'none',
        },
      },

      '.MuiChip-root.Mui-disabled': {
        color: theme.palette.text.main,
        WebkitTextFillColor: theme.palette.text.main,
        opacity: 1,
      },

      '.MuiOutlinedInput-notchedOutline': {
        display: 'none !important',
      },
    },
  },
  listbox: {
    padding: 0,

    '& ul': {
      width: 'auto !important',
      margin: 0,
    },
    ...(renderInputValue ? { display: 'none' } : {}),
  },
  tag: {
    borderRadius: 3,
    backgroundColor: theme.palette.grayF4.main,
  },
  titleOption: {
    display: 'flex',
    boxSizing: 'border-box',
    position: 'sticky',
    top: -8,
    zIndex: 1,
    padding: '6px 16px',
    background: theme.palette.primary.contrastText,
    justifyContent: 'space-between',
  },
  tooltipList: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: 0,
    maxHeight: '40vh',
    overflow: 'auto',
  },
  popupIndicatorOpenSearch: {
    transform: 'rotate(0)',
  },
  paper: {
    border: `1px solid ${theme.palette.grayF4.main}`,
    boxShadow: '0px 8px 8px rgb(102 102 102 / 20%)',
    '.MuiListSubheader-root': {
      color: theme.palette.subText.main,
      // position: 'relative',
      lineHeight: '22px',
      padding: '6px 16px',
      top: 0,

      '~li': {
        paddingLeft: 24,
      },
    },
  },
})

export default style
