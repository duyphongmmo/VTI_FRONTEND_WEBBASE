export const DEFAULT_UNITS = [
  {
    id: 4,
    name: 'mm',
    scale: 1000,
  },
  {
    id: 1,
    name: 'cm',
    scale: 100,
  },
  {
    id: 2,
    name: 'dm',
    scale: 10,
  },
  {
    id: 3,
    name: 'm',
    scale: 1,
  },
]

export const DEFAULT_UNITS_ID = {
  cm: 1,
  dm: 2,
  m: 3,
  mm: 4,
}

export const PACKAGE_TYPE = {
  BOX: '01',
  PALLET: '02',
}
export const TEMPLATE_CODE_DEFAULT = 'N02'
export const PIE_CHART_COLORS = [
  '#0761AD',
  '#FF9054',
  '#B2DF8A',
  '#ff6361',
  '#58508d',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
]

export const ORDER_TYPE_ENUM = {
  PO: 1,
  PRO: 2,
  SO: 3,
  Transfer: 4,
  IMO: 5,
}

export const TRANSACTION_TYPE_ENUM = {
  IMPORT: 0,
  EXPORT: 1,
}

export const PRINT_QR_LIMIT = 1000

export const END_OF_DAY = {
  HOUR: 23,
  MINUTE: 59,
  SECOND: 59,
}

export const START_OF_DAY = {
  HOUR: 0,
  MINUTE: 0,
  SECOND: 0,
}

export const BOOLEAN_ENUM = {
  FALSE: '0',
  TRUE: '1',
}

export const CODE_SETTINGS = {
  ITEM: {
    DOMAIN: 'ITEM',
    PREFIX: '02',
    MAX_LENGTH: 7,
    FILLED_CHARACTER: '0',
  },
  BLOCK: {
    DOMAIN: 'BLOCK',
    PREFIX: '03',
    MAX_LENGTH: 12,
    FILLED_CHARACTER: '0',
  },
  PACKAGE: {
    DOMAIN: 'PACKAGE',
    PREFIX: '04',
    MAX_LENGTH: 12,
    FILLED_CHARACTER: '0',
  },
  PRODUCTION_ORDER: {
    DOMAIN: 'PRODUCTION_ORDER',
    PREFIX: 'PR',
    MAX_LENGTH: 10,
    FILLED_CHARACTER: '0',
  },
  PURCHASED_ORDER_IMPORT: {
    DOMAIN: 'PURCHASED_ORDER_IMPORT',
    PREFIX: 'PO',
    MAX_LENGTH: 2,
    FILLED_CHARACTER: '0',
  },
  IMPORT_MANUFACTURING_ORDER: {
    DOMAIN: 'IMPORT_MANUFACTURING_ORDER',
    PREFIX: 'IM',
    MAX_LENGTH: 10,
    FILLED_CHARACTER: '0',
  },
}

export const QC_CHECK = {
  TRUE: 1,
  FALSE: 0,
}

export const DEFAULT_UNITS_MAP = {
  1: 'cm',
  2: 'dm',
  3: 'm',
  4: 'mm',
}

export const WEIGHT_UNITS_ENUM = {
  g: 1,
  kg: 2,
  ton: 3,
}

export const WEIGHT_UNITS = [
  {
    id: WEIGHT_UNITS_ENUM.g,
    name: 'g',
  },
  {
    id: WEIGHT_UNITS_ENUM.kg,
    name: 'kg',
  },
  {
    id: WEIGHT_UNITS_ENUM.ton,
    name: 'tấn',
  },
]

export const WEIGHT_UNITS_MAP = {
  [WEIGHT_UNITS_ENUM.g]: 'g',
  [WEIGHT_UNITS_ENUM.kg]: 'kg',
  [WEIGHT_UNITS_ENUM.ton]: 'tấn',
}

export const ROWS_PER_PAGE_OPTIONS = [20, 50, 100]

export const WAREHOUSE_STATUS = {
  PENDING: 0,
  CONFIRMED: 1,
  REJECTED: 2,
  IN_PROGRESS: 3,
  COMPLETED: 4,
  APPROVED: 5,
}

