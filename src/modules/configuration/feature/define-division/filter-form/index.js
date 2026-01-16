import React from 'react'

import { useTranslation } from 'react-i18next'

import {
  ACTIVE_STATUS,
  ASYNC_SEARCH_LIMIT,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import { Field } from '~/components/Formik'
import { searchDepartmentListApi } from '~/modules/configuration/redux/sagas/department-list/search-department-list'
import { searchUsersApi } from '~/modules/configuration/redux/sagas/user-management/search-users'
import { convertFilterParams } from '~/utils'

const FilterForm = () => {
  const { t } = useTranslation(['configuration'])
  return (
    <>
      <Field.TextField
        name="code"
        placeholder={t('defineDivision.code')}
        inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
      />

      <Field.TextField
        name="eName"
        placeholder={t('defineDivision.eName')}
        inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        allow={TEXTFIELD_ALLOW.ALPHANUMERIC_SPECIALS_SPACE}
      />

      <Field.TextField
        name="vName"
        placeholder={t('defineDivision.vName')}
        inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        allow={TEXTFIELD_ALLOW.REGEX_CODE_VIETNAMESE}
      />
      <Field.TextField
        name="jName"
        placeholder={t('defineDivision.jName')}
        inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        allow={TEXTFIELD_ALLOW.REGEX_CODE_JAPANESE}
      />
      <Field.TextField
        name="description"
        placeholder={t('defineDivision.description')}
        inputProps={{
          maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_100.MAX,
        }}
      />
      <Field.Autocomplete
        name="departmentIds"
        placeholder={t('defineDivision.department')}
        asyncRequest={(s) =>
          searchDepartmentListApi({
            keyword: s,
            limit: ASYNC_SEARCH_LIMIT,
            isGroupStatus: 1,
          })
        }
        asyncRequestHelper={(res) => res?.data?.items}
        getOptionLabel={(opt) => `${opt?.vnName}`}
        multiple
      />

      <Field.DateRangePicker
        name="createdAt"
        placeholder={t('general:common.createdAt')}
      />
      <Field.Autocomplete
        name="createdUserId"
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
        getOptionSubLabel={(opt) => opt?.username}
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
