import { forwardRef } from 'react'

import { Grid, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { isEmpty } from 'lodash'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import {
  ACTIVE_STATUS,
  ASYNC_SEARCH_LIMIT,
  FILE_SIZE,
  FILE_TYPE,
  JPG_PNG_FILE_TYPE,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import Dialog from '~/components/Dialog'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import { PMSX_QUERY_METHOD } from '~/modules/pmsx/constants'
import { apiGetVendorList } from '~/modules/pmsx/features/vendor/api'
import { convertFilterQuery, convertSort } from '~/modules/pmsx/utils'

import FileUploadButton from '../FileUploadButton'
import IconButton from '../IconButton'

export const DialogUploadFilePreview = ({
  open,
  onCancel,
  // onSubmit,
  images,
  setImages,
  setSupplier,
  setFieldValue,
  cancelLabel,
  submitLabel,
  onSubmit,
  ...props
}) => {
  const { t } = useTranslation(['wmsx'])
  return (
    <Dialog
      open={open}
      title={t('receiveReceipt.uploadedFileList', {
        quantity: images?.length,
      })}
      onCancel={onCancel}
      noBorderBottom
      maxWidth={'lg'}
      cancelLabel={cancelLabel}
      submitLabel={submitLabel}
      onSubmit={onSubmit}
      {...props}
    >
      <FileInfo images={images} setImages={setImages} />
      <Box
        sx={{
          mt: 2,
        }}
      >
        <Field.Autocomplete
          name={`vendorPopup`}
          label={t('receiveReceipt.vendor')}
          placeholder={t('receiveReceipt.vendor')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
          asyncRequest={(s) =>
            apiGetVendorList({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
              relation: { supplierItems: true },
              filter: convertFilterQuery(
                {
                  searchText: s,
                  status: ACTIVE_STATUS.ACTIVE,
                },
                [
                  {
                    field: 'groupType',
                    method: PMSX_QUERY_METHOD.EQUAL,
                  },
                ],
              ),
              sort: convertSort({
                orderBy: 'createdAt',
                order: 'desc',
              }),
            })
          }
          asyncRequestHelper={(res) => res?.data?.dataReturn}
          isOptionEqualToValue={(opt, val) => opt?.name === val?.name}
          getOptionLabel={(opt) =>
            opt?.supplierCode && opt?.name
              ? `${opt?.supplierCode} - ${opt?.name}`
              : opt?.supplierCode || opt?.name
          }
          autoFetch={false}
          onChange={(val) => {
            if (!isEmpty(val)) {
              setSupplier(val)
              images?.array.forEach((_, index) => {
                setFieldValue(`itemsUploadFile[${index}].vendor`, val)
              })
            }
          }}
        />
      </Box>
    </Dialog>
  )
}

const FileInfo = ({ images, setImages }) => {
  const handleDelete = (url) => {
    setImages((prevImages) => prevImages.filter((image) => image.url !== url))
  }

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {images?.map((file, index) => {
            const isImage = file.type.startsWith('image/')
            const isPDF = file.type === 'application/pdf'
            return (
              <Grid item xs={3}>
                <div
                  key={file.id}
                  style={{
                    position: 'relative',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    textAlign: 'center',
                  }}
                >
                  <IconButton
                    onClick={() => handleDelete(file.url)}
                    style={{
                      position: 'absolute',
                      top: '5px',
                      right: '5px',
                      zIndex: 10,
                      background: '#fff',
                      boxShadow: '0px 2px 4px rgba(0,0,0,0.2)',
                    }}
                  >
                    <Icon name="delete" />
                  </IconButton>

                  {isImage ? (
                    <>
                      <img
                        src={file.url}
                        alt={`Ảnh đã chọn ${file.id}`}
                        style={{
                          width: '100%',
                          height: 'auto',
                          display: 'block',
                        }}
                      />
                      <p
                        style={{
                          marginTop: '10px',
                          fontSize: '14px',
                          color: '#555',
                          wordBreak: 'break-word',
                        }}
                      >
                        {file.name}
                      </p>
                    </>
                  ) : isPDF ? (
                    <>
                      <iframe
                        src={file.url}
                        title={`PDF Preview ${index + 1}`}
                        style={{
                          border: 'none',
                          width: '100%',
                          height: 'auto',
                          display: 'block',
                        }}
                      />
                      <p
                        style={{
                          marginTop: '10px',
                          fontSize: '14px',
                          color: '#555',
                          wordBreak: 'break-word',
                        }}
                      >
                        {file.name}
                      </p>
                    </>
                  ) : (
                    <p>
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {file.name}
                      </a>
                    </p>
                  )}

                  {/* <img
                        src={file.url}
                        alt={`Ảnh đã chọn ${file.id}`}
                        style={{
                          width: '100%',
                          height: 'auto',
                          display: 'block',
                        }}
                      />
                      <p
                        style={{
                          marginTop: '10px',
                          fontSize: '14px',
                          color: '#555',
                          wordBreak: 'break-word',
                        }}
                      >
                        {file.name}
                      </p> */}
                </div>
              </Grid>
            )
          })}
        </Grid>
      </Box>
    </>
  )
}

export const FileUploadEmptyView = forwardRef(
  ({
    sx,
    text,
    description,
    uploadFileText,
    handleImageChange1,
    // images,
    setModal,
    // modal,
    // onViewFileDetailsClick,
    isUpdate,
    inputRef,
  }) => {
    return (
      <Box
        sx={{
          width: '100%',
          height: '50vh',
          overflowY: 'auto',
          border: '1px solid #ccc',
          boxSizing: 'border-box',
          padding: '8px', // Hoặc p: 1
          textAlign: 'center',
          ...sx,
        }}
      >
        <svg
          width="184"
          height="152"
          viewBox="0 0 184 152"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none" fillRule="evenodd">
            <g transform="translate(24 31.67)">
              <ellipse
                cx="67.797"
                cy="106.89"
                rx="67.797"
                ry="12.668"
                fill="#f5f5f5"
                fillOpacity="0.8"
              ></ellipse>
              <path
                fill="#aeb8c2"
                d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
              ></path>
              <path
                d="M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z"
                transform="translate(13.56)"
              ></path>
              <path
                fill="#f5f5f7"
                d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
              ></path>
              <path
                fill="#dce0e6"
                d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
              ></path>
            </g>
            <path
              fill="#dce0e6"
              d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
            ></path>
            <g fill="#fff" transform="translate(149.65 15.383)">
              <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815"></ellipse>
              <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z"></path>
            </g>
          </g>
        </svg>

        {text && (
          <Typography variant="h2" sx={{ mt: 2, mb: 2 }}>
            {text}
          </Typography>
        )}
        {description && (
          <Typography variant="body2" sx={{ mt: 2, mb: 6 }}>
            {description}
          </Typography>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <FileUploadButton
            accept={[FILE_TYPE.PDF, ...JPG_PNG_FILE_TYPE]
              .map((i) => i?.MIME_TYPE)
              .join(', ')}
            uploadFileText={uploadFileText}
            isUploadTableSettings
            maxNumberOfFiles={10}
            fileSizeLimit={FILE_SIZE._50MB}
            onChange={(val) => {
              setModal({ isOpenCreateModal: true })
              if (!isEmpty(val)) {
                handleImageChange1(val, setModal)
              }
            }}
            multiple
            disabled={isUpdate}
            ref={inputRef}
            // value={params.row?.files}
          />
        </Box>
      </Box>
    )
  },
)

FileUploadEmptyView.defaultProps = {
  sx: {},
  text: '',
}

FileUploadEmptyView.propTypes = {
  sx: PropTypes.shape(),
  text: PropTypes.string,
}

export default FileUploadEmptyView
