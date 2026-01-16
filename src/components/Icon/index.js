import { Box } from '@mui/system'
import { PropTypes } from 'prop-types'

import { ReactComponent as Add } from '~/assets/images/icons/add.svg'
import { ReactComponent as Approve } from '~/assets/images/icons/approve.svg'
import { ReactComponent as ArrowBottom } from '~/assets/images/icons/arrowBottom.svg'
import { ReactComponent as ArrowLeft } from '~/assets/images/icons/arrowLeft.svg'
import { ReactComponent as Assign } from '~/assets/images/icons/assign.svg'
import { ReactComponent as Attached } from '~/assets/images/icons/attached.svg'
import { ReactComponent as AttachmentPin } from '~/assets/images/icons/attachmentPin.svg'
import { ReactComponent as Back } from '~/assets/images/icons/back.svg'
import { ReactComponent as Bag } from '~/assets/images/icons/bag.svg'
import { ReactComponent as Bin } from '~/assets/images/icons/bin.svg'
import { ReactComponent as Calendar } from '~/assets/images/icons/calendar.svg'
import { ReactComponent as Cancel } from '~/assets/images/icons/cancel.svg'
import { ReactComponent as Cart } from '~/assets/images/icons/cart.svg'
import { ReactComponent as Chart } from '~/assets/images/icons/chart.svg'
import { ReactComponent as Check } from '~/assets/images/icons/check.svg'
import { ReactComponent as CheckDouble } from '~/assets/images/icons/checkDouble.svg'
import { ReactComponent as CircularArrow } from '~/assets/images/icons/circularArrow.svg'
import { ReactComponent as Clock } from '~/assets/images/icons/clock.svg'
import { ReactComponent as Clone } from '~/assets/images/icons/clone.svg'
import { ReactComponent as Close } from '~/assets/images/icons/close.svg'
import { ReactComponent as Collapse } from '~/assets/images/icons/collapse.svg'
import { ReactComponent as Compare } from '~/assets/images/icons/compare.svg'
import { ReactComponent as Complete } from '~/assets/images/icons/complete.svg'
import { ReactComponent as Completed } from '~/assets/images/icons/completed.svg'
import { ReactComponent as Confirm } from '~/assets/images/icons/confirm.svg'
import { ReactComponent as Delete } from '~/assets/images/icons/delete.svg'
import { ReactComponent as DeleteOutline } from '~/assets/images/icons/deleteOutline.svg'
import { ReactComponent as DownArrow } from '~/assets/images/icons/downArrow.svg'
import { ReactComponent as ImportExport } from '~/assets/images/icons/download.svg'
import { ReactComponent as DownloadAlt } from '~/assets/images/icons/downloadAlt.svg'
import { ReactComponent as Edit } from '~/assets/images/icons/edit.svg'
import { ReactComponent as EditOutline } from '~/assets/images/icons/editOutline.svg'
import { ReactComponent as Filter } from '~/assets/images/icons/filter.svg'
import { ReactComponent as FilterByKeys } from '~/assets/images/icons/filterByKeys.svg'
import { ReactComponent as GanntChart } from '~/assets/images/icons/gantt-chart.svg'
import { ReactComponent as ImagePlus } from '~/assets/images/icons/imagePlus.svg'
import { ReactComponent as ImportXlsx } from '~/assets/images/icons/importXlsx.svg'
import { ReactComponent as InProgress } from '~/assets/images/icons/inProgress.svg'
import { ReactComponent as Invisible } from '~/assets/images/icons/invisible.svg'
import { ReactComponent as Invoid } from '~/assets/images/icons/invoid.svg'
import { ReactComponent as Lock } from '~/assets/images/icons/keylock.svg'
import { ReactComponent as UnLock } from '~/assets/images/icons/keyunlock.svg'
import { ReactComponent as ListResult } from '~/assets/images/icons/list-result.svg'
import { ReactComponent as ListView } from '~/assets/images/icons/listView.svg'
import { ReactComponent as Locked } from '~/assets/images/icons/locked.svg'
import { ReactComponent as MoreInfo } from '~/assets/images/icons/moreInfo.svg'
import { ReactComponent as NonAssign } from '~/assets/images/icons/nonAssign.svg'
import { ReactComponent as Notification } from '~/assets/images/icons/notification.svg'
import { ReactComponent as Order } from '~/assets/images/icons/order.svg'
import { ReactComponent as Overdue } from '~/assets/images/icons/overdue.svg'
import { ReactComponent as Paper } from '~/assets/images/icons/paper.svg'
import { ReactComponent as Pausing } from '~/assets/images/icons/pausing.svg'
import { ReactComponent as Pending } from '~/assets/images/icons/pending.svg'
import { ReactComponent as QRWhite } from '~/assets/images/icons/qr-white.svg'
import { ReactComponent as QR } from '~/assets/images/icons/qr.svg'
import { ReactComponent as QuickAssign } from '~/assets/images/icons/quickAssign.svg'
import { ReactComponent as Reject } from '~/assets/images/icons/reject.svg'
import { ReactComponent as Remove } from '~/assets/images/icons/remove.svg'
import { ReactComponent as Resolved } from '~/assets/images/icons/resolved.svg'
import { ReactComponent as Result } from '~/assets/images/icons/result.svg'
import { ReactComponent as Rhombus } from '~/assets/images/icons/rhombus.svg'
import { ReactComponent as RotationOutline } from '~/assets/images/icons/rotation-outline.svg'
import { ReactComponent as Save } from '~/assets/images/icons/save.svg'
import { ReactComponent as Schedule } from '~/assets/images/icons/schedule.svg'
import { ReactComponent as Search } from '~/assets/images/icons/search.svg'
import { ReactComponent as Send } from '~/assets/images/icons/send.svg'
import { ReactComponent as Setting } from '~/assets/images/icons/setting.svg'
import { ReactComponent as Show } from '~/assets/images/icons/show.svg'
import { ReactComponent as Submit } from '~/assets/images/icons/submit.svg'
import { ReactComponent as Sync } from '~/assets/images/icons/sync.svg'
import { ReactComponent as Table } from '~/assets/images/icons/table.svg'
import { ReactComponent as TableSetting } from '~/assets/images/icons/tableSetting.svg'
import { ReactComponent as Tick } from '~/assets/images/icons/tick.svg'
import { ReactComponent as Time } from '~/assets/images/icons/time.svg'
import { ReactComponent as Undo } from '~/assets/images/icons/undo.svg'
import { ReactComponent as Unlock } from '~/assets/images/icons/unlock.svg'
import { ReactComponent as UpArrow } from '~/assets/images/icons/upArrow.svg'
import { ReactComponent as UpdateQuantity } from '~/assets/images/icons/updateQuantity.svg'
import { ReactComponent as Upload } from '~/assets/images/icons/upload.svg'
import { ReactComponent as User } from '~/assets/images/icons/user.svg'
import { ReactComponent as Visible } from '~/assets/images/icons/visible.svg'
// menu
import { ReactComponent as Analysis } from '~/assets/images/menu/analysis.svg'
import { ReactComponent as BaseData } from '~/assets/images/menu/baseData.svg'
import { ReactComponent as Chevron } from '~/assets/images/menu/chevron.svg'
import { ReactComponent as Database } from '~/assets/images/menu/database.svg'
import { ReactComponent as Drawer } from '~/assets/images/menu/drawer.svg'
import { ReactComponent as Export } from '~/assets/images/menu/export.svg'
import { ReactComponent as Home } from '~/assets/images/menu/home.svg'
import { ReactComponent as Inventory } from '~/assets/images/menu/inventory.svg'
import { ReactComponent as Download } from '~/assets/images/menu/key.svg'
import { ReactComponent as Keylock } from '~/assets/images/menu/keylock.svg'
import { ReactComponent as ListTick } from '~/assets/images/menu/listTick.svg'
import { ReactComponent as ManagementInventory } from '~/assets/images/menu/managementInventory.svg'
import { ReactComponent as ManagementReceipt } from '~/assets/images/menu/managementReceipt.svg'
import { ReactComponent as ManagementRequest } from '~/assets/images/menu/managementRequest.svg'
import { ReactComponent as ManagementSpecificationProduct } from '~/assets/images/menu/managementSpecificationProduct.svg'
import { ReactComponent as Packing } from '~/assets/images/menu/packing.svg'
import { ReactComponent as Plan } from '~/assets/images/menu/plan.svg'
import { ReactComponent as PrettyBag } from '~/assets/images/menu/prettyBag.svg'
import { ReactComponent as Report } from '~/assets/images/menu/report.svg'
import { ReactComponent as SettingConfiguration } from '~/assets/images/menu/settingConfiguration.svg'
import { ReactComponent as SettingWarehouse } from '~/assets/images/menu/settingWarehouse.svg'
import { ReactComponent as StatisticReport } from '~/assets/images/menu/statisticReport.svg'
import { ReactComponent as Verify } from '~/assets/images/menu/verify.svg'
import { ReactComponent as WarehouseConfig } from '~/assets/images/menu/warehouseConfig.svg'
import { ReactComponent as WarehouseExport } from '~/assets/images/menu/warehouseExport.svg'
import { ReactComponent as WarehouseImport } from '~/assets/images/menu/warehouseImport.svg'
import { ReactComponent as WarehouseInventory } from '~/assets/images/menu/warehouseInventory.svg'
import { ReactComponent as WarehouseSettings } from '~/assets/images/menu/warehouseSettings.svg'
import { ReactComponent as WarehouseTransfer } from '~/assets/images/menu/warehouseTransfer.svg'

