/* eslint-disable no-param-reassign */
import { useRef, useState } from 'react'

import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Link as MuiLink,
  Typography,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { isEmpty, isNil, isNumber } from 'lodash'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { format } from 'react-string-format'
import TruncateMarkup from 'react-truncate-markup'

import {
  EXPORT_DATE_FORMAT,
  FILE_SIZE,
  FILE_TYPE,
  HTTP_STATUS_CODE,
  IMPORT_EXPORT_DATE_FORMAT,
  IMPORT_EXPORT_MODE,
  IMPORT_EXPORT_MODE_OPTIONS,
  IMPORT_SETTING,
  NOTIFICATION_TYPE,
} from '~/common/constants'
import Dialog from '~/components/Dialog'
import Dropdown from '~/components/Dropdown'
import Icon from '~/components/Icon'
import { convertUtcDateTimeToLocalTz } from '~/utils'
import { downloadInt8Arr, formatFileSize, isValidFileType } from '~/utils/file'
import addNotification from '~/utils/toast'

import Button from '../Button'
import HotKeys from '../HotKeys'

const ImportExport = ({
  name,
  onDownloadTemplate,
  onImport,
  onExport,
  onRefresh,
  disabled,
  onImportTable,
  customSx,
  fileTypeExport,
  displayResult,
  checkNolineSuccess,
  isOutlinedPrimaryMode = false,
  showResultDialog = false,
  CustomDowloadImport,
  setDataDowTemplate,
  ...props
}) => {
  const { t } = useTranslation()
  const theme = useTheme()

  const [importing, setImporting] = useState(false)
  const [openImport, setOpenImport] = useState(false)
  const [importFile, setImportFile] = useState(null)
  const [importResult, setImportResult] = useState(null)
  const [importError, setImportError] = useState(null)
  const [exportWarning, setExportWarning] = useState(null)
  const [isExporting, setIsExporting] = useState(false)

  const inputFileRef = useRef()

  let mode

  if (onImport && onExport) mode = IMPORT_EXPORT_MODE.BOTH
  else if (onImportTable) mode = IMPORT_EXPORT_MODE.IMPORT_TABLE
  else if (onImport) mode = IMPORT_EXPORT_MODE.IMPORT_ONLY
  else if (onExport) mode = IMPORT_EXPORT_MODE.EXPORT_ONLY

  const { NUMBER_OF_FILE } = IMPORT_SETTING
  const { XLSX } = FILE_TYPE

  const validateFileInput = (files) => {
    const file = files[0]

    if (files.length > NUMBER_OF_FILE)
      setImportError(
        `${t('fileUpload.error.invalidNumberOfFiles')} ${NUMBER_OF_FILE}`,
      )
    else if (files.length === NUMBER_OF_FILE) {
      const { name, size } = file

      const msg = []

      if (size <= 0 || size > FILE_SIZE._30MB)
        msg.push(
          `${t('fileUpload.error.invalidSize')} ${formatFileSize(
            FILE_SIZE._30MB,
          )}.`,
        )

      if (!isValidFileType(name, XLSX.EXT)) {
        msg.push(`${t('fileUpload.error.invalidType')} ${XLSX.NAME}.`)
      }

      setImportError(msg.join('\n').trim())
    }
  }

  const onFileChange = (event) => {
    const files = event.target.files

    validateFileInput(files)

    return setImportFile(files[0])
  }

  const onDropFile = (event) => {
    event.preventDefault()

    const files = event.dataTransfer.files

    validateFileInput(files)

    return setImportFile(files[0])
  }

  const onSubmit = async () => {
    setImporting(true)

    try {
      const res = await onImport(importFile)
      if (res?.statusCode === 200) {
        if (!displayResult && onRefresh) {
          onRefresh()
        }
        if (checkNolineSuccess && res.data?.successCount === 0) {
          addNotification(t('toast.defaultError'), NOTIFICATION_TYPE.ERROR)
        } else addNotification(res?.message, NOTIFICATION_TYPE.SUCCESS)
        setImportFile(null)
        setImportError(null)
        setOpenImport(false)
        setImportResult({ ...res.data, message: res?.message })
        onImportTable(res.data)
      } else if (res?.statusCode === 400) {
        res?.data?.dataError
          ? setImportError(
              `${t('fileUpload.error.lineError')} ${res?.data?.dataError
                ?.map((e) => e?.line)
                .sort()
                .join(', ')}`,
            )
          : setImportError(res.message)
      } else if (res === null) {
        setImportFile(null)
        setImportError(null)
        setOpenImport(false)
      } else {
        setImportError(res.message)
      }
    } catch (err) {
      setImportError(err)
    } finally {
      setImporting(false)
    }
  }

  const onResultCancel = () => {
    resetImportState()
    onRefresh && onRefresh()
    setOpenImport && setOpenImport(false)
  }

  const onImportCancel = () => {
    resetImportState()
    setOpenImport && setOpenImport(false)
    if (CustomDowloadImport) {
      setDataDowTemplate({
        typeTemplete: null,
        customer: null,
      })
    }
  }

  const onClickDropzone = () => {
    if (!importFile) inputFileRef.current.click()
  }

  const onImportAgain = () => {
    resetImportState()
    onRefresh && onRefresh()
    setOpenImport && setOpenImport(true)
  }

  const onDownloadLog = async () => {
    await downloadInt8Arr(
      importResult?.result?.data ?? importResult?.data?.buffer?.data,
      format(
        IMPORT_SETTING.FILE_NAME,
        t('import.prefix.importLog'),
        name,
        '_' +
          convertUtcDateTimeToLocalTz(new Date(), IMPORT_EXPORT_DATE_FORMAT),
      ),
    )
  }

  const onClickDownloadTemplate = async () => {
    let res

    try {
      res = await onDownloadTemplate()
    } catch (err) {
      addNotification(t('toast.defaultError'), NOTIFICATION_TYPE.ERROR)
    }

    if (!res) {
      addNotification(t('toast.defaultError'), NOTIFICATION_TYPE.ERROR)
      return
    }
    if (res.statusCode !== 400) {
      const rawArr = res.data.data
      await downloadInt8Arr(
        rawArr,
        format(
          IMPORT_SETTING.FILE_NAME,
          t('import.prefix.importTemplate'),
          name,
        ),
      )
    } else {
      addNotification(res.message, NOTIFICATION_TYPE.ERROR)
    }
  }

  const onClickExport = async () => {
    let res
    setIsExporting(true)
    try {
      res = await onExport()
    } catch (err) {
      addNotification(t('toast.defaultError'), NOTIFICATION_TYPE.ERROR)
    }
    setIsExporting(false)

    if (!res) {
      addNotification(t('toast.defaultError'), NOTIFICATION_TYPE.ERROR)
      return
    }

    const { message, statusCode, data } = res

    if (statusCode === HTTP_STATUS_CODE.SUCCESS) {
      const rawArr = data.data

      await downloadInt8Arr(
        rawArr,
        `${name}_${convertUtcDateTimeToLocalTz(
          new Date(),
          EXPORT_DATE_FORMAT,
        )}`,
        fileTypeExport,
      )

      addNotification(message, NOTIFICATION_TYPE.SUCCESS)
    } else if (statusCode === HTTP_STATUS_CODE.EXPORT_SUCCESS) {
      addNotification(message, NOTIFICATION_TYPE.SUCCESS)
    } else if (statusCode === HTTP_STATUS_CODE.NOT_ACCEPTABLE) {
      setExportWarning(message)
    } else {
      addNotification(message, NOTIFICATION_TYPE.ERROR)
    }
  }

  const resetImportState = () => {
    setImportFile(null)
    setImportError(null)
    setImportResult(null)
    setImporting(false)
  }

  const isSubmitDisabled = () =>
    isNil(importFile) || !isEmpty(importError) || importing

  const getColor = (prevColor) =>
    isEmpty(importError) ? prevColor : theme.palette.error.main

  const handleMenuItemClick = (option) => {
    switch (option) {
      case IMPORT_EXPORT_MODE.IMPORT_ONLY:
      case IMPORT_EXPORT_MODE.IMPORT_TABLE:
        setOpenImport(true)
        break
      case IMPORT_EXPORT_MODE.EXPORT_ONLY:
        onClickExport()
        break
      default:
        break
    }
  }

  const Dropzone = () => (
    <Grid
      container
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      rowSpacing={1}
    >
      <Grid item>
        <Icon name="importXlsx" size="auto" />
        <input
          type="file"
          hidden
          accept={FILE_TYPE.XLSX.EXT}
          onChange={onFileChange}
          ref={inputFileRef}
        />
      </Grid>
      <Grid item>
        <Typography component="div">
          {t('import.stepUploadData.description')}
        </Typography>
        <Typography component="span">
          {t('import.stepUploadData.support')}
        </Typography>
        <Typography
          color={theme.palette.primary.main}
          variant="h5"
          component="span"
        >
          {t('import.stepUploadData.fileType')}
        </Typography>
      </Grid>
    </Grid>
  )

  const FileInfo = () => (
    <Grid container flexDirection="column" minHeight={138}>
      <Grid item flex={1}>
        <Grid container columnSpacing={2}>
          <Grid item>
            <Icon
              name="paper"
              size="100%"
              fill={getColor(theme.palette.primary.main)}
            />
          </Grid>
          <Grid item flex={1}>
            <TruncateMarkup lines={1} ellipsis={() => '...'}>
              <Typography color={getColor(theme.palette.text.main)}>
                {importFile?.name}
              </Typography>
            </TruncateMarkup>

            <Typography color={theme.palette.grayF4.contrastText}>
              {formatFileSize(importFile?.size)}
            </Typography>
          </Grid>
          <Grid item alignSelf="center">
            <IconButton onClick={resetImportState} disabled={importing}>
              <Icon name="delete" />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        {!isEmpty(importError) && (
          <Typography
            sx={{ whiteSpace: 'pre-line' }}
            color={theme.palette.subText.main}
          >
            {importError}
          </Typography>
        )}
        {importing && (
          <Box textAlign="center">
            <CircularProgress color="primary" />
          </Box>
        )}
      </Grid>
    </Grid>
  )

  const ResultDialog = () => {
    const countSuccess = isNumber(
      importResult?.successCount ||
        importResult?.success ||
        importResult?.data?.successCount,
    )
      ? importResult?.successCount ||
        importResult?.success ||
        importResult?.data?.successCount
      : (importResult?.dataSuccess?.nMatched || 0) +
        (importResult?.dataSuccess?.nUpserted || 0)

    const countError =
      isNumber(importResult?.successCount) && importResult?.totalCount
        ? importResult?.totalCount - importResult?.successCount || 0
        : importResult?.dataError?.length ||
          importResult?.resultError?.length ||
          importResult?.fail ||
          importResult?.failCount ||
          importResult?.data?.failCount ||
          (importResult?.totalCount && !countSuccess
            ? importResult?.totalCount
            : 0) ||
          0
    return (
      <Dialog
        open={!isNil(importResult)}
        title={t('import.title')}
        onCancel={onResultCancel}
        cancelLabel={t('actionBar.closeNotification')}
        onSubmit={onImportAgain}
        submitLabel={t('actionBar.importAgain')}
        disableBackdropClick={true}
      >
        <Box textAlign="center" p={1}>
          <Box mb={1}>
            {importResult?.isImportImplicit
              ? importResult?.message
              : format(
                  t('import.result'),
                  <Typography
                    color={theme.palette.success.main}
                    variant="h5"
                    component="span"
                  >
                    {countSuccess}
                  </Typography>,
                  <Typography
                    color={theme.palette.error.main}
                    variant="h5"
                    component="span"
                  >
                    {countError}
                  </Typography>,
                )}
          </Box>
          {!isEmpty(importResult) && !importResult?.isImportImplicit && (
            <MuiLink
              onClick={onDownloadLog}
              variant="h5"
              component={Link}
              underline="none"
            >
              {t('import.log')}
            </MuiLink>
          )}
        </Box>
      </Dialog>
    )
  }

  const ImportDialog = () => (
    <Dialog
      open={openImport}
      maxWidth="lg"
      fullWidth={true}
      title={t('import.title')}
      onCancel={onImportCancel}
      cancelLabel={t('actionBar.cancel')}
      cancelProps={{
        disabled: importing,
      }}
      onSubmit={onSubmit}
      submitLabel={t('actionBar.import')}
      submitProps={{
        disabled: isSubmitDisabled(),
      }}
      {...props}
      sx={{
        '.MuiDialogContent-root': {
          py: 0,
        },
      }}
      disableBackdropClick={true}
    >
      <Grid container columnSpacing={16 / 3} position="relative">
        <Icon
          name="collapse"
          size="auto"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translateY(-50%) translateX(-50%)',
          }}
        />
        <Grid
          item
          xs={6}
          md={6}
          lg={6}
          pt={2}
          borderRight={1}
          borderColor={theme.palette.divider}
        >
          <Typography variant="h5">
            {t('import.stepDownloadTemplate.title')}
          </Typography>
          {CustomDowloadImport && <CustomDowloadImport />}
          <Button
            icon="downloadAlt"
            sx={{ my: 2, ml: 0, mr: 1 }}
            onClick={onClickDownloadTemplate}
          >
            {t('import.downloadTemplate')}
          </Button>
          <Typography component="span">
            {t('import.stepDownloadTemplate.description')}
          </Typography>
        </Grid>
        <Grid item xs={6} md={6} lg={6} pt={2}>
          <Typography variant="h5">
            {t('import.stepUploadData.title')}
          </Typography>

          {isNil(importFile) ? (
            <Box
              onClick={onClickDropzone}
              onDrop={onDropFile}
              onDragEnter={(event) => {
                event.currentTarget.style.border = `1px dashed ${theme.palette.primary.main}`
              }}
              onDragOver={(event) => {
                event.preventDefault()
              }}
              onDragLeave={(event) => {
                event.currentTarget.style.border = ''
              }}
              sx={{
                my: 3,
                bgcolor: theme.palette.grayF5.main,
                borderRadius: 1,
                border: 1,
                borderColor: getColor(theme.palette.grayF5.main),
                cursor: 'pointer',
                '&:hover': {
                  border: `1px dashed ${theme.palette.primary.main}`,
                },
              }}
            >
              <Box sx={{ p: 3, pointerEvents: 'none' }}>
                <Dropzone />
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                my: 3,
                py: 3,
                px: 5,
                bgcolor: theme.palette.grayF5.main,
                borderRadius: 1,
                border: 1,
                borderColor: getColor(theme.palette.grayF5.main),
              }}
            >
              <FileInfo />
            </Box>
          )}
        </Grid>
      </Grid>
    </Dialog>
  )

  const ImportExportDropdown = () => (
    <>
      <Dropdown
        // icon="download"
        startIcon={
          isExporting ? (
            <CircularProgress size={18} color="inherit" />
          ) : (
            <Icon name="importExport" fill={theme.palette.primary.main} />
          )
        }
        title={t('importExportMenu.importExport')}
        options={IMPORT_EXPORT_MODE_OPTIONS}
        handleMenuItemClick={(option) => handleMenuItemClick(option.value)}
        getOptionLabel={(option) => t(option.text) || ''}
        variant="text"
        color="text"
        disabled={disabled || isExporting}
      />
    </>
  )

  const ImportButton = () => (
    <Button
      variant={isOutlinedPrimaryMode ? 'outlined' : 'text'}
      color={isOutlinedPrimaryMode ? 'primary' : 'text'}
      // icon="upload"
      startIcon={<Icon name="upload" fill={theme.palette.primary.main} />}
      onClick={() => handleMenuItemClick(mode)}
      disabled={disabled}
    >
      {t('importExportMenu.import')}
    </Button>
  )

  const ImportTableButton = () => (
    <Button
      icon="add"
      color="primary"
      onClick={() => handleMenuItemClick(mode)}
      disabled={disabled}
    >
      {t('general:common.import')}
    </Button>
  )

  const ExportButton = () => (
    <Button
      variant="text"
      color="text"
      // icon="downloadAlt"
      startIcon={<Icon name="downloadAlt" fill={theme.palette.primary.main} />}
      onClick={() => handleMenuItemClick(mode)}
      disabled={disabled}
      {...customSx}
      loading={isExporting}
    >
      {props?.exportText ? props?.exportText : t('importExportMenu.export')}
    </Button>
  )

  const ExportWarningDialog = () => (
    <Dialog
      title={t('importExportMenu.export')}
      open={!isEmpty(exportWarning)}
      onCancel={() => setExportWarning(null)}
    >
      <Typography>{exportWarning}</Typography>
    </Dialog>
  )

  const ImportExportHotKeys = () => (
    <HotKeys
      handlers={{
        onImport: () => {
          if (onImport) setOpenImport((o) => !o)
        },
        onExport: () => {
          if (onExport && !openImport) onClickExport()
        },
      }}
    />
  )

  switch (mode) {
    case IMPORT_EXPORT_MODE.BOTH:
      return (
        <>
          <ImportExportDropdown />
          <ImportDialog />
          <ResultDialog />
          <ExportWarningDialog />
          <ImportExportHotKeys />
        </>
      )
    case IMPORT_EXPORT_MODE.IMPORT_ONLY:
      return (
        <>
          <ImportButton />
          <ImportDialog />
          <ResultDialog />
          <ImportExportHotKeys />
        </>
      )
    case IMPORT_EXPORT_MODE.EXPORT_ONLY:
      return (
        <>
          <ExportButton />
          <ExportWarningDialog />
          <ImportExportHotKeys />
        </>
      )
    case IMPORT_EXPORT_MODE.IMPORT_TABLE:
      return (
        <>
          <ImportTableButton />
          <ImportDialog />
          {showResultDialog && <ResultDialog />}
        </>
      )
    default:
      return null
  }
}

ImportExport.defaultProps = {
  disabled: false,
  displayResult: true,
  fileTypeExport: FILE_TYPE.XLSX,
}

ImportExport.propTypes = {
  name: PropTypes.string,
  onDownloadTemplate: PropTypes.func,
  onImport: PropTypes.func,
  onExport: PropTypes.func,
  onRefresh: PropTypes.func,
  disabled: PropTypes.bool,
  fileTypeExport: PropTypes.object,
}

export default ImportExport