export const WAREHOUSE_EXPORT_RECEIPT_STATUS = {
  DRAFT: 1, //nháp
  PENDING: 2, //chờ xác nhận
  CONFIRMED: 3, // Xác nhận
  IN_PROGRES: 4, // đang thực hiện
  COMPLETED: 5, // Hoàn thành
  REJECTED: 6, //từ chối
  CANCELED: 7, //hủy
  PICKING: 8, // Đang lấy hàng
  COMPLETED_PICKING: 9, // Chờ xuất kho
  COMPLETE_EXPORT: 10, // Đã xuất kho
  // TO_PACK: 11, // Chờ đóng gói,
  // WAITING_SHIP: 12, //Chờ giao hàng
}

export const WAREHOUSE_IMPORT_RECEIPT_STATUS = {
  DRAFT: 1, //nháp
  PENDING: 2, //chờ xác nhận
  CONFIRMED: 3, // Xác nhận
  IN_PROGRES: 4, // đang thực hiện
  COMPLETED: 5, // Hoàn thành
  REJECTED: 6, //từ chối
  CANCELED: 7, //hủy
  PICKING: 8, // Đang lấy hàng
  COMPLETED_PICKING: 9, // Chờ xuất kho
  COMPLETE_EXPORT: 10, // Đã xuất kho
  TO_PACK: 11, // Chờ đóng gói,
  WAITING_SHIP: 12, //Chờ giao hàng
  SYSTEM_IN_PROGRESS: 13, //Hệ thống đang xử lý
  RECEIVED: 14, // Đã nhập kho
}

export const TRANSFER_REQUEST_STATUS = {
  DRAFT: 1, //nháp
  PENDING: 2, //chờ xác nhận
  CONFIRMED: 3, // Xác nhận
  IN_PROGRES: 4, // đang thực hiện
  COMPLETED: 5, // Hoàn thành
  REJECTED: 6, //từ chối
  CANCELED: 7, //hủy
  PICKING: 8, // Đang lấy hàng
  COMPLETED_PICKING: 9, // Chờ xuất kho
  COMPLETE_EXPORT: 10, // chờ nhập kho
  TO_PACK: 11, // Chờ đóng gói,
  WAITING_SHIP: 12, //Chờ giao hàng
  IMPORTING: 15, //Đang nhập kho
}

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

export const REPORT_FILE_TYPE = {
  EXCEL: 0,
  WORD: 1,
}

export const REPORT_FILE_TYPE_OPTIONS = {
  excel: {
    id: REPORT_FILE_TYPE.EXCEL,
    text: 'reportExport.excel',
    code: 'EXCEL',
  },
  // word: {
  //   id: 1,
  //   text: 'reportExport.word',
  // },
}

export const CODE_REPORT = {
  W01: 'W01',
  W02: 'W02',
  W03: 'W03',
  W04: 'W04',
  W05: 'W05',
  W06: 'W06',
  W07: 'W07',
  W08: 'W08',
  W09: 'W09',
  W10: 'W10',
  W11: 'W11',
  W12: 'W12',
  C01: 'C01',
  C02: 'C02',
  C04: 'C04',
  C05: 'C05',
  C06: 'C06',
  C07: 'C07',
  C08: 'C08',
  C09: 'C09',
  C10: 'C10',
  C11: 'C11',
  C12: 'C12',
}

export const REPORT_STATUS = {
  COMPLETE: 'completed',
  ERROR: 'error',
  IN_PROGRESS: 'in-progress',
}

export const REPORT_STATUS_OPTIONS = [
  {
    id: REPORT_STATUS.COMPLETE,
    text: 'reportExport.complete',
    color: 'completed',
  },
  {
    id: REPORT_STATUS.ERROR,
    text: 'reportExport.error',
    color: 'rejected',
  },
  {
    id: REPORT_STATUS.IN_PROGRESS,
    text: 'reportExport.inProgress',
    color: 'inProgress',
  },
]

