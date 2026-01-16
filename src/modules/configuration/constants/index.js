export const ORDER_TYPE_ENUM = {
  PO: 1,
  PRO: 2,
  SO: 3,
  Transfer: 4,
}

export const ORDER_STATUS = {
  PENDING: 0,
  CONFIRMED: 1,
  IN_PROGRESS: 2,
  APPROVED: 3,
  COMPLETED: 4,
  REJECTED: 5,
}

export const TRANSFER_TYPE = {
  ONE_STEP: 0,
  TWO_STEP: 1,
}

export const TRANSFER_STATUS_ENUM = {
  CREATED: 0,
  PENDING: 1,
  COMPLETED: 2,
  REJECTED: 3,
}

export const INVENTORY_STATUS = {
  CREATED: 1,
  CONFIRMED: 2,
  REJECT: 3,
  COMPLETE: 4,
  IN_PROGRESS: 5,
}

export const ORDER_STATUS_MAP = {
  [ORDER_STATUS.PENDING]: 'orderStatus.pending',
  [ORDER_STATUS.CONFIRMED]: 'orderStatus.confirmed',
  [ORDER_STATUS.IN_PROGRESS]: 'orderStatus.inProgress',
  [ORDER_STATUS.APPROVED]: 'orderStatus.approved',
  [ORDER_STATUS.REJECTED]: 'orderStatus.rejected',
  [ORDER_STATUS.COMPLETED]: 'orderStatus.completed',
}

export const ORDER_STATUS_OPTIONS = [
  {
    id: 0,
    text: 'orderStatus.pending',
    color: 'pending',
  },
  {
    id: 1,
    text: 'orderStatus.confirmed',
    color: 'confirmed',
  },
  {
    id: 2,
    text: 'orderStatus.inProgress',
    color: 'inProgress',
  },
  {
    id: 3,
    text: 'orderStatus.approved',
    color: 'approved',
  },
  {
    id: 4,
    text: 'orderStatus.completed',
    color: 'completed',
  },
  {
    id: 5,
    text: 'orderStatus.rejected',
    color: 'rejected',
  },
]

export const TRANSFER_STATUS_OPTIONS = [
  {
    id: 0,
    text: 'warehouseTransfer.transferStatus.created',
  },
  {
    id: 1,
    text: 'warehouseTransfer.transferStatus.pending',
  },
  {
    id: 2,
    text: 'warehouseTransfer.transferStatus.completed',
  },
  {
    id: 3,
    text: 'warehouseTransfer.transferStatus.rejected',
  },
]

export const MOVEMENT_TYPE = {
  PO_IMPORT: 0,
  PO_EXPORT: 1,
  PRO_IMPORT: 2,
  PRO_EXPORT: 3,
  SO_IMPORT: 4,
  SO_EXPORT: 5,
  TRANSFER_IMPORT: 6,
  TRANSFER_EXPORT: 7,
}

export const MOVEMENT_STATUS = [
  { id: 0, text: 'Chờ xác nhận' },
  { id: 1, text: 'Xác nhận' },
]

export const DEFAULT_UNITS = [
  {
    id: 1,
    name: 'cm',
  },
  {
    id: 2,
    name: 'dm',
  },
  {
    id: 3,
    name: 'm',
  },
]

export const DEFAULT_UNITS_MAP = {
  1: 'cm',
  2: 'dm',
  3: 'm',
}

export const WEIGHT_UNITS = [
  {
    id: 1,
    name: 'g',
  },
  {
    id: 2,
    name: 'kg',
  },
  {
    id: 3,
    name: 'tấn',
  },
]

export const WEIGHT_UNITS_MAP = {
  1: 'g',
  2: 'kg',
  3: 'tấn',
}

