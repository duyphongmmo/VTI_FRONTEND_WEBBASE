import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { Box } from '@mui/material'
import clsx from 'clsx'
import { uniq } from 'lodash'
import { useTranslation } from 'react-i18next'

import {
  FILTER_PARE_SIZE_OPTION,
  LAYOUT_PRINT_TYPE,
  NOTIFICATION_TYPE,
  PARE_SIZE_TYPE,
  SETTING_PRINT_QZ,
} from '~/common/constants'
import { useQZPrint } from '~/common/hooks/usePrintQZ'
import { useClasses } from '~/themes'
import addNotification from '~/utils/toast'

import Autocomplete from '../Autocomplete'
import Dialog from '../Dialog'
import PreviewTemplate from './preview-pdf'
import { style } from './style'
import { convertToFormatPdfQZ, generatePDF } from './until'

export const PrintPreviewPanel = memo(
  ({ open, dataPrint, handleCancel, setLoading }) => {
    const { t } = useTranslation()
    const scrollRef = useRef(null)
    const classes = useClasses(style)
    const [isLoading, setIsLoading] = useState(false)
    const handleInitConfig = () => {
      const dataJsonInit = localStorage.getItem(SETTING_PRINT_QZ)
      if (dataJsonInit) {
        const dataParse = JSON.parse(dataJsonInit)
        return {
          device: dataParse?.device,
          filterPageSize: FILTER_PARE_SIZE_OPTION[0],
        }
      }
      return {
        device: null,
        filterPageSize: FILTER_PARE_SIZE_OPTION[0],
        // layout: LAYOUT_PRINT_OPTION[0],
        // pageSize: PARE_SIZE_OPTION[1],
        // margin: MARGIN_PRINT_OPTION[0],
      }
    }
    const [config, setConfig] = useState(handleInitConfig)
    const { connected, printers, print, setDevice, device } = useQZPrint({
      skipCertificate: true,
    })
    const [optionSizes, setOptionSizes] = useState([])

    const handleChangeConfig = useCallback((value, name) => {
      setConfig((prev) => {
        const newConfig = { ...prev, [name]: value }
        localStorage.setItem(SETTING_PRINT_QZ, JSON.stringify(newConfig))
        return newConfig
      })
      if (name === 'device') {
        const scrollTop = scrollRef.current?.scrollTop
        setTimeout(() => {
          if (scrollRef.current && scrollTop !== undefined) {
            scrollRef.current.scrollTop = scrollTop
          }
        }, 0)
      }
    }, [])
    useEffect(() => {
      if (dataPrint?.length > 0) {
        const optionsId = [
          PARE_SIZE_TYPE.ALL,
          ...dataPrint?.map((item) => item?.size).filter(Boolean),
        ]
        const options = uniq(optionsId)?.map((item) =>
          FILTER_PARE_SIZE_OPTION.find((i) => i?.id === item),
        )
        setOptionSizes(options)
      }
    }, [dataPrint])

    useEffect(() => {
      if (setLoading) setLoading(isLoading)
    }, [isLoading])

    useEffect(() => {
      if (printers.some((i) => i === config?.device)) {
        setDevice(config?.device)
      }
    }, [config?.device, printers])

    const onSubmit = useCallback(async () => {
      setIsLoading(true)
      try {
        if (!device) {
          addNotification(
            t('general:qzTray.errorMessageSelectPrinter'),
            NOTIFICATION_TYPE.ERROR,
          )
          return
        }
        if (!connected) {
          addNotification(
            t('general:qzTray.errorMessage'),
            NOTIFICATION_TYPE.ERROR,
          )
          return
        }

        for (const element of templates) {
          const { size, orientation, margin } = element?.config || {}
          let width = size?.width
          let height = size?.height
          if (orientation === LAYOUT_PRINT_TYPE.LANDSCAPE) {
            width = size?.height
            height = size?.width
          }
          const pdfBase64 = await generatePDF({
            htmlString: element?.template,
            width,
            height,
            orientation: orientation ? orientation : undefined,
            margin: margin ? margin : undefined,
          })
          const pdfData = convertToFormatPdfQZ(pdfBase64)
          await print(pdfData, {
            size: { width, height },
            units: 'mm',
            margins: { top: 0, right: 0, bottom: 0, left: 0 },
            rasterize: true,
            scaleContent: false,
          })
        }
        setIsLoading(false)
      } catch (err) {
        setIsLoading(false)
        throw new Error(err)
      }
    }, [connected, print, device, config])

    const templates = useMemo(
      () =>
        dataPrint.filter((item) => {
          if (
            config.filterPageSize?.id === PARE_SIZE_TYPE.ALL ||
            !config.filterPageSize?.id
          )
            return item
          else return item?.size === config?.filterPageSize?.id
        }),
      [dataPrint, config.filterPageSize],
    )

    return (
      <Dialog
        open={open}
        title={t('general:qzTray.title')}
        onCancel={handleCancel}
        cancelLabel={t('general:qzTray.cancel')}
        onSubmit={() => {
          onSubmit()
        }}
        submitProps={{ disabled: !connected || !templates?.length }}
        submitLabel={t('general:qzTray.print')}
        noBorderBottom
        maxWidth="xl"
      >
        <Box className={clsx(classes.wrapper)}>
          <PreviewTemplate templates={templates} ref={scrollRef} />
          <Box className={clsx(classes.wrapperAction)}>
            <Autocomplete
              label={t('general:qzTray.printer')}
              options={printers}
              getOptionLabel={(opt) => opt}
              value={config.device}
              disableClearable
              onChange={(e) => {
                handleChangeConfig(e, 'device')
              }}
            />
            <Autocomplete
              label={t('general:qzTray.filterPrintPageSize')}
              options={optionSizes}
              getOptionLabel={(opt) => t(opt.text)}
              value={config.filterPageSize}
              disableClearable
              onChange={(e) => {
                handleChangeConfig(e, 'filterPageSize')
              }}
            />
            {/* <Autocomplete
              label={t('general:qzTray.layout')}
              options={LAYOUT_PRINT_OPTION}
              getOptionLabel={(opt) => t(opt.text)}
              value={config.layout}
              disableClearable
              onChange={(e) => {
                handleChangeConfig(e, 'layout')
              }}
            />
            <Autocomplete
              label={t('general:qzTray.paperSize')}
              options={PARE_SIZE_OPTION}
              getOptionLabel={(opt) => t(opt.text)}
              value={config.pageSize}
              disableClearable
              onChange={(e) => {
                handleChangeConfig(e, 'pageSize')
              }}
              disabled={isAutoPageSize}
            />
            <Autocomplete
              label={t('general:qzTray.margins')}
              options={MARGIN_PRINT_OPTION}
              getOptionLabel={(opt) => t(opt.text)}
              disableClearable
              value={config.margin}
              onChange={(e) => {
                handleChangeConfig(e, 'margin')
              }}
            /> */}
          </Box>
        </Box>
      </Dialog>
    )
  },
)
