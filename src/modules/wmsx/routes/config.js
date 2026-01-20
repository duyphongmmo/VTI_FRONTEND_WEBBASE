export const ROUTE = {
  DASHBOARD: {
    PATH: '/wmsx',
    TITLE: 'dashboard',
  },
  DATABASE: {
    TITLE: 'database',
  },
  PRODUCT_SPECIFICATION_MANAGEMENT: {
    TITLE: 'managementSpecificationProduct',
  },
  SETTING_CONFIGURATION: {
    TITLE: 'settingConfiguration',
  },
  BUSINESS_TYPE_MANAGEMENT: {
    LIST: {
      PATH: '/wmsx/business-type-management',
      TITLE: 'businessTypeManagement',
    },
    CREATE: {
      PATH: '/wmsx/business-type-management/create',
      TITLE: 'businessTypeManagementCreate',
    },
    DETAIL: {
      PATH: '/wmsx/business-type-management/:id/detail',
      TITLE: 'businessTypeManagementDetail',
    },
    EDIT: {
      PATH: '/wmsx/business-type-management/:id/edit',
      TITLE: 'businessTypeManagementEdit',
    },
  },
  WAREHOUSE_MANAGEMENT: {
    TITLE: 'warehouseSetup',
  },
  DEFINE_WAREHOUSE: {
    LIST: {
      PATH: '/wmsx/define-warehouse',
      TITLE: 'defineWarehouse',
    },
    CREATE: {
      PATH: '/wmsx/define-warehouse/create',
      TITLE: 'defineWarehouseCreate',
    },
    EDIT: {
      PATH: '/wmsx/define-warehouse/:id/edit',
      TITLE: 'defineWarehouseEdit',
    },
    DETAIL: {
      PATH: '/wmsx/define-warehouse/:id/detail',
      TITLE: 'defineWarehouseDetail',
    },
  },
  LOCATION_MANAGEMENT: {
    LIST: {
      PATH: '/wmsx/location-management',
      TITLE: 'locationManagement',
    },
    CREATE: {
      PATH: '/wmsx/location-management/create',
      TITLE: 'locationManagementCreate',
    },
    EDIT: {
      PATH: '/wmsx/location-management/:id/edit',
      TITLE: 'locationManagementEdit',
    },
    DETAIL: {
      PATH: '/wmsx/location-management/:id/detail',
      TITLE: 'locationManagementDetail',
    },
    CAPACITY_SETTING: {
      PATH: '/wmsx/location-management/:id/capacity-setting',
      TITLE: 'locationManagementCapacitySetting',
    },
  },
  DEFINE_WAREHOUSE_GROUP: {
    LIST: {
      PATH: '/wmsx/define-warehouse-group',
      TITLE: 'defineWarehouseGroup',
    },
    CREATE: {
      PATH: '/wmsx/define-warehouse-group/create',
      TITLE: 'defineWarehouseGroupCreate',
    },
    EDIT: {
      PATH: '/wmsx/define-warehouse-group/:id/edit',
      TITLE: 'defineWarehouseGroupEdit',
    },
    DETAIL: {
      PATH: '/wmsx/define-warehouse-group/:id/detail',
      TITLE: 'defineWarehouseGroupDetail',
    },
  },
  LAYOUT_TEMPLATE: {
    LIST: {
      PATH: '/wmsx/layout-template',
      TITLE: 'layoutTemplate',
    },
    CREATE: {
      PATH: '/wmsx/layout-template/create',
      TITLE: 'layoutTemplateCreate',
    },
    EDIT: {
      PATH: '/wmsx/layout-template/:id/edit',
      TITLE: 'layoutTemplateEdit',
    },
    DETAIL: {
      PATH: '/wmsx/layout-template/:id/detail',
      TITLE: 'layoutTemplateDetail',
    },
  },
  INVENTORY_SETTING: {
    LIST: {
      PATH: '/wmsx/inventory-setting',
      TITLE: 'inventorySetting',
    },
    CREATE: {
      PATH: '/wmsx/inventory-setting/create',
      TITLE: 'inventorySettingCreate',
    },
    EDIT: {
      PATH: '/wmsx/inventory-setting/:id/edit',
      TITLE: 'inventorySettingEdit',
    },
    DETAIL: {
      PATH: '/wmsx/inventory-setting/:id/detail',
      TITLE: 'inventorySettingDetail',
    },
  },
  SET_STORAGE_PERIOD: {
    LIST: {
      PATH: '/wmsx/set-storage-period',
      TITLE: 'setStoragePeriod',
    },
    CREATE: {
      PATH: '/wmsx/set-storage-period/create',
      TITLE: 'setStoragePeriodCreate',
    },
    EDIT: {
      PATH: '/wmsx/set-storage-period/:id/edit',
      TITLE: 'setStoragePeriodEdit',
    },
    DETAIL: {
      PATH: '/wmsx/set-storage-period/:id/detail',
      TITLE: 'setStoragePeriodDetail',
    },
  },
  SETTING: {
    TITLE: 'setting',
  },
  RECEIPT_COMMAND_MANAGEMENT: {
    TITLE: 'receiptCommandManagement',
  },
  WAREHOUSE_EXPORT_RECEIPT: {
    LIST: {
      PATH: '/wmsx/warehouse-export-receipt',
      TITLE: 'warehouseExportReceipt',
    },
    CREATE: {
      PATH: '/wmsx/warehouse-export-receipt/create',
      TITLE: 'warehouseExportReceiptCreate',
    },
    EDIT: {
      PATH: '/wmsx/warehouse-export-receipt/:id/edit',
      TITLE: 'warehouseExportReceiptEdit',
    },
    EDIT_HEADER: {
      PATH: '/wmsx/warehouse-export-receipt/:id/edit-header',
      TITLE: 'warehouseExportReceiptEdit',
    },
    DETAIL: {
      PATH: '/wmsx/warehouse-export-receipt/:id/detail',
      TITLE: 'warehouseExportReceiptDetail',
    },
    PICK_AND_EXPORT: {
      PATH: '/wmsx/warehouse-export-receipt/:id/pick-and-export',
      TITLE: 'warehouseExportReceiptPickAndExport',
    },
    TRANSACTIONS: {
      LIST: {
        PATH: '/wmsx/warehouse-export-receipt/:parentId/transactions/:warehouseId',
        TITLE: 'movements',
      },
      DETAIL: {
        PATH: '/wmsx/warehouse-export-receipt/:parentId/transactions/:warehouseId/:id',
        TITLE: 'movementDetail',
      },
      DETAIL_TRANSACTION: {
        PATH: '/wmsx/warehouse-export-receipt/transactions/:id/detail',
        TITLE: 'movementDetail',
      },
    },
  },
  WAREHOUSE_IMPORT_RECEIPT: {
    LIST: {
      PATH: '/wmsx/warehouse-import-receipt',
      TITLE: 'warehouseImportReceipt',
    },
    CREATE: {
      PATH: '/wmsx/warehouse-import-receipt/create',
      TITLE: 'warehouseImportReceiptCreate',
    },
    EDIT: {
      PATH: '/wmsx/warehouse-import-receipt/:id/edit',
      TITLE: 'warehouseImportReceiptEdit',
    },
    EDIT_HEADER: {
      PATH: '/wmsx/warehouse-import-receipt/:id/edit-header',
      TITLE: 'warehouseImportReceiptEdit',
    },
    DETAIL: {
      PATH: '/wmsx/warehouse-import-receipt/:id/detail',
      TITLE: 'warehouseImportReceiptDetail',
    },
    RECEIVE_AND_STORAGE: {
      PATH: '/wmsx/warehouse-import-receipt/:id/receive-and-storage',
      TITLE: 'warehouseImportReceiveAndStorage',
    },
    RECEIVE: {
      PATH: '/wmsx/warehouse-import-receipt/:id/receive',
      TITLE: 'warehouseImportReceive',
    },
    STORAGE: {
      PATH: '/wmsx/warehouse-import-receipt/:id/store',
      TITLE: 'warehouseImportStore',
    },
    TRANSACTIONS: {
      LIST: {
        PATH: '/wmsx/warehouse-import-receipt/:parentId/transactions',
        TITLE: 'movements',
      },
      DETAIL: {
        PATH: '/wmsx/warehouse-import-receipt/:parentId/transactions/:id',
        TITLE: 'movementDetail',
      },
    },
  },
  TRANSACTION_HISTORY: {
    LIST: {
      PATH: '/wmsx/transaction-history',
      TITLE: 'transactionHistory',
    },
    DETAIL: {
      PATH: '/wmsx/transaction-history/:id/detail',
      TITLE: 'transactionHistoryDetail',
    },
    DETAIL_EXPORT: {
      PATH: '/wmsx/transaction-history/:id/detail-export',
      TITLE: 'transactionHistoryDetail',
    },
  },
  WAREHOUSE_EXPORT: {
    LIST: {
      PATH: '/wmsx/warehouse-export',
      TITLE: 'warehouseExport',
    },
    DETAIL: {
      PATH: '/wmsx/warehouse-export/:id/detail',
      TITLE: 'warehouseExportDetail',
    },
    DETAIL_EXPORT: {
      PATH: '/wmsx/warehouse-export/:id/detail-export',
      TITLE: 'warehouseExportDetail',
    },
  },
  WAREHOUSE_IMPORT: {
    LIST: {
      PATH: '/wmsx/warehouse-import',
      TITLE: 'warehouseImport',
    },
    DETAIL: {
      PATH: '/wmsx/warehouse-import/:id/detail',
      TITLE: 'movementsDetail',
    },
  },
  WAREHOUSE_REPORT_MANAGEMENT: {
    PATH: '/wmsx/warehouse-report-management',
    TITLE: 'warehouseReportManagement',
  },
  INVENTORY_STATISTICS_SKU: {
    LIST: {
      PATH: '/wmsx/inventory-statistics-sku',
      TITLE: 'inventoryStatisticsSku',
    },
    ALLOCATE_DETAIL: {
      PATH: '/wmsx/inventory-statistics-sku/:itemId/:warehouseId/allocate-detail',
      TITLE: 'allocateDetail',
    },
    REQUEST_EXPORT_DETAIL: {
      PATH: '/wmsx/inventory-statistics-sku/allocate-detail/:id/request-export',
      TITLE: 'requestExportDetail',
    },
    EXPORT_RECEIPT_DETAIL: {
      PATH: '/wmsx/inventory-statistics-sku/allocate-detail/:id/export-receipt',
      TITLE: 'warehouseExportReceiptDetail',
    },
  },
  INVENTORY_STATISTICS_SET: {
    LIST: {
      PATH: '/wmsx/inventory-statistics-set',
      TITLE: 'inventoryStatisticsSet',
    },
    ALLOCATE_DETAIL: {
      PATH: '/wmsx/inventory-statistics-set/:itemId/:warehouseId/allocate-detail',
      TITLE: 'allocateDetail',
    },
    REQUEST_EXPORT_DETAIL: {
      PATH: '/wmsx/inventory-statistics-set/allocate-detail/:id/request-export',
      TITLE: 'requestExportDetail',
    },
    EXPORT_RECEIPT_DETAIL: {
      PATH: '/wmsx/inventory-statistics-set/allocate-detail/:id/export-receipt',
      TITLE: 'warehouseExportReceiptDetail',
    },
  },
  INVENTORY_WARNING: {
    PATH: '/wmsx/inventory-warning',
    TITLE: 'inventoryWarning',
  },
  REPORT_STATISTICS: {
    TITLE: 'reportStatistics',
  },
  REPORT_EXPORT: {
    PATH: '/wmsx/report-export',
    TITLE: 'reportExport',
  },
  INVENTORY_CALENDAR: {
    LIST: {
      PATH: '/wmsx/inventory-calendar',
      TITLE: 'inventoryCalendar',
    },
    CREATE: {
      PATH: '/wmsx/inventory-calendar/create',
      TITLE: 'inventoryCalendarCreate',
    },
    EDIT: {
      PATH: '/wmsx/inventory-calendar/:id/edit',
      TITLE: 'inventoryCalendarEdit',
    },
    DETAIL: {
      PATH: '/wmsx/inventory-calendar/:id/detail',
      TITLE: 'inventoryCalendarDetail',
    },
    DETAIL_RECEIPT: {
      PATH: '/wmsx/inventory-calendar/:id/detail-receipt',
      TITLE: 'inventorySheet',
    },
  },
  WAREHOUSE_TRANSFER: {
    LIST: {
      PATH: '/wmsx/warehouse-transfer',
      TITLE: 'warehouseTransfer',
    },
    CREATE: {
      PATH: '/wmsx/warehouse-transfer/create',
      TITLE: 'warehouseTransferCreate',
    },
    EDIT: {
      PATH: '/wmsx/warehouse-transfer/:id/edit',
      TITLE: 'warehouseTransferEdit',
    },
    DETAIL: {
      PATH: '/wmsx/warehouse-transfer/:id/detail',
      TITLE: 'warehouseTransferDetail',
    },
    IMPORT: {
      PATH: '/wmsx/warehouse-transfer/:id/import',
      TITLE: 'warehouseImportReceive',
    },
  },
  USER_MANAGEMENT: {
    LIST: {
      PATH: '/wmsx/user-management',
      TITLE: 'userManagement',
    },
    CREATE: {
      PATH: '/wmsx/user-management/create',
      TITLE: 'userManagementCreate',
    },
    DETAIL: {
      PATH: '/wmsx/user-management/:id/detail',
      TITLE: 'userManagementDetail',
    },
    EDIT: {
      PATH: '/wmsx/user-management/:id/edit',
      TITLE: 'userManagementEdit',
    },
  },
  COMPANY_CUSTOMER_SETTING: {
    PATH: '/wmsx/company-customer-setting',
    TITLE: 'companyCustomerSetting',
  },
  COMPANY_CHART: {
    LIST: {
      PATH: '/wmsx/company-chart',
      TITLE: 'companyChart',
    },
  },
  DEPARTMENT_LIST: {
    LIST: {
      PATH: '/wmsx/department-list',
      TITLE: 'defineDepartment',
    },
    ASSIGN: {
      PATH: '/wmsx/department-list/:id/assign',
      TITLE: 'departmentAssign',
    },
  },
  ROLE_LIST: {
    LIST: {
      PATH: '/wmsx/role-list',
      TITLE: 'defineRole',
    },
    CREATE: {
      PATH: '/wmsx/role-list/create',
      TITLE: 'roleCreate',
    },
    DETAIL: {
      PATH: '/wmsx/role-list/:id/detail',
      TITLE: 'roleDetail',
    },
    EDIT: {
      PATH: '/wmsx/role-list/:id/edit',
      TITLE: 'roleEdit',
    },
  },
  ACCOUNT: {
    DETAIL: {
      PATH: '/wmsx/account',
      TITLE: 'userInfoDetail',
    },
    EDIT: {
      PATH: '/wmsx/account/edit',
      TITLE: 'userInfoEdit',
    },
    CHANGE_PASSWORD: {
      PATH: '/wmsx/account/change-password',
      TITLE: 'changePassword',
    },
  },
  INVENTORY_ADJUST: {
    LIST: {
      PATH: '/wmsx/inventory-adjust',
      TITLE: 'inventoryAdjust',
    },
    CREATE: {
      PATH: '/wmsx/inventory-adjust/create',
      TITLE: 'inventoryAdjustCreate',
    },
    DETAIL: {
      PATH: '/wmsx/inventory-adjust/:id/detail',
      TITLE: 'inventoryAdjustDetail',
    },
    EDIT: {
      PATH: '/wmsx/inventory-adjust/:id/edit',
      TITLE: 'inventoryAdjustEdit',
    },
  },
  WAREHOUSE_SETUP_WAREHOUSE_LAYOUT: {
    LIST: {
      PATH: '/wmsx/warehouse-layout',
      TITLE: 'warehouseLayout',
    },
    CREATE: {
      PATH: '/wmsx/warehouse-layout/create',
      TITLE: 'warehouseLayoutCreate',
    },
    DETAIL: {
      PATH: '/wmsx/warehouse-layout/:id/detail',
      TITLE: 'warehouseLayoutDetail',
    },
    EDIT: {
      PATH: '/wmsx/warehouse-layout/:id/edit',
      TITLE: 'warehouseLayoutEdit',
    },
    ITEM_SETTING: {
      PATH: '/wmsx/warehouse-layout/:id/item-setting',
      TITLE: 'warehouseLayoutItemSetting',
    },
  },
  RESQUEST: {
    TITLE: 'request',
  },
  WAREHOUSE_IMPORT_MANAGERMENT: {
    TITLE: 'warehouseImportManagerment',
  },
  WAREHOUSE_EXPORT_MANAGERMENT: {
    TITLE: 'warehouseExportManagerment',
  },
  WAREHOUSE_TRANFER_MANAGERMENT: {
    TITLE: 'warehouseTransferManagerment',
  },
  RESQUEST_IMPORT: {
    LIST: {
      PATH: '/wmsx/request-import',
      TITLE: 'requestImport',
    },
    CREATE: {
      PATH: '/wmsx/request-import/create',
      TITLE: 'requestImportCreate',
    },
    DETAIL: {
      PATH: '/wmsx/request-import/:id/detail',
      TITLE: 'requestImportDetail',
    },
    EDIT: {
      PATH: '/wmsx/request-import/:id/edit',
      TITLE: 'requestImportEdit',
    },
  },
  RESQUEST_EXPORT: {
    LIST: {
      PATH: '/wmsx/request-export',
      TITLE: 'requestExport',
    },
    CREATE: {
      PATH: '/wmsx/request-export/create',
      TITLE: 'requestExportCreate',
    },
    DETAIL: {
      PATH: '/wmsx/request-export/:id/detail',
      TITLE: 'requestExportDetail',
    },
    EDIT: {
      PATH: '/wmsx/request-export/:id/edit',
      TITLE: 'requestExportEdit',
    },
  },
  RESQUEST_TRANSFER: {
    LIST: {
      PATH: '/wmsx/request-transfer',
      TITLE: 'requestTransfer',
    },
    CREATE: {
      PATH: '/wmsx/request-transfer/create',
      TITLE: 'requestTransferCreate',
    },
    DETAIL: {
      PATH: '/wmsx/request-transfer/:id/detail',
      TITLE: 'requestTransferDetail',
    },
    EDIT: {
      PATH: '/wmsx/request-transfer/:id/edit',
      TITLE: 'requestTransferEdit',
    },
  },
  PUT_AWAY: {
    LIST: {
      PATH: '/wmsx/put-away',
      TITLE: 'putAway',
    },
    CREATE: {
      PATH: '/wmsx/put-away/create',
      TITLE: 'putAwayCreate',
    },
  },
  PICK_UP: {
    LIST: {
      PATH: '/wmsx/pick-up',
      TITLE: 'pickUp',
    },
    CREATE: {
      PATH: '/wmsx/pick-up/create',
      TITLE: 'pickUpMultipleLocator',
    },
  },
  TRANSFER_WAREHOUSE_PICK_UP: {
    LIST: {
      PATH: '/wmsx/warehouse-transfer-pick-up',
      TITLE: 'pickUp',
    },
    CREATE: {
      PATH: '/wmsx/warehouse-transfer-pick-up/create',
      TITLE: 'pickUpMultipleLocator',
    },
  },
  INVENTORY_PLAN: {
    LIST: {
      PATH: '/wmsx/inventory-plan',
      TITLE: 'inventoryPlan',
    },
    CREATE: {
      PATH: '/wmsx/inventory-plan/create',
      TITLE: 'inventoryPlanCreate',
    },
    DETAIL: {
      PATH: '/wmsx/inventory-plan/:id/detail',
      TITLE: 'inventoryPlanDetail',
    },
    EDIT: {
      PATH: '/wmsx/inventory-plan/:id/edit',
      TITLE: 'inventoryPlanEdit',
    },
  },
  INVENTORY_PERFORM: {
    LIST: {
      PATH: '/wmsx/perform-inventory',
      TITLE: 'inventoryPerform',
    },
    DETAIL: {
      PATH: '/wmsx/perform-inventory/:id/detail',
      TITLE: 'inventoryTicketDetail',
    },
    PERFORM_INVENTORY: {
      PATH: '/wmsx/perform-inventory/inventory-receipt/:id/detail',
      TITLE: 'performInventory',
    },
    TRANSACTIONS: {
      PATH: '/wmsx/perform-inventory/:id/transactions',
      TITLE: 'movements',
    },
  },
  PACKING_LIST: {
    LIST: {
      PATH: '/wmsx/packing-list',
      TITLE: 'packingList',
    },
    DETAIL: {
      PATH: '/wmsx/packing-list/:id/detail',
      TITLE: 'packingListDetail',
    },
  },
  DEFINE_PACKING: {
    LIST: {
      PATH: '/wmsx/define-packing',
      TITLE: 'definePacking',
    },
    CREATE: {
      PATH: '/wmsx/define-packing/create',
      TITLE: 'definePackingCreate',
    },
    DETAIL: {
      PATH: '/wmsx/define-packing/:id/detail',
      TITLE: 'definePackingDetail',
    },
    EDIT: {
      PATH: '/wmsx/define-packing/:id/edit',
      TITLE: 'definePackingEdit',
    },
  },
  QR_CODE_ITEM: {
    LIST: {
      PATH: '/wmsx/qr-code-item',
      TITLE: 'qrCodeItem',
    },
  },
  SURCHARGE_CONFIGURATION: {
    LIST: {
      PATH: '/wmsx/surcharge-configuration',
      TITLE: 'surchargeConfiguration',
    },
    CREATE: {
      PATH: '/wmsx/surcharge-configuration/create',
      TITLE: 'surchargeConfigurationCreate',
    },
    DETAIL: {
      PATH: '/wmsx/surcharge-configuration/:id/detail',
      TITLE: 'surchargeConfigurationDetail',
    },
    EDIT: {
      PATH: '/wmsx/surcharge-configuration/:id/edit',
      TITLE: 'surchargeConfigurationEdit',
    },
  },
  ACCOUNTING_PERIOD: {
    LIST: {
      PATH: '/wmsx/accounting-period',
      TITLE: 'accountingPeriod',
    },
  },
  INVENTORY_ALLOCATION: {
    LIST: {
      PATH: '/wmsx/inventory-allocation',
      TITLE: 'inventoryAllocation',
    },
    CREATE: {
      PATH: '/wmsx/inventory-allocation/create',
      TITLE: 'inventoryAllocationCreate',
    },
    DETAIL: {
      PATH: '/wmsx/inventory-allocation/:id/detail',
      TITLE: 'inventoryAllocationDetail',
    },
    EDIT: {
      PATH: '/wmsx/inventory-allocation/:id/edit',
      TITLE: 'inventoryAllocationEdit',
    },
  },
  TRANSFER_ITEM: {
    LIST: {
      PATH: '/wmsx/transfer-item',
      TITLE: 'transferItem',
    },
    CREATE: {
      PATH: '/wmsx/transfer-item/create',
      TITLE: 'transferItemCreate',
    },
  },
  FINISHED_GOODS_SERIAL_MANAGEMENT: {
    LIST: {
      PATH: '/wmsx/finished-goods-serial-management',
      TITLE: 'finishedGoodsSerialManagement',
    },
    CREATE: {
      PATH: '/wmsx/finished-goods-serial-management/create',
      TITLE: 'finishedGoodsSerialManagementCreate',
    },
  },
  RECEIVE_RECEIPT: {
    LIST: {
      PATH: '/wmsx/receive-receipt',
      TITLE: 'receiveReceipt',
    },
    CREATE: {
      PATH: '/wmsx/receive-receipt/create',
      TITLE: 'receiveReceiptCreate',
    },
    EDIT: {
      PATH: '/wmsx/receive-receipt/:id/edit',
      TITLE: 'receiveReceiptEdit',
    },
    DETAIL: {
      PATH: '/wmsx/receive-receipt/:id/detail',
      TITLE: 'receiveReceiptDetail',
    },
    RECEIVE: {
      PATH: '/wmsx/receive-receipt/:id/receive',
      TITLE: 'receiveReceiptForm',
    },
  },
  OCR_TEMPLATE_SETUP: {
    LIST: {
      PATH: '/wmsx/ocr-template-setup',
      TITLE: 'ocrTemplateSetup',
    },
    CREATE: {
      PATH: '/wmsx/ocr-template-setup/create',
      TITLE: 'ocrTemplateSetupCreate',
    },
    EDIT: {
      PATH: '/wmsx/ocr-template-setup/:id/edit',
      TITLE: 'ocrTemplateSetupEdit',
    },
    DETAIL: {
      PATH: '/wmsx/ocr-template-setup/:id/detail',
      TITLE: 'ocrTemplateSetupDetail',
    },
  },
  SET_SPLIT_MERGE_TICKET: {
    LIST: {
      PATH: '/wmsx/set-split-merge-ticket/create',
      TITLE: 'setSplitMergeTicket',
    },
    CREATE: {
      PATH: '/wmsx/set-split-merge-ticket/create',
      TITLE: 'setSplitMergeTicketCreate',
    },
  },
  PICK_UP_AREAS: {
    LIST: {
      PATH: '/wmsx/pick-up-areas',
      TITLE: 'pickUpAreas',
    },
    CREATE: {
      PATH: '/wmsx/pick-up-areas/create',
      TITLE: 'pickUpAreasCreate',
    },
    DETAIL: {
      PATH: '/wmsx/pick-up-areas/:id/detail',
      TITLE: 'pickUpAreasDetail',
    },
    EDIT: {
      PATH: '/wmsx/pick-up-areas/:id/edit',
      TITLE: 'pickUpAreasEdit',
    },
  },
  PICK_UP_AREA_DISTANCE: {
    LIST: {
      PATH: '/wmsx/pick-up-area-distance',
      TITLE: 'pickUpAreaDistance',
    },
    CREATE: {
      PATH: '/wmsx/pick-up-area-distance/create',
      TITLE: 'pickUpAreaDistanceCreate',
    },
    DETAIL: {
      PATH: '/wmsx/pick-up-area-distance/:id/detail',
      TITLE: 'pickUpAreaDistanceDetail',
    },
    EDIT: {
      PATH: '/wmsx/pick-up-area-distance/:id/edit',
      TITLE: 'pickUpAreaDistanceEdit',
    },
  },
  PICK_UP_TIME: {
    LIST: {
      PATH: '/wmsx/pick-up-time',
      TITLE: 'pickUpTime',
    },
    CREATE: {
      PATH: '/wmsx/pick-up-time/create',
      TITLE: 'pickUpTimeCreate',
    },
    DETAIL: {
      PATH: '/wmsx/pick-up-time/:id/detail',
      TITLE: 'pickUpTimeDetail',
    },
    EDIT: {
      PATH: '/wmsx/pick-up-time/:id/edit',
      TITLE: 'pickUpTimeEdit',
    },
  },
  REPORT_IMPORT_RECEIPT: {
    PATH: '/wmsx/report-import-receipt',
    TITLE: 'reportImportReceipt',
  },
  REPORT_IMPORT_DETAIL: {
    PATH: '/wmsx/report-import-detail',
    TITLE: 'reportImportDetail',
  },
  REPORT_IMPORT_DEFECTIVE_DETAIL: {
    PATH: '/wmsx/report-import-defective-detail',
    TITLE: 'reportImportDefectiveDetail',
  },
  REPORT_EXPORT_DETAIL: {
    PATH: '/wmsx/report-export-detail',
    TITLE: 'reportExportDetail',
  },
  REPORT_LOCATOR: {
    PATH: '/wmsx/report-locator',
    TITLE: 'reportLocator',
  },
  REPORT_INVENTORY_BY_DATE: {
    PATH: '/wmsx/report-inventory-by-date',
    TITLE: 'reportInventoryByDate',
  },
  REPORT_INVENTORY_BY_WAREHOUSE: {
    PATH: '/wmsx/report-inventory-by-warehouse',
    TITLE: 'reportInventoryByWarehouse',
  },
  REPORT_SUMMARY_BY_LOCATION: {
    PATH: '/wmsx/report-summary-by-location',
    TITLE: 'reportSummaryByLocation',
  },
  REPORT_DETAIL_SUMMARY_BY_LOCATION: {
    PATH: '/wmsx/report-detail-summary-by-location',
    TITLE: 'reportDetailSummaryByLocation',
  },
  PICKING_RECEIPT: {
    LIST: {
      PATH: '/wmsx/picking-receipt',
      TITLE: 'pickingReceipt',
    },
    CREATE: {
      PATH: '/wmsx/picking-receipt/create',
      TITLE: 'pickingReceiptCreate',
    },
    EDIT: {
      PATH: '/wmsx/picking-receipt/:id/edit',
      TITLE: 'pickingReceiptEdit',
    },
    DETAIL: {
      PATH: '/wmsx/picking-receipt/:id/detail',
      TITLE: 'pickingReceiptDetail',
    },
    ASSIGN: {
      PATH: '/wmsx/picking-receipt/:id/assign',
      TITLE: 'pickingReceiptAssign',
    },
  },
  EXPIRATION_STATISTICS: {
    PATH: '/wmsx/expiration-statistics',
    TITLE: 'expirationStatistics',
  },
  EXPORT_HISTORY: {
    LIST: {
      PATH: '/wmsx/export-history',
      TITLE: 'exportHistory',
    },
  },
  REPORT_IMPORT_EXPORT_INVENTORY: {
    PATH: '/wmsx/report-import-export-inventory',
    TITLE: 'reportImportExportInventory',
  },
  REPORT_IMPORT_EXPORT_INVENTOR_DETAIL: {
    PATH: '/wmsx/report-import-export-inventory-detail',
    TITLE: 'reportImportExportInventoryDetail',
  },
  REPORT_GENERAL_INVENTORY: {
    PATH: '/wmsx/report-general-inventory',
    TITLE: 'reportGeneralInventory',
  },
  REPORT_INVENTORY_DETAIL_BY_LOCATION: {
    PATH: '/wmsx/report-inventory-detail-by-location',
    TITLE: 'reportInventoryDetailByLocation',
  },
  REPORT_LOCATION_TRANSFER: {
    PATH: '/wmsx/report-location-transfer',
    TITLE: 'reportLocationTransfer',
  },
  LOCATION_TRANSFER_RECEIPT: {
    LIST: {
      PATH: '/wmsx/location-transfer-receipt',
      TITLE: 'locationTransferReceipt',
    },
    CREATE: {
      PATH: '/wmsx/location-transfer-receipt/create',
      TITLE: 'locationTransferReceiptCreate',
    },
    EDIT: {
      PATH: '/wmsx/location-transfer-receipt/:id/edit',
      TITLE: 'locationTransferReceiptEdit',
    },
    DETAIL: {
      PATH: '/wmsx/location-transfer-receipt/:id/detail',
      TITLE: 'locationTransferReceiptDetail',
    },
    EXECUTE: {
      PATH: '/wmsx/location-transfer-receipt/:id/execute',
      TITLE: 'locationTransferReceiptExecute',
    },
  },
  IMPORT_HISTORY: {
    LIST: {
      PATH: '/wmsx/import-history',
      TITLE: 'importHistory',
    },
  },
  DATA_SYNC_MANAGEMENT: {
    LIST: {
      PATH: '/wmsx/data-sync-management',
      TITLE: 'dataSyncManagement',
    },
    DETAIL: {
      PATH: '/wmsx/data-sync-management/:id/detail',
      TITLE: 'dataSyncManagementDetail',
    },
  },
  STORAGE_LOCATION_SUGGESTION: {
    LIST: {
      PATH: '/wmsx/storage-location-suggestion',
      TITLE: 'storageLocationSuggestion',
    },
    CREATE: {
      PATH: '/wmsx/storage-location-suggestion/create',
      TITLE: 'storageLocationSuggestionCreate',
    },
    DETAIL: {
      PATH: '/wmsx/storage-location-suggestion/:id/detail',
      TITLE: 'storageLocationSuggestionDetail',
    },
  },
  SETUP_JOB: {
    LIST: {
      PATH: '/wmsx/setup-job',
      TITLE: 'setupJob',
    },
    CREATE: {
      PATH: '/wmsx/setup-job/create',
      TITLE: 'setupJobCreate',
    },
  },
  REPORT_PPM_TREND: {
    PATH: '/wmsx/report-ppm-trend',
    TITLE: 'reportPpmTrend',
  },
}