export const BOM_STATUS = {
  PENDING: 0,
  CONFIRMED: 1,
  // IN_PROGRESS: 2,
  // APPROVED: 3,
  // COMPLETED: 4,
  // REJECTED: 5,
}
export const BOM_STATUS_MAP = {
  [BOM_STATUS.PENDING]: 'bomStatus.pending',
  [BOM_STATUS.CONFIRMED]: 'bomStatus.confirmed',
  // [BOM_STATUS.IN_PROGRESS]: 'bomStatus.inProgress',
  // [BOM_STATUS.APPROVED]: 'bomStatus.approved',
  // [BOM_STATUS.REJECTED]: 'bomStatus.rejected',
  // [BOM_STATUS.COMPLETED]: 'bomStatus.completed',
}
export const BOM_STATUS_OPTIONS = [
  {
    id: 0,
    text: 'bomStatus.pending',
    color: 'pending',
  },
  {
    id: 1,
    text: 'bomStatus.confirmed',
    color: 'confirmed',
  },
  // {
  //   id: 2,
  //   text: 'bomStatus.inProgress',
  //   color: 'inprogress',
  // },
  // {
  //   id: 3,
  //   text: 'bomStatus.approved',
  //   color: 'approved',
  // },
  // {
  //   id: 4,
  //   text: 'bomStatus.completed',
  //   color: 'completed',
  // },
  // {
  //   id: 5,
  //   text: 'bomStatus.rejected',
  //   color: 'rejected',
  // },
]

export const BOM_STATUS_TO_DELETE = [BOM_STATUS.PENDING, BOM_STATUS.REJECTED]
export const BOM_STATUS_TO_CONFIRM = [BOM_STATUS.PENDING, BOM_STATUS.REJECTED]
export const BOM_STATUS_TO_EDIT = [BOM_STATUS.PENDING, BOM_STATUS.REJECTED]
export const BOM_STATUS_TO_CREATE_WORK_ORDER = [
  BOM_STATUS.CONFIRMED,
  BOM_STATUS.COMPLETED,
]

export const PRODUCING_STEP_STATUS = {
  PENDING: 0,
  CONFIRMED: 1,
  REJECTED: 2,
  IN_PROGRESS: 3,
  COMPLETED: 4,
  APPROVED: 5,
}
export const PRODUCING_STEP_STATUS_MAP = {
  [PRODUCING_STEP_STATUS.PENDING]: 'producingStepStatus.pending',
  [PRODUCING_STEP_STATUS.CONFIRMED]: 'producingStepStatus.confirmed',
  [PRODUCING_STEP_STATUS.IN_PROGRESS]: 'producingStepStatus.inProgress',
  [PRODUCING_STEP_STATUS.APPROVED]: 'producingStepStatus.approved',
  [PRODUCING_STEP_STATUS.REJECTED]: 'producingStepStatus.rejected',
  [PRODUCING_STEP_STATUS.COMPLETED]: 'producingStepStatus.completed',
}
export const PRODUCING_STEP_OPTIONS = [
  {
    id: 0,
    text: 'producingStepStatus.pending',
    color: 'pending',
  },
  {
    id: 1,
    text: 'producingStepStatus.confirmed',
    color: 'confirmed',
  },
]
export const PRODUCING_STEP_STATUS_TO_CONFIRM = [
  PRODUCING_STEP_STATUS.PENDING,
  PRODUCING_STEP_STATUS.REJECTED,
]

export const PRODUCING_STEP_STATUS_TO_EDIT = [
  PRODUCING_STEP_STATUS.PENDING,
  PRODUCING_STEP_STATUS.REJECTED,
]

export const PRODUCING_STEP_STATUS_TO_DELETE = [
  PRODUCING_STEP_STATUS.PENDING,
  PRODUCING_STEP_STATUS.REJECTED,
]
export const WORK_TIME_OPTIONS = [
  {
    id: 0,
    name: 'workCenter.workTime.standard',
  },
  {
    id: 1,
    name: 'workCenter.workTime.other',
  },
]

export const SALE_ORDER_STATUS = {
  PENDING: 0,
  CONFIRMED: 1,
}

export const SALE_ORDER_STATUS_MAP = {
  [SALE_ORDER_STATUS.PENDING]: 'orderStatus.pending',
  [SALE_ORDER_STATUS.CONFIRMED]: 'orderStatus.confirmed',
}

export const SALE_ORDER_STATUS_OPTIONS = [
  {
    id: 0,
    text: 'orderStatus.pending',
    color: 'pending',
  },
  {
    id: 1,
    text: 'orderStatus.confirmed',
    color: 'confirmed',
  },
]

