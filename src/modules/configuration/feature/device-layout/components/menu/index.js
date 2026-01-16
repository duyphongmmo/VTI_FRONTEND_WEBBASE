import * as React from 'react'
import { useCallback, useState } from 'react'

import { Delete, Edit } from '@mui/icons-material'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Box, Divider, Typography } from '@mui/material'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import IconButtonHover from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import TruncateMarkup from 'react-truncate-markup'
import { uuid } from 'uuidv4'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import Button from '~/components/Button'
import Guard from '~/components/Guard'
// import Guard from '~/components/Guard'
import { searchCostCenterByPlant } from '~/modules/configuration/redux/sagas/department-list/search-department-list'
import { searchProductionLineApi } from '~/modules/database/redux/sagas/production-line/search-production-line'
import { ACTIVE_STATUS, OBLIGATORY_ENUM } from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useDeviceLayout from '~/modules/mmsx/redux/hooks/useDeviceLayout'
import { searchDeviceListApi } from '~/modules/mmsx/redux/sagas/define-device/search-device-list'
import { convertFilterParams } from '~/utils'
import { validateStatus } from '~/utils/api'

import { ENTITY_TYPE, LAYOUT_MODE } from '../../constants'
import { useDeviceLayoutContext } from '../../provider/hook'
import { getInitDesign } from '../../utils'
import { validateDesign } from '../../utils/validation'
import DialogSaveLayout from '../dialogs/dialog-save'
import DialogSetting from '../dialogs/dialog-setting'
import QuickFilter from '../filter'
import SearchField from './search-field'
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}))

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      props?.hideIcon ? null : (
        <ArrowForwardIosSharpIcon sx={{ fontSize: '1rem' }} />
      )
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {},
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}))