export const REPORT_TYPE = {
  INVENTORY_STATISTICS_SKU: 1,
  ITEM_MOVEMENTS: 2,
  WAREHOUSE_IMPORT_SITUATION: 3,
  WAREHOUSE_EXPORT_SITUATION: 4,
  INVENTORY_BELOW_LEVEL: 5,
  REPORT_POST_INVENTORY: 6,
  LOGISTIC_INVENTORY_STATISTICS: 7,
  LOGISTIC_GENERAL_INVENTORY_IMPORT_AND_EXPORT: 8,
  REPORT_IMPORT_WAREHOUSE_FOR_OUTSOURCE: 9,
  REPORT_EXPORT_WAREHOUSE_FOR_OUTSOURCE: 10,
  REPORT_IMPORT_BY_MONTH_AND_ITEM_TYPE: 11,
  REPORT_IMPORT_BY_MONTH_AND_ITEM_TYPE_OUT: 12,
  REPORT_BOUND_BY_YEAR: 13,
  REPORT_INVENTORY_IN_PROCESSING_STAGE: 14,
  REPORT_INVENTORY_DATA_QUARTERLY: 15,
  REPORT_ACTUAL_INVENTORY: 16,
  REPORT_INVENTORY_OUTSOURCING: 17,
  REPORT_IMPORT_EXPORT_INVENTORY_BY_MONTH_AND_TYPE_ITEM: 18,
  REPORT_DISCOUNT_INVENTORY: 19,
  REPORT_ACCUMULATE: 20,
  REPORT_AGE_INVENTORY: 21,
  REPORT_DETAIL_ACTUAL_INVENTORY: 22,
  REPORT_CARD_WAREHOSE: 23,
}

