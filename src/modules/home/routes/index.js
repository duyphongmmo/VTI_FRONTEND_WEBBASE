
import { FUNCTION_CODE } from '~/common/constants/functionCode'

import Dashboard from '../dashboard'
import HomePage from '../homepage'
import { ROUTE } from './config'

const route = [
  {
    path: ROUTE.STATUS_DASHBOARD.PATH,
    component: Dashboard,
    code: FUNCTION_CODE.DEVICE_STATUS_DASHBOARD,
    isInSidebar: true,
  },
  {
    path: ROUTE.HOME.PATH,
    component: HomePage,
    isInSidebar: true,
  },
]

export default route