function ListOptions({
  type,
  title = '',
  quickFilters,
  onEdit = () => {},
  onViewClick = () => {},
  onDelete = () => {},
}) {
  const {
    focusing,
    setFocusing,
    holonDesign,
    productionLineDesign,
    positionDesign,
    isEdit,
  } = useDeviceLayoutContext()

  const { t } = useTranslation('mmsx')
  const [list, setList] = useState([])

  const isExist = useCallback(
    (id) => {
      switch (type) {
        case ENTITY_TYPE.HOLON:
          return !!holonDesign.find((item) => item.costCenter?.id === id)
        case ENTITY_TYPE.PRODUCTION_LINE:
          return !!productionLineDesign.find((item) => item.id === id)
        case ENTITY_TYPE.POSITION:
          return !!positionDesign.find((item) => item.id === id)
        default:
          return false
      }
    },
    [type, holonDesign, productionLineDesign, positionDesign],
  )

  const onClickDelete = useCallback(
    (e, id) => {
      e.stopPropagation()
      if (!isEdit) return
      onDelete(id, type)
    },
    [onDelete, type, isEdit],
  )

  const onDragStart = useCallback((e, item) => {
    e.dataTransfer.setData('type', type)
    let name = item?.name
    if (type === ENTITY_TYPE.POSITION) {
      name = item?.device?.position ?? ''
    }

    e.dataTransfer.setData('id', item?.id ?? uuid())
    e.dataTransfer.setData('name', name)
    e.dataTransfer.setData(
      'code',
      type === ENTITY_TYPE.POSITION ? item?.position ?? '' : item?.code,
    )

    if (type === ENTITY_TYPE.POSITION) {
      e.dataTransfer.setData('device', JSON.stringify(item))
    }
    if (type === ENTITY_TYPE.HOLON) {
      e.dataTransfer.setData(
        'costCenter',
        JSON.stringify({
          ...item?.costCenter,
          holon: item?.costCenter?.holon?.code ?? item?.holon?.code,
        }),
      )
      e.dataTransfer.setData(
        'holon',
        item?.costCenter?.holon?.code ?? item?.holon?.code,
      )
      e.dataTransfer.setData('id', item?.costCenter?.id ?? uuid())
    }
    if (type === ENTITY_TYPE.PRODUCTION_LINE && item?.costCenter) {
      e.dataTransfer.setData(
        'costCenter',
        JSON.stringify({
          ...item?.costCenter,
          holon: item?.costCenter?.holon?.code ?? item?.holon?.code,
        }),
      )
    }
  }, [])

  const placeholder = React.useMemo(() => {
    switch (type) {
      case ENTITY_TYPE.HOLON:
        return t('deviceLayout.searchHolon')
      case ENTITY_TYPE.PRODUCTION_LINE:
        return t('deviceLayout.searchProductionLine')
      case ENTITY_TYPE.POSITION:
        return t('deviceLayout.searchDevice')
      default:
        return ''
    }
  }, [type])

  const onSearchProductionLine = (val, quickFilters) => {
    if (!quickFilters?.plant?.id || !quickFilters?.floor?.id) return setList([])
    return searchProductionLineApi({
      keyword: val,
      limit: ASYNC_SEARCH_LIMIT,
      filter: convertFilterParams({
        status: ACTIVE_STATUS.ACTIVE,
        floorId: quickFilters?.floor?.id,
        plantId: quickFilters?.plant?.id,
      }),
    }).then((res) => {
      if (validateStatus(res?.statusCode)) {
        setList(res?.data?.items)
      }
    })
  }

  const onSearchDevice = (val, quickFilters) => {
    if (!quickFilters?.plant?.id || !quickFilters?.floor?.id) return setList([])

    return searchDeviceListApi({
      keyword: val,
      limit: ASYNC_SEARCH_LIMIT,
      filter: convertFilterParams({
        // active: ACTIVE_STATUS.ACTIVE,
        plantFloorId: quickFilters?.floor?.id,
        plantId: quickFilters?.plant?.id,
        iotSynced: OBLIGATORY_ENUM.YES,
      }),
    }).then((res) => {
      if (validateStatus(res?.statusCode)) {
        setList(res?.data?.items)
      }
    })
  }

  const onSearchHolon = (val, quickFilters) => {
    if (!quickFilters?.plant?.id || !quickFilters?.floor?.id) return setList([])
    return searchCostCenterByPlant({
      keyword: val,
      // limit: ASYNC_SEARCH_LIMIT,
      filter: convertFilterParams({
        plantFloorId: quickFilters?.floor?.id,
        plantId: quickFilters?.plant?.id,
        // status: COST_CENTER_STATUS.ACTIVE,
      }),
    }).then((res) => {
      if (validateStatus(res?.statusCode)) {
        setList(
          res?.data?.items?.filter((item) =>
            item?.costCenter?.holon?.code
              ?.toLowerCase()
              .includes((val ?? '').trim().toLowerCase()),
          ),
        )
      }
    })
  }

  const onSearch = useCallback(
    (val, quickFilters) => {
      switch (type) {
        case ENTITY_TYPE.HOLON:
          return onSearchHolon(val, quickFilters)
        case ENTITY_TYPE.PRODUCTION_LINE:
          return onSearchProductionLine(val, quickFilters)
        case ENTITY_TYPE.POSITION:
          return onSearchDevice(val, quickFilters)
        default:
          return
      }
    },
    [type],
  )

  return (
    <>
      <Accordion>
        <AccordionSummary
          sx={{
            padding: 0,
            paddingLeft: 1,
            pr: 0.4,
          }}
          hideIcon={type === ENTITY_TYPE.DOOR}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
            draggable={type === ENTITY_TYPE.DOOR}
            onDragStart={(e) => {
              if (!isEdit) return

              onDragStart(e)
            }}
          >
            <Typography variant="body">{title}</Typography>
          </Box>
        </AccordionSummary>
        {type !== ENTITY_TYPE.DOOR && (
          <AccordionDetails
            sx={{
              padding: 0,
            }}
          >
            <Divider />
            {type !== ENTITY_TYPE.DOOR && (
              <SearchField
                placeholder={placeholder}
                onSearch={onSearch}
                quickFilters={quickFilters}
              />
            )}
            <Box
              sx={{
                maxHeight: 300,
                overflow: 'auto',
              }}
            >
              {list?.map((item, index) => {
                const isFocus =
                  focusing?.id === item.id && focusing?.type === type
                const isExistEntity = isExist(
                  type === ENTITY_TYPE.HOLON ? item?.costCenter?.id : item?.id,
                )
                const position = positionDesign.find(
                  (item1) => item1?.device?.id === item.id,
                )
                let title = ''
                switch (type) {
                  case ENTITY_TYPE.POSITION:
                    title = !!position
                      ? `${item?.code}${
                          position?.design?.title
                            ? ' - ' + position?.design?.title
                            : ''
                        }`
                      : item?.code
                    break

                  case ENTITY_TYPE.HOLON:
                    title =
                      item?.costCenter?.holon?.code ??
                      item?.holon?.code ??
                      item?.holonCode
                    break
                  default:
                    title =
                      item?.name && item?.code
                        ? item?.code + ' - ' + item?.name
                        : item?.name ?? item?.code
                }

                return (
                  <Box
                    key={item.id ?? index}
                    draggable={!isExistEntity || isEdit}
                    onDragStart={(e) => {
                      if (isExistEntity && type !== ENTITY_TYPE.HOLON) return
                      if (!isEdit) return
                      onDragStart(e, item)
                    }}
                    onClick={() => {
                      if (isFocus) return

                      setFocusing({
                        id: item.id,
                        type: type,
                      })
                    }}
                    sx={{
                      display: 'flex',
                      padding: 1,
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: 'bgPrimaryOpacity',
                      },
                      backgroundColor: !isFocus ? '#fff' : 'bgPrimaryOpacity',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      position: 'relative',
                    }}
                  >
                    <Box
                      sx={{
                        flex: 1,
                        maxWidth:
                          isFocus && isExistEntity
                            ? 'calc(100% - 50px )'
                            : '100%',
                      }}
                    >
                      <TruncateMarkup lines={2} ellipsis={() => '...'}>
                        <Typography
                          variant="body"
                          sx={{
                            color: !isExistEntity
                              ? 'text.disabled'
                              : 'text.primary',
                            fontWeight: isFocus ? 'bold' : 'normal',
                          }}
                        >
                          {title}
                        </Typography>
                      </TruncateMarkup>
                    </Box>
                    {isFocus && isExistEntity && (
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                          flexWrap: 'wrap',

                          flexDirection: 'column',
                          height: '100%',
                        }}
                        className="layout-toolbar"
                      >
                        <IconButtonHover
                          size="small"
                          shape="circle"
                          onClick={() => {
                            const id =
                              type === ENTITY_TYPE.HOLON
                                ? item?.costCenter?.id
                                : item?.id
                            onViewClick(id, type)
                          }}
                        >
                          <VisibilityIcon
                            fontSize="small"
                            sx={{
                              fontSize: '0.9rem',
                            }}
                          />
                        </IconButtonHover>

                        {isEdit && type === ENTITY_TYPE.POSITION && (
                          <IconButtonHover
                            size="small"
                            shape="circle"
                            onClick={(e) => {
                              onEdit(e, item.id)
                            }}
                          >
                            <Edit
                              fontSize="small"
                              sx={{
                                fontSize: '0.9rem',
                              }}
                            />
                          </IconButtonHover>
                        )}

                        {isEdit && (
                          <IconButtonHover
                            size="small"
                            shape="circle"
                            onClick={(e) => {
                              onClickDelete(
                                e,
                                type === ENTITY_TYPE.HOLON
                                  ? item?.costCenter?.id
                                  : item?.id,
                              )
                            }}
                          >
                            <Delete
                              fontSize="small"
                              sx={{
                                fontSize: '0.9rem',
                              }}
                            />
                          </IconButtonHover>
                        )}
                      </Box>
                    )}
                  </Box>
                )
              })}
            </Box>
          </AccordionDetails>
        )}
      </Accordion>
    </>
  )
}

