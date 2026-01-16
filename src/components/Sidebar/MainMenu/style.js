import { List } from '@mui/material'
import { styled } from '@mui/system'

const ListMenuStyled = styled(List)(({ theme }) => {
  return {
    padding: '0 10px 0 5px',
    // overflow: 'auto',
    overflow: 'scroll',

    '&::-webkit-scrollbar': {
      width: 8,
      height: 4,
      backgroundColor: 'red',
    },

    '&::-webkit-scrollbar-track': {
      backgroundColor: theme.palette.sidebar.bg,
    },
    '&::-webkit-scrollbar-corner': {
      backgroundColor: theme.palette.sidebar.bg,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.sidebar.active,
    },

    '.MuiListItemButton-root': {
      borderRadius: 5,
      marginRight: "5px",
      paddingRight: "7px",

      '&:hover': {
        background: theme.palette.sidebar.hover,
        '&>.MuiListItemIcon-root': { opacity: 1 },
      },

      '&.active': {
        background: theme.palette.sidebar.active,
      },

      '&.rootActive': {
        background: theme.palette.sidebar.active,

        '&>.MuiListItemIcon-root': { opacity: 1 },
        '&>.MuiListItemText-root>.MuiTypography-root': {
          fontWeight: 700,
        },
      },
      '&.rootActiveByChild': {
        '&>.MuiListItemIcon-root': { opacity: 1 },
        '&>.MuiListItemText-root>.MuiTypography-root': {
          fontWeight: 700,
        },
      },
    },

    a: {
      textDecoration: 'none',
    },
  }
})

export default ListMenuStyled
