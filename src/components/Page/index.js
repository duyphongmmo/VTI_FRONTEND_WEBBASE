import React from 'react'

import { Box, Paper, useMediaQuery, useTheme } from '@mui/material'
import { PropTypes } from 'prop-types'

import { useApp } from '~/common/hooks/useApp'
import Loading from '~/components/Loading'
import { useClasses } from '~/themes'

import PageFooter from './PageFooter'
import PageHeader from './PageHeader'
import style from './style'

const Page = ({
  onBack,
  title,
  breadcrumbs,
  children,
  loading,
  sx,
  fitScreen,
  freeSolo,
  tours,
}) => {
  const classes = useClasses(style)
  const { pageRootRef, pageTopRef, pageBottomRef, isBottomActionBarExisted } =
    useApp()
  const theme = useTheme()

  const largeScreenWidth = useMediaQuery(theme.breakpoints.up('sm'))
  const largeScreenHeight = useMediaQuery('(min-height:600px)')
  const allowFitScreen = fitScreen && largeScreenWidth && largeScreenHeight

  const renderContent = () => {
    if (freeSolo) return children

    if (allowFitScreen)
      return (
        <Paper
          sx={{
            p: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto',
            flex: 1,
          }}
        >
          {children}
        </Paper>
      )

    return (
      <Paper
        sx={{
          p: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 'calc(100% - 16px)',
        }}
      >
        {children}
      </Paper>
    )
  }

  return (
    <Box
      ref={pageRootRef}
      className={classes.root}
      sx={{
        ...(isBottomActionBarExisted ? { pb: '64px' } : {}),
        ...sx,
      }}
    >
      <PageHeader
        onBack={onBack}
        title={title}
        breadcrumbs={breadcrumbs}
        tours={tours}
      />

      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          px: 2,
          pt: 2,
          ...(allowFitScreen
            ? { display: 'flex', flexDirection: 'column', overflow: 'hidden' }
            : {}),
        }}
      >
        <Box
          ref={pageTopRef}
          sx={{
            flex: 0,
            height: 0,
            position: 'relative',
            top: theme.spacing(-2),
          }}
        />
        {renderContent()}
        <Box
          ref={pageBottomRef}
          sx={{ flex: 0, height: 0, position: 'relative', bottom: -100 }}
        />
      </Box>

      {!isBottomActionBarExisted && <PageFooter />}

      <Loading open={loading}></Loading>
    </Box>
  )
}

Page.defaultProps = {
  title: '',
  loading: false,
  sx: {},
  fitScreen: false,
  freeSolo: false,
}

Page.propTypes = {
  onBack: PropTypes.func,
  title: PropTypes.string,
  breadcrumbs: PropTypes.array,
  loading: PropTypes.bool,
  sx: PropTypes.shape(),
  fitScreen: PropTypes.bool,
  freeSolo: PropTypes.bool,
}

export default Page
