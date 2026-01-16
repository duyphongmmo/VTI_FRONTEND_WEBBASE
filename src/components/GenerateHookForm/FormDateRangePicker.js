import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { FIELD_AREA } from '~/common/constants'

import ReactHookFormDateRangePicker from '../ReactHookForm/DateRangePicker'
import CheckWatchField from './utils/checkWatchField'
import { getDisabled } from './utils/getDisabled'
import { getRequired } from './utils/getRequired'

const FormDateRangePicker = ({
  field,
  area,
  isUpdate,
  index,
  params,
  name,
}) => {
  const { attribute, attributeRule } = field
  const { t } = useTranslation(['wmsx'])
  const handleGetDisabled = attributeRule?.handleGetDisabled
  const handleGetRequired = attributeRule?.handleGetRequired

  const { getValues } = useFormContext() ?? {}
  const values = getValues()

  const getElement = () => {
    switch (area) {
      case FIELD_AREA.HEADER:
        return (
          <ReactHookFormDateRangePicker
            key={JSON.stringify(attributeRule?.handleGetDeps?.({ values }))}
            name={attribute.fieldName || ''}
            label={t(`${attribute.name}`) || ''}
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
              <ReactHookFormDateRangePicker
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

export default FormDateRangePicker