export const REPORT_TYPE_OPTIONS = [
  {
    id: 1,
    text: 'menu.reportImportReceipt',
    code: 'W01',
    permission: 'WMS_REPORT_W01',
    fileTypeOptions: [REPORT_FILE_TYPE_OPTIONS.excel],
  },
  {
    id: 2,
    text: 'menu.reportImportDetail',
    code: 'W02',
    permission: 'WMS_REPORT_W02',
    fileTypeOptions: [REPORT_FILE_TYPE_OPTIONS.excel],
  },
  {
    id: 3,
    text: 'menu.reportImportDefectiveDetail',
    code: 'W03',
    permission: 'WMS_REPORT_W03',
    fileTypeOptions: [REPORT_FILE_TYPE_OPTIONS.excel],
  },
  {
    id: 4,
    text: 'menu.reportExportDetail',
    code: 'W04',
    permission: 'WMS_REPORT_W04',
    fileTypeOptions: [REPORT_FILE_TYPE_OPTIONS.excel],
  },
  {
    id: 6,
    text: 'menu.reportLocator',
    code: 'W05',
    permission: 'WMS_REPORT_W05',
    fileTypeOptions: [REPORT_FILE_TYPE_OPTIONS.excel],
  },
  {
    id: 23,
    text: 'menu.reportInventoryByDate',
    code: 'W06',
    permission: 'WMS_REPORT_W06',
    fileTypeOptions: [REPORT_FILE_TYPE_OPTIONS.excel],
  },
  {
    id: 5,
    text: 'menu.reportInventoryByWarehouse',
    code: 'W07',
    permission: 'WMS_REPORT_W07',
    fileTypeOptions: [REPORT_FILE_TYPE_OPTIONS.excel],
  },
  {
    id: 7,
    text: 'menu.reportImportExportInventory',
    code: 'W08',
    permission: 'WMS_REPORT_W08',
    fileTypeOptions: [REPORT_FILE_TYPE_OPTIONS.excel],
  },
  {
    id: 8,
    text: 'menu.reportImportExportInventoryDetail',
    code: 'W09',
    permission: 'WMS_REPORT_W09',
    fileTypeOptions: [REPORT_FILE_TYPE_OPTIONS.excel],
  },
  {
    id: 16,
    text: 'menu.reportInventoryDetailByLocation',
    code: 'W10',
    permission: 'WMS_REPORT_W10',
    fileTypeOptions: [REPORT_FILE_TYPE_OPTIONS.excel],
  },
  // {
  //   id: 22,
  //   text: 'reportType.reportDetailActualInventory',
  //   code: 'W11',
  //   permission: 'WMS_REPORT_W11',
  //   fileTypeOptions: [REPORT_FILE_TYPE_OPTIONS.excel],
  // },
  // {
  //   id: 21,
  //   text: 'reportType.reportAgeInventory',
  //   code: 'W12',
  //   permission: 'WMS_REPORT_W12',
  //   fileTypeOptions: [REPORT_FILE_TYPE_OPTIONS.excel],
  // },
  // {
  //   id: 20,
  //   text: 'reportType.reportAccumulate',
  //   code: 'C01',
  //   permission: 'WMS_REPORT_C01',
  //   fileTypeOptions: [REPORT_FILE_TYPE_OPTIONS.excel],
  // },
  // {
  //   id: 15,
  //   text: 'reportType.reportImportWarehouseForOutsourcing',
  //   code: 'C02',
  //   permission: 'WMS_REPORT_C02',
  //   fileTypeOptions: [REPORT_FILE_TYPE_OPTIONS.excel],
  // },
  // {
  //   id: 9,
  //   text: 'reportType.reportImportWarehouseForOutsourcing',
  //   code: 'C04',
  //   permission: 'WMS_REPORT_C04',
  //   fileTypeOptions: [REPORT_FILE_TYPE_OPTIONS.excel],
  // },
  // {
  //   id: 10,
  //   text: 'reportType.reportExportWarehouseForOutsource',
  //   code: 'C05',
  //   permission: 'WMS_REPORT_C05',
  //   fileTypeOptions: [REPORT_FILE_TYPE_OPTIONS.excel],
  // },
  // {
  //   id: 17,
  //   text: 'reportType.reportInventoryOutsourcing',
  //   code: 'C06',
  //   permission: 'WMS_REPORT_C06',
  //   fileTypeOptions: [REPORT_FILE_TYPE_OPTIONS.excel],
  // },
  // {
  //   id: 14,
  //   text: 'reportType.reportInventoryInProcessingStage',
  //   code: 'C07',
  //   permission: 'WMS_REPORT_C07',
  //   fileTypeOptions: [REPORT_FILE_TYPE_OPTIONS.excel],
  // },
  // {
  //   id: 11,
  //   text: 'reportType.reportImportByMonthAndItemType',
  //   code: 'C08',
  //   permission: 'WMS_REPORT_C08',
  //   fileTypeOptions: [REPORT_FILE_TYPE_OPTIONS.excel],
  // },
  // {
  //   id: 12,
  //   text: 'reportType.reportImportByMonthAndItemTypeOut',
  //   code: 'C09',
  //   permission: 'WMS_REPORT_C09',
  //   fileTypeOptions: [REPORT_FILE_TYPE_OPTIONS.excel],
  // },
  // {
  //   id: 18,
  //   text: 'reportType.reportImportByMonthAndItemTypeOut',
  //   code: 'C10',
  //   permission: 'WMS_REPORT_C10',
  //   fileTypeOptions: [REPORT_FILE_TYPE_OPTIONS.excel],
  // },
  // {
  //   id: 19,
  //   text: 'reportType.reportDiscountInventory',
  //   code: 'C11',
  //   permission: 'WMS_REPORT_C11',
  //   fileTypeOptions: [REPORT_FILE_TYPE_OPTIONS.excel],
  // },
  // {
  //   id: 13,
  //   text: 'reportType.reportBoundByYear',
  //   code: 'C12',
  //   permission: 'WMS_REPORT_C12',
  //   fileTypeOptions: [REPORT_FILE_TYPE_OPTIONS.excel],
  // },
]

export const CODE_TYPE_TEMPLATE_RECEIPT_IMPORT = {
  N01: 'N01',
  N02: 'N02',
  N02_1: 'N02-1',
  N02_2: 'N02-2',
  N03: 'N03',
  N04: 'N04',
  N05: 'N05',
  N06: 'N06',
  N07: 'N07',
  N08: 'N08',
  N09: 'N09',
  N10: 'N10',
}
export const CODE_TYPE_TEMPLATE_RECEIPT_EXPORT = {
  X01: 'X01',
  X02: 'X02',
  X03: 'X03',
  X04: 'X04',
  X05: 'X05',
  X06: 'X06',
  X07: 'X07',
  X08: 'X08',
  X09: 'X09',
  X10: 'X10',
}
export const CODE_TYPE_TEMPLATE_TRANSFER = {
  C01: 'C01',
  C02: 'C02',
  C03: 'C03',
  C04: 'C04',
  C05: 'C05',
  C06: 'C06',
  C07: 'C07',
  C08: 'C08',
  C09: 'C09',
  C10: 'C10',
}