export const WORK_CENTER_STATUS = {
  PENDING: 0,
  CONFIRMED: 1,
  IN_PROGRESS: 2,
  APPROVED: 3,
  COMPLETED: 4,
  REJECTED: 5,
}
export const WORK_CENTER_STATUS_MAP = {
  [WORK_CENTER_STATUS.PENDING]: 'workCenterStatus.pending',
  [WORK_CENTER_STATUS.CONFIRMED]: 'workCenterStatus.confirmed',
  [WORK_CENTER_STATUS.IN_PROGRESS]: 'workCenterStatus.inProgress',
  [WORK_CENTER_STATUS.APPROVED]: 'workCenterStatus.approved',
  [WORK_CENTER_STATUS.REJECTED]: 'workCenterStatus.rejected',
  [WORK_CENTER_STATUS.COMPLETED]: 'workCenterStatus.completed',
}
export const WORK_CENTER_STATUS_OPTIONS = [
  {
    id: 0,
    text: 'workCenterStatus.pending',
    color: 'pending',
  },
  {
    id: 2,
    text: 'workCenterStatus.confirmed',
    color: 'confirmed',
  },
]
export const WORK_CENTER_STATUS_TO_CONFIRM = [
  WORK_CENTER_STATUS.PENDING,
  WORK_CENTER_STATUS.REJECTED,
]
export const WORK_CENTER_STATUS_TO_EDIT = [
  WORK_CENTER_STATUS.PENDING,
  WORK_CENTER_STATUS.REJECTED,
]
export const WORK_CENTER_STATUS_CONFIRM_TO_EDIT = [
  WORK_CENTER_STATUS.IN_PROGRESS,
]
export const WORK_CENTER_STATUS_TO_DELETE = [
  WORK_CENTER_STATUS.PENDING,
  WORK_CENTER_STATUS.REJECTED,
]
export const EVENT_TYPE_OPTIONS = [
  { id: 0, name: 'planCalendar.holiday' },
  { id: 1, name: 'planCalendar.workingDay' },
]

export const USER_MANAGEMENT_STATUS = {
  TEMP_LOCKED: 0,
  ACTIVE: 1,
}

export const USER_MANAGEMENT_STATUS_MAP = {
  [USER_MANAGEMENT_STATUS.TEMP_LOCKED]: 'userStatus.tempLocked',
  [USER_MANAGEMENT_STATUS.ACTIVE]: 'userStatus.active',
}

export const USER_MANAGEMENT_STATUS_OPTIONS = [
  {
    id: 0,
    text: 'userStatus.tempLocked',
    color: 'tempLocked',
  },
  {
    id: 1,
    text: 'userStatus.active',
    color: 'active',
  },
]

export const MASTER_PLAN_STATUS_OPTIONS = [
  {
    id: 0,
    text: 'masterPlanStatus.created',
    color: 'created',
  },
  {
    id: 1,
    text: 'masterPlanStatus.confirmed',
    color: 'confirmed',
  },
  {
    id: 2,
    text: 'masterPlanStatus.rejected',
    color: 'rejected',
  },
  {
    id: 3,
    text: 'masterPlanStatus.inProgress',
    color: 'inProgress',
  },
  {
    id: 4,
    text: 'masterPlanStatus.completed',
    color: 'completed',
  },
]

export const MASTER_PLAN_STATUS = {
  CREATED: 0,
  CONFIRMED: 1,
  REJECTED: 2,
  IN_PROGRESS: 3,
  COMPLETED: 4,
}

export const PROGRESS_MANUFACTURING_BY_WORK_CENTER_STATUS = {
  PENDING: 0,
  CONFIRMED: 1,
  IN_PROGRESS: 2,
  COMPLETED: 3,
  REJECTED: 4,
}

