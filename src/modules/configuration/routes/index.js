import UserManagement from '~/modules/configuration/feature/user-management'
import UserManagementDetail from '~/modules/configuration/feature/user-management/user-detail'
import UserManagementForm from '~/modules/configuration/feature/user-management/user-form'
import Dashboard from '~/modules/wmsx/features/dashboard'

import DefineDivision from '../feature/define-division'
import DefineDivisionDetail from '../feature/define-division/detail'
import DefineDivisionForm from '../feature/define-division/form'
import DefineSection from '../feature/define-section'
import DefineSectionDetail from '../feature/define-section/detail'
import DefineSectionForm from '../feature/define-section/form'
import DepartmentAssign from '../feature/department-list/assign'
import DepartmentDetail from '../feature/department-list/detail'
import DepartmentForm from '../feature/department-list/form'
import DepartmentList from '../feature/department-list/list'
import RoleDetail from '../feature/role-list/detail'
import DefineRoleForm from '../feature/role-list/form'
import RoleList from '../feature/role-list/list'
import ChangePassword from '../feature/user-info/change-password'
import UserInfoDetail from '../feature/user-info/user-detail'
import UserInfoForm from '../feature/user-info/user-form'
import UserPermission from '../feature/user-permission'
import { ROUTE } from './config'

