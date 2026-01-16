import React, { useRef, useState } from 'react'

import { Box, List } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { last } from 'lodash'
import { useTranslation } from 'react-i18next'

import { ACTIVE_STATUS, ROWS_PER_PAGE_OPTIONS } from '~/common/constants'
import { useIntersectionObserver } from '~/common/hooks'
import useDeviceDashboard from '~/modules/configuration/redux/hooks/useDeviceDashboard'
import { JOB_TYPE_MAP } from '~/modules/home/dashboard/constants'
import { useClasses } from '~/themes'
import { convertFilterParams, convertUtcDateToLocalTz } from '~/utils'

import style from './style'
import WarningItem from './warning-item'

const WarningList = () => {
  const classes = useClasses(style)
  const loadMoreRef = useRef(null)
  const rootRef = useRef(null)
  const [loadable, setLoadable] = useState(true)
  const { t } = useTranslation(['home'])

  const {
    data: { notiLoading, warningList = [] },
    actions,
  } = useDeviceDashboard()

  useIntersectionObserver({
    root: rootRef,
    target: loadMoreRef,
    onIntersect: () => {
      actions.getDashboardWarning(
        {
          ...(last(warningList)?.id ? { lastId: last(warningList)?.id } : {}),
          limit: ROWS_PER_PAGE_OPTIONS[0],
          type: 'WEB',
          filter: convertFilterParams({
            isGetWarning: ACTIVE_STATUS.ACTIVE,
          }),
        },
        () => setLoadable(false),
        () => setLoadable(false),
      )
    },
    onScrollUp: () => setLoadable(true),
    enabled: !notiLoading && loadable,
  })
  return (
    <List className={classes.list} ref={rootRef}>
      {warningList?.map((item, index) => {
        const deviceCode = item?.device?.code
        const jobType = item?.job?.type
        const planFrom = item?.job?.planFrom
        const factoryCode = item?.device?.factory?.code
        const plantCode = item?.device?.plant?.code
        const plantFloorCode = item?.device?.plantFloor?.code
        const position = item?.device?.position
        const teamCode = item?.job?.assign?.team?.code

        const content = t('dashboard.warningMessage', {
          deviceCode: deviceCode,
          date: convertUtcDateToLocalTz(planFrom),
          team: teamCode ? ` ${teamCode}` : '',
          factory: factoryCode ? ` - ${factoryCode}` : '',
          plant: plantCode ? ` - ${plantCode}` : '',
          floor: plantFloorCode ? ` - ${plantFloorCode}` : '',
          jobType: t(JOB_TYPE_MAP[jobType]),
          position: position ? ` - ${position}` : '',
        })
        return <WarningItem key={index} title={content} />
      })}

      <Box ref={loadMoreRef} sx={{ position: 'relative', p: 1 }}>
        {notiLoading && (
          <CircularProgress
            size={18}
            sx={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-60%)',
            }}
          />
        )}
      </Box>
    </List>
  )
}

export default WarningList
