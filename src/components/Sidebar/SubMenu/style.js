const style = (theme) => {
  return {
    listItemButtonOnPopover: {
      borderRadius: 8,

      '&:hover': {
        // background: theme.palette.sidebar.hover,
      },

      '&.active': {
        background: theme.palette.sidebar.active2,
      },

      '.MuiTypography-root': {
        color: theme.palette.text.main,
      },
    },
  }
}
export default style
