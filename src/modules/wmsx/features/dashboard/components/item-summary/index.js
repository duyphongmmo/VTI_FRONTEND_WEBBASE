import { useEffect, useState } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import Summary from '~/components/Summary'
import { getDashboardTicketReport } from '~/modules/wmsx/redux/sagas/dashboard'

function ItemSummary(props) {
  const { t } = useTranslation(['wmsx'])
  const { fromDate, toDate } = props
  const [ticketReports, setTicketReports] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const response = await getTicketReportByType()
      setTicketReports(response.data)
    }
    if (fromDate) {
      // Fetch data for each type
      fetchData()
    }

    return () => {
      // Cleanup function: reset ticketReports state to an empty array
      setTicketReports({})
    }
  }, [fromDate, toDate])
  const getTicketReportByType = async (type) => {
    return await getDashboardTicketReport({
      type: type,
      from: fromDate?.toISOString(),
      to: toDate ? toDate?.toISOString() : fromDate?.toISOString(),
    })
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={6} lg={3}>
        <Summary
          icon="arrowBottom"
          label={t('dashboard.importReceipt.title')}
          props={props}
          value={ticketReports?.totalImportReceipt || 0}
        />
      </Grid>
      <Grid item xs={6} md={6} lg={3}>
        <Summary
          icon="rhombus"
          label={t('dashboard.exportReceipt.title')}
          props={props}
          value={ticketReports?.totalExportReceipt || 0}
        />
      </Grid>
      <Grid item xs={6} md={6} lg={3}>
        <Summary
          icon="cart"
          label={t('dashboard.warehouseTransfer.title')}
          props={props}
          value={ticketReports?.totalTransferReceipt || 0}
        />
      </Grid>
      <Grid item xs={6} md={6} lg={3}>
        <Summary
          icon="bag"
          label={t('dashboard.inventoryCalendar.title')}
          props={props}
          value={ticketReports?.totalInventoryReceipt || 0}
        />
      </Grid>
    </Grid>
  )
}

export default ItemSummary