export const PROGRESS_MANUFACTURING_BY_WORK_CENTER_STATUS_MAP = {
  [PROGRESS_MANUFACTURING_BY_WORK_CENTER_STATUS.PENDING]: 'orderStatus.pending',
  [PROGRESS_MANUFACTURING_BY_WORK_CENTER_STATUS.CONFIRMED]:
    'orderStatus.confirmed',
  [PROGRESS_MANUFACTURING_BY_WORK_CENTER_STATUS.IN_PROGRESS]:
    'orderStatus.inProgress',
  [PROGRESS_MANUFACTURING_BY_WORK_CENTER_STATUS.COMPLETED]:
    'orderStatus.completed',
  [PROGRESS_MANUFACTURING_BY_WORK_CENTER_STATUS.REJECTED]:
    'orderStatus.rejected',
}

export const PROGRESS_MANUFACTURING_BY_WORK_CENTER_STATUS_OPTIONS = [
  {
    id: 0,
    text: 'orderStatus.pending',
    color: 'pending',
  },
  {
    id: 1,
    text: 'orderStatus.confirmed',
    color: 'confirmed',
  },
  {
    id: 2,
    text: 'orderStatus.inProgress',
    color: 'inProgress',
  },
  {
    id: 3,
    text: 'orderStatus.completed',
    color: 'completed',
  },
  {
    id: 4,
    text: 'orderStatus.rejected',
    color: 'rejected',
  },
]

export const TYPE_ENUM_EXPORT = {
  // @TODO: <linh.taquang> add type number export
  COMPANY: 1,
  FACTORY: 2,
}

export const MAINTENANCE_PLAN_UNIT_TYPE_ENUM = {
  MONTH: 0,
  YEAR: 1,
}

export const REPORT_JOB_TYPE_ENUM = {
  PERIOD_MAINTENANCE: 0, // bảo trì
  MAINTENANCE: 1, // bảo dưỡng
}

export const COST_CENTER_STATUS = {
  DRAFT: 0,
  APPROVED: 1,
  INACTIVE: 2,
  ACTIVE: 3,
  DELETED: 4,
}

export const COST_CENTER_STATUS_MAP = {
  [COST_CENTER_STATUS.DRAFT]: 'defineCostCenter.status.draft',
  [COST_CENTER_STATUS.INACTIVE]: 'defineCostCenter.status.inactive',
  [COST_CENTER_STATUS.ACTIVE]: 'defineCostCenter.status.active',
}

export const COST_CENTER_STATUS_OPTIONS = [
  {
    id: COST_CENTER_STATUS.DRAFT,
    text: 'defineCostCenter.status.draft',
    color: 'draft',
  },
  {
    id: COST_CENTER_STATUS.INACTIVE,
    text: 'defineCostCenter.status.inactive',
    color: 'pending',
  },
  {
    id: COST_CENTER_STATUS.ACTIVE,
    text: 'defineCostCenter.status.active',
    color: 'confirmed',
  },
]

export const COST_CENTER_TYPE = {
  MACHINING: 1,
  ASSEMBLY: 3,
  OTHERS: 2,
}

export const COST_CENTER_TYPE_MAP_VN = {
  [COST_CENTER_TYPE.ASSEMBLY]: 'defineCostCenter.typeVn.assembly',
  [COST_CENTER_TYPE.MACHINING]: 'defineCostCenter.typeVn.machining',
  [COST_CENTER_TYPE.OTHERS]: 'defineCostCenter.typeVn.others',
}

export const COST_CENTER_TYPE_MAP_EN = {
  [COST_CENTER_TYPE.ASSEMBLY]: 'defineCostCenter.typeEn.assembly',
  [COST_CENTER_TYPE.MACHINING]: 'defineCostCenter.typeEn.machining',
  [COST_CENTER_TYPE.OTHERS]: 'defineCostCenter.typeEn.others',
}

export const COST_CENTER_TYPE_MAP_JP = {
  [COST_CENTER_TYPE.ASSEMBLY]: 'defineCostCenter.typeJp.assembly',
  [COST_CENTER_TYPE.MACHINING]: 'defineCostCenter.typeJp.machining',
  [COST_CENTER_TYPE.OTHERS]: 'defineCostCenter.typeJp.others',
}

