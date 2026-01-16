import React from 'react'

import { Box, Typography } from '@mui/material'

import { useTable } from '~/common/hooks/useTable'
import { useClasses } from '~/themes'

import TableKeyFilter from '../TableKeyFilter'
import TableSetting from '../TableSetting'
import style from './style'

const TopBar = () => {
  const classes = useClasses(style)
  const {
    beforeTopbar,
    afterTopbar,
    title,
    subTitle,
    tabs,
    hideSetting,
    onFilterByKeys,
  } = useTable()
  const filterByKeys = typeof onFilterByKeys === 'function'

  if (
    !title &&
    hideSetting &&
    !filterByKeys &&
    !beforeTopbar &&
    !afterTopbar &&
    !tabs
  )
    return null

  return (
    <Box className={classes.root}>
      {tabs && <Box sx={{ minWidth: 0 }}>{tabs}</Box>}
      {title && !tabs && <Typography variant="h3">{title}</Typography>}
      {subTitle && subTitle}
      <Box sx={{ display: 'flex', marginLeft: 'auto', gap: 1 }}>
        {beforeTopbar}
        {filterByKeys && <TableKeyFilter />}
        {!hideSetting && <TableSetting />}
        {afterTopbar}
      </Box>
    </Box>
  )
}

export default TopBar
