import { all } from 'redux-saga/effects'

import doGetCompanyCustomerSettingDetails from './company-customer-setting/get-company-customer-setting'
import watchUpdateCompanyCustomerSetting from './company-customer-setting/update-company-customer-setting'
import watchApproveDefineCostCenter from './define-cost-center/approve'
import watchChangeStatusCostCenter from './define-cost-center/change-status'
import watchCreateCostCenter from './define-cost-center/create'
import watchDeleteCostCenter from './define-cost-center/delete'
import watchGetCostCenterDetail from './define-cost-center/get-detail'
import watchSearchCostCenters from './define-cost-center/search'
import watchUpdateCostCenter from './define-cost-center/update'
import watchApproveDefineDivision from './define-division/approve'
import watchChangeStatusDefineDivision from './define-division/change-status'
import watchCreateDefineDivision from './define-division/create'
import watchDeleteDefineDivision from './define-division/delete'
import watchGetDefineDivisionDetail from './define-division/get-detail'
import watchSearchDefineDivision from './define-division/search'
import watchUpdateDefineDivision from './define-division/update'
import watchApproveDefineSection from './define-section/approve'
import watchChangeStatusDefineSection from './define-section/change-status'
import watchCreateDefineSection from './define-section/create'
import watchDeleteDefineSection from './define-section/delete'
import watchGetDefineSectionDetail from './define-section/get-detail'
import watchSearchDefineSection from './define-section/search'
import watchUpdateDefineSection from './define-section/update'
import watchActiveDepartment from './department-list/active-department'
import watchCreateDepartment from './department-list/create-department'
import watchDeactiveDepartment from './department-list/deactive-department'
import watchGetDepartmentAssignDetails from './department-list/get-department-assign'
import watchGetDepartmentDetails from './department-list/get-department-details'
import watchSearchDepartmentList from './department-list/search-department-list'
import watchUpdateDepartment from './department-list/update-department'
import watchUpdateDepartmentAssign from './department-list/update-department-assign'
import watchCreateEmailNotification from './email-notification/create'
import watchDeleteEmailNotification from './email-notification/delete'
import watchGetEmailNotificationDetails from './email-notification/get-details'
import watchSearchEmailNotification from './email-notification/search'
import watchUpdateEmailNotification from './email-notification/update'
import watchApproveHolon from './holon/approve'
import watchChangeStatusHolon from './holon/change-status'
import watchCreateHolon from './holon/create'
import watchDeleteHolon from './holon/delete'
import watchGetHolonDetail from './holon/get-detail'
import watchSearchHolons from './holon/search'
import watchUpdateHolon from './holon/update'
import { watchChangeNotificationStatus, watchGetNotifications, watchSeenAllNotifications, watchSeenOneNotification } from './notification'
import watchConfirmRoleAssign from './role-list/confirm-role-assign'
import watchCreateRoleAssign from './role-list/create-role-assign'
import watchDeleteRoleAssign from './role-list/delete-role-assign'
import watchGetRoleAssignDetails from './role-list/get-role-assign'
import watchRejectRoleAssign from './role-list/reject-role-assign'
import watchSearchRoleList from './role-list/search-role-list'
import watchUpdateRoleAssign from './role-list/update-role-assign'
import watchChangePassword from './user-info/change-password'
import watchGetUserInfo from './user-info/get-user-info'
import watchUpdateUserInfo from './user-info/update-user-info'
import watchCreateUser from './user-management/create-user'
import watchDeleteUser from './user-management/delete-user'
import watchGenerateOTP from './user-management/generate-otp'
import watchGetUserDetails from './user-management/get-user-details'
import watchResetPassword from './user-management/reset-password'
import watchSearchUsers from './user-management/search-users'
import watchUpdateUser from './user-management/update-user'
import watchVerifyOTP from './user-management/verify-otp-code'
import watchGetUserPermissionDetails from './user-permission/get-user-permission'
import watchUpdateUserPermission from './user-permission/update-user-permission'

/**
 * Root saga
 */
export default function* sagas() {
  yield all([
    doGetCompanyCustomerSettingDetails(),
    watchUpdateCompanyCustomerSetting(),

    //company-chart
    watchSearchDepartmentList(),
    watchGetDepartmentAssignDetails(),
    watchUpdateDepartmentAssign(),
    watchCreateDepartment(),
    watchUpdateDepartment(),
    watchGetDepartmentDetails(),
    watchActiveDepartment(),
    watchDeactiveDepartment(),

    //role-list
    watchGetRoleAssignDetails(),
    watchSearchRoleList(),
    watchUpdateRoleAssign(),
    watchConfirmRoleAssign(),
    watchCreateRoleAssign(),
    watchDeleteRoleAssign(),
    watchRejectRoleAssign(),

    //user-permission
    watchGetUserPermissionDetails(),
    watchUpdateUserPermission(),

    //user-info
    watchUpdateUserInfo(),
    watchChangePassword(),
    watchGetUserInfo(),

    //define-cost-center
    watchDeleteCostCenter(),
    watchGetCostCenterDetail(),
    watchCreateCostCenter(),
    watchSearchCostCenters(),
    watchUpdateCostCenter(),
    watchApproveDefineCostCenter(),
    watchChangeStatusCostCenter(),

    //holon
    watchDeleteHolon(),
    watchGetHolonDetail(),
    watchCreateHolon(),
    watchSearchHolons(),
    watchUpdateHolon(),
    watchApproveHolon(),
    watchChangeStatusHolon(),

    // email-configuration
    watchGetEmailNotificationDetails(),
    watchCreateEmailNotification(),
    watchDeleteEmailNotification(),
    watchUpdateEmailNotification(),
    watchSearchEmailNotification(),

    // define-division
    watchDeleteDefineDivision(),
    watchGetDefineDivisionDetail(),
    watchCreateDefineDivision(),
    watchSearchDefineDivision(),
    watchUpdateDefineDivision(),
    watchApproveDefineDivision(),
    watchChangeStatusDefineDivision(),

    // define-section
    watchDeleteDefineSection(),
    watchGetDefineSectionDetail(),
    watchCreateDefineSection(),
    watchSearchDefineSection(),
    watchUpdateDefineSection(),
    watchApproveDefineSection(),
    watchChangeStatusDefineSection(),

    // user-management
    watchSearchUsers(),
    watchCreateUser(),
    watchUpdateUser(),
    watchDeleteUser(),
    watchGetUserDetails(),
    watchGenerateOTP(),
    watchVerifyOTP(),
    watchResetPassword(),

    watchGetNotifications(),
    watchSeenOneNotification(),
    watchSeenAllNotifications(),
    watchChangeNotificationStatus(),
  ])
}
