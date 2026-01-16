import React from 'react'

import { Card, Grid } from '@mui/material'


import useDeviceDashboard from '~/modules/configuration/redux/hooks/useDeviceDashboard'

import { STATUS_FILTER_TYPE } from '../../constants'
import DeviceStatusFilterChart from './status-chart'

const StatusDashboard = ({ setQuickFilters, quickFilters, type }) => {
  const {
    data: { detailStatus },
  } = useDeviceDashboard()
  return (
    <Card
      sx={{
        minHeight: 300,
      }}
    >
      <Grid container>
        <Grid item xs={12}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={3}
            sx={{
              py: 1,
              pr: 4,
              pl: 2,
              pb: 0,
            }}
          >
            {detailStatus?.map((item) => {
              let title = ''
              let filter = null

              switch (type) {
                case STATUS_FILTER_TYPE.FACTORY:
                  title = item?.factory?.name
                  filter = {
                    ...quickFilters,
                    factory: item?.factory,
                  }
                  break

                case STATUS_FILTER_TYPE.PLANT:
                  title = item?.plant?.name
                  filter = {
                    ...quickFilters,
                    plant: {
                      ...item?.plant,
                      id: item?.plant?.id,
                      floorName: item?.plant?.name,
                      floorCode: item?.plant?.code,
                      plantFloorDetails: item?.plant?.plantFloorDetails,
                    },
                  }
                  break

                case STATUS_FILTER_TYPE.PLANT_FLOOR:
                  title = item?.plantFloor?.name
                  filter = {
                    ...quickFilters,
                    floor: item?.plantFloor,
                  }
                  break

                default:
                  break
              }

              return (
                <Grid
                  item
                  sm={12}
                  md={6}
                  lg={4}
                  sx={{
                    height: 300,
                    maxWidth: '100%',
                    pb: 0,
                  }}
                >
                  <DeviceStatusFilterChart
                    title={title}
                    valueStatus={item?.statusCount}
                    total={Number(item?.total)}
                    onClick={() => {
                      setQuickFilters(filter)
                    }}
                  />
                </Grid>
              )
            })}
          </Grid>
        </Grid>
      </Grid>
    </Card>
  )
}

export default StatusDashboard
