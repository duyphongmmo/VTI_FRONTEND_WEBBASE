export const WMSX_GET_TRANSFER_REPORT = "WMSX_GET_TRANSFER_REPORT";
export const WMSX_GET_TRANSFER_REPORT_SUCCESS =
  "WMSX_GET_TRANSFER_REPORT_SUCCESS";
export const WMSX_GET_ITEM_STOCK_REPORT = "WMSX_GET_ITEM_STOCK_REPORT";
export const WMSX_GET_ITEM_STOCK_REPORT_SUCCESS =
  "WMSX_GET_ITEM_STOCK_REPORT_SUCCESS";
export const WMSX_GET_MOVEMENT_REPORT = "WMSX_GET_MOVEMENT_REPORT";
export const WMSX_GET_MOVEMENT_REPORT_SUCCESS =
  "WMSX_GET_MOVEMENT_REPORT_SUCCESS";
export const WMSX_GET_ITEM_SUMMARY_REPORT = "WMSX_GET_ITEM_SUMMARY_REPORT";
export const WMSX_GET_ITEM_SUMMARY_REPORT_SUCCESS =
  "WMSX_GET_ITEM_SUMMARY_REPORT_SUCCESS";
export const WMSX_GET_TOTAL_ITEM_SUMMARY_REPORT =
  "WMSX_GET_TOTAL_ITEM_SUMMARY_REPORT";
export const WMSX_GET_TOTAL_ITEM_SUMMARY_REPORT_SUCCESS =
  "WMSX_GET_TOTAL_ITEM_SUMMARY_REPORT_SUCCESS";
export const WMSX_GET_OTHER_ITEM_SUMMARY_REPORT =
  "WMSX_GET_OTHER_ITEM_SUMMARY_REPORT";
export const WMSX_GET_OTHER_ITEM_SUMMARY_REPORT_SUCCESS =
  "WMSX_GET_OTHER_ITEM_SUMMARY_REPORT_SUCCESS";
export const WMSX_GET_ITEM_GROUP_STOCK_SUMMARY =
  "WMSX_GET_ITEM_GROUP_STOCK_SUMMARY";
export const WMSX_GET_ITEM_GROUP_STOCK_SUMMARY_SUCCESS =
  "WMSX_GET_ITEM_GROUP_STOCK_SUMMARY_SUCCESS";
export const WMSX_GET_REPORT_GAP_IN_STOCK = "WMSX_GET_REPORT_GAP_IN_STOCK";
export const WMSX_GET_REPORT_GAP_IN_STOCK_SUCCESS =
  "WMSX_GET_REPORT_GAP_IN_STOCK_SUCCESS";
export const WMSX_GET_PURCHASED_ORDER_IMPORTS =
  "WMSX_GET_PURCHASED_ORDER_IMPORTS";
export const WMSX_GET_PURCHASED_ORDER_IMPORTS_SUCCESS =
  "WMSX_GET_PURCHASED_ORDER_IMPORTS_SUCCESS";
export const WMSX_GET_SALE_ORDER_EXPORTS = "WMSX_GET_SALE_ORDER_EXPORTS";
export const WMSX_GET_SALE_ORDER_EXPORTS_SUCCESS =
  "WMSX_GET_SALE_ORDER_EXPORTS_SUCCESS";

export const WMSX_GET_ITEM_STOCK_HISTORIES = "WMSX_GET_ITEM_STOCK_HISTORIES";
export const WMSX_GET_ITEM_STOCK_HISTORIES_SUCCESS =
  "WMSX_GET_ITEM_STOCK_HISTORIES_SUCCESS";

export const WMSX_GET_ITEM_CONSTRUCTION_SCL = "WMSX_GET_ITEM_CONSTRUCTION_SCL";
export const WMSX_GET_ITEM_CONSTRUCTION_SCL_SUCCESS =
  "WMSX_GET_ITEM_CONSTRUCTION_SCL_SUCCESS";

export const WMSX_GET_TICKET_REPORT = "WMSX_GET_TICKET_REPORT";
export const WMSX_GET_TICKET_REPORT_SUCCESS = "WMSX_GET_TICKET_REPORT_SUCCESS";

export const WMSX_GET_TICKET_TRANSACTION_REPORT =
  "WMSX_GET_TICKET_TRANSACTION_REPORT";
export const WMSX_GET_TICKET_TRANSACTION_REPORT_SUCCESS =
  "WMSX_GET_TICKET_TRANSACTION_REPORT_SUCCESS";

export const WMSX_GET_GOOD_ALLOCATED_QUANTITY_REPORT =
  "WMSX_GET_GOOD_ALLOCATED_QUANTITY_REPORT";
export const WMSX_GET_GOOD_ALLOCATED_QUANTITY_REPORT_SUCCESS =
  "WMSX_GET_GOOD_ALLOCATED_QUANTITY_REPORT_SUCCESS";

