import React from 'react'

import { Box, Typography } from '@mui/material'

const WarningItem = ({ title }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        mt: 0.5,
      }}
    >
      <Box
        sx={{
          width: 4,
          height: 4,
          borderRadius: '50%',
          backgroundColor: '#000',
          mr: 1,
        }}
      />

      <Typography
        variant="body"
        sx={{
          textOverflow: 'ellipsis',
          overflow: 'hidden',
        }}
      >
        {title}
      </Typography>
    </Box>
  )
}

export default WarningItem
