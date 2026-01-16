/* eslint-disable no-useless-escape */
const VTI_DOMAIN = process.env.REACT_APP_VTI_DOMAIN

export const LANG_OPTIONS = {
  VI: 'vi',
  // EN: 'en', //TODO: comment Multi language EN
  JP: 'jp',
}

export const DEFAULT_LANG = 'vi'

export const NOTIFICATION_TYPE = {
  SUCCESS: 'success',
  ERROR: 'danger',
  INFO: 'info',
  WARNING: 'warning',
  CONFLICT: 'conflict',
}
export const MAX_VALUE_TEXT_FIELD = 999999999999.999999

export const MODAL_MODE = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DETAIL: 'DETAIL',
  UPDATE_HEADER: 'UPDATE_HEADER',
  CLONE: 'CLONE',
  CONFIRM: 'CONFIRM',
  ASSIGN: 'ASSIGN',
}

export const TEXTFIELD_REQUIRED_LENGTH = {
  COMMON: {
    MAX: 255,
  },
  NAME: {
    MAX: 255,
  },
  PASSWORD: {
    MIN: 6,
    MAX: 20,
  },
  PASSWORD_PORTAL: {
    MIN: 12,
    MAX: 20,
  },
  EMAIL: {
    MIN: 6,
    MAX: 100,
  },
  ADDRESS: {
    MAX: 100,
  },
  FAX: {
    MAX: 50,
  },
  TAX: {
    MAX: 14,
  },
  PHONE: {
    MIN: 10,
    MAX: 12,
  },
  CODE: {
    MIN: 1,
    MAX: 20,
  },
  CODE_2: {
    MAX: 2,
    MIN: 2,
  },
  CODE_3: {
    MAX: 3,
  },
  CODE_4: {
    MAX: 4,
  },
  CODE_5: {
    MAX: 5,
  },
  CODE_6: {
    MIN: 6,
    MAX: 6,
  },
  CODE_7: {
    MAX: 7,
  },
  CODE_8: {
    MAX: 8,
  },
  CODE_9: {
    MAX: 9,
  },
  CODE_10: {
    MAX: 10,
  },
  CODE_11: {
    MAX: 11,
  },
  CODE_12: {
    MAX: 12,
  },
  CODE_15: {
    MAX: 15,
  },
  CODE_16: {
    MAX: 16,
  },
  CODE_20: {
    MAX: 20,
  },
  CODE_22: {
    MAX: 22,
  },
  CODE_25: {
    MAX: 25,
  },
  CODE_50: {
    MAX: 50,
  },
  CODE_55: {
    MAX: 55,
  },
  CODE_100: {
    MAX: 100,
  },
  CODE_500: {
    MAX: 500,
  },
  TARGET: {
    MAX: 5,
  },
  SYMBOL: {
    MIN: 1,
    MAX: 10,
  },
  REASON: {
    MIN: 0,
    MAX: 255,
  },
  ITEM_CODE: {
    MAX: 50,
    WARNING: 28,
  },
}

