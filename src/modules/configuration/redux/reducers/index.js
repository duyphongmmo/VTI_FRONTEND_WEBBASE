import { combineReducers } from 'redux'

import companyCustomerSetting from './company-customer-setting'
import defineCostCenter from './define-cost-center'
import defineDivision from './define-division'
import defineSection from './define-section'
import departmentList from './department-list'
import deviceDashboard from './device-dashboard'
import emailNotification from './email-notification'
import holon from './holon'
import notification from './notification'
import roleList from './role-list'
import userInfo from './user-info'
import userManagement from './user-management'
import userPermission from './user-permission'

export default combineReducers({
  companyCustomerSetting,
  departmentList,
  roleList,
  userPermission,
  userInfo,
  defineCostCenter,
  holon,
  emailNotification,
  defineDivision,
  defineSection,
  userManagement,
  notification,
  deviceDashboard
})
