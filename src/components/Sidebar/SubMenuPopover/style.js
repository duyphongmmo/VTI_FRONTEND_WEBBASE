const style = () => {
  return {
    popover: {
      pointerEvents: 'none',
    },
    paper: {
      pointerEvents: 'auto',
      width: 265,
      marginLeft: 20,
      overflow: 'visible',
      background: '#fff',
      borderRadius: 8,
      display: 'flex',
      flexDirection: 'column',
      '&:before': {
        content: '""',
        height: '100%',
        width: 20,
        background: 'transparent',
        left: -20,
        top: 0,
        position: 'absolute',
      },
    },
  }
}
export default style
