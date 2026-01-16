import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { FIELD_AREA } from '~/common/constants'

import ReactHookFormDateTimePicker from '../ReactHookForm/DateTimePicker'
import CheckWatchField from './utils/checkWatchField'
import { getDisabled } from './utils/getDisabled'
import { getRequired } from './utils/getRequired'

const FormDateTimePicker = ({ field, area, isUpdate, index, params, name }) => {
  const { attribute, attributeRule } = field
  const { t } = useTranslation(['wmsx'])
  const handleGetDisabled = attributeRule?.handleGetDisabled
  const handleGetRequired = attributeRule?.handleGetRequired
  const handleOnChange = attribute?.onChange

  const { getValues, setValue, reset } = useFormContext() ?? {}
  const values = getValues()

  const getElement = () => {
    switch (area) {
      case FIELD_AREA.HEADER:
        return (
          <ReactHookFormDateTimePicker
            key={JSON.stringify(attributeRule?.handleGetDeps?.({ values }))}
            name={attribute.fieldName || ''}
            label={t(`${attribute.name}`) || ''}
            placeholder={t(`${attribute.name}`) || ''}
            {...(typeof handleOnChange === 'function'
              ? {
                  onChange: (val) =>
                    handleOnChange({
                      val,
                      setValue,
                      values,
                      attribute,
                      reset,
                    }),
                }
              : {})}
            disabled={getDisabled(
              attributeRule,
              isUpdate,
              typeof handleGetDisabled === 'function' &&
                handleGetDisabled({ values, params }),
            )}
            required={getRequired(
              attributeRule,
              typeof handleGetRequired === 'function' &&
                handleGetRequired({ values, params }),
            )}
            minDateTime={attributeRule.min || null}
            maxDateTime={attributeRule.max || null}
            views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
            // inputFormat={'dd/MM/yyyy HH:mm:ss'}
          />
        )
      case FIELD_AREA.TABLE:
        return (
          <CheckWatchField
            watch={attributeRule?.watch}
            name={
              name
                ? `${name}[${index}].${attribute.fieldName}`
                : `items[${index}].${attribute.fieldName}` || ''
            }
            index={index}
          >
            {() => (
              <ReactHookFormDateTimePicker
                key={JSON.stringify(
                  attributeRule?.handleGetDeps?.({ values, params }),
                )}
                name={
                  name
                    ? `${name}[${index}].${attribute.fieldName}`
                    : `items[${index}].${attribute.fieldName}` || ''
                }
                placeholder={t(`${attribute.name}`) || ''}
                disabled={getDisabled(
                  attributeRule,
                  isUpdate,
                  typeof handleGetDisabled === 'function' &&
                    handleGetDisabled({ values, params }),
                )}
                required={getRequired(
                  attributeRule,
                  typeof handleGetRequired === 'function' &&
                    handleGetRequired({ values, params }),
                )}
                minDate={attributeRule.min || null}
                maxDate={attributeRule.max || null}
                views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
                inputFormat={'dd/MM/yyyy HH:mm:ss'}
                {...(typeof handleOnChange === 'function'
                  ? {
                      onChange: (val) =>
                        handleOnChange({
                          val,
                          setValue,
                          values,
                          attribute,
                          reset,
                        }),
                    }
                  : {})}
              />
            )}
          </CheckWatchField>
        )
      default:
        break
    }
  }
  return getElement()
}

export default FormDateTimePicker