export const COST_CENTER_TYPE_OPTIONS = [
  {
    id: 1,
    text: 'defineCostCenter.typeVn.machining',
  },
  {
    id: 3,
    text: 'defineCostCenter.typeVn.assembly',
  },
  {
    id: 2,
    text: 'defineCostCenter.typeVn.others',
  },
]

export const TOTALIZING_NAME = {
  OVERHEAD: 3,
  ADMINISTRATION_COMMON: 5,
  GENERAL_ADMINISTRATION: 2,
  PRODUCTION_COMMON: 6,
  DIRECT: 7,
  SELLING_EXPENSE: 1,
  TRANSFER: 4,
}

export const TOTALIZING_NAME_OPTIONS = [
  {
    id: 3,
    text: 'defineCostCenter.totalizingNameVn.overhead',
  },
  {
    id: 5,
    text: 'defineCostCenter.totalizingNameVn.administrationCommon',
  },
  {
    id: 2,
    text: 'defineCostCenter.totalizingNameVn.generalAdministration',
  },
  {
    id: 6,
    text: 'defineCostCenter.totalizingNameVn.productionCommon',
  },
  {
    id: 7,
    text: 'defineCostCenter.totalizingNameVn.direct',
  },
  {
    id: 1,
    text: 'defineCostCenter.totalizingNameVn.sellingExpense',
  },
  {
    id: 4,
    text: 'defineCostCenter.totalizingNameVn.transfer',
  },
]

export const TOTALIZING_NAME_MAP_VN = {
  [TOTALIZING_NAME.OVERHEAD]: 'defineCostCenter.totalizingNameVn.overhead',
  [TOTALIZING_NAME.ADMINISTRATION_COMMON]:
    'defineCostCenter.totalizingNameVn.administrationCommon',
  [TOTALIZING_NAME.GENERAL_ADMINISTRATION]:
    'defineCostCenter.totalizingNameVn.generalAdministration',
  [TOTALIZING_NAME.PRODUCTION_COMMON]:
    'defineCostCenter.totalizingNameVn.productionCommon',
  [TOTALIZING_NAME.DIRECT]: 'defineCostCenter.totalizingNameVn.direct',
  [TOTALIZING_NAME.SELLING_EXPENSE]:
    'defineCostCenter.totalizingNameVn.sellingExpense',
  [TOTALIZING_NAME.TRANSFER]: 'defineCostCenter.totalizingNameVn.transfer',
}

export const TOTALIZING_NAME_MAP_EN = {
  [TOTALIZING_NAME.OVERHEAD]: 'defineCostCenter.totalizingNameEn.overhead',
  [TOTALIZING_NAME.ADMINISTRATION_COMMON]:
    'defineCostCenter.totalizingNameEn.administrationCommon',
  [TOTALIZING_NAME.GENERAL_ADMINISTRATION]:
    'defineCostCenter.totalizingNameEn.generalAdministration',
  [TOTALIZING_NAME.PRODUCTION_COMMON]:
    'defineCostCenter.totalizingNameEn.productionCommon',
  [TOTALIZING_NAME.DIRECT]: 'defineCostCenter.totalizingNameEn.direct',
  [TOTALIZING_NAME.SELLING_EXPENSE]:
    'defineCostCenter.totalizingNameEn.sellingExpense',
  [TOTALIZING_NAME.TRANSFER]: 'defineCostCenter.totalizingNameEn.transfer',
}

export const TOTALIZING_NAME_MAP_JP = {
  [TOTALIZING_NAME.OVERHEAD]: 'defineCostCenter.totalizingNameJp.overhead',
  [TOTALIZING_NAME.ADMINISTRATION_COMMON]:
    'defineCostCenter.totalizingNameJp.administrationCommon',
  [TOTALIZING_NAME.GENERAL_ADMINISTRATION]:
    'defineCostCenter.totalizingNameJp.generalAdministration',
  [TOTALIZING_NAME.PRODUCTION_COMMON]:
    'defineCostCenter.totalizingNameJp.productionCommon',
  [TOTALIZING_NAME.DIRECT]: 'defineCostCenter.totalizingNameJp.direct',
  [TOTALIZING_NAME.SELLING_EXPENSE]:
    'defineCostCenter.totalizingNameJp.sellingExpense',
  [TOTALIZING_NAME.TRANSFER]: 'defineCostCenter.totalizingNameJp.transfer',
}

