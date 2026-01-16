import React, { useMemo } from 'react'

import { Typography } from '@mui/material'
import { FormikConsumer } from 'formik'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'

import { FILE_SIZE, IMG_FILE_TYPE } from '~/common/constants'
import Dialog from '~/components/Dialog'
import FileUploadButton from '~/components/FileUploadButton'
import { Field } from '~/components/Formik'
import LabelValue from '~/components/LabelValue'

import { useDeviceLayoutContext } from '../../../provider/hook'
import { getImageSize } from '../../../utils/image'
const DialogSetting = ({ open, onCancel }) => {
  const { t } = useTranslation(['mmsx'])
  const { setDiagramSize, diagramSize, setBackgroundImage, backgroundImage } =
    useDeviceLayoutContext()
  const handleSubmit = (values) => {
    setDiagramSize({
      width: values.width,
      height: values.height,
    })
    if (values?.file) setBackgroundImage(values?.file)
    else setBackgroundImage(null)
    onCancel(values)
  }
  const initValues = useMemo(() => {
    return {
      width: diagramSize?.width,
      height: diagramSize?.height,
      file: backgroundImage,
    }
  }, [diagramSize, backgroundImage])

  const onChangeImage = async (val, setFieldValue, values) => {
    setFieldValue('file', val)
    try {
      const size = await getImageSize(val)

      if (size) {
        !values?.width && setFieldValue('width', size?.width)
        !values?.height && setFieldValue('height', size?.height)
      }
    } catch (error) {}
  }

  return (
    <Dialog
      open={open}
      title={t('Setting')}
      onCancel={onCancel}
      cancelLabel={t('general:common.cancel')}
      submitLabel={t('general:common.save')}
      noBorderBottom
      formikProps={{
        onSubmit: handleSubmit,
        enableReinitialize: true,
        validationSchema: Yup.object().shape({
          width: Yup.number().min(0).required(t('general:form.required')),
          height: Yup.number().min(0).required(t('general:form.required')),
          file: Yup.mixed(),
        }),
        initialValues: initValues,
      }}
      renderDeps={initValues}
    >
      <Field.TextField
        name="width"
        label="Width"
        numberProps={{
          maxValue: 3000,
        }}
      />
      <Field.TextField
        name="height"
        label="Height"
        numberProps={{
          maxValue: 3000,
        }}
      />
      <FormikConsumer>
        {({ values, setFieldValue }) => {
          return (
            <>
              <LabelValue
                label={<Typography mt={1}>{t('Background')}</Typography>}
                value={
                  <FileUploadButton
                    maxNumberOfFiles={1}
                    onChange={(val) =>
                      onChangeImage(val, setFieldValue, values)
                    }
                    value={values?.file}
                    fileSizeLimit={FILE_SIZE._4MB}
                    accept={IMG_FILE_TYPE.map((i) => i?.MIME_TYPE).join(', ')}
                  />
                }
              />
            </>
          )
        }}
      </FormikConsumer>
    </Dialog>
  )
}

export default DialogSetting
