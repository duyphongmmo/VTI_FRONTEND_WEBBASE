import React from 'react'

import { useTranslation } from 'react-i18next'

import {
  ACTIVE_STATUS,
  ASYNC_SEARCH_LIMIT,
  // COST_CENTER_STATUS,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import { Field } from '~/components/Formik'
// import { searchCostCentersApi } from '~/modules/configuration/redux/sagas/define-cost-center/search'
import { searchDefineDivisionApi } from '~/modules/configuration/redux/sagas/define-division/search'
import { searchDefineSectionApi } from '~/modules/configuration/redux/sagas/define-section/search'
import { searchDepartmentListApi } from '~/modules/configuration/redux/sagas/department-list/search-department-list'
import { searchRoleListApi } from '~/modules/configuration/redux/sagas/role-list/search-role-list'
import { searchUsersApi } from '~/modules/configuration/redux/sagas/user-management/search-users'
import { convertFilterParams } from '~/utils'
// import { convertFilterParams } from '~/utils'
const FilterForm = () => {
  const { t } = useTranslation('configuration')

  return (
    <>
      <Field.TextField
        name="fullName"
        // label={t('userManagement.fullName')}
        placeholder={t('userManagement.fullName')}
        inputProps={{
          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
        }}
      />
      <Field.TextField
        name="email"
        // label={t('userManagement.fullName')}
        placeholder={t('userManagement.email')}
        inputProps={{
          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
        }}
      />
      {/* <Field.Autocomplete
        // label={t('deviceList.costCenter')}
        name="costCenterIds"
        placeholder={t('mmsx:template.costCenter')}
        inputProps={{
          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
        }}
        asyncRequest={(s) =>
          searchCostCentersApi({
            keyword: s,
            limit: ASYNC_SEARCH_LIMIT,
            filter: convertFilterParams({
              statusList: [
                COST_CENTER_STATUS.ACTIVE,
                COST_CENTER_STATUS.INACTIVE,
              ],
            }),
          })
        }
        asyncRequestHelper={(res) =>
          res?.data?.items?.map((i) => ({
            code: i?.code,
            vName: i?.vName,
            id: i?.id,
          }))
        }
        isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
        getOptionLabel={(opt) =>
          opt?.code && opt?.vName
            ? `${opt?.code} - ${opt?.vName}`
            : opt?.code || opt?.vName
        }
        multiple
      /> */}
      <Field.Autocomplete
        name="departmentIds"
        // label={t('mmsx:template.costCenter')}
        placeholder={t('userManagement.department')}
        asyncRequest={(s) =>
          searchDepartmentListApi({
            keyword: s,
            limit: ASYNC_SEARCH_LIMIT,
            // filter: convertFilterParams({
            //   statusList: [COST_CENTER_STATUS.ACTIVE],
            // }),
          })
        }
        asyncRequestHelper={(res) =>
          res?.data?.items?.map((i) => ({
            code: i?.code,
            vnName: i?.vnName,
            id: i?.id,
          }))
        }
        getOptionLabel={(opt) => opt?.vnName}
        multiple
      />

      <Field.Autocomplete
        name="divisionIds"
        // label={t('mmsx:template.costCenter')}
        placeholder={t('userManagement.section')}
        asyncRequest={(s) =>
          searchDefineDivisionApi({
            keyword: s,
            limit: ASYNC_SEARCH_LIMIT,
            // filter: convertFilterParams({
            //   statusList: [COST_CENTER_STATUS.ACTIVE],
            // }),
          })
        }
        asyncRequestHelper={(res) =>
          res?.data?.items?.map((i) => ({
            code: i?.code,
            vName: i?.vName,
            id: i?.id,
          }))
        }
        getOptionLabel={(opt) => opt?.vName}
        multiple
      />

      <Field.Autocomplete
        name="sectionIds"
        // label={t('mmsx:template.costCenter')}
        placeholder={t('userManagement.division')}
        asyncRequest={(s) =>
          searchDefineSectionApi({
            keyword: s,
            limit: ASYNC_SEARCH_LIMIT,
            // filter: convertFilterParams({
            //   statusList: [COST_CENTER_STATUS.ACTIVE],
            // }),
          })
        }
        asyncRequestHelper={(res) =>
          res?.data?.items?.map((i) => ({
            code: i?.code,
            vName: i?.vName,
            id: i?.id,
          }))
        }
        getOptionLabel={(opt) => opt?.vName}
        multiple
      />
      <Field.Autocomplete
        name="roleIds"
        // label={t('mmsx:template.costCenter')}
        placeholder={t('userManagement.role')}
        asyncRequest={(s) =>
          searchRoleListApi({
            keyword: s,
            limit: ASYNC_SEARCH_LIMIT,
            // filter: convertFilterParams({
            //   statusList: [COST_CENTER_STATUS.ACTIVE],
            // }),
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
        multiple
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