export const NUMBER_FIELD_REQUIRED_SIZE = {
  AMOUNT_INTEGER: {
    MIN: 0,
    MAX: 9999999999,
  },
  INTEGER_100M: {
    MIN: 1,
    MAX: 100000000,
  },
  INTEGER_1M: {
    MIN: 1,
    MAX: 1000000,
  },
  INTEGER_100K: {
    MIN: 1,
    MAX: 100000,
  },
  INTEGER_10K: {
    MIN: 1,
    MAX: 10000,
  },
  INTEGER_1000: {
    MIN: 1,
    MAX: 999,
  },
  AMOUNT_10B: {
    MIN: 0.00001,
    MAX: 9999999999.99999,
  },
  AMOUNT_FLOAT: {
    MIN: 1,
    MAX: 9999999.999,
  },
  AMOUNT_DECIMAL: {
    MIN: 0.0000001,
    MAX: 999999999999,
  },
  PERCENT: {
    MIN: 0,
    MAX: 100,
  },
  PERCENT_5: {
    MIN: 0.00001,
    MAX: 100,
  },
  QUANTITY: {
    MIN: 1,
    MAX: 99999,
  },
  QUANTITY_1B: {
    MIN: 0,
    MAX: 1000000000,
  },
  QUANTITY_1K: {
    MAX: 1000,
  },
  QUANTITY_4_NUMBER: {
    MAX: 9999.99999,
  },
  QUANTITY_9: {
    MIN: 1,
    MAX: 999999999,
  },
  QUANTITY_10: {
    MAX: 9999999999,
  },
  QUANTITY_12: {
    MAX: 999999999999,
  },
  WATTAGE: {
    MIN: 0,
    MAX: 9999999,
  },
  PRICE: {
    MIN: 0,
    MAX: 100000000000,
  },
  PRICE_ITEM_SALE_ORDER: {
    MIN: 0,
    MAX: 99999999,
  },
  ITEM_QUANTITY: {
    MIN: 1,
    MAX: 10000,
  },
  PO_QUANTITY: {
    MIN: 0.01,
    MAX: 999999999.99,
  },
  PO_PRICE: {
    MIN: 0,
    MAX: 999999999999.99,
  },
  DISCOUNT: {
    MIN: 0,
    MAX: 100,
  },
  JOINED_DAY: {
    MIN: 0,
    MAX: 99999,
  },
  UNIT: {
    MIN: 0.001,
    MAX: 99999999999,
  },
  LOT_NUMBER: {
    MIN: 1,
    MAX: 10,
  },
  PLAN_QUANTITY: {
    MIN: 1,
    MAX: 100000000,
  },
  TIME_QUANTITY: {
    MIN: 1,
    MAX: 525600,
  },
  ITEM_QUANTITY_ZERO: {
    MIN: 0,
    MAX: 100000000,
  },
  INVENTORY_LIMIT: {
    MIN: 0,
    MAX: 999999999,
  },
  EXPIRY_WAREHOUSE: {
    MIN: 1,
    MAX: 9999.99999,
  },
  MONEY: {
    MIN: 0,
    MAX: 99999999999999999999.99,
  },
  MEASURE: {
    MIN: 0,
    MAX: 99999999999999999999.99,
  },
  ITEM_NORM_QUANTITY: {
    MIN: 0.0001,
    DEFAULT: 1,
    MAX: 1000000000,
  },
  ITEM_NORM_KL: {
    MIN: 0.01,
    MAX: 100000,
  },
  ITEM_BOM_STRUCTURE_QUANTITY: {
    MIN: 0.01,
    MAX: 100000000,
  },
  PRODUCING_STEP_NORM_QUANTITY: {
    MIN: 0,
    MAX: 1000000000,
  },
  EXCHANGE_RATE: {
    MIN: 0.00001,
    MAX: 999999.99999,
  },
  QUANTITY_VENDOR_ITEM: {
    MIN: 0.01,
    MAX: 999999999.99,
  },
  SALE_ORDER_ITEM_PRICE: {
    MIN: 1,
    MAX: 1000000000,
  },
  SALE_ORDER_ITEM_QUANTITY: {
    MIN: 1,
    MAX: 100000000,
  },
  PRODUCTION_ORDER_ITEM_QUANTITY: {
    MIN: 1,
    MAX: 1000000000,
  },
  ROW_QUANTITY: {
    DEFAULT: 1,
    MIN: 1,
    MAX: 50,
  },
  PO_TOTAL: {
    MAX: 999999999999999999.99,
  },
  HOURS: {
    MIN: 1,
    MAX: 1000000000,
  },
  DAY_EXPIRE: {
    MIN: 1,
    MAX: 9999,
  },
  CONVERSION_RATE: {
    MIN: 0,
    MAX: 100000000,
  },
  ACCOUNTING: {
    MIN: 0,
    MAX: 9999999999,
  },
  EXPIRY_WARNING: {
    MIN: 0,
    MAX: 9999.99999,
  },
  ITEM_DETAIL_QUANTITY: {
    MIN: 0,
    MAX: 9999,
  },
  PACKING_QUANTITY: {
    MIN: 0,
    MAX: 9999,
  },
  SECOND: {
    MIN: 1,
    MAX: 86400,
  },
  INTEGER_4: {
    MIN: 0,
    MAX: 9999,
  },
  ITEM_SELECTED: {
    MIN: 1,
  },
  ITEM_SIZE: {
    MIN: 0,
    MAX: 9999.99999,
  },
  ITEM_MATERIAL_QUANTITY: {
    MIN: 0,
    MAX: 9999.99999,
  },
}