export const INVENTORY_TYPE = {
  PERIODIC: 1,
  UNEXPECTED: 2,
}

export const INVENTORY_TYPE_MAP = {
  [INVENTORY_TYPE.PERIODIC]: 'inventoryCalendar.periodic',
  [INVENTORY_TYPE.UNEXPECTED]: 'inventoryCalendar.unexpected',
}

export const INVENTORY_TYPE_OPTIONS = [
  {
    id: INVENTORY_TYPE.PERIODIC,
    text: 'inventoryCalendar.periodic',
  },
  {
    id: INVENTORY_TYPE.UNEXPECTED,
    text: 'inventoryCalendar.unexpected',
  },
]

export const INVENTORY_FORM_TYPE = {
  BY_LOCATOR: 1,
  BY_ITEM: 2,
}

export const HAS_ERROR_COUNT_OPTIONS = [
  {
    id: 1,
    text: 'reportGeneralInventory.True',
  },
  {
    id: 0,
    text: 'reportGeneralInventory.Fail',
  },
]

export const INVENTORY_FORM_OPTIONS = [
  {
    id: INVENTORY_FORM_TYPE.BY_LOCATOR,
    text: 'inventoryCalendar.stocktakingLocator',
  },
  {
    id: INVENTORY_FORM_TYPE.BY_ITEM,
    text: 'inventoryCalendar.stocktakingItem',
  },
]

export const LOCATOR_STATUS_ENUM = {
  AVAILABLE: 3,
  AWAIT: 2,
  MULTIPLE_ITEM: 4,
  NOT_AVAILABLE: 1,
}

export const LOCATOR_STATUS_ENUM_MAP = {
  [LOCATOR_STATUS_ENUM.AVAILABLE]: 'reportLocator.available',
  [LOCATOR_STATUS_ENUM.AWAIT]: 'reportLocator.await',
  [LOCATOR_STATUS_ENUM.MULTIPLE_ITEM]: 'reportLocator.multipleItem',
  [LOCATOR_STATUS_ENUM.NOT_AVAILABLE]: 'reportLocator.notAvailable',
}

export const TYPE_RECEIPT_HISTORY = {
  IMPORT_RECEIPT: 1,
  EXPORT_RECEIPT: 2,
  INVENTORY: 3,
  TRANSFER: 4,
  REQUEST_EXPORT: 5,
}

export const TYPE_TRANSACTION = {
  PICK_UP: 3,
  WAREHOUSE_EXPORT: 4,
  RECEIVE: 1,
  PUT_AWAY: 2,
  INVENTORY: 5,
  LOCATOR_TRANSFER: 6,
  CANCEL: 7,
}

export const TYPE_TRANSACTION_OPTION = [
  {
    id: TYPE_TRANSACTION.PICK_UP,
    text: 'movements.historyPickUp.pickUp',
    typeReceipt: [
      TYPE_RECEIPT_HISTORY.EXPORT_RECEIPT,
      TYPE_RECEIPT_HISTORY.TRANSFER,
    ],
  },
  {
    id: TYPE_TRANSACTION.WAREHOUSE_EXPORT,
    text: 'movements.historyPickUp.warehouseExportReceipt',
    typeReceipt: [
      TYPE_RECEIPT_HISTORY.EXPORT_RECEIPT,
      TYPE_RECEIPT_HISTORY.TRANSFER,
      TYPE_RECEIPT_HISTORY.INVENTORY,
    ],
  },
  {
    id: TYPE_TRANSACTION.PUT_AWAY,
    text: 'movements.historyPickUp.putAway',
    typeReceipt: [
      TYPE_RECEIPT_HISTORY.IMPORT_RECEIPT,
      TYPE_RECEIPT_HISTORY.TRANSFER,
    ],
  },
  {
    id: TYPE_TRANSACTION.RECEIVE,
    text: 'movements.historyPickUp.receive',
    typeReceipt: [
      TYPE_RECEIPT_HISTORY.IMPORT_RECEIPT,
      TYPE_RECEIPT_HISTORY.TRANSFER,
      TYPE_RECEIPT_HISTORY.INVENTORY,
    ],
  },
  {
    id: TYPE_TRANSACTION.LOCATOR_TRANSFER,
    text: 'movements.historyPickUp.locatorTransfer',
    typeReceipt: [TYPE_RECEIPT_HISTORY.REQUEST_EXPORT],
  },
]


