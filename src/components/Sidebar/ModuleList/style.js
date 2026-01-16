const style = (theme) => {
  return {
    currentModule: {
      height: 52,
      flex: '0 0 64px',
      background: theme.palette.sidebar.active3,
      position: 'relative',

      '&:hover': {
        background: theme.palette.sidebar.active3,
      },
    },

    moduleList: {
      position: 'absolute',
      zIndex: 2,
      overflow: 'auto',
    },
    moduleListInside: {
      background: theme.palette.sidebar.bg,
      top: 90,
      left: 0,
      right: 0,
      bottom: 0,
      // padding: '0 10px 10px 10px',
      '&::-webkit-scrollbar': {
        width: 8,
        height: 8,
      },

      '&::-webkit-scrollbar-track': {
        backgroundColor: '#ccc',
      },

      '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.primary.a6,
      },
    },
    moduleListOutside: {
      padding: 0,
      top: 10,
      right: -10,
      transform: 'translateX(100%)',
      width: 250,
      maxHeight: '100%',
      background: '#fff',
      borderRadius: 8,
      boxShadow: '0px 5px 30px 2px rgba(0, 0, 0, 0.10)',

      '&:before': {
        content: '""',
        height: '100%',
        width: 10,
        background: 'transparent',
        left: -10,
        top: 0,
        position: 'absolute',
      },
    },

    listItemButton: {
      minHeight: 44,

      '&.active': {
        background: theme.palette.sidebar.active2,
      },
    },

    listItemButtonInside: {
      // borderRadius: 8,
      marginBottom: 8,

      '&:hover': {
        background: theme.palette.sidebar.hover,
      },

      '&.active': {
        background: theme.palette.sidebar.active,
      },

      '.MuiTypography-root': {
        color: '#fff',
      },
    },
    listItemButtonOutside: {
      '&.active': {
        background: theme.palette.sidebar.active2,
      },

      '.MuiTypography-root': {
        color: theme.palette.primary.main,
      },
    },
    backdrop: {
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      left: 64,
    },
  }
}
export default style