export const HOLON_STATUS = {
  DRAFT: 0,
  INACTIVE: 1,
  ACTIVE: 2,
}

export const HOLON_STATUS_MAP = {
  [HOLON_STATUS.DRAFT]: 'holon.status.draft',
  [HOLON_STATUS.INACTIVE]: 'holon.status.inactive',
  [HOLON_STATUS.ACTIVE]: 'holon.status.active',
}

export const HOLON_STATUS_OPTIONS = [
  {
    id: HOLON_STATUS.DRAFT,
    text: 'holon.status.draft',
    color: 'draft',
  },
  {
    id: HOLON_STATUS.INACTIVE,
    text: 'holon.status.inactive',
    color: 'pending',
  },
  {
    id: HOLON_STATUS.ACTIVE,
    text: 'holon.status.active',
    color: 'confirmed',
  },
]

export const FIELDS_LOG_HISTORY_COST_CENTER = {
  STATUS: 'status',
  EN_NAME: 'eName',
  VN_NAME: 'vName',
  JP_NAME: 'jName',
  FACTORY_ID: 'factoryId',
  SECTION_ID: 'sectionId',
  DEPARTMENT_ID: 'departmentId',
  TOTALIZING_NAME: 'totalizingName',
  ITEM_CLASSIFICATION: 'itemClassification',
  E_BUSINESS_CLASSIFICATION: 'eBusinessClassification',
  J_BUSINESS_CLASSIFICATION: 'jBusinessClassification',
  R_SIGN: 'rSign',
  ABC: 'abc',
  TYPE: 'type',
}

export const FIELDS_LOG_HISTORY_COST_CENTER_MAP = {
  [FIELDS_LOG_HISTORY_COST_CENTER.STATUS]: 'general:common.status',
  [FIELDS_LOG_HISTORY_COST_CENTER.EN_NAME]: 'defineCostCenter.name',
  [FIELDS_LOG_HISTORY_COST_CENTER.VN_NAME]: 'defineCostCenter.vName',
  [FIELDS_LOG_HISTORY_COST_CENTER.JP_NAME]: 'defineCostCenter.jName',
  [FIELDS_LOG_HISTORY_COST_CENTER.FACTORY_ID]:
    'defineCostCenter.departmentInfoTab.factory',
  [FIELDS_LOG_HISTORY_COST_CENTER.SECTION_ID]:
    'defineCostCenter.departmentInfoTab.section',
  [FIELDS_LOG_HISTORY_COST_CENTER.DEPARTMENT_ID]:
    'defineCostCenter.departmentInfoTab.department',
  [FIELDS_LOG_HISTORY_COST_CENTER.TOTALIZING_NAME]:
    'defineCostCenter.generalInfo.totalizingNameVn',
  [FIELDS_LOG_HISTORY_COST_CENTER.ITEM_CLASSIFICATION]:
    'defineCostCenter.departmentInfoTab.itemType',
  [FIELDS_LOG_HISTORY_COST_CENTER.E_BUSINESS_CLASSIFICATION]:
    'defineCostCenter.addInfoTab.businessTypeEn',
  [FIELDS_LOG_HISTORY_COST_CENTER.J_BUSINESS_CLASSIFICATION]:
    'defineCostCenter.addInfoTab.businessTypeJp',
  [FIELDS_LOG_HISTORY_COST_CENTER.R_SIGN]:
    'defineCostCenter.addInfoTab.symbolR',
  [FIELDS_LOG_HISTORY_COST_CENTER.ABC]: 'defineCostCenter.addInfoTab.abc',
  [FIELDS_LOG_HISTORY_COST_CENTER.TYPE]:
    'defineCostCenter.generalInfo.assemblyOrMachiningVn',
}

export const FIELDS_LOG_HISTORY_DIVISION = {
  STATUS: 'status',
  EN_NAME: 'eName',
  VN_NAME: 'vName',
  JP_NAME: 'jName',
  DESCRIPTION: 'description',
  DEPARTMENT_ID: 'departmentId',
}

