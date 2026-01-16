import React from 'react'

import { Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useLocation } from 'react-router-dom'

// import { useSidebar } from '~/common/hooks'
// import { useApp } from '~/common/hooks/useApp'
import { getCurrentModule } from '~/utils/menu'

import ModuleList from './ModuleList'

export default function Sidebar() {
  const { pathname } = useLocation()
  const theme = useTheme()
  const currentModule = getCurrentModule(pathname)
  // const { isMinimal, setIsMinimal } = useSidebar()
  // const { canAccess } = useApp()

  return (
    <Box
      sx={{
        display: 'flex',
        position: 'relative',
        backgroundColor: theme.palette.sidebar.bg,
        zIndex: 1000,
        transition: 'all .2s ease',
        // width: isMinimal ? 64 : 250,
        boxShadow: !currentModule
          ? '0px 5px 30px 2px rgba(0, 0, 0, 0.10)'
          : 'none',
      }}
    >
      {/* <IconButton
        sx={{
          position: 'absolute',
          p: 0,
          top: 70,
          right: -10,
          zIndex: 3,
          '>*': { pointerEvents: 'none' },
        }}
        onClick={() => setIsMinimal((m) => !m)}
      >
        <Icon
          name="drawer"
          size={24}
          sx={isMinimal ? {} : { transform: 'rotate(-180deg)' }}
        />
      </IconButton> */}

      <ModuleList />

      
    </Box>
  )
}
