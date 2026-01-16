import { Typography } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import FileUploadButton from '../FileUploadButton'
import LabelValue from '../LabelValue'

const FormFileUploadButton = ({ field }) => {
  const { t } = useTranslation(['wmsx'])
  const { setValue, control } = useFormContext() ?? {}
  const fieldName = field?.attribute?.fieldName || 'files'
  return (
    <LabelValue
      label={
        <Typography mt={1}>{t(`${field.attribute.name}`) || ''}</Typography>
      }
      value={
        <Controller
          name={fieldName}
          control={control}
          render={({ field }) => {
            return (
              <FileUploadButton
                maxNumberOfFiles={
                  field?.attributeRule?.maxNumberOfFiles
                    ? field?.attributeRule?.maxNumberOfFiles
                    : 10
                }
                onChange={(val) => setValue(fieldName, val)}
                value={field.value}
                {...(field?.attributeRule?.accept
                  ? { accept: field?.attributeRule?.accept }
                  : {})}
              />
            )
          }}
        />
      }
    />
  )
}

export default FormFileUploadButton