export const FIELDS_LOG_HISTORY_DIVISION_MAP = {
  [FIELDS_LOG_HISTORY_DIVISION.STATUS]: 'general:common.status',
  [FIELDS_LOG_HISTORY_DIVISION.EN_NAME]: 'defineDivision.eName',
  [FIELDS_LOG_HISTORY_DIVISION.VN_NAME]: 'defineDivision.vName',
  [FIELDS_LOG_HISTORY_DIVISION.JP_NAME]: 'defineDivision.jName',
  [FIELDS_LOG_HISTORY_DIVISION.DESCRIPTION]: 'defineDivision.description',
  [FIELDS_LOG_HISTORY_DIVISION.DEPARTMENT_ID]: 'defineDivision.department',
}

export const FIELDS_LOG_HISTORY_SECTION = {
  STATUS: 'status',
  EN_NAME: 'eName',
  VN_NAME: 'vName',
  JP_NAME: 'jName',
  DESCRIPTION: 'description',
  DIVISION_ID: 'divisionId',
}

export const FIELDS_LOG_HISTORY_SECTION_MAP = {
  [FIELDS_LOG_HISTORY_SECTION.STATUS]: 'general:common.status',
  [FIELDS_LOG_HISTORY_SECTION.EN_NAME]: 'defineSection.enName',
  [FIELDS_LOG_HISTORY_SECTION.VN_NAME]: 'defineSection.viName',
  [FIELDS_LOG_HISTORY_SECTION.JP_NAME]: 'defineSection.jpName',
  [FIELDS_LOG_HISTORY_SECTION.DESCRIPTION]: 'defineSection.description',
  [FIELDS_LOG_HISTORY_SECTION.DIVISION_ID]: 'defineSection.division',
}

export const EMAIL_FUNCTION_TYPE = {
  ITEM_STOCK_EXPIRATION_WARNING: 1,
  INVOICE_ADJUSTMENT: 2,
  CANCEL_AND_REPLACE_INVOICE: 3,
  APPROVAL_PRODUCTION_PLAN: 4,
  APPROVAL_EXPORT_PLAN: 5,
  APPROVAL_EXPORT_COMPONENTS_WHEN_EXCEEDS_BOM: 6,
  REQUEST_WAREHOUSE_FINISHED_PRODUCTS: 7,
  NOTIFICATION_OF_UNANSWERED_ORDERS: 8,
  REQUEST_APPROVAL_OF_RETURN_WAREHOUSE: 9,
}

export const EMAIL_FUNCTION_TYPE_MAP = {
  [EMAIL_FUNCTION_TYPE.ITEM_STOCK_EXPIRATION_WARNING]:
    'emailNotification.functionList.itemStockExpirationWarning',
}

export const EMAIL_FUNCTION_TYPE_OPTIONS = [
  {
    id: EMAIL_FUNCTION_TYPE.ITEM_STOCK_EXPIRATION_WARNING,
    text: 'emailNotification.functionList.itemStockExpirationWarning',
  },
]

export const FIELDS_LOG_HISTORY_HOLON = {
  STATUS: 'status',
  NAME: 'name',
  DESCRIPTION: 'description',
}

export const FIELDS_LOG_HISTORY_HOLON_MAP = {
  [FIELDS_LOG_HISTORY_HOLON.STATUS]: 'general:common.status',
  [FIELDS_LOG_HISTORY_HOLON.NAME]: 'holon.name',
  [FIELDS_LOG_HISTORY_HOLON.DESCRIPTION]: 'holon.description',
}

export const DEFINE_DIVISION_ENUM = {
  DRAFT: 0,
  INACTIVE: 2,
  ACTIVE: 3,
}

export const DEFINE_DIVISION_ENUM_MAP = {
  [DEFINE_DIVISION_ENUM.DRAFT]: 'defineDivision.status.draft',
  [DEFINE_DIVISION_ENUM.INACTIVE]: 'defineDivision.status.inactive',
  [DEFINE_DIVISION_ENUM.ACTIVE]: 'defineDivision.status.active',
}

