import React from 'react'

import { useTranslation } from 'react-i18next'

import {
  ACTIVE_STATUS,
  ASYNC_SEARCH_LIMIT,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import { Field } from '~/components/Formik'
import { searchUsersApi } from '~/modules/configuration/redux/sagas/user-management/search-users'
import { convertFilterParams } from '~/utils'
const FilterForm = () => {
  const { t } = useTranslation(['configuration'])
  return (
    <>
      <Field.TextField
        name="enName"
        placeholder={t('departmentList.englishName')}
        inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX }}
      />

      <Field.TextField
        name="vnName"
        placeholder={t('departmentList.vnName')}
        inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX }}
      />
      <Field.TextField
        name="jpName"
        placeholder={t('departmentList.japanName')}
        inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX }}
      />
      <Field.TextField
        name="description"
        placeholder={t('departmentList.description')}
        inputProps={{
          maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_100.MAX,
        }}
      />
      <Field.DateRangePicker
        name="createdAt"
        placeholder={t('general:common.createdAt')}
      />
      <Field.Autocomplete
        name="createdBy"
        placeholder={t('general:common.createdBy')}
        asyncRequest={(s) =>
          searchUsersApi({
            keyword: s,
            limit: ASYNC_SEARCH_LIMIT,
            filter: convertFilterParams({
              status: ACTIVE_STATUS.ACTIVE,
            }),
          })
        }
        asyncRequestHelper={(res) => res?.data?.items}
        getOptionLabel={(opt) => opt?.fullName}
        inputProps={{
          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
        }}
      />

      <Field.DateRangePicker
        name="updatedAt"
        placeholder={t('general:common.updatedAt')}
      />
      <Field.Autocomplete
        name="updatedBy"
        placeholder={t('general:common.updatedBy')}
        asyncRequest={(s) =>
          searchUsersApi({
            keyword: s,
            limit: ASYNC_SEARCH_LIMIT,
            filter: convertFilterParams({
              status: ACTIVE_STATUS.ACTIVE,
            }),
          })
        }
        asyncRequestHelper={(res) => res?.data?.items}
        getOptionLabel={(opt) => opt?.fullName}
      />
    </>
  )
}

export default FilterForm
