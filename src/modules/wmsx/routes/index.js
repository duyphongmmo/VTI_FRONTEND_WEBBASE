import ReportExport from '../features/report-export'
import { ROUTE } from './config'

const routes = [
  {
    path: ROUTE.REPORT_EXPORT.PATH,
    name: ROUTE.REPORT_EXPORT.TITLE,
    component: ReportExport,
    icon: 'report',
    isInSidebar: true,
  },
]

export default routes
