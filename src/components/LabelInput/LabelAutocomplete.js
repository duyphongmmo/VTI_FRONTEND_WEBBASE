import { memo } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Box, FormHelperText, IconButton } from '@mui/material'
import clsx from 'clsx'

import { useClasses } from '~/themes'

import { styleLabelTextField } from './style'

function LabelAutocomplete({
  value,
  placeholder,
  onClick,
  disabled,
  errorMessage,
  onClear,
}) {
  const classes = useClasses(styleLabelTextField(value))
  return (
    <>
      <Box
        onClick={() => {
          onClick(disabled)
        }}
        className={clsx(
          classes.inputBase,
          disabled && classes.disabled,
          errorMessage && classes.error,
        )}
        sx={{
          '& .iconClose': {
            display: 'none',
          },
          '&:hover .iconClose': {
            display: 'block',
          },
        }}
      >
        <Box
          className={clsx(
            classes.wrapperValue,
            classes.autoComplete,
            value && classes.textEllipsis,
          )}
        >
          {value || value === 0 ? value : placeholder}
        </Box>
        {!!value && !disabled && (
          <Box
            sx={{ width: '28px', height: '28px' }}
            onClick={(event) => {
              event.stopPropagation()
              if (onClear) onClear()
            }}
          >
            <IconButton className={clsx(classes.btnClose)}>
              <CloseIcon className={clsx(classes.iconClose, 'iconClose')} />
            </IconButton>
          </Box>
        )}
        <IconButton className={clsx(classes.btnArrowDown)}>
          <KeyboardArrowDownIcon className={clsx(classes.iconArrowDown)} />
        </IconButton>
      </Box>
      {errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}
    </>
  )
}

export default memo(LabelAutocomplete)