export const LOCATOR_STATUS_OPTIONS = [
  {
    id: LOCATOR_STATUS_ENUM.AVAILABLE,
    text: 'reportLocator.available',
    color: 'completed',
  },
  {
    id: LOCATOR_STATUS_ENUM.AWAIT,
    text: 'reportLocator.await',
    color: 'inProgress',
  },
  {
    id: LOCATOR_STATUS_ENUM.MULTIPLE_ITEM,
    text: 'reportLocator.multipleItem',
  },
  {
    id: LOCATOR_STATUS_ENUM.NOT_AVAILABLE,
    text: 'reportLocator.notAvailable',
    color: 'pending',
  },
]

export const CHART_QUANTITY_PLAN_TYPE_ENUM = {
  TOTAL_QUANTITY_PLAN: 0,
  TOTAL_QUANTITY_IMPORTED: 1,
  TOTAL_QUANTITY_NOT_YET_IMPORTED: 2,
}

export const CHART_QUANTITY_PLAN_ENUM_MAP = [
  {
    id: CHART_QUANTITY_PLAN_TYPE_ENUM.TOTAL_QUANTITY_PLAN,
    text: 'analyzeReport.totalQuantityCustomer',
  },
  {
    id: CHART_QUANTITY_PLAN_TYPE_ENUM.TOTAL_QUANTITY_IMPORTED,
    text: 'analyzeReport.totalQuantityImported',
  },
  {
    id: CHART_QUANTITY_PLAN_TYPE_ENUM.TOTAL_QUANTITY_NOT_YET_IMPORTED,
    text: 'analyzeReport.totalQuantityNotYetImported',
  },
]

export const CHART_QUANTITY_ITEM_TYPE_ENUM = {
  TOTAL_QUANTITY_PLAN: 0,
  TOTAL_QUANTITY_IMPORTED: 1,
  TOTAL_QUANTITY_NOT_YET_IMPORTED: 2,
}

export const CHART_QUANTITY_ITEM_ENUM_MAP = [
  {
    id: CHART_QUANTITY_ITEM_TYPE_ENUM.TOTAL_QUANTITY_PLAN,
    text: 'analyzeReport.totalQuantityItem',
  },
  {
    id: CHART_QUANTITY_ITEM_TYPE_ENUM.TOTAL_QUANTITY_IMPORTED,
    text: 'analyzeReport.totalQuantityImportedItem',
  },
  {
    id: CHART_QUANTITY_ITEM_TYPE_ENUM.TOTAL_QUANTITY_NOT_YET_IMPORTED,
    text: 'analyzeReport.totalQuantityNotYetImportedItem',
  },
]

export const CHART_QUANTITY_WAREHOUSE_TYPE_ENUM = {
  TOTAL_QUANTITY_PLAN: 0,
  TOTAL_QUANTITY_IMPORTED_ITEM: 1,
}

export const CHART_QUANTITY_WAREHOUSE_ENUM_MAP = [
  {
    id: CHART_QUANTITY_WAREHOUSE_TYPE_ENUM.TOTAL_QUANTITY_PLAN,
    text: 'analyzeReport.totalQuantityCustomer',
  },
  {
    id: CHART_QUANTITY_WAREHOUSE_TYPE_ENUM.TOTAL_QUANTITY_IMPORTED_ITEM,
    text: 'analyzeReport.totalQuantityItem',
  },
]

export const CHART_QUANTITY_TEM_TYPE_ENUM = {
  TOTAL_TEM_SPARE: 0,
  TOTAL_TEM_CHEMISTRY: 1,
}

export const CHART_QUANTITY_TEM_ENUM_MAP = [
  {
    id: CHART_QUANTITY_TEM_TYPE_ENUM.TOTAL_TEM_SPARE,
    text: 'analyzeReport.totalQuantityCustomer',
  },
  {
    id: CHART_QUANTITY_TEM_TYPE_ENUM.TOTAL_TEM_CHEMISTRY,
    text: 'analyzeReport.totalQuantityItem',
  },
]