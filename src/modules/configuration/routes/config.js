export const ROUTE = {
  CONFIGURATION: {
    PATH: '/configuration',
    TITLE: 'configuration',
  },
  DECENTRALIZATION: {
    PATH: '/decentralization',
    TITLE: 'decentralization',
  },
  USER_MANAGEMENT: {
    LIST: {
      PATH: '/configuration/user-management',
      TITLE: 'userManagement',
    },
    CREATE: {
      PATH: '/configuration/user-management/create',
      TITLE: 'userManagementCreate',
    },
    DETAIL: {
      PATH: '/configuration/user-management/:id/detail',
      TITLE: 'userManagementDetail',
    },
    EDIT: {
      PATH: '/configuration/user-management/:id/edit',
      TITLE: 'userManagementEdit',
    },
  },
  USER_PERMISSION: {
    PATH: '/configuration/user-permission',
    TITLE: 'userPermission',
  },
  COMPANY_CUSTOMER_SETTING: {
    PATH: '/configuration/company-customer-setting',
    TITLE: 'companyCustomerSetting',
  },
  COMPANY_CHART: {
    LIST: {
      PATH: '/configuration/company-chart',
      TITLE: 'companyChart',
    },
  },
  DEPARTMENT_LIST: {
    LIST: {
      PATH: '/configuration/department-management',
      TITLE: 'defineDepartment',
    },
    CREATE: {
      PATH: '/configuration/department-management/create',
      TITLE: 'departmentCreate',
    },
    DETAIL: {
      PATH: '/configuration/department-management/:id/detail',
      TITLE: 'departmentDetail',
    },
    EDIT: {
      PATH: '/configuration/department-management/:id/edit',
      TITLE: 'departmentEdit',
    },
    ASSIGN: {
      PATH: '/configuration/department-management/:id/assign',
      TITLE: 'departmentAssign',
    },
  },
  ROLE_LIST: {
    LIST: {
      PATH: '/configuration/role-list',
      TITLE: 'defineRole',
    },
    CREATE: {
      PATH: '/configuration/role-list/create',
      TITLE: 'defineRoleCreate',
    },
    EDIT: {
      PATH: '/configuration/role-list/:id/edit',
      TITLE: 'defineRoleUpdate',
    },
    DETAIL: {
      PATH: '/configuration/role-list/:id/detail',
      TITLE: 'defineRoleDetail',
    },
  },
  ACCOUNT: {
    DETAIL: {
      PATH: '/configuration/account',
      TITLE: 'userInfoDetail',
    },
    EDIT: {
      PATH: '/configuration/account/edit',
      TITLE: 'userInfoEdit',
    },
    CHANGE_PASSWORD: {
      PATH: '/configuration/account/change-password',
      TITLE: 'changePassword',
    },
  },
  DEFINE_DIVISION: {
    LIST: {
      PATH: '/configuration/define-division',
      TITLE: 'defineDivision',
    },
    CREATE: {
      PATH: '/configuration/define-division/create',
      TITLE: 'defineDivisionCreate',
    },
    DETAIL: {
      PATH: '/configuration/define-division/:id/detail',
      TITLE: 'defineDivisionDetail',
    },
    EDIT: {
      PATH: '/configuration/define-division/:id/edit',
      TITLE: 'defineDivisionEdit',
    },
  },
  DEFINE_SECTION: {
    LIST: {
      PATH: '/configuration/define-section',
      TITLE: 'defineSection',
    },
    CREATE: {
      PATH: '/configuration/define-section/create',
      TITLE: 'defineSectionCreate',
    },
    DETAIL: {
      PATH: '/configuration/define-section/:id/detail',
      TITLE: 'defineSectionDetail',
    },
    EDIT: {
      PATH: '/configuration/define-section/:id/edit',
      TITLE: 'defineSectionEdit',
    },
  },
  DEFINE_COST_CENTER: {
    LIST: {
      PATH: '/configuration/define-cost-center',
      TITLE: 'defineCostCenter',
    },
    CREATE: {
      PATH: '/configuration/define-cost-center/create',
      TITLE: 'defineCostCenterCreate',
    },
    DETAIL: {
      PATH: '/configuration/define-cost-center/:id/detail',
      TITLE: 'defineCostCenterDetail',
    },
    EDIT: {
      PATH: '/configuration/define-cost-center/:id/edit',
      TITLE: 'defineCostCenterEdit',
    },
  },
  HOLON: {
    LIST: {
      PATH: '/configuration/holon',
      TITLE: 'holon',
    },
    CREATE: {
      PATH: '/configuration/holon/create',
      TITLE: 'holonCreate',
    },
    DETAIL: {
      PATH: '/configuration/holon/:id/detail',
      TITLE: 'holonDetail',
    },
    EDIT: {
      PATH: '/configuration/holon/:id/edit',
      TITLE: 'holonEdit',
    },
  },
  EMAIL_NOTIFICATION: {
    LIST: {
      PATH: '/configuration/email-notification',
      TITLE: 'emailNotification',
    },
  },
  LOCATION: {
    LIST: {
      PATH: '/configuration/location',
      TITLE: 'location',
    },
    CREATE: {
      PATH: '/configuration/location/create',
      TITLE: 'locationCreate',
    },
    DETAIL: {
      PATH: '/configuration/location/:id/detail',
      TITLE: 'locationDetail',
    },
    EDIT: {
      PATH: '/configuration/location/:id/edit',
      TITLE: 'locationEdit',
    },
  },
  SYSTEM_ACCESS_HISTORY: {
    LIST: {
      PATH: '/configuration/system-access-history',
      TITLE: 'systemAccessHistory',
    },
  },
}
