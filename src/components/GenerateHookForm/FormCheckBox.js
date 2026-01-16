import { FormControlLabel } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { FIELD_AREA } from '~/common/constants'

import ReactHookFormCheckBox from '../ReactHookForm/Checkbox'

const FormCheckBox = ({ field, area }) => {
  const { t } = useTranslation(['wmsx'])

  const { getValues, setValue } = useFormContext() ?? {}
  const values = getValues()
  const { attribute, attributeRule } = field
  const handleOnChange = attribute.onChange
  const getElement = () => {
    switch (area) {
      case FIELD_AREA.HEADER:
        return (
          <FormControlLabel
            control={
              <ReactHookFormCheckBox
                key={JSON.stringify(attributeRule?.handleGetDeps?.({ values }))}
                name={attribute.fieldName}
                checked={
                  Boolean(values[attribute.fieldName]) ||
                  Boolean(attributeRule?.defaultValue)
                }
                {...(typeof handleOnChange === 'function'
                  ? {
                      onChange: (val) =>
                        handleOnChange({
                          val,
                          setValue,
                          values,
                          attribute,
                        }),
                    }
                  : {})}
              />
            }
            label={t(`${attribute.name}`) || ''}
            sx={{
              ...(attributeRule.disabled ? { pointerEvents: 'none' } : {}),
            }}
            disabled={attributeRule.disabled}
          />
        )
      case FIELD_AREA.TABLE:
        return <></>
      default:
        break
    }
  }

  return getElement()
}

export default FormCheckBox
