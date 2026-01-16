import React from 'react'

import { useTranslation } from 'react-i18next'

import {
  ASYNC_SEARCH_LIMIT,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import { Field } from '~/components/Formik'
import { searchDepartmentListApi } from '~/modules/configuration/redux/sagas/department-list/search-department-list'
import { searchRoleListApi } from '~/modules/configuration/redux/sagas/role-list/search-role-list'
import { convertFilterParams } from '~/utils'

const FilterForm = () => {
  const { t } = useTranslation(['configuration'])
  return (
    <>
      <Field.Autocomplete
        name="department"
        placeholder={t('userPermission.departmentName')}
        asyncRequest={(s) =>
          searchDepartmentListApi({
            keyword: s,
            limit: ASYNC_SEARCH_LIMIT,
            filter: convertFilterParams({
              status: 1,
            }),
          })
        }
        asyncRequestHelper={(res) =>
          res?.data?.items?.map((i) => ({
            vnName: i?.vnName,
            name: i?.name,
            code: i?.code,
            id: i?.id,
          }))
        }
        getOptionLabel={(opt) => {
          const name = opt?.vnName || opt?.name

          return name
        }}
      />
      <Field.Autocomplete
        name="role"
        placeholder={t('userPermission.role')}
        asyncRequest={(s) =>
          searchRoleListApi({
            keyword: s,
            limit: ASYNC_SEARCH_LIMIT,
            filter: convertFilterParams({
              status: 1,
            }),
          })
        }
        asyncRequestHelper={(res) =>
          res?.data?.items?.map((i) => ({
            code: i?.code,
            name: i?.name,
            id: i?.id,
          }))
        }
        getOptionLabel={(opt) => opt?.name}
      />
      <Field.TextField
        name="feature"
        placeholder={t('userPermission.feature')}
        inputProps={{
          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
        }}
      />
    </>
  )
}

export default FilterForm
