import React from 'react'

import { Box, Typography } from '@mui/material'
import { useTheme } from '@mui/styles'

import Button from '~/components/Button'

const HorizontalAccordion = ({
  isOpen,
  handleToggle,
  title,
  buttonText,
  table,
  disabled,
  implementOCR,
  files,
  isProcessing,
  isUpdate,
  buttonRender,
}) => {
  const theme = useTheme()
  return (
    <Box>
      {!isOpen && (
        <Button
          onClick={handleToggle}
          variant="contained"
          icon="settingWarehouse"
          iconColor="primary"
          sx={{ width: '48px', height: '48px' }}
        ></Button>
      )}

      {isOpen && (
        <Box
          sx={{
            minHeight: '80vh',
            width: '100%',
            backgroundColor: theme.palette.status.blue.background,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              width: '100%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: 1,
                ml: 2,
                mr: 2,
              }}
            >
              <Typography
                variant="h2"
                color={theme.palette.primary.contrastText}
              >
                {title}
              </Typography>
              {/* Nút "Close" để đóng Accordion */}
              <Button
                onClick={handleToggle}
                icon="settingWarehouse"
                variant="text"
                iconColor={theme.palette.primary.contrastText}
              ></Button>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                ml: 2,
                mr: 2,
              }}
            >
              {table}
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              gap: 1,
              width: '100%',
              my: 2,
            }}
          >
            {buttonRender}
            <Button
              sx={{
                width: '90%',
              }}
              variant="contained"
              // color="primary"
              color={`grayEE`}
              disabled={disabled || isProcessing || isUpdate}
              onClick={() => implementOCR(files)}
            >
              {buttonText}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default HorizontalAccordion
