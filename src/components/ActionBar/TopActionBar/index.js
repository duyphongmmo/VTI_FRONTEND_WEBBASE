import React from 'react'

import { InfoOutlined } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { useApp } from '~/common/hooks/useApp'
import Button from '~/components/Button'

const TopActionBar = ({
  onEdit,
  onDelete,
  sx,
  children,
  elBefore,
  elAfter,
  status,
  statusLabel,
  toggler,
}) => {
  const { t } = useTranslation()
  const { scrollToTop } = useApp()

  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexWrap: 'wrap',
        p: 1,
        mx: -1,
        mt: -1,
        mb: 1,
        gap: 1,
        borderBottom: `1px solid ${theme.palette.divider}`,
        background: '#fff',
        position: 'sticky',
        top: theme.spacing(-2),
        zIndex: 100,
        borderRadius: '4px',
        ...sx,

        '&:empty, >:empty': {
          display: 'none',
        },
      })}
    >
      {status && (
        <Box sx={{ mr: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="h5">
            {statusLabel || t('actionBar.status')}
          </Typography>

          {status}
        </Box>
      )}
      {children ? (
        children
      ) : (
        <>
          {typeof elBefore === 'function' ? elBefore() : elBefore}

          {typeof onEdit === 'function' && (
            <Button
              variant="outlined"
              iconColor="primary"
              icon="edit"
              onClick={onEdit}
            >
              {t('actionBar.edit')}
            </Button>
          )}

          {typeof onDelete === 'function' && (
            <Button
              variant="outlined"
              color="error"
              icon="deleteOutline"
              onClick={onDelete}
            >
              {t('actionBar.delete')}
            </Button>
          )}

          {typeof elAfter === 'function' ? elAfter() : elAfter}
        </>
      )}

      {toggler && (
        <Button
          startIcon={<InfoOutlined fontSize="large" />}
          variant="outlined"
          sx={{
            '.x-info-hidden &': {
              color: '#fff',
              bgcolor: 'primary.main',
            },
          }}
          onClick={() => {
            document.body.classList.toggle('x-info-hidden')

            if (!document.body.classList.contains('x-info-hidden')) {
              scrollToTop()
            }
          }}
        />
      )}
    </Box>
  )
}

TopActionBar.defaultProps = {
  children: null,
  elBefore: null,
  elAfter: null,
  sx: {},
  toggler: false,
}

TopActionBar.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.shape(),
  onEdit: PropTypes.oneOfType([PropTypes.func, PropTypes.shape]),
  onDelete: PropTypes.oneOfType([PropTypes.func, PropTypes.shape]),
  elBefore: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  elAfter: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  status: PropTypes.node,
  statusLabel: PropTypes.string,
  toggler: PropTypes.bool,
}

export default TopActionBar