export const icons = {
  add: <Add />,
  setting: <Setting />,
  close: <Close />,
  calendar: <Calendar />,
  notification: <Notification />,
  search: <Search />,
  back: <Back />,
  arrowLeft: <ArrowLeft />,
  tableSetting: <TableSetting />,
  check: <Check />,
  show: <Show />,
  invisible: <Invisible />,
  visible: <Visible />,
  edit: <Edit />,
  editOutline: <EditOutline />,
  delete: <Delete />,
  deleteOutline: <DeleteOutline />,
  tick: <Tick />,
  importExport: <ImportExport />,
  remove: <Remove />,
  user: <User />,
  arrowBottom: <ArrowBottom />,
  bag: <Bag />,
  cart: <Cart />,
  rhombus: <Rhombus />,
  invoid: <Invoid />,
  save: <Save />,
  upload: <Upload />,
  importXlsx: <ImportXlsx />,
  clone: <Clone />,
  downloadAlt: <DownloadAlt />,
  collapse: <Collapse />,
  paper: <Paper />,
  lock: <Lock />,
  unLock: <UnLock />,
  assign: <Assign />,
  overdue: <Overdue />,
  filter: <Filter />,
  listView: <ListView />,
  ganttChart: <GanntChart />,
  qr: <QR />,
  qrWhite: <QRWhite />,
  unlock: <Unlock />,
  locked: <Locked />,
  undo: <Undo />,
  active: <Locked />,
  inActive: <Unlock />,
  time: <Time />,
  bin: <Bin />,
  quickAssign: <QuickAssign />,
  clock: <Clock />,
  imagePlus: <ImagePlus />,
  submit: <Submit />,
  approve: <Approve />,
  circularArrow: <CircularArrow />,
  rotationOutline: <RotationOutline />,
  listResult: <ListResult />,
  filterByKeys: <FilterByKeys />,
  moreInfo: <MoreInfo />,
  sync: <Sync />,
  chart: <Chart />,
  table: <Table />,
  upArrow: <UpArrow />,
  downArrow: <DownArrow />,
  compare: <Compare />,
  pausing: <Pausing />,
  send: <Send />,
  // menu
  drawer: <Drawer />,
  home: <Home />,
  database: <Database />,
  plan: <Plan />,
  download: <Download />,
  prettyBag: <PrettyBag />,
  export: <Export />,
  chevron: <Chevron />,
  keylock: <Keylock />,
  updateQuantity: <UpdateQuantity />,
  managementRequest: <ManagementRequest />,
  managementReceipt: <ManagementReceipt />,
  managementInventory: <ManagementInventory />,
  statisticReport: <StatisticReport />,
  settingWarehouse: <SettingWarehouse />,
  managementSpecificationProduct: <ManagementSpecificationProduct />,
  settingConfiguration: <SettingConfiguration />,
  schedule: <Schedule />,
  inventory: <Inventory />,
  warehouseImport: <WarehouseImport />,
  warehouseExport: <WarehouseExport />,
  warehouseTransfer: <WarehouseTransfer />,
  warehouseSettings: <WarehouseSettings />,
  warehouseConfig: <WarehouseConfig />,
  warehouseInventory: <WarehouseInventory />,
  packing: <Packing />,
  report: <Report />,
  // status icon
  complete: <Complete />,
  completed: <Completed />,
  confirm: <Confirm />,
  inProgress: <InProgress />,
  pending: <Pending />,
  reject: <Reject />,
  resolved: <Resolved />,
  result: <Result />,
  nonAssign: <NonAssign />,
  checkDouble: <CheckDouble />,
  order: <Order />,
  cancel: <Cancel />,

  listTick: <ListTick />,
  baseData: <BaseData />,
  verify: <Verify />,
  analysis: <Analysis />,
  attached: <Attached />,
  attachmentPin: <AttachmentPin />,
}

const Icon = ({ name, fill, size, sx, ...props }) => {
  return (
    <Box
      component="span"
      className="x-icon"
      {...props}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...(size
          ? {
              width: size,
              height: size,
            }
          : {}),
        svg: {
          width: '100%',
          height: '100%',
          path: { fill: fill },
        },
        ...sx,
      }}
    >
      {icons[name]}
    </Box>
  )
}

Icon.defaultProps = {
  name: '',
  size: 20,
}

Icon.propTypes = {
  name: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default Icon
