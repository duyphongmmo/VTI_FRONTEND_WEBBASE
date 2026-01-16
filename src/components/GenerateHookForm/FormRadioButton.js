import { FormControlLabel, Radio, Typography } from '@mui/material'
import { useFormikContext } from 'formik'
import { useTranslation } from 'react-i18next'

import { FIELD_AREA } from '~/common/constants'
import { FastField, Field } from '~/components/Formik'

import LabelValue from '../LabelValue'
const FormRadioButton = ({ field, area }) => {
  const { attribute, attributeRule } = field
  const handleOnChange = attribute.onChange
  const { values, setFieldValue } = useFormikContext()
  const { t } = useTranslation(['wmsx'])

  const Controller = attribute?.isFastField === false ? Field : FastField

  const getElement = () => {
    switch (area) {
      case FIELD_AREA.HEADER:
        return (
          <LabelValue
            label={
              <Typography sx={{ mt: '9px' }}>
                {t(`${attribute.name}`) || ''}
              </Typography>
            }
          >
            <Controller.RadioGroup
              key={JSON.stringify(attributeRule?.handleGetDeps?.({ values }))}
              name={attribute.fieldName}
              {...(typeof handleOnChange === 'function'
                ? {
                    onChange: (val) =>
                      handleOnChange({ val, setFieldValue, values, attribute }),
                  }
                : {})}
              defaultValue={`${attributeRule.defaultValue}` || null}
              row
              sx={{
                flexWrap: 'nowrap',
                gap: '0 16px',
              }}
              spacing={2}
            >
              {attributeRule?.children?.map((item) => (
                <FormControlLabel
                  value={item?.id}
                  control={<Radio />}
                  label={item?.text}
                  sx={{ ml: '-6px', mr: 2 }}
                />
              ))}
            </Controller.RadioGroup>
          </LabelValue>
        )
      case FIELD_AREA.TABLE:
        return <></>
      default:
    }
  }
  return getElement()
}

export default FormRadioButton
