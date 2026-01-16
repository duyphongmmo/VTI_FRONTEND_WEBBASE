export const styleLabelTextField = (value) => ({
  inputBase: {
    border: '1px solid #e0e1e2',
    borderRadius: '3px',
    color: value || value === 0 ? 'rgb(34, 34, 34)' : '#b4b4b4',
    fontSize: '14px',
    background: '#fff',
    height: '36px',
    whiteSpace: 'nowrap',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    ':hover': {
      borderColor: 'rgb(0, 80, 174)',
    },
  },
  textEllipsis: {
    maxWidth: '100%',
    overflow: 'hidden ',
    textOverflow: 'ellipsis ',
  },
  disabled: {
    userSelect: 'none',
    background: 'rgb(237, 240, 244) !important',
    ':hover': {
      border: '1px solid #e0e1e2 !important',
    },

    cursor: 'default',
  },
  error: {
    borderColor: 'rgb(255, 9, 9)',
    ':hover': {
      borderColor: 'rgb(255, 9, 9)',
    },
  },
  wrapperValue: {
    margin: '10px 7px 9px 7px',
    overflow: 'hidden',
    flex: 1,
  },
  autoComplete: {
    margin: '10px 0 9px 7px',
  },
  btnClose: {
    padding: '4px 4px 4px 6px !important',
    marginRight: '-2px',
  },
  iconClose: {
    width: '20px',
    height: '20px',
    color: 'rgba(0, 0, 0, 0.54)',
  },
  btnArrowDown: { padding: '2px !important', marginRight: '6px' },
  iconArrowDown: {
    width: '24px',
    height: '24px',
    color: 'rgba(51, 51, 51, 0.4)',
  },
})