export default function ListSelection({
  quickFilters,
  onEditClickPosition,
  onViewClick,
  onDelete,
  setQuickFilters,
}) {
  const { t } = useTranslation('mmsx')
  const {
    data: { deviceLayoutDetail },
    actions,
  } = useDeviceLayout()
  const [tempData, setTempData] = useState({})

  const [isShowSetting, setIsShowSetting] = useState(false)

  const {
    isView,
    isEdit,
    setMode,
    setHolonDesign,
    setProductionLineDesign,
    setPositionDesign,
    setDoorDesign,
    mappingValue,
    setFocusing,
    // setZoom,
    mode,
    diagramSize,
    backgroundImage,
    zoom,
  } = useDeviceLayoutContext()

  const [isShowDialogSave, setIsShowDialogSave] = useState(false)

  const refreshData = (floorId, plantId) => {
    actions.getDeviceLayoutDetail(
      {
        plantId,
        plantFloorId: floorId,
      },
      (data) => {
        const {
          holonDesign,
          productionLineDesign,
          positionDesign,
          doorDesign,
        } = getInitDesign(data)
        setHolonDesign(holonDesign)
        setProductionLineDesign(productionLineDesign)
        setPositionDesign(positionDesign)
        setDoorDesign(doorDesign)
        setMode(LAYOUT_MODE.VIEW)
      },
    )
  }

  const onClickEdit = useCallback(() => {
    setMode(LAYOUT_MODE.EDIT)
  }, [])

  const onClickSave = useCallback(() => {
    const isValid = validateDesign(mappingValue, t, true)
    if (!isValid) return
    setFocusing({})
    setTempData({
      floor: quickFilters?.floor,
      plant: quickFilters?.plant,
      ...mappingValue,
    })
    setIsShowDialogSave(true)
  }, [mappingValue, setTempData, setFocusing])

  const onSubmitSave = (values) => {
    const convertValues = {
      plantFloorId: values?.floor?.id,
      plantId: values?.plant?.id,

      costCenterDesigns: tempData.holonDesign?.map((item) => {
        return {
          costCenterId: item?.costCenter?.id,
          design: {
            title: item.design?.title,
            pointX: item.design?.x,
            pointY: item.design?.y,
            sizeWidth: item.design?.size?.width,
            sizeHeight: item.design?.size?.height,
          },
        }
      }),
      productionLineDesigns: tempData.productionLineDesign?.map((item) => {
        return {
          costCenterId: item?.costCenter?.id,
          productionLineId: item?.id,
          design: {
            title: item.design?.title,
            pointX: item.design?.x,
            pointY: item.design?.y,
            sizeWidth: item.design?.size?.width,
            sizeHeight: item.design?.size?.height,
          },
        }
      }),
      positionDesigns: values.positionDesign?.map((item) => {
        return {
          code: item?.code,
          name: item?.code,
          deviceId: item?.device?.id,
          costCenterId: item?.costCenter?.id,
          productionLineId: item?.productionLine?.id,
          responsibleUserId: item?.responsibleUser?.id?.toString(),
          design: {
            title: item.design?.title,
            pointX: item.design?.x,
            pointY: item.design?.y,
            sizeWidth: item.design?.size?.width,
            sizeHeight: item.design?.size?.height,
          },
        }
      }),
      doorDesigns: mappingValue.doorDesign?.map((item) => {
        return {
          doorId: item?.id,
          code: item?.code,
          name: item?.code,
          design: {
            title: item.design?.title,
            pointX: item.design?.x,
            pointY: item.design?.y,
            sizeWidth: item.design?.size?.width,
            sizeHeight: item.design?.size?.height,
          },
        }
      }),
      background: {
        width: diagramSize?.width,
        height: diagramSize?.height,
        resize: zoom,
      },
      ...(backgroundImage?.id
        ? { fileId: backgroundImage?.id || '' }
        : { file: backgroundImage || null }),
    }

    actions.saveDeviceLayout(convertValues, () => {
      refreshData(convertValues.plantFloorId, convertValues.plantId)
      setIsShowDialogSave(false)
    })
  }

  const onClickCancel = useCallback(() => {
    if (deviceLayoutDetail != null) {
      const { holonDesign, productionLineDesign, positionDesign, doorDesign } =
        getInitDesign(deviceLayoutDetail)
      setHolonDesign(holonDesign)
      setProductionLineDesign(productionLineDesign)
      setPositionDesign(positionDesign)
      setDoorDesign(doorDesign)
    } else {
      setHolonDesign([])
      setProductionLineDesign([])
      setPositionDesign([])
      setDoorDesign([])
    }
    setMode(LAYOUT_MODE.VIEW)
  }, [
    deviceLayoutDetail,
    setHolonDesign,
    setProductionLineDesign,
    setPositionDesign,
    setDoorDesign,
  ])

  return (
    <Box
      sx={{
        height: 'calc(100vh - 100px)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <QuickFilter
        setQuickFilters={setQuickFilters}
        quickFilters={quickFilters}
        setMode={setMode}
        disabled={mode !== LAYOUT_MODE.VIEW}
      />
      <Box mt={1} />
      <Box
        sx={{
          overflow: 'auto',
          mb: 10,
        }}
      >
        <ListOptions
          type={ENTITY_TYPE.DOOR}
          title={t('deviceLayout.door')}
          quickFilters={quickFilters}
          onDelete={onDelete}
        />
        <ListOptions
          type={ENTITY_TYPE.HOLON}
          title={t('deviceLayout.holon')}
          quickFilters={quickFilters}
          onViewClick={onViewClick}
          onDelete={onDelete}
        />
        <ListOptions
          type={ENTITY_TYPE.PRODUCTION_LINE}
          title={t('deviceLayout.productionLine')}
          quickFilters={quickFilters}
          onViewClick={onViewClick}
          onDelete={onDelete}
        />
        <ListOptions
          type={ENTITY_TYPE.POSITION}
          title={t('deviceLayout.device')}
          quickFilters={quickFilters}
          onEdit={onEditClickPosition}
          onViewClick={onViewClick}
          onDelete={onDelete}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          mt: 1,

          position: 'absolute',
          bottom: 0,
          right: 0,
        }}
      >
        <Button
          icon="tableSetting"
          color="grayEE"
          disabled={mode !== LAYOUT_MODE.EDIT}
          onClick={() => {
            setIsShowSetting(true)
          }}
        />
        {isEdit && quickFilters?.floor && (
          <Button
            variant="outlined"
            color="subText"
            onClick={onClickCancel}
            sx={{ ml: 1 }}
          >
            {t('general:actionBar.cancel')}
          </Button>
        )}

        {isEdit && quickFilters?.floor && (
          <Guard code={FUNCTION_CODE.CREATE_DEVICE_LAYOUT}>
            <Button icon="save" onClick={onClickSave} sx={{ ml: 1 }}>
              {t('general:common.save')}
            </Button>
          </Guard>
        )}

        {isView && quickFilters?.floor && (
          <Guard code={FUNCTION_CODE.CREATE_DEVICE_LAYOUT}>
            <Button
              onClick={onClickEdit}
              sx={{
                ml: 1,
              }}
            >
              {t('general:common.edit')}
            </Button>
          </Guard>
        )}
      </Box>

      <DialogSaveLayout
        open={isShowDialogSave}
        onCancel={() => setIsShowDialogSave(false)}
        onSubmit={onSubmitSave}
        initialValues={tempData}
      />

      {isShowSetting && (
        <DialogSetting
          open={isShowSetting}
          tempData={tempData}
          onCancel={() => setIsShowSetting(false)}
        />
      )}
    </Box>
  )
}
