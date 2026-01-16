import { useState } from 'react'

import { Box, FormControlLabel, Popover, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { useDashboard } from '~/common/hooks/useDashboard'
import Button from '~/components/Button'
import Checkbox from '~/components/Checkbox'
import { useClasses } from '~/themes'

import style from './style'

function PageSetting() {
  const classes = useClasses(style)
  const [anchorEl, setAnchorEl] = useState(null)
  const { t } = useTranslation()

  const { visibleCharts, setVisibleCharts, chartOptions } = useDashboard()

  const onApplySetting = (cols = []) => {
    setVisibleCharts(cols)
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  if (!chartOptions?.length) return null

  return (
    <Box className={classes.root}>
      <Button icon="setting" color="grayEE" onClick={handleClick} />
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        PaperProps={{
          variant: 'caret',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box className={classes.formContainer}>
          <Typography variant="h5" sx={{ mb: 1 }}>
            {t('setting.title')}
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={visibleCharts?.length === chartOptions?.length}
                indeterminate={
                  visibleCharts?.length !== chartOptions?.length &&
                  visibleCharts?.length !== 0
                }
                onChange={(e) => {
                  if (e.target.checked) {
                    onApplySetting(chartOptions?.map((chart) => chart?.id))
                  } else {
                    onApplySetting([])
                  }
                }}
              />
            }
            label={t('dataTable.showAllColumns')}
          />
          {chartOptions?.map((chart, idx) => {
            return (
              <Box key={chart.id || idx}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={visibleCharts.includes(chart.id)}
                      onChange={(e) => {
                        if (e.target.checked)
                          onApplySetting([...visibleCharts, chart.id])
                        else
                          onApplySetting(
                            visibleCharts.filter((col) => col !== chart.id),
                          )
                      }}
                    />
                  }
                  label={t(chart.text)}
                />
              </Box>
            )
          })}
        </Box>
      </Popover>
    </Box>
  )
}

export default PageSetting