const routes = [
  {
    name: ROUTE.CONFIGURATION.TITLE,
    path: ROUTE.CONFIGURATION.PATH,
    component: Dashboard,
    icon: 'table',
    isInSidebar: true,
  },
  {
    name: ROUTE.DEPARTMENT_LIST.LIST.TITLE,
    path: ROUTE.DEPARTMENT_LIST.LIST.PATH,
    component: DepartmentList,
    isInSidebar: true,
    // code: FUNCTION_CODE.USER_LIST_DEPARTMENT_SETTING,
    icon: 'warehouseConfig',
    subMenu: [
      {
        name: ROUTE.DEPARTMENT_LIST.ASSIGN.TITLE,
        path: ROUTE.DEPARTMENT_LIST.ASSIGN.PATH,
        component: DepartmentAssign,
        // code: FUNCTION_CODE.USER_DECENTRALIZATION_PERMISSION_GROUP_DEPARTMENT_SETTING,
        isInSidebar: false,
      },
      {
        name: ROUTE.DEPARTMENT_LIST.CREATE.TITLE,
        path: ROUTE.DEPARTMENT_LIST.CREATE.PATH,
        // code: FUNCTION_CODE.USER_CREATE_DEPARTMENT_SETTING,
        component: DepartmentForm,
        isInSidebar: false,
      },
      {
        name: ROUTE.DEPARTMENT_LIST.EDIT.TITLE,
        path: ROUTE.DEPARTMENT_LIST.EDIT.PATH,
        // code: FUNCTION_CODE.USER_UPDATE_DEPARTMENT_SETTING,
        component: DepartmentForm,
        isInSidebar: false,
      },
      {
        name: ROUTE.DEPARTMENT_LIST.DETAIL.TITLE,
        path: ROUTE.DEPARTMENT_LIST.DETAIL.PATH,
        // code: FUNCTION_CODE.USER_DETAIL_DEPARTMENT_SETTING,
        component: DepartmentDetail,
        isInSidebar: false,
      },
    ],
  },
  {
    name: ROUTE.DEFINE_DIVISION.LIST.TITLE,
    path: ROUTE.DEFINE_DIVISION.LIST.PATH,
    component: DefineDivision,
    // code: FUNCTION_CODE.LIST_DIVISION,
    icon: 'warehouseSettings',
    isInSidebar: true,
    subMenu: [
      {
        name: ROUTE.DEFINE_DIVISION.CREATE.TITLE,
        path: ROUTE.DEFINE_DIVISION.CREATE.PATH,
        component: DefineDivisionForm,
        // code: FUNCTION_CODE.CREATE_DIVISION,
        isInSidebar: false,
      },
      {
        name: ROUTE.DEFINE_DIVISION.DETAIL.TITLE,
        path: ROUTE.DEFINE_DIVISION.DETAIL.PATH,
        component: DefineDivisionDetail,
        // code: FUNCTION_CODE.DETAIL_DIVISION,
        isInSidebar: false,
      },
      {
        name: ROUTE.DEFINE_DIVISION.EDIT.TITLE,
        path: ROUTE.DEFINE_DIVISION.EDIT.PATH,
        component: DefineDivisionForm,
        // code: FUNCTION_CODE.UPDATE_DIVISION,
        isInSidebar: false,
      },
    ],
  },
  {
    name: ROUTE.DEFINE_SECTION.LIST.TITLE,
    path: ROUTE.DEFINE_SECTION.LIST.PATH,
    component: DefineSection,
    // code: FUNCTION_CODE.LIST_SECTION,
    icon: 'assign',
    isInSidebar: true,
    subMenu: [
      {
        name: ROUTE.DEFINE_SECTION.CREATE.TITLE,
        path: ROUTE.DEFINE_SECTION.CREATE.PATH,
        component: DefineSectionForm,
        // code: FUNCTION_CODE.CREATE_SECTION,
        isInSidebar: false,
      },
      {
        name: ROUTE.DEFINE_SECTION.DETAIL.TITLE,
        path: ROUTE.DEFINE_SECTION.DETAIL.PATH,
        component: DefineSectionDetail,
        // code: FUNCTION_CODE.DETAIL_SECTION,
        isInSidebar: false,
      },
      {
        name: ROUTE.DEFINE_SECTION.EDIT.TITLE,
        path: ROUTE.DEFINE_SECTION.EDIT.PATH,
        component: DefineSectionForm,
        // code: FUNCTION_CODE.UPDATE_SECTION,
        isInSidebar: false,
      },
    ],
  },
  {
    name: ROUTE.ROLE_LIST.LIST.TITLE,
    path: ROUTE.ROLE_LIST.LIST.PATH,
    component: RoleList,
    icon: 'baseData',
    isInSidebar: true,
    // code: FUNCTION_CODE.USER_LIST_USER_ROLE_SETTING,
    subMenu: [
      {
        name: ROUTE.ROLE_LIST.CREATE.TITLE,
        path: ROUTE.ROLE_LIST.CREATE.PATH,
        // code: FUNCTION_CODE.USER_CREATE_USER_ROLE_SETTING,
        component: DefineRoleForm,
        isInSidebar: false,
      },
      {
        name: ROUTE.ROLE_LIST.EDIT.TITLE,
        path: ROUTE.ROLE_LIST.EDIT.PATH,
        // code: FUNCTION_CODE.USER_UPDATE_USER_ROLE_SETTING,
        component: DefineRoleForm,
        isInSidebar: false,
      },
      {
        name: ROUTE.ROLE_LIST.DETAIL.TITLE,
        path: ROUTE.ROLE_LIST.DETAIL.PATH,
        // code: FUNCTION_CODE.USER_DETAIL_USER_ROLE_SETTING,
        component: RoleDetail,
        isInSidebar: false,
      },
    ],
  },
  {
    name: ROUTE.USER_PERMISSION.TITLE,
    path: ROUTE.USER_PERMISSION.PATH,
    component: UserPermission,
    icon: 'warehouseInventory',
    // code: FUNCTION_CODE.USER_LIST_PERMISSION_USER_ROLE,
    isInSidebar: true,
  },
  {
    name: ROUTE.USER_MANAGEMENT.LIST.TITLE,
    path: ROUTE.USER_MANAGEMENT.LIST.PATH,
    component: UserManagement,
    icon: 'user',
    isInSidebar: true,
    // code: FUNCTION_CODE.USER_LIST_USER,
    subMenu: [
      {
        name: ROUTE.USER_MANAGEMENT.CREATE.TITLE,
        path: ROUTE.USER_MANAGEMENT.CREATE.PATH,
        component: UserManagementForm,
        // code: FUNCTION_CODE.USER_CREATE_USER,
        isInSidebar: false,
      },
      {
        name: ROUTE.USER_MANAGEMENT.DETAIL.TITLE,
        path: ROUTE.USER_MANAGEMENT.DETAIL.PATH,
        component: UserManagementDetail,
        // code: FUNCTION_CODE.USER_DETAIL_USER,
        isInSidebar: false,
      },
      {
        name: ROUTE.USER_MANAGEMENT.EDIT.TITLE,
        path: ROUTE.USER_MANAGEMENT.EDIT.PATH,
        // code: FUNCTION_CODE.USER_UPDATE_USER,
        component: UserManagementForm,
        isInSidebar: false,
      },
    ],
  },
  {
    name: ROUTE.ACCOUNT.DETAIL.TITLE,
    path: ROUTE.ACCOUNT.DETAIL.PATH,
    component: UserInfoDetail,
  },
  {
    name: ROUTE.ACCOUNT.EDIT.TITLE,
    path: ROUTE.ACCOUNT.EDIT.PATH,
    component: UserInfoForm,
  },
  {
    name: ROUTE.ACCOUNT.CHANGE_PASSWORD.TITLE,
    path: ROUTE.ACCOUNT.CHANGE_PASSWORD.PATH,
    component: ChangePassword,
  },
]

export default routes
