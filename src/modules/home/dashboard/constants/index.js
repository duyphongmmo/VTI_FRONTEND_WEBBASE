export const STATUS_FILTER_TYPE = {
  FACTORY: 'factory',
  PLANT: 'plant',
  PLANT_FLOOR: 'plant_floor',
  SYNTHESIS: 'synthesis',
}

export const MMS_SOCKET_EVENT = {
  JOIN_ROOM: 'join-room',
  LEAVE_ROOM: 'leave-room',
  DEVICE_LAYOUT_MONITORING: 'device-layout-monitoring',
  DASHBOARD_SUMMARY_MONITORING: 'dashboard-summary-monitoring',
  CONNECT: 'connect',
  UPDATE_AVAILABLE_COLOR: 'update-available-color',
  REFRESH_DEVICE_LAYOUT: 'refresh_device_layout',
  DISCONNECT: 'disconnect',
  RECONNECT: 'reconnect',
}

export const MMS_SOCKET_ROOM_PREFIX = {
  DASHBOARD_SYNTHESIS: 'dashboard.synthesis',
  DASHBOARD_ALL_FACTORY: 'dashboard.all-factory',
  DASHBOARD_FACTORY: 'dashboard.factory',
  DASHBOARD_PLANT: 'dashboard.plant',
  DASHBOARD_DEVICE_LAYOUT: 'dashboard.device-layout',
}

export const generateDeviceLayoutEvent = (plantId, plantFloorId) =>
  MMS_SOCKET_EVENT.DEVICE_LAYOUT_MONITORING + `-${plantId}-${plantFloorId}`

export const DEVICE_LAYOUT_ACTION = {
  UPDATE_LAYOUT: 'update-layout',
  DEVICE_CHANGE_STATUS: 'device-change-status',
}

export const JOB_TYPE = {
  CHECK_AND_MAINTAIN: 0, //Bảo trì và kiểm tra
  REQUEST: 1, //Yêu cầu xử lý bất thường
  PERIOD_CHECK: 2, //Kiểm tra (deprecated)
  INSTALL: 3,
  // ACCREDITATION: 4,
  // MAINTENANCE: 5,
  REPLACE: 6, //Thay thế VTPT
}

export const JOB_TYPE_MAP = {
  [JOB_TYPE.CHECK_AND_MAINTAIN]: 'mmsx:workType.checkAndMaintain',
  [JOB_TYPE.REQUEST]: 'mmsx:workType.request',
  [JOB_TYPE.PERIOD_CHECK]: 'mmsx:workType.periodCheck',
  [JOB_TYPE.INSTALL]: 'mmsx:workType.install',
  // [JOB_TYPE.ACCREDITATION]: 'mmsx:workType.accreditation',
  // [JOB_TYPE.MAINTENANCE]: 'mmsx:workType.accreditation',
  [JOB_TYPE.REPLACE]: 'mmsx:workType.replaceSupply',
}