export const WMSX_GET_STORAGE_ITEM_NORM_REPORT =
  "WMSX_GET_STORAGE_ITEM_NORM_REPORT";
export const WMSX_GET_STORAGE_ITEM_NORM_REPORT_SUCCESS =
  "WMSX_GET_STORAGE_ITEM_NORM_REPORT_SUCCESS";

export const WMSX_GET_YIELD_CHART_LIST = "WMSX_GET_YIELD_CHART_LIST";
export const WMSX_GET_YIELD_CHART_LIST_SUCCESS =
  "WMSX_GET_YIELD_CHART_LIST_SUCCESS";
export const WMSX_GET_YIELD_CHART_LIST_FAILED =
  "WMSX_GET_YIELD_CHART_LIST_FAILED";

export const WMSX_GET_PPM_CHART_LIST = "WMSX_GET_PPM_CHART_LIST";
export const WMSX_GET_PPM_CHART_LIST_SUCCESS =
  "WMSX_GET_PPM_CHART_LIST_SUCCESS";
export const WMSX_GET_PPM_CHART_LIST_FAILED = "WMSX_GET_PPM_CHART_LIST_FAILED";


export const WMSX_GET_PPM_PAGE = "WMSX_GET_PPM_PAGE";
export const WMSX_GET_PPM_PAGE_OK = "WMSX_GET_PPM_PAGE_OK";
export const WMSX_GET_PPM_PAGE_OK_FAILED = "WMSX_GET_PPM_PAGE_OK_FAILED";

export function getPurchasedOrderImports(payload) {
  return {
    type: WMSX_GET_PURCHASED_ORDER_IMPORTS,
    payload: payload,
  };
}

export function setPurchasedOrderImports(payload) {
  return {
    type: WMSX_GET_PURCHASED_ORDER_IMPORTS_SUCCESS,
    payload: payload,
  };
}

export function getSaleOrderExports(payload) {
  return {
    type: WMSX_GET_SALE_ORDER_EXPORTS,
    payload: payload,
  };
}

export function setSaleOrderExports(payload) {
  return {
    type: WMSX_GET_SALE_ORDER_EXPORTS_SUCCESS,
    payload: payload,
  };
}

export function getItemGroupStockSummary(payload) {
  return {
    type: WMSX_GET_ITEM_GROUP_STOCK_SUMMARY,
    payload: payload,
  };
}

export function setItemGroupStockSummary(payload) {
  return {
    type: WMSX_GET_ITEM_GROUP_STOCK_SUMMARY_SUCCESS,
    payload: payload,
  };
}

export function getTransferReport(payload) {
  return {
    type: WMSX_GET_TRANSFER_REPORT,
    payload: payload,
  };
}

export function setTransferReport(payload) {
  return {
    type: WMSX_GET_TRANSFER_REPORT_SUCCESS,
    payload: payload,
  };
}

export function getItemStockReport(payload) {
  return {
    type: WMSX_GET_ITEM_STOCK_REPORT,
    payload: payload,
  };
}

export function setItemStockReport(payload) {
  return {
    type: WMSX_GET_ITEM_STOCK_REPORT_SUCCESS,
    payload: payload,
  };
}

export function getMovementReport(payload) {
  return {
    type: WMSX_GET_MOVEMENT_REPORT,
    payload: payload,
  };
}

export function setMovementReport(payload) {
  return {
    type: WMSX_GET_MOVEMENT_REPORT_SUCCESS,
    payload: payload,
  };
}

export function getItemSummaryReport(payload) {
  return {
    type: WMSX_GET_ITEM_SUMMARY_REPORT,
    payload: payload,
  };
}

export function setItemSummaryReport(payload) {
  return {
    type: WMSX_GET_ITEM_SUMMARY_REPORT_SUCCESS,
    payload: payload,
  };
}

export function getTotalItemSummaryReport(payload) {
  return {
    type: WMSX_GET_TOTAL_ITEM_SUMMARY_REPORT,
    payload: payload,
  };
}

export function setTotalItemSummaryReport(payload) {
  return {
    type: WMSX_GET_TOTAL_ITEM_SUMMARY_REPORT_SUCCESS,
    payload: payload,
  };
}

export function getOrtherItemSummaryReport(payload) {
  return {
    type: WMSX_GET_OTHER_ITEM_SUMMARY_REPORT,
    payload: payload,
  };
}

export function setOrtherItemSummaryReport(payload) {
  return {
    type: WMSX_GET_OTHER_ITEM_SUMMARY_REPORT_SUCCESS,
    payload: payload,
  };
}

export const getReportGapInstock = (payload, onSuccess, onError) => ({
  type: WMSX_GET_REPORT_GAP_IN_STOCK,
  payload,
  onError,
  onSuccess,
});