export const TEXTFIELD_ALLOW = {
  NUMERIC: /[^0-9]/g,
  NUMERIC_ENDASH: /[^0-9-]/g,
  NUMERIC_REAL: /[^1-9]/g,
  NUMERIC_PLUS: /[^0-9+]/g,
  POSITIVE_DECIMAL: /[^0-9.]/g,
  ALPHABET: /[^a-zA-Z]/g,
  ALPHANUMERIC: /[^0-9a-zA-Z]/g,
  ALPHANUMERIC_PERCENT: /[^0-9a-zA-Z%]/g,
  ALPHANUMERIC_SPACE: /[^0-9a-zA-Z\s]/g,
  ALPHANUMERIC_DOT: /[^0-9a-zA-Z.]/g,
  ALPHANUMERIC_SHIFT: /[^0-9a-zA-Z_]/g,
  ALPHANUMERIC_ENDASH: /[^0-9a-zA-Z-]/g,
  ALPHANUMERIC_ATSYMBOL_DOT: /[^0-9a-zA-Z@.]/g,
  ALPHA_ATSYMBOL: /[^a-zA-Z@]/g,
  ALPHANUMERIC_SPECIALS:
    /[^0-9a-zA-Z-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]/g,
  ALPHANUMERIC_SPECIALS_SPACE:
    /[^0-9a-zA-Z-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|\s]/g,
  EXCEPT_SPECIALS: /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]/g,
  EXCEPT_SPECIALS_NOT_DOT_UNDERSCORE:
    /[-!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]/g,
  EXCEPT_SPACES: /[\s]/g,
  ALPHANUMERIC_DOT_UNDERSCORE: /[^0-9a-zA-Z._]/g,
  ALPHANUMERIC_DOT_SHIFT_ENDASH: /[^0-9a-zA-Z._-]/g,
  ALPHANUMERIC_ENDASH_SLASH: /[^0-9a-zA-Z-/]/g,
  ALPHANUMERIC_DOT_ENDASH_SPACE: /[^0-9a-zA-Z.-\s]/g,
  ALPHANUMERIC_DOT_ENDASH: /[^0-9a-zA-Z.-]/g,
  ALPHANUMERIC_DOT_ENDASH_BRACKETS: /[^0-9a-zA-Z.-\s()]/g,
  REGEX_CODE_VIETNAMESE:
    /[^a-zA-Z0-9ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵýỷỹ\s&,\/._·]+$/g,
  REGEX_CODE_VIETNAMESE_SPECIALS:
    /[^a-zA-Z0-9ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵýỷỹ\s&,\/\\._\-·|:#!@$^*()+?`~<>\[\]{}'"=%;]+$/g,
  REGEX_CODE_JAPANESE:
    /[^Ａ-Ｚａ-ｚぁ-んァ-ン一-龥０-９-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|\s]/g,
  REGEX_CODE_JAPANESE_ALPHANUMBERIC:
    /[^Ａ-Ｚａ-ｚぁ-んァ-ン一-龥０-９A-Za-z0-9-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|\s]/g,
  REGEX_CODE_JAPANESE_ALPHANUMBERIC_DOT_DASH:
    /[^Ａ-Ｚａ-ｚぁ-んァ-ン一-龥０-９A-Za-z0-9-.\s]/g,
  REGEX_CODE_VIETNAMESE_JAPANESE:
    /[^Ａ-Ｚａ-ｚぁ-んァ-ン一-龥０-９a-zA-Z0-9ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵýỷỹ\s.·-]+$/g,
  REGEX_CODE_VIETNAMESE_JAPANESE_SPECIALS:
    /[^Ａ-Ｚａ-ｚぁ-んァ-ン一-龥０-９a-zA-Z0-9ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵýỷỹ\s&,\/\\._\-·|:#!@$^*()+?`~<>\[\]{}'"=%;]+$/g,
  REGEX_CODE_SPECIALS: /[^0-9a-zA-Z(!@#$%^&*()_\-=+""><?\/\\\s)"]+$/g,
  REGEX_CODE_ITEM: /[^0-9a-zA-Z.\-:/"]+$/g,
  REGEX_PASSWORD_PORTAL: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{12,}$/,
  REGEX_NON_ALPHANUMERIC: /[^A-Za-z0-9]/g,
}

export const TEXTFIELD_PREVENT = {
  [TEXTFIELD_ALLOW.NUMERIC]: [',', '.', '-', '+', 'e', 'E'],
  [TEXTFIELD_ALLOW.POSITIVE_DECIMAL]: [',', '-', '+', 'e', 'E'],
}

export const ROWS_PER_PAGE_OPTIONS = [20, 50, 100]
export const ASYNC_SEARCH_LIMIT = 50
export const ASYNC_SEARCH_LIMIT_100 = 100

export const DATE_TIME_FORMAT_BY_LANG = {
  [LANG_OPTIONS.VI]: 'dd/MM/yyyy HH:mm:ss',
  [LANG_OPTIONS.EN]: 'MMM dd, yyyy HH:mm:ss',
  [LANG_OPTIONS.JP]: 'yyyy/MM/dd HH:mm:ss',
}

export const DATE_FORMAT_BY_LANG = {
  [LANG_OPTIONS.VI]: 'dd/MM/yyyy',
  [LANG_OPTIONS.EN]: 'MMM dd, yyyy',
  [LANG_OPTIONS.JP]: 'yyyy/MM/dd',
}

export const DATE_12H_FORMAT_BY_LANG = {
  [LANG_OPTIONS.VI]: 'dd/MM/yyyy hh:mm a',
  [LANG_OPTIONS.EN]: 'MMM dd, yyyy hh:mm a',
  [LANG_OPTIONS.JP]: 'yyyy/MM/dd hh:mm a',
}

export const UNSAFE_DATE_FORMAT_3 = 'yyyy-MM-dd'
export const UNSAFE_DATE_TIME_FORMAT = 'yyyy-MM-dd HH:mm'
export const IMPORT_EXPORT_DATE_FORMAT = 'dd-MM-yyyy_HH_mm_SS'
export const EXPORT_DATE_FORMAT = 'dd_MM_yyyy_HH_mm_SS'

export const DEFAULT_TIME = '00:00'

export const QR_CODE_TYPE = {
  ITEM: '02',
  BLOCK: '03',
  PACKAGE: '04',
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
    MAX_LENGTH: 10,
    FILLED_CHARACTER: '0',
  },
  IMPORT_MANUFACTURING_ORDER: {
    DOMAIN: 'IMPORT_MANUFACTURING_ORDER',
    PREFIX: 'IM',
    MAX_LENGTH: 10,
    FILLED_CHARACTER: '0',
  },
  HOLON: {
    DOMAIN: 'HOLON',
    PREFIX: 'V',
    MAX_LENGTH: 3,
    FILLED_CHARACTER: '0',
  },
}

export const FILE_TYPE = {
  XLSX: {
    NAME: 'XLSX',
    EXT: '.xlsx',
    TYPE: 'xlsx',
    MIME_TYPE:
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  },
  PDF: {
    NAME: 'PDF',
    EXT: '.pdf',
    TYPE: 'pdf',
    MIME_TYPE: 'application/pdf',
  },
  XML: {
    NAME: 'XML',
    EXT: '.xml',
    TYPE: 'xml',
    MIME_TYPE: 'application/xml',
  },
}

export const IMG_FILE_TYPE = [
  {
    NAME: 'APNG',
    EXT: '.apng',
    MIME_TYPE: 'image/apng',
  },
  {
    NAME: 'AVIF',
    EXT: '.avif',
    MIME_TYPE: 'image/avif',
  },
  {
    NAME: 'GIF',
    EXT: '.gif',
    MIME_TYPE: 'image/gif',
  },
  {
    NAME: 'JPEG',
    EXT: '.jpg, .jpeg, .jfif, .pjpeg, .pjp',
    MIME_TYPE: 'image/jpeg',
  },
  {
    NAME: 'PNG',
    EXT: '.png',
    MIME_TYPE: 'image/png',
  },
  {
    NAME: 'SVG',
    EXT: '.svg',
    MIME_TYPE: 'image/svg+xml',
  },
  {
    NAME: 'WebP',
    EXT: '.webp',
    MIME_TYPE: 'image/webp',
  },
]

export const JPG_PNG_FILE_TYPE = [
  {
    NAME: 'JPEG',
    EXT: '.jpg, .jpeg, .jfif, .pjpeg, .pjp',
    MIME_TYPE: 'image/jpeg',
  },
  {
    NAME: 'PNG',
    EXT: '.png',
    MIME_TYPE: 'image/png',
  },
]

export const IMPORT_SETTING = {
  FILE_SIZE_LIMIT: 2097152,
  NUMBER_OF_FILE: 1,
  FILE_NAME: '{0}_{1}',
}

export const IMPORT_EXPORT_MODE = {
  IMPORT_ONLY: 'IMPORT',
  EXPORT_ONLY: 'EXPORT',
  BOTH: 'IMPORT/EXPORT',
  IMPORT_TABLE: 'IMPORT_TABLE',
}

export const IMPORT_EXPORT_MODE_OPTIONS = [
  {
    value: IMPORT_EXPORT_MODE.IMPORT_ONLY,
    text: 'importExportMenu.import',
  },
  {
    value: IMPORT_EXPORT_MODE.EXPORT_ONLY,
    text: 'importExportMenu.export',
  },
]

export const CONFIG_COOKIES = {
  path: '/',
  domain: VTI_DOMAIN,
}

export const HTTP_STATUS_CODE = {
  SUCCESS: 200,
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
  NOT_ACCEPTABLE: 406,
  EXPORT_SUCCESS: 201,
  MAINTENANCE: 509,
}

export const ORDER_DIRECTION = {
  ASC: 'asc',
  DESC: 'desc',
}

export const INVENTORY_STATUS = {
  PENDING: 1,
  CONFIRMED: 2,
  REJECT: 3,
  INPROGRESS: 5,
  COMPLETED: 4,
}

export const COST_CENTER_STATUS = {
  DRAFT: 0,
  APPROVED: 1,
  INACTIVE: 2,
  ACTIVE: 3,
  DELETED: 4,
}

export const INVENTORY_STATUS_OPTIONS = [
  { id: 1, name: 'inventoryStatus.pending', color: 'created' },
  { id: 2, name: 'inventoryStatus.confirmed', color: 'confirmed' },
  { id: 3, name: 'inventoryStatus.reject', color: 'rejected' },
  { id: 5, name: 'inventoryStatus.inProgress', color: 'inProgress' },
  { id: 4, name: 'inventoryStatus.complete', color: 'completed' },
]
export const MATERIAL_CODE = '00'

export const ENUM_BOOLEAN = {
  true: 1,
  false: 0,
}

export const BULK_ACTION = {
  APPROVE: 1,
  REJECT: 2,
  DELETE: 3,
  CONFIRM: 4,
}

export const BULK_ACTION_OPTIONS = [
  {
    value: BULK_ACTION.APPROVE,
    text: 'bulkActions.approve',
    icon: 'approve',
  },
  {
    value: BULK_ACTION.CONFIRM,
    text: 'bulkActions.confirm',
    icon: 'tick',
  },
  {
    value: BULK_ACTION.REJECT,
    text: 'bulkActions.reject',
    icon: 'remove',
  },
  {
    value: BULK_ACTION.DELETE,
    text: 'bulkActions.delete',
    icon: 'delete',
    iconColor: 'error',
  },
]

export const ONE_DAY_IN_MILI_SECOND = 86400000

export const WAREHOUSE_LAYOUTS_LAYOUT_EXPORT = {
  LOCATION: 1,
  SHELF: 2,
  DRAWER: 3,
  BIN: 4,
}

export const ACTIVE_STATUS = {
  INACTIVE: 0,
  ACTIVE: 1,
}

export const ACTIVE_STATUS_STRING = {
  INACTIVE: 'inactive',
  ACTIVE: 'active',
}

export const ACTIVE_STATUS_OPTIONS = [
  {
    id: ACTIVE_STATUS.INACTIVE,
    text: 'general.inactive',
    color: 'inactive',
  },
  {
    id: ACTIVE_STATUS.ACTIVE,
    text: 'general.active',
    color: 'active',
  },
]

export const ACTIVE_STATUS_STRING_OPTIONS = [
  {
    id: ACTIVE_STATUS_STRING.INACTIVE,
    text: 'general.inactive',
    color: 'inactive',
  },
  {
    id: ACTIVE_STATUS_STRING.ACTIVE,
    text: 'general.active',
    color: 'active',
  },
]

export const ACTIVE_STATUS_MAP = {
  [ACTIVE_STATUS.INACTIVE]: 'general.inactive',
  [ACTIVE_STATUS.ACTIVE]: 'general.active',
}

export const TABLE_VIEW_LIMIT = 5
export const OFFICE_FILE_TYPE = [
  {
    NAME: 'PDF',
    EXT: '.pdf',
    MIME_TYPE: 'application/pdf',
  },
  {
    NAME: 'DOC',
    EXT: '.doc',
    MIME_TYPE: 'application/msword',
  },
  {
    NAME: 'DOCX',
    EXT: '.docx',
    MIME_TYPE:
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  },
  {
    NAME: 'XLS',
    EXT: '.xls',
    MIME_TYPE: 'application/vnd.ms-excel',
  },
  {
    NAME: 'XLSX',
    EXT: '.xlsx',
    MIME_TYPE:
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  },
  {
    NAME: 'PPT',
    EXT: '.ppt',
    MIME_TYPE: 'application/vnd.ms-powerpoint',
  },
  {
    NAME: 'PPTX',
    EXT: '.pptx',
    MIME_TYPE:
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  },
]

export const DOC_FILE_TYPE = [
  {
    NAME: 'PDF',
    EXT: '.pdf',
    MIME_TYPE: 'application/pdf',
  },
  {
    NAME: 'DOC',
    EXT: '.doc',
    MIME_TYPE: 'application/msword',
  },
  {
    NAME: 'DOCX',
    EXT: '.docx',
    MIME_TYPE:
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  },
  {
    NAME: 'XLS',
    EXT: '.xls',
    MIME_TYPE: 'application/vnd.ms-excel',
  },
  {
    NAME: 'XLSX',
    EXT: '.xlsx',
    MIME_TYPE:
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  },
]

export const MAX_NUMBER_OF_FILE = 10

export const FILE_SIZE = {
  DEFAULT: 2097152, //2mb
  _4MB: 4194304,
  _1MB: 1048576,
  _5MB: 5242880,
  _30MB: 31457280,
  _50MB: 52428800,
}

export const TYPE_EXPORT = {
  DEVICE_GROUP: 0,
  CHECKLIST_TEMPLATE: 1,
  INSTALLATION_TEMPLATE: 2,
  ATTRIBUTE_TYPE: 3,
  MAINTENANCE_ATTRIBUTE: 4,
  SUPPLY_GROUP: 5,
  SUPPLY: 6,
  DEVICE: 7,
  UNIT: 8,
  MAINTENANCE_TEAM: 9,
  DEVICE_REQUEST: 10,
  AREA: 11,
  ERROR_TYPE: 12,
  VENDOR: 13,
  DEVICE_TYPE: 14,
  DEVICE_ASSIGNMENT: 15,
  ARTICLE_DEVICE_GROUP: 16,
  MAINTENANCE_TEMPLATE: 17,
  ACCREDITATION_TEMPLATE: 18,
  JOB: 19,
  WAREHOUSE: 20,
  INVENTORY_DEVICE_GROUP: 21,
  INVENTORY_SUPPLY: 22,
  DEVICE_INVENTORY: 23,
  DEVICE_NAME: 24,
  REPORT_NEW_INVESTMENT_DEVICE: 25,
  OPERATION_VALUE: 26,
  REPORT_TRANSFER: 27,
  REPORT_TRANSFER_DETAIL: 28,
  REPORT_DEVICE_SYNTHESIS: 29,
  REPORT_DEVICE_MAINTENANCE: 30,
  TEMPLATE: 31,
  REPAIR_REQUEST: 34,
}

export const DATA_TYPE = {
  TEXT: 0,
  CHECKBOX: 1,
  DATE: 2,
  SELECT_BOX_SINGLE: 3,
  SELECT_BOX_MULTIPLE: 4,
  NUMBER: 5,
  RADIO_BUTTON: 6,
  FILE: 7,
  DATE_RANGE_PICKER: 8,
  DATE_TIME: 9,
}

export const FIELD_AREA = {
  HEADER: 0,
  TABLE: 1,
}

export const DEFAULT_LABEL_WIDTH = 120

export const DEFAULT_ITEM_TYPE_ENUM = {
  PRODUCT: {
    id: 1,
    code: '1',
    name: 'itemType.product',
  },
  MERCHANDISE: {
    id: 2,
    code: '2',
    name: 'itemType.merchandise',
  },
  ACCESSORY: {
    id: 3,
    code: '3',
    name: 'itemType.accessory',
  },
  MATERIAL: {
    id: 4,
    code: '4',
    name: 'itemType.material',
  },
  SEMI: {
    id: 5,
    code: '5',
    name: 'itemType.semi',
  },
  OUT_SOURCING: {
    id: 6,
    code: '6',
    name: 'itemType.outSourcing',
  },
  TOOL: {
    id: 7,
    code: '7',
    name: 'itemType.tool',
  },
  SMC_PRODUCT: {
    id: 8,
    code: '8',
    name: 'itemType.smcProduct',
  },
  PACKING_MATERIAL: {
    id: 9,
    code: '9',
    name: 'itemType.packingMaterial',
  },
  OTHER: {
    id: 10,
    code: '10',
    name: 'itemType.other',
  },
}

export const DEFAULT_REASON_ENUM = {
  IN05: 'IN05',
  OUT01: 'OUT01',
  IN04: 'IN04',
  OUT08: 'OUT08',
  OUT05: 'OUT05',
  OUT06: 'OUT06',
  IN08: 'IN08',
  OUT02: 'OUT02',
  X01_16: 'X01-16',
  N01_15: 'N01-15',
}

export const DEFAULT_ITEM_TYPE = {
  PRODUCT: '1',
  MERCHANDISE: '2',
  ACCESSORY: '3',
  MATERIAL: '4',
  SEMI: '5',
  OUT_SOURCING: '6',
  TOOL: '7',
  SMC_PRODUCT: '8',
  PACKING_MATERIAL: '9',
  OTHER: '10',
}

export const DEFAULT_ITEM_TYPE_MAP = {
  [DEFAULT_ITEM_TYPE.PRODUCT]: 'itemType.product',
  [DEFAULT_ITEM_TYPE.MATERIAL]: 'itemType.material',
  [DEFAULT_ITEM_TYPE.MERCHANDISE]: 'itemType.merchandise',
  [DEFAULT_ITEM_TYPE.ACCESSORY]: 'itemType.accessory',
  [DEFAULT_ITEM_TYPE.SEMI]: 'itemType.semi',
  [DEFAULT_ITEM_TYPE.OUT_SOURCING]: 'itemType.outSourcing',
  [DEFAULT_ITEM_TYPE.TOOL]: 'itemType.tool',
  [DEFAULT_ITEM_TYPE.SMC_PRODUCT]: 'itemType.smcProduct',
  [DEFAULT_ITEM_TYPE.PACKING_MATERIAL]: 'itemType.packingMaterial',
  [DEFAULT_ITEM_TYPE.OTHER]: 'itemType.other',
}

export const DEFAULT_ITEM_TYPE_OPTIONS = [
  {
    id: 1,
    code: '1',
    text: 'itemType.product',
  },
  {
    id: 2,
    code: '2',
    text: 'itemType.merchandise',
  },
  {
    id: 3,
    code: '3',
    text: 'itemType.accessory',
  },
  {
    id: 4,
    code: '4',
    text: 'itemType.material',
  },
  {
    id: 5,
    code: '5',
    text: 'itemType.semi',
  },
  {
    id: 6,
    code: '6',
    text: 'itemType.outSourcing',
  },
  {
    id: 7,
    code: '7',
    text: 'itemType.tool',
  },
  {
    id: 8,
    code: '8',
    text: 'itemType.smcProduct',
  },
  {
    id: 9,
    code: '9',
    text: 'itemType.packingMaterial',
  },
  {
    id: 10,
    code: '10',
    text: 'itemType.other',
  },
]

export const SUPER_ADMIN_CODE = '000000001' // can not change info user with supper admin code

export const HISTORY_ACTION = {
  CREATE: 1,
  UPDATE: 2,
  CHANGE_STATUS: 3,
  DELETE: 4,
}
export const DAY_OF_WEEK_OPTIONS = [
  {
    id: 1,
    text: 'general:day.monday',
  },
  {
    id: 2,
    text: 'general:day.tueday',
  },
  {
    id: 3,
    text: 'general:day.wednesday',
  },
  {
    id: 4,
    text: 'general:day.thurday',
  },
  {
    id: 5,
    text: 'general:day.friday',
  },
  {
    id: 6,
    text: 'general:day.saturday',
  },
  {
    id: 0,
    text: 'general:day.sunday',
  },
]

export const OFF_TIME_OPTIONS = [
  {
    id: 0,
    text: 'general:offTime.allDay',
  },
  {
    id: 1,
    text: 'general:offTime.morning',
  },
  {
    id: 2,
    text: 'general:offTime.afternoon',
  },
]

export const STOCK_KEY = {
  WAREHOUSE_ID: 'warehouseId',
  ITEM_ID: 'itemId',
  TICKET_LOCATOR_ID: 'ticketLocatorId',
  PACKING_ID: 'packingId',
  COST_CENTER_ID: 'costCenterId',
  BOM_VERSION_ID: 'bomVersionId',
  LOT_NUMBER: 'lotNumber',
  MFG: 'mfg',
  QUALITY: 'quality',
  BUNDLE: 'bundle',
  BOX: 'box',
  LEVEL: 'level',
  UNIT_ID: 'unitId',
  ITEM_TYPE_ID: 'itemTypeId',
  STATUS: 'status',
  WAREHOUSE_CATEGORY: 'warehouseCategory',
  PRODUCING_STEP_ID: 'producingStepId',
  ITEM_TYPE_CODE: 'itemTypeCode',
}

export const STOCK_KEY_ENUM = {
  WAREHOUSE_ID: 1,
  ITEM_ID: 2,
  TICKET_LOCATOR_ID: 3,
  PACKING_ID: 4,
  COST_CENTER_ID: 5,
  BOM_VERSION_ID: 6,
  LOT_NUMBER: 7,
  MFG: 8,
  QUALITY: 9,
  BUNDLE: 10,
  BOX: 11,
  LEVEL: 12,
  UNIT_ID: 13,
  ITEM_TYPE_ID: 14,
  STATUS: 15,
  WAREHOUSE_CATEGORY: 16,
  PRODUCING_STEP_ID: 17,
  ITEM_TYPE_CODE: 18,
}

export const STOCK_KEY_MAP = {
  [STOCK_KEY.WAREHOUSE_ID]: 1,
  [STOCK_KEY.ITEM_ID]: 2,
  [STOCK_KEY.TICKET_LOCATOR_ID]: 3,
  [STOCK_KEY.PACKING_ID]: 4,
  [STOCK_KEY.COST_CENTER_ID]: 5,
  [STOCK_KEY.BOM_VERSION_ID]: 6,
  [STOCK_KEY.LOT_NUMBER]: 7,
  [STOCK_KEY.MFG]: 8,
  [STOCK_KEY.QUALITY]: 9,
  [STOCK_KEY.BUNDLE]: 10,
  [STOCK_KEY.BOX]: 11,
  [STOCK_KEY.LEVEL]: 12,
  [STOCK_KEY.UNIT_ID]: 13,
  [STOCK_KEY.ITEM_TYPE_ID]: 14,
  [STOCK_KEY.STATUS]: 15,
  [STOCK_KEY.WAREHOUSE_CATEGORY]: 16,
  [STOCK_KEY.PRODUCING_STEP_ID]: 17,
  [STOCK_KEY.ITEM_TYPE_CODE]: 18,
}

export const LAYOUT_PRINT_TYPE = {
  PORTRAIT: 'portrait',
  LANDSCAPE: 'landscape',
}

export const LAYOUT_PRINT_OPTION = [
  { id: LAYOUT_PRINT_TYPE.PORTRAIT, text: 'general:qzTray.portrait' },
  { id: LAYOUT_PRINT_TYPE.LANDSCAPE, text: 'general:qzTray.landscape' },
]

export const PARE_SIZE_TYPE = {
  A3: 'A3',
  A4: 'A4',
  A5: 'A5',
  LETTER: 'letter',
  LEGAL: 'legal',
  ALL: 'ALL',
}

export const PARE_SIZE_OPTION = [
  {
    id: PARE_SIZE_TYPE.A3,
    text: 'general:qzTray.a3',
    width: 194,
    height: 281,
  },
  {
    id: PARE_SIZE_TYPE.A4,
    text: 'general:qzTray.a4',
    width: 200,
    height: 286,
  },
  {
    id: PARE_SIZE_TYPE.A5,
    text: 'general:qzTray.a5',
    width: 138,
    height: 200,
  },
  {
    id: PARE_SIZE_TYPE.LETTER,
    text: 'general:qzTray.letter',
    width: 206,
    height: 269,
  },
  {
    id: PARE_SIZE_TYPE.LEGAL,
    text: 'general:qzTray.legal',
    width: 206,
    height: 346,
  },
]

export const FILTER_PARE_SIZE_OPTION = [
  {
    id: PARE_SIZE_TYPE.ALL,
    text: 'general:qzTray.all',
  },
  {
    id: PARE_SIZE_TYPE.A3,
    text: 'general:qzTray.a3',
  },
  {
    id: PARE_SIZE_TYPE.A4,
    text: 'general:qzTray.a4',
  },
  {
    id: PARE_SIZE_TYPE.A5,
    text: 'general:qzTray.a5',
  },
  {
    id: PARE_SIZE_TYPE.LETTER,
    text: 'general:qzTray.letter',
  },
  {
    id: PARE_SIZE_TYPE.LEGAL,
    text: 'general:qzTray.legal',
  },
]

export const MARGIN_PRINT_TYPE = {
  DEFAULT: 'default',
  NONE: 'NONE',
}

export const MARGIN_PRINT_OPTION = [
  {
    id: MARGIN_PRINT_TYPE.DEFAULT,
    text: 'general:qzTray.default',
    size: 10.16,
  },
  { id: MARGIN_PRINT_TYPE.NONE, text: 'general:qzTray.none', size: 0 },
]

export const SETTING_PRINT_QZ = 'configQz'

export const PREVIEW_PAGE_WIDTH_MM = 210
export const PREVIEW_PAGE_HEIGHT_MM = 297

export const LOCATOR_TYPE = {
  REAL: 0,
  VIRTUAL: 1,
}
