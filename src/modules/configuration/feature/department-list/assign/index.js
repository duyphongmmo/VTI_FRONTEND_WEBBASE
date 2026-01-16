import React, { useEffect, useMemo, useState } from 'react'

import { Grid, Checkbox, FormControlLabel, Typography } from '@mui/material'
import { Formik, Form } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import { useQueryState } from '~/common/hooks'
import ActionBar from '~/components/ActionBar'
import DataTable from '~/components/DataTable'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import useDepartmentList from '~/modules/configuration/redux/hooks/useDepartmentList'
import { ROUTE } from '~/modules/configuration/routes/config'

function DepartmentAssign() {
  const { t } = useTranslation(['configuration'])
  const history = useHistory()
  const { id } = useParams()
  const { page, pageSize, setPage, setPageSize, withSearch } = useQueryState(
    {},
    {
      prefix: 'departmentAssign_',
    },
  )
  const [permissionList, setPermissionList] = useState([])

  const breadcrumbs = [
    {
      title: 'decentralization',
    },
    {
      route: withSearch(ROUTE.DEPARTMENT_LIST.LIST.PATH),
      title: ROUTE.DEPARTMENT_LIST.LIST.TITLE,
    },
    {
      route: ROUTE.DEPARTMENT_LIST.ASSIGN.PATH,
      title: ROUTE.DEPARTMENT_LIST.ASSIGN.TITLE,
    },
  ]

  const {
    data: { departmentAssign, isLoading, total, departmentDetail },
    actions,
  } = useDepartmentList()

  const refreshData = () => actions.getDepartmentAssignDetails(id)

  useEffect(() => {
    refreshData()
    actions.getDepartmentDetailsById(id)

    return () => {
      actions.resetDepartmentAssignDetailsState()
      actions.resetDepartmentDetailsState()
    }
  }, [id])

  const featureList = useMemo(() => {
    const total = departmentAssign?.groupPermissions?.length
    const start = total ? pageSize * (page - 1) : 0
    const end = total ? Math.min(pageSize * page, total) : 0
    const pageOfItems =
      departmentAssign?.groupPermissions?.slice(start, end) ?? []
    if (departmentAssign?.groupPermissions?.length > 0)
      return [
        {
          id: 'All',
          name: t('departmentAssign.all'),
        },
        ...pageOfItems,
      ]
    else return []
  }, [departmentAssign, page, pageSize, permissionList, t])

  useEffect(() => {
    setPermissionList(departmentAssign?.groupPermissions)
  }, [departmentAssign])

  const handleChangeCheckbox = (e, code) => {
    const newPermission = permissionList?.map((permission) => {
      if (permission.code === code) {
        return {
          ...permission,
          status: e.target.checked ? 1 : 0,
        }
      }
      return { ...permission }
    })
    setPermissionList(newPermission)
  }
  const renderActionBar = () => {
    return (
      <ActionBar
        onBack={backToList}
        onCancel={() => setPermissionList(departmentAssign?.groupPermissions)}
        mode={MODAL_MODE.UPDATE}
      />
    )
  }

  const handleCheckAll = (e) => {
    const newPermission = permissionList?.map((permission) => {
      return {
        ...permission,
        status: e.target.checked ? 1 : 0,
      }
    })
    setPermissionList(newPermission)
  }

  const columns = [
    {
      field: 'id',
      headerName: t('departmentAssign.id'),
      width: 80,
    },
    {
      field: 'featureName',
      headerName: t('departmentAssign.featureName'),
      width: 200,
      renderCell: (params) => {
        const { id } = params.row
        return (
          <Typography
            sx={{
              fontWeight: id === 'All' ? 600 : 400,
            }}
          >
            {params?.row?.name}
          </Typography>
        )
      },
    },
    {
      field: 'assign',
      headerName: t('departmentAssign.assign'),
      width: 200,
      align: 'left',
      renderCell: (params) => {
        const { code, id } = params.row
        const isChecked =
          permissionList?.find((item) => item.code === code)?.status === 1

        const isCheckAll = permissionList?.every((item) => item.status === 1)
        const checked = id === 'All' ? isCheckAll : isChecked
        const isSomeChecked =
          permissionList?.some((item) => item.status === 1) &&
          !isCheckAll &&
          id === 'All'
        return (
          <FormControlLabel
            label=""
            control={
              <Checkbox
                checked={Boolean(checked)}
                indeterminate={isSomeChecked}
                onChange={(e) => {
                  if (id === 'All') {
                    handleCheckAll(e)
                  } else {
                    handleChangeCheckbox(e, code)
                  }
                }}
                name={
                  id === 'All'
                    ? 'statusAll'
                    : `status_${params.row.code}_${params.row.id}
                  `
                }
              />
            }
          />
        )
      },
    },
    {
      field: 'description',
      headerName: t('departmentAssign.description'),
      width: 150,
    },
  ]

  const onSubmit = () => {
    const convertValues = {
      id: Number(id),
      groupPermissions: permissionList,
    }
    actions.updateDepartmentAssign(convertValues, refreshData)
  }

  const backToList = () => {
    history.push(
      withSearch(ROUTE.DEPARTMENT_LIST.LIST.PATH, {
        omitPrefixKeys: true,
      }),
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('departmentAssign.title')}
      onBack={backToList}
      loading={isLoading}
      fitScreen
    >
      <Grid container justifyContent="center" sx={{ mb: 2 }}>
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={1} columnSpacing={{ xl: 4, xs: 4 }}>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('departmentList.code')}
                value={departmentDetail?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('departmentList.englishName')}
                value={departmentDetail?.enName}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('departmentList.vnName')}
                value={departmentDetail?.vnName}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Formik onSubmit={onSubmit} enableReinitialize initialValues={{}}>
        {({ handleReset }) => (
          <Form
            style={{
              flex: 1,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <DataTable
              columns={columns}
              rows={featureList}
              pageSize={pageSize}
              page={page}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
              total={total}
              hideSetting
            />
            {renderActionBar(handleReset)}
          </Form>
        )}
      </Formik>
    </Page>
  )
}

export default DepartmentAssign