export const getReportGapInstockSuccess = (payload) => ({
  type: WMSX_GET_REPORT_GAP_IN_STOCK_SUCCESS,
  payload,
});

export const getItemStockHistories = (payload, onSuccess, onError) => ({
  type: WMSX_GET_ITEM_STOCK_HISTORIES,
  payload,
  onError,
  onSuccess,
});

export const setItemStockHistories = (payload) => ({
  type: WMSX_GET_ITEM_STOCK_HISTORIES_SUCCESS,
  payload,
});
export const getItemStockConstructionScl = (payload, onSuccess, onError) => ({
  type: WMSX_GET_ITEM_CONSTRUCTION_SCL,
  payload,
  onError,
  onSuccess,
});

export const setItemStockConstructionScl = (payload) => ({
  type: WMSX_GET_ITEM_CONSTRUCTION_SCL_SUCCESS,
  payload,
});

export const getTicketReport = (payload, onSuccess, onError) => ({
  type: WMSX_GET_TICKET_REPORT,
  payload,
  onError,
  onSuccess,
});

export const getTicketReportSuccess = (payload) => ({
  type: WMSX_GET_TICKET_REPORT_SUCCESS,
  payload,
});

export const getTicketTransactionReport = (payload, onSuccess, onError) => ({
  type: WMSX_GET_TICKET_TRANSACTION_REPORT,
  payload,
  onError,
  onSuccess,
});

export const getTicketTransactionReportSuccess = (payload) => ({
  type: WMSX_GET_TICKET_TRANSACTION_REPORT_SUCCESS,
  payload,
});

export const getGoodAllocatedQuantityReport = (
  payload,
  onSuccess,
  onError,
) => ({
  type: WMSX_GET_GOOD_ALLOCATED_QUANTITY_REPORT,
  payload,
  onError,
  onSuccess,
});

export const getGoodAllocatedQuantityReportSuccess = (payload) => ({
  type: WMSX_GET_GOOD_ALLOCATED_QUANTITY_REPORT_SUCCESS,
  payload,
});

export const getStorageItemNormReport = (payload, onSuccess, onError) => ({
  type: WMSX_GET_STORAGE_ITEM_NORM_REPORT,
  payload,
  onError,
  onSuccess,
});

export const getStorageItemNormReportSuccess = (payload) => ({
  type: WMSX_GET_STORAGE_ITEM_NORM_REPORT_SUCCESS,
  payload,
});

export const getYieldChartList = (payload, onSuccess, onError) => ({
  type: WMSX_GET_YIELD_CHART_LIST,
  payload,
  onError,
  onSuccess,
});

export const getYieldChartListSuccess = (payload) => ({
  type: WMSX_GET_YIELD_CHART_LIST_SUCCESS,
  payload,
});

export const getYieldChartListFailed = (payload) => ({
  type: WMSX_GET_YIELD_CHART_LIST_FAILED,
  payload,
});

export const getPPMChartList = (payload, onSuccess, onError) => ({
  type: WMSX_GET_PPM_CHART_LIST,
  payload,
  onError,
  onSuccess,
});

export const getPPMChartListSuccess = (payload) => ({
  type: WMSX_GET_PPM_CHART_LIST_SUCCESS,
  payload,
});

export const getPPMChartListFailed = (payload) => ({
  type: WMSX_GET_PPM_CHART_LIST_FAILED,
  payload,
});


export const getPPMPage = (payload) => ({
  type: WMSX_GET_PPM_PAGE,
  payload,
});


export const getPPMPageSuccess = (payload) => ({
  type: WMSX_GET_PPM_PAGE_OK,
  payload,
});

export default {
  getItemGroupStockSummary,
  setItemGroupStockSummary,
  getTransferReport,
  setTransferReport,
  getItemStockReport,
  setItemStockReport,
  getMovementReport,
  setMovementReport,
  getItemSummaryReport,
  setItemSummaryReport,
  getTotalItemSummaryReport,
  setTotalItemSummaryReport,
  getOrtherItemSummaryReport,
  setOrtherItemSummaryReport,
  getReportGapInstock,
  getReportGapInstockSuccess,
  getPurchasedOrderImports,
  setPurchasedOrderImports,
  getSaleOrderExports,
  setSaleOrderExports,
  getItemStockHistories,
  setItemStockHistories,
  getItemStockConstructionScl,
  setItemStockConstructionScl,
  getTicketReport,
  getTicketReportSuccess,
  getTicketTransactionReport,
  getTicketTransactionReportSuccess,
  getGoodAllocatedQuantityReport,
  getGoodAllocatedQuantityReportSuccess,
  getStorageItemNormReport,
  getStorageItemNormReportSuccess,
  getYieldChartList,
  getYieldChartListSuccess,
  getYieldChartListFailed,
  getPPMChartList,
  getPPMChartListSuccess,
  getPPMChartListFailed,
  getPPMPage,
  getPPMPageSuccess
};
