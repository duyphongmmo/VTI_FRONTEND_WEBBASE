export const globalStyles = (theme) => ({
  html: {
    width: '100%',
    height: '100%',
  },

  body: {
    margin: 0,
    width: '100%',
    height: '100%',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 20 / 14,
    color: theme.palette.text,
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    boxSizing: 'border-box',

    '&::-webkit-scrollbar, & ::-webkit-scrollbar': {
      width: 8,
      height: 8,
    },

    '&::-webkit-scrollbar-track, & ::-webkit-scrollbar-track': {
      // borderRadius: 4,
      // backgroundColor: theme.palette.grayF5.main,
      backgroundColor: '#fafafa',
    },

    '&::-webkit-scrollbar-thumb, & ::-webkit-scrollbar-thumb': {
      // borderRadius: 4,
      backgroundColor: theme.palette.bg.tableHead,
    },

    '> iframe': {
      pointerEvents: 'none',
    },
  },

  '#root': {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },

  '.MuiDivider-root': { borderColor: theme.palette.divider },

  '.MuiFormLabel-asterisk': {
    fontSize: 12,
    color: theme.palette.error.main,
  },

  '.MuiPaper-outline-caret, .MuiPaper-outline-caret-left': {
    border: `1px solid ${theme.palette.grayF4.main}`,

    '&:before': {
      boxShadow: `1px 1px 0px 0px ${theme.palette.grayF4.main}`,
    },
  },

  'input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus, input:-webkit-autofill:active':
    {
      WebkitBoxShadow: '0 0 0 30px white inset !important',
    },
  '.MuiButton-root.MuiButton-outlined.MuiButton-outlinedSubText,.MuiButton-root.MuiButton-outlined.MuiButton-outlinedText':
    {
      border: '1px solid',
      borderColor: theme.palette.subText.a2,
    },
  '.MuiFormLabel-root .MuiFormLabel-asterisk': {
    display: 'inline-block',
    width: 0,
    height: 0,
    lineHeight: 0,
    position: 'relative',
    top: 0,
    right: '-1px',
  },
  'button.MuiButtonBase-root.MuiPickersDay-root.MuiPickersDay-dayOutsideMonth':
    {
      color: 'rgba(0,0,0,0.38)',
    },
  'div:focus-visible': { outline: 'none' },
  '.x-info-hidden [role="info"]': {
    padding: 0,
    marginBottom: 0,
    height: 0,
    overflow: 'hidden',
    pointerEvents: 'none',

    '&+*': {
      marginTop: 0,
    },
  },
  '.x-info-hidden [role="hidden"]': {
    display: 'none',
    '&+*': {
      marginTop: 0,
    },
  },
  '.notification__close:after': { fontSize: '20px !important' },
  'document-fragment:empty': { display: 'none' },
})
