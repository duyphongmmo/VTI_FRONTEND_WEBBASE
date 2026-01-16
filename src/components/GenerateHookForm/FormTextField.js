import { FormHelperText } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { FIELD_AREA, MAX_VALUE_TEXT_FIELD } from '~/common/constants'
import { CODE_DEFAULT_GROUP } from '~/modules/wmsx/constants'
import theme from '~/themes'

import ReactHookFormTextField from '../ReactHookForm/TextField'
import CheckWatchField from './utils/checkWatchField'
import { getDisabled } from './utils/getDisabled'
import { getRequired } from './utils/getRequired'

const FormTextField = ({
  field,
  area,
  isUpdate,
  index,
  isNumber = false,
  name,
}) => {
  const { t } = useTranslation(['wmsx'])
  const { getValues, setValue, trigger } = useFormContext()
  const { attribute, attributeRule } = field
  const params = getValues(
    `${attribute?.groupCode || CODE_DEFAULT_GROUP}[${index}]`,
  )
  const handleOnChange = attribute.onChange
  const handleOnBlur = attribute.onBlur
  const handleGetDisabled = attributeRule?.handleGetDisabled
  const handleGetRequired = attributeRule?.handleGetRequired
  const handleDisplayEndAdorment = attributeRule.handleDisplayEndAdorment
  const handleWarning = attributeRule.handleWarning
  const messageWarning = attributeRule.messageWarning
  // const Controller = attribute?.isFastField === false ? Field : FastField

  const values = getValues()
  const getElement = () => {
    switch (area) {
      case FIELD_AREA.HEADER:
        return (
          <ReactHookFormTextField
            key={JSON.stringify(attributeRule?.handleGetDeps?.({ values }))}
            name={attribute.fieldName || ''}
            label={t(`${attribute.name}`) || ''}
            placeholder={t(`${attribute.name}`) || ''}
            disabled={getDisabled(
              attributeRule,
              isUpdate,
              typeof handleGetDisabled === 'function' &&
                handleGetDisabled({ values, params, index, name }),
            )}
            required={getRequired(
              attributeRule,
              typeof handleGetRequired === 'function' &&
                handleGetRequired({ values, params }),
            )}
            allow={attributeRule?.allow || null}
            {...(attribute.multiline ? { multiline: true, rows: 3 } : {})}
            {...(isNumber
              ? {
                  type: 'number',
                }
              : {
                  inputProps: {
                    maxLength: attributeRule.max || null,
                  },
                })}
            {...(typeof handleOnChange === 'function'
              ? {
                  onChange: (val) => handleOnChange({ val, setValue, values }),
                }
              : {})}
            {...(typeof handleOnBlur === 'function'
              ? {
                  onBlur: (val) => handleOnBlur({ val, setValue, values }),
                }
              : {})}
          />
        )
      case FIELD_AREA.TABLE:
        return (
          <CheckWatchField
            watch={
              typeof attributeRule?.watch === 'function'
                ? attributeRule?.watch({ index, values, params })
                : attributeRule?.watch
            }
            name={
              name
                ? `${name}[${index}].${attribute.fieldName}`
                : `items[${index}].${attribute.fieldName}` || ''
            }
            index={index}
          >
            {() => (
              <>
                <ReactHookFormTextField
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
                      handleGetDisabled({ values, params, index }),
                  )}
                  required={getRequired(
                    attributeRule,
                    typeof handleGetRequired === 'function' &&
                      handleGetRequired({ values, params }),
                  )}
                  allow={attributeRule?.allow || null}
                  isInputTable
                  {...(isNumber
                    ? {
                        type: 'number',
                        numberProps: attributeRule?.decimalScale
                          ? {
                              decimalScale: attributeRule?.decimalScale,
                              maxValue: MAX_VALUE_TEXT_FIELD,
                            }
                          : { maxValue: MAX_VALUE_TEXT_FIELD },
                      }
                    : {
                        inputProps: {
                          maxLength: attributeRule.max || null,
                          ...(attributeRule.uppercase && {
                            style: {
                              textTransform: 'uppercase',
                              '&::placeholder': {
                                textTransform: 'capitalize',
                              },
                            },
                          }),
                        },
                      })}
                  {...(typeof handleOnChange === 'function'
                    ? {
                        onChange: (val) =>
                          handleOnChange({
                            val,
                            index,
                            setValue,
                            values,
                            attribute,
                            params,
                          }),
                      }
                    : {})}
                  {...(typeof handleOnBlur === 'function'
                    ? {
                        onBlur: (val) =>
                          handleOnBlur({
                            val,
                            index,
                            setValue,
                            values,
                            attribute,
                            params,
                          }),
                      }
                    : {})}
                  InputProps={{
                    ...(typeof attributeRule.handleDisplayEndAdorment ===
                    'function'
                      ? handleDisplayEndAdorment({
                          index,
                          setValue,
                          values,
                          attribute,
                          params,
                          trigger,
                        })
                      : null),
                  }}
                />
                {typeof handleWarning === 'function' &&
                  handleWarning({ values, params }) && (
                    <FormHelperText sx={{ color: theme.palette.primary.main }}>
                      {messageWarning({ values, params, trigger })}
                    </FormHelperText>
                  )}
              </>
            )}
          </CheckWatchField>
        )
      default:
        break
    }
  }

  return getElement()
}

export default FormTextField
