import { has, isArray, get } from 'lodash'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT, FIELD_AREA } from '~/common/constants'
import { api } from '~/services/api'
import { convertUtcDateTimeToLocalTz, convertUtcDateToLocalTz } from '~/utils'

import ReactHookFormAutocomplete from '../ReactHookForm/Autocomplete'
import CheckWatchField from './utils/checkWatchField'
import { getDisabled } from './utils/getDisabled'
import { getRequired } from './utils/getRequired'

const FormAutocomplete = ({ field, area, isUpdate, index, name }) => {
  const { t } = useTranslation(['wmsx'])
  const { attribute, attributeRule } = field

  const { getValues, setValue, reset, trigger } = useFormContext()
  const values = getValues()
  const handleOnChange = attribute?.onChange
  const getOptions = attribute?.getOptions
  const getValue = attribute?.getValue
  const handleGetDisabled = attributeRule?.handleGetDisabled
  const handleGetRequired = attributeRule?.handleGetRequired
  const params = getValues(`${name}[${index}]`)
  const getListApi = (dataSource, params) => {
    if (!dataSource.uri) return
    const uri = `${dataSource.uri}`
    return api.get(uri, params)
  }
  const getAsyncRequestDeps = () => {
    if (isArray(attributeRule?.asyncRequestDeps)) {
      return attributeRule?.asyncRequestDeps?.map((attr) => {
        if (has(values, attr)) return get(values, attr)
        return get(params?.row, attr)
      })
    }
    if (has(values, attributeRule?.asyncRequestDeps)) {
      return get(values, attributeRule?.asyncRequestDeps)
    }
    return get(params?.row, attributeRule?.asyncRequestDeps)
  }

  // const Controller = attribute?.isFastField === false ? Field : FastField
  const getElement = () => {
    switch (area) {
      case FIELD_AREA.HEADER:
        return (
          <CheckWatchField
            watch={
              typeof attributeRule?.watch === 'function'
                ? attributeRule?.watch({ index, values, params })
                : attributeRule?.watch
            }
            name={attribute.fieldName || ''}
          >
            {() => (
              <ReactHookFormAutocomplete
                key={JSON.stringify(attributeRule?.handleGetDeps?.({ values }))}
                name={attribute.fieldName || ''}
                label={t(`${attribute.name}`) || ''}
                placeholder={t(`${attribute.name}`) || ''}
                disableClearable={attributeRule?.disableClearable || false}
                {...(attributeRule?.isOptions
                  ? {
                      options: attributeRule?.options
                        ? attributeRule?.options
                        : getOptions({ values, index }),
                      getOptionLabel: (opt) =>
                        typeof attributeRule?.getOptionLabel === 'function'
                          ? attributeRule.getOptionLabel(opt)
                          : opt?.code || t(opt?.text) || opt?.name || '',
                    }
                  : {
                      asyncRequest: (s) => {
                        if (
                          typeof attributeRule?.table?.callApi === 'function'
                        ) {
                          const callApi = attributeRule?.table?.callApi
                          return callApi({ values, s })
                        } else {
                          const params = {
                            keyword: s,
                            limit: ASYNC_SEARCH_LIMIT,
                            filter: attributeRule?.table?.filter,
                            sort: attributeRule?.table?.sort,
                            ...attributeRule?.table?.filterOther,
                          }
                          return getListApi(attributeRule?.table || '', params)
                        }
                      },
                      asyncRequestHelper: (res) =>
                        typeof attributeRule?.asyncRequestHelper === 'function'
                          ? attributeRule.asyncRequestHelper(res)
                          : res?.data?.items || res?.data,
                      asyncRequestDeps: isArray(attributeRule?.asyncRequestDeps)
                        ? attributeRule?.asyncRequestDeps?.map(
                            (attr) => values[attr],
                          )
                        : values[attributeRule?.asyncRequestDeps] ||
                          attributeRule?.asyncRequestDeps,
                      getOptionLabel: (opt) =>
                        typeof attributeRule?.getOptionLabel === 'function'
                          ? attributeRule.getOptionLabel(opt)
                          : opt?.fullName || opt?.code,
                      getOptionSubLabel: attributeRule?.noSubLabel
                        ? undefined
                        : (opt) =>
                            typeof attributeRule?.getOptionSubLabel ===
                            'function'
                              ? attributeRule.getOptionSubLabel(opt)
                              : opt?.username || opt?.name,
                    })}
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
                {...(attributeRule?.isOptions && typeof getValue === 'function'
                  ? {
                      getOptionValue: (opt) => getValue(opt),
                    }
                  : {
                      isOptionEqualToValue: (opt, val) =>
                        typeof attributeRule?.isOptionEqualToValue ===
                        'function'
                          ? attributeRule.isOptionEqualToValue(opt, val)
                          : opt?.id === val?.id,
                    })}
                {...attribute.props}
                multiple={attribute.multiple || null}
              />
            )}
          </CheckWatchField>
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
              <ReactHookFormAutocomplete
                key={JSON.stringify(
                  attributeRule?.handleGetDeps?.({ values, params }),
                )}
                name={
                  name
                    ? `${name}[${index}].${attribute.fieldName}`
                    : `items[${index}].${attribute.fieldName}` || ''
                }
                placeholder={t(`${attribute.name}`) || ''}
                autoFetch={attributeRule?.autoFetch || false}
                isInputTable
                {...(attributeRule?.isOptions
                  ? {
                      options: attributeRule?.options
                        ? attributeRule?.options
                        : getOptions({
                            values,
                            index,
                            params,
                            attribute,
                          }),
                      getOptionLabel: (opt) =>
                        typeof attributeRule?.getOptionLabel === 'function'
                          ? attributeRule.getOptionLabel(opt)
                          : opt?.code ||
                            opt?.name ||
                            convertUtcDateToLocalTz(opt?.mfg) ||
                            opt?.lotNumber ||
                            convertUtcDateTimeToLocalTz(opt?.storageDate) ||
                            t(opt?.text) ||
                            '',
                      ...(!attributeRule?.noSubLabel
                        ? {
                            getOptionSubLabel: (opt) =>
                              typeof attributeRule?.getOptionSubLabel ===
                              'function'
                                ? attributeRule.getOptionSubLabel(opt)
                                : opt?.name,
                          }
                        : null),
                    }
                  : {
                      asyncRequest: (s) => {
                        if (
                          typeof attributeRule?.table?.callApi === 'function'
                        ) {
                          const callApi = attributeRule?.table?.callApi
                          return callApi({
                            values,
                            index,
                            params,
                            s,
                            name,
                            getValues,
                          })
                        } else {
                          const params = {
                            keyword: s,
                            limit: s
                              ? attributeRule?.table?.limit || 300
                              : ASYNC_SEARCH_LIMIT,
                            filter: attributeRule?.table?.filter,
                            sort: attributeRule?.table?.sort,
                            ...attributeRule?.table?.filterOther,
                          }
                          return getListApi(attributeRule?.table || '', params)
                        }
                      },
                      asyncRequestHelper: (res) =>
                        typeof attributeRule?.asyncRequestHelper === 'function'
                          ? attributeRule.asyncRequestHelper(res)
                          : res?.data?.items || res?.data,
                      asyncRequestDeps: getAsyncRequestDeps(),
                      getOptionLabel: (opt) =>
                        typeof attributeRule?.getOptionLabel === 'function'
                          ? attributeRule.getOptionLabel(opt, params)
                          : opt?.fullName || opt?.code,
                      ...(!attributeRule?.noSubLabel
                        ? {
                            getOptionSubLabel: (opt) =>
                              typeof attributeRule?.getOptionSubLabel ===
                              'function'
                                ? attributeRule.getOptionSubLabel(opt)
                                : opt?.name,
                          }
                        : null),
                    })}
                disabled={getDisabled(
                  attributeRule,
                  isUpdate,
                  typeof handleGetDisabled === 'function' &&
                    handleGetDisabled({
                      values,
                      params,
                      index,
                      name,
                      trigger,
                    }),
                )}
                required={getRequired(
                  attributeRule,
                  typeof handleGetRequired === 'function' &&
                    handleGetRequired({ values, params }),
                )}
                {...(typeof handleOnChange === 'function'
                  ? {
                      onChange: (val) =>
                        handleOnChange({
                          val,
                          index,
                          setValue,
                          reset,
                          values,
                          attribute,
                          params,
                          trigger,
                        }),
                    }
                  : {})}
                {...(attributeRule?.isOptions && typeof getValue === 'function'
                  ? {
                      getOptionValue: (opt) => getValue(opt),
                    }
                  : {
                      isOptionEqualToValue: (opt, val) =>
                        typeof attributeRule?.isOptionEqualToValue ===
                        'function'
                          ? attributeRule.isOptionEqualToValue(opt, val)
                          : opt?.id === val?.id,
                    })}
                {...(attributeRule?.dropdownLarger
                  ? { dropdownLarger: true }
                  : {})}
                {...attribute.props}
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

export default FormAutocomplete
