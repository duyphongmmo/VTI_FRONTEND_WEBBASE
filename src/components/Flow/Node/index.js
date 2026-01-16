import React from 'react'

import { Box, Link as MuiLink, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/styles'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import TextLink from '~/components/TextLink'
import { convertUtcDateToLocalTz } from '~/utils'

const Node = ({
  sx,
  title,
  highlight,
  code,
  href,
  status,
  createdAt,
  renderNodeTitle,
  renderNodeContent,
}) => {
  const { t } = useTranslation()

  const theme = useTheme()

  const renderTitle = () => {
    if (typeof renderNodeTitle === 'function') {
      return renderNodeTitle()
    }

    return (
      <Typography
        sx={{
          ...(highlight
            ? {
                color: theme.palette.primary.main,
                borderBottom: `2px solid ${theme.palette.primary.main}`,
                fontWeight: 600,
              }
            : {
                color: theme.palette.subText.main,
                borderBottom: `2px solid ${theme.palette.divider}`,
              }),
          textAlign: 'center',
          pb: '4px',
          mb: 1.5,
        }}
      >
        {title}
      </Typography>
    )
  }

  const renderContent = () => {
    if (typeof renderNodeContent === 'function') {
      return renderNodeContent()
    }

    return (
      <Stack spacing={1}>
        <Box>
          {href ? (
            <TextLink to={href}>{code}</TextLink>
          ) : (
            <MuiLink underline="none">{code}</MuiLink>
          )}
        </Box>
        <Typography>
          {t('flow.status')}:<br />
          {status}
        </Typography>
        <Typography>
          {t('flow.createdAt')}:<br />
          {convertUtcDateToLocalTz(createdAt)}
        </Typography>
      </Stack>
    )
  }

  return (
    <Box
      sx={{
        bgcolor: 'bg.block',
        borderRadius: '5px',
        px: 1.5,
        py: 1,
        boxSizing: 'border-box',
        ...sx,
      }}
    >
      {renderTitle()}
      {renderContent()}
    </Box>
  )
}

Node.propTypes = {
  sx: PropTypes.shape(),
  title: PropTypes.string,
  highlight: PropTypes.bool,
  code: PropTypes.string,
  href: PropTypes.string,
  status: PropTypes.node,
  createdAt: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
  renderNodeTitle: PropTypes.func,
  renderNodeContent: PropTypes.func,
}

export default Node
