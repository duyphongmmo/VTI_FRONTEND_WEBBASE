import React from 'react'

import { useTranslation } from 'react-i18next'

import { ACTIVE_STATUS, ASYNC_SEARCH_LIMIT } from '~/common/constants'
import Autocomplete from '~/components/Autocomplete'
import { getPlantManagementDetailApi } from '~/modules/database/redux/sagas/plant-management/get-detail'
import { searchPlantManagementApi } from '~/modules/database/redux/sagas/plant-management/search'
import { convertFilterParams } from '~/utils'

//TODO: wait for api async search
const searchByNameAndCode = (data, s) => {
  return data?.filter((item) => {
    return (
      item?.floorName?.toLowerCase().includes(s?.toLowerCase()) ||
      item?.floorCode?.toLowerCase().includes(s?.toLowerCase())
    )
  })
}

const QuickFilter = ({ setQuickFilters, quickFilters, disabled }) => {
  const { t } = useTranslation('mmsx')

  return (
    <>
      <Autocomplete
        placeholder={t('deviceLayout.plant')}
        labelWidth="auto"
        value={quickFilters?.plant}
        getOptionLabel={(opt) => {
          const label = []
          opt?.code && label.push(opt?.code)
          opt?.name && label.push(opt?.name)
          opt?.factory?.name && label.push(opt?.factory?.name)
          return label.join(' - ')
        }}
        onChange={(val) => {
          if (!val?.id) {
            setQuickFilters?.(() => ({
              floor: null,
              plant: null,
            }))
            return
          }
          setQuickFilters?.(() => ({
            floor: null,
            plant: {
              id: val?.id,
              name: val?.name,
              code: val?.code,
            },
          }))
        }}
        asyncRequest={(keyword) =>
          searchPlantManagementApi({
            keyword: keyword,
            limit: ASYNC_SEARCH_LIMIT,
            filter: convertFilterParams({
              status: 1,
            }),
          })
        }
        isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
        asyncRequestHelper={(res) => res?.data?.items}
        disabled={disabled}
      />

      <Autocomplete
        value={quickFilters?.floor}
        asyncRequest={async (s) => {
          if (!quickFilters?.plant?.id) {
            return Promise.resolve({})
          }
          return getPlantManagementDetailApi(quickFilters?.plant?.id).then(
            (res) => {
              return searchByNameAndCode(res?.data?.plantFloorDetails, s)
            },
          )
        }}
        asyncRequestHelper={(res) =>
          res?.filter((item) => item?.status === ACTIVE_STATUS.ACTIVE)
        }
        asyncRequestDeps={quickFilters?.plant?.id}
        placeholder={t('deviceLayout.floor')}
        labelWidth="auto"
        getOptionLabel={(opt) =>
          opt?.floorCode && opt?.floorName
            ? `${opt?.floorCode} - ${opt?.floorName}`
            : opt?.floorCode || opt?.floorName
        }
        isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
        onChange={(val) => {
          if (!val?.id) {
            setQuickFilters?.((prev) => ({
              ...prev,
              floor: null,
            }))
            return
          }
          setQuickFilters?.((prev) => ({
            ...prev,
            floor: {
              id: val?.id,
              floorName: val?.floorName,
              floorCode: val?.floorCode,
            },
          }))
        }}
        disabled={disabled}
      />
    </>
  )
}

export default QuickFilter
