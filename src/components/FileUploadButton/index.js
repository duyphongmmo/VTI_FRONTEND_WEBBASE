import { forwardRef } from 'react'

import { Box, IconButton, Chip, FormHelperText } from '@mui/material'
import { useTheme } from '@mui/styles'
import { isArray } from 'lodash'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import { FILE_SIZE } from '~/common/constants'
import { formatFileSize } from '~/utils/file'

import Button from '../Button'
import Icon from '../Icon'

const FileUploadButton = (
  {
    value,
    onChange,
    accept,
    acceptAllType,
    maxNumberOfFiles,
    disabled,
    readOnly,
    onClick,
    fileSizeLimit,
    isUploadTableSettings,
    uploadFileText = '',
    fullWidth,
    color = '',
    isView,
  },
  ref,
) => {
  const theme = useTheme()
  const { t } = useTranslation()

  const multiple = maxNumberOfFiles > 1

  const onFilesPicked = (event) => {
    const pickedFiles = Array.from(event.target.files)

    const newFiles = (value ? (!isArray(value) ? [value] : value) : [])
      .concat(pickedFiles)
      .slice(0, maxNumberOfFiles)
    if (multiple) {
      onChange(newFiles)
    } else {
      onChange(pickedFiles[0])
    }
    // eslint-disable-next-line no-param-reassign
    event.target.value = null
  }

  const handleDelete = (index) => {
    if (multiple) {
      let newFiles = [...(value || [])]
      newFiles.splice(index, 1)

      onChange(newFiles)
    } else {
      onChange(null)
    }
  }

  const openInNewTab = async (path) => {
    let url = ''
    if (path?.includes('http')) {
      url = process.env.REACT_APP_HOST + '/api/' + path.split('api/')[1]
    } else {
      url = process.env.REACT_APP_HOST + '/' + path
    }
    try {
      const image = await fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      const imageBlob = await image.blob()
      const imageURL = URL.createObjectURL(imageBlob)
      const newWindow = window.open(imageURL, '_blank', 'noopener,noreferrer')
      if (newWindow) newWindow.opener = null
    } catch (e) {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  const renderFile = (file = {}, index) => {
    if (!file) return null
    return (
      <Chip
        key={index}
        label={file.fileNameRaw || file.name || file.fileName}
        {...(file.fileUrl || file.url
          ? {
              onClick: () => openInNewTab(file.fileUrl || file.url),
            }
          : {})}
        {...(readOnly
          ? onClick
            ? { onClick: () => onClick(file, index) }
            : {}
          : {
              onDelete: () => handleDelete(index),
              deleteIcon: <Icon name="close" size={10} />,
            })}
        sx={{
          borderRadius: '3px',
          backgroundColor: color
            ? theme.palette.status?.[color].text
            : theme.palette.primary.a1,
          color: theme.palette.primary.main,
          maxWidth: '100%',

          '.MuiChip-label': {
            flex: 1,
          },
          '.MuiChip-deleteIcon': {
            flex: '0 0 10px',
          },
        }}
      />
    )
  }

  const renderFileList = () => {
    if (Array.isArray(value)) {
      if (value.length) {
        return value.map((file, index) => renderFile(file, index))
      }
      return null
    }

    if (!!value) return renderFile(value)

    return null
  }

  const renderIcon = () => {
    if (readOnly) {
      return null
    }

    return (
      <Box sx={{ flex: '0 0 36px', mr: 0.5 }}>
        <IconButton
          component="label"
          disabled={disabled || (multiple && value?.length >= maxNumberOfFiles)}
        >
          <Icon name="upload" fill={theme.palette.primary.main} />
          <input
            hidden
            multiple={multiple}
            type="file"
            ref={ref}
            {...(acceptAllType
              ? {}
              : {
                  accept: accept,
                })}
            onChange={(e) => onFilesPicked(e)}
          />
        </IconButton>
      </Box>
    )
  }

  const renderButton = () => {
    if (readOnly) {
      return null
    }

    return (
      <Box sx={fullWidth ? { mr: 0.5, width: '100%' } : { mr: 0.5 }}>
        <Button
          icon="add"
          disabled={disabled || (multiple && value?.length >= maxNumberOfFiles)}
          variant="contained"
          component="label"
          sx={fullWidth ? { width: '100%' } : {}}
        >
          {uploadFileText || t('general:common.uploadFile')}
          <input
            hidden
            multiple={multiple}
            type="file"
            ref={ref}
            {...(acceptAllType
              ? {}
              : {
                  accept: accept,
                })}
            onChange={(e) => onFilesPicked(e)}
          />
        </Button>
      </Box>
    )
  }

  return (
    <Box
      sx={fullWidth ? { display: 'flex', width: '100%' } : { display: 'flex' }}
    >
      {isView ? '' : isUploadTableSettings ? renderButton() : renderIcon()}

      <Box
        sx={{
          display: 'flex',
          flex: 1,
          flexWrap: 'wrap',
          gap: 0.5,
          overflow: 'hidden',
          pt: '2px',
        }}
      >
        {!isUploadTableSettings && renderFileList()}
        {multiple &&
          (value || []).length > maxNumberOfFiles &&
          !readOnly &&
          !disabled && (
            <FormHelperText error>
              {t('fileUpload.error.invalidNumberOfFiles', {
                max: maxNumberOfFiles,
              })}
            </FormHelperText>
          )}
        {(multiple
          ? (value || [])?.some((f) => f?.size > fileSizeLimit)
          : value?.size > fileSizeLimit) &&
          !readOnly &&
          !disabled && (
            <FormHelperText error>
              {`${t('fileUpload.error.invalidSize')} ${formatFileSize(
                fileSizeLimit,
              )}.`}
            </FormHelperText>
          )}
        {!acceptAllType &&
          (multiple
            ? (value || [])?.some((f) => {
                return (
                  (f?.type || f?.mimeType) &&
                  !accept?.includes(f?.type || f?.mimeType)
                )
              })
            : (value?.type || value?.mimeType) &&
              !accept?.includes(value?.type || value?.mimeType)) &&
          !readOnly &&
          !disabled && (
            <FormHelperText error>
              {`${t('fileUpload.error.invalidTypeMsg')}`}
            </FormHelperText>
          )}
      </Box>
    </Box>
  )
}

FileUploadButton.defaultProps = {
  onChange: () => {},
  accept: 'application/pdf, image/jpeg, image/png',
  acceptAllType: false,
  maxNumberOfFiles: 1, // default: 1
  fileSizeLimit: FILE_SIZE._4MB,
  disabled: false,
  readOnly: false,
  isUploadTableSettings: false,
}

FileUploadButton.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  onChange: PropTypes.func,
  accept: PropTypes.string,
  acceptAllType: PropTypes.bool,
  maxNumberOfFiles: PropTypes.number,
  fileSizeLimit: PropTypes.number,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  isUploadTableSettings: false,
}

export default forwardRef(FileUploadButton)
