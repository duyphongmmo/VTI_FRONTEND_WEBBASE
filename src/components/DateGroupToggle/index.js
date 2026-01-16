import React from 'react'

import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { isNull } from 'lodash'
import { useTranslation } from 'react-i18next'

const groupOptions = [
  {
    name: 'week',
    value: 0,
  },
  {
    name: 'month',
    value: 1,
  },
  {
    name: 'quarter',
    value: 2,
  },
]

const DateGroupToggle = ({
  groupBy = 0,
  setGroupBy = () => {},
  options = groupOptions,
}) => {
  const { t } = useTranslation(['wmsx'])
  const theme = useTheme()

  const handleChangeGroupBy = (_, id) => {
    if (!isNull(id)) {
      setGroupBy(id)
    }
  }

  return (
    <ToggleButtonGroup
      color="primary"
      size="small"
      value={groupBy}
      exclusive
      onChange={handleChangeGroupBy}
    >
      {options.map((group) => (
        <ToggleButton
          key={group.value}
          value={group.value}
          sx={{
            textTransform: 'capitalize',
            color: theme.palette.text.main,
            width: 80,
            '&.Mui-selected': {
              color: theme.palette.primary.contrastText,
              backgroundColor: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme.palette.primary.main,
              },
            },
          }}
        >
          {group.title ? group.title : t(`common.${group.name}`)}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
}

export default DateGroupToggle
