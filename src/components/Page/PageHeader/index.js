import React from 'react'

import { Box, Typography } from '@mui/material'
import { PropTypes } from 'prop-types'

import { Breadcrumbs } from '~/components/Breadcrumbs'

import GoBack from './GoBack'
import Toolbar from './Toolbar'

const PageHeader = ({ onBack, title, breadcrumbs, tours }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        px: 2,
        py: '6px',
        bgcolor: '#fff',
        zIndex: 999,
        boxShadow: '0px 5px 30px 2px rgba(0, 0, 0, 0.10)',
        minHeight: 52,
      }}
    >
      {typeof onBack === 'function' && <GoBack onBack={onBack} />}

      <Box sx={{ mr: 2 }}>
        <Typography variant="h1">{title}</Typography>
        {breadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
      </Box>

      <Toolbar tours={tours} />
    </Box>
  )
}

PageHeader.defaultProps = {
  title: '',
}

PageHeader.propTypes = {
  onBack: PropTypes.func,
  title: PropTypes.string,
  breadcrumbs: PropTypes.array,
  tours: PropTypes.array,
}

export default PageHeader