export const DEFINE_DIVISION_ENUM_OPTIONS = [
  {
    id: 0,
    text: 'defineDivision.status.draft',
    color: 'created',
  },
  {
    id: 2,
    text: 'defineDivision.status.inactive',
    color: 'inactive',
  },
  {
    id: 3,
    text: 'defineDivision.status.active',
    color: 'active',
  },
]

export const DEFINE_SECTION_ENUM = {
  DRAFT: 0,
  APPROVED: 1,
  INACTIVE: 2,
  ACTIVE: 3,
  DELETED: 4,
}

export const DEFINE_SECTION_ENUM_MAP = {
  [DEFINE_SECTION_ENUM.DRAFT]: 'defineSection.status.draft',
  [DEFINE_SECTION_ENUM.APPROVED]: 'defineSection.status.approved',
  [DEFINE_SECTION_ENUM.INACTIVE]: 'defineSection.status.inactive',
  [DEFINE_SECTION_ENUM.ACTIVE]: 'defineSection.status.active',
  [DEFINE_SECTION_ENUM.DELETED]: 'defineSection.status.deleted',
}

export const DEFINE_SECTION_ENUM_OPTIONS = [
  {
    id: 0,
    text: 'defineSection.status.draft',
    color: 'created',
  },
  {
    id: 2,
    text: 'defineSection.status.inactive',
    color: 'inactive',
  },
  {
    id: 3,
    text: 'defineSection.status.active',
    color: 'active',
  },
]

export const STATUS_TYPE = {
  INACTIVE: 0,
  ACTIVE: 1,
}

const ACCESS_HISTORY_STATUS_TYPE = {
  ERROR: 0,
  SUCCESS: 1,
}

export const ACCESS_HISTORY_STATUS_OPTION = [
  {
    id: ACCESS_HISTORY_STATUS_TYPE.ERROR,
    text: 'systemAccessHistory.error',
    color: 'rejected',
  },
  {
    id: ACCESS_HISTORY_STATUS_TYPE.SUCCESS,
    text: 'systemAccessHistory.success',
    color: 'confirmed',
  },
]

export const DASHBOARD_CHART = {
  WAREHOUSE_IMPORT_RECEIPT: 0,
  WAREHOUSE_EXPORT_RECEIPT: 1,
  WAREHOUSE_TRANSFER: 2,
  TOP_ITEM_USE: 3,
  STOCK_ITEM_REPORT: 4,
  MOVEMENT_REPORT: 5,
  INVENTORY_QUANTITY: 6,
  LOCATED_QUANTITY_REPORT: 7,
  STORAGE_ITEM_NORM_REPORT: 8,
}

export const WMSX_DASHBOARD_CHART_OPTION = [
  {
    id: DASHBOARD_CHART.WAREHOUSE_IMPORT_RECEIPT,
    text: 'wmsx:dashboard.importReceipt.title',
  },
  {
    id: DASHBOARD_CHART.WAREHOUSE_EXPORT_RECEIPT,
    text: 'wmsx:dashboard.exportReceipt.title',
  },
  {
    id: DASHBOARD_CHART.WAREHOUSE_TRANSFER,
    text: 'wmsx:dashboard.warehouseTransfer.title',
  },
  {
    id: DASHBOARD_CHART.TOP_ITEM_USE,
    text: 'wmsx:dashboard.materialUsed.title',
  },
  {
    id: DASHBOARD_CHART.STOCK_ITEM_REPORT,
    text: 'wmsx:dashboard.stockItemReport.title',
  },
  {
    id: DASHBOARD_CHART.MOVEMENT_REPORT,
    text: 'wmsx:dashboard.movementReport.title',
  },
  {
    id: DASHBOARD_CHART.INVENTORY_QUANTITY,
    text: 'wmsx:dashboard.inventoryQuantity.title',
  },
  {
    id: DASHBOARD_CHART.LOCATED_QUANTITY_REPORT,
    text: 'wmsx:dashboard.goodAllocatedQuantityReport.title',
  },
  {
    id: DASHBOARD_CHART.STORAGE_ITEM_NORM_REPORT,
    text: 'wmsx:dashboard.storageItemNormReport.title',
  },
]