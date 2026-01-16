import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { FUNCTION_CODE } from '~/common/constants/functionCode'
import { useApp } from '~/common/hooks/useApp'
import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import { USER_MANAGEMENT_STATUS_OPTIONS } from '~/modules/configuration/constants'
import useUserInfo from '~/modules/configuration/redux/hooks/useUserInfo'
import { ROUTE } from '~/modules/configuration/routes/config'
import { convertUtcDateTimeToLocalTz } from '~/utils'

function UserInfoDetail() {
  const { t } = useTranslation(['configuration'])
  const history = useHistory()
  const { canAccess } = useApp()

  const {
    data: { isLoading, userInfo },
    actions,
  } = useUserInfo()

  const breadcrumbs = [
    {
      title: 'userInfo',
    },
  ]

  useEffect(() => {
    actions.getUserInfo()
  }, [])

  const renderHeaderRight = () => {
    return (
      <Button
        onClick={() => history.push(ROUTE.ACCOUNT.EDIT.PATH)}
        sx={{ ml: 1 }}
        icon="edit"
      >
        {t('general:common.update')}
      </Button>
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('general:page.userInfo')}
      loading={isLoading}
      renderHeaderRight={renderHeaderRight}
    >
      <ActionBar
        variant="top"
        {...(canAccess(FUNCTION_CODE.USER_UPDATE_USER)
          ? {
              onEdit: () => history.push(ROUTE.ACCOUNT.EDIT.PATH),
            }
          : {})}
        status={
          <Status
            options={USER_MANAGEMENT_STATUS_OPTIONS}
            value={userInfo?.status}
          />
        }
      />
      <Grid container justifyContent="center">
        <Grid
          item
          xs={12}
          sx={(theme) => ({
            justifyContent: 'center',
            bgcolor: 'bg.block',
            borderRadius: 1,
            mb: 1,
            pt: 1,
            pb: 1,
            pr: 1,
            pl: 1,

            [theme.breakpoints.down('xl')]: {
              px: 2,
            },
          })}
        >
          <Grid container rowSpacing={1} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <Typography variant="h4" mt={1}>
                {t('userManagement.commonInfo')}
              </Typography>
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('userManagement.code')} value={userInfo.code} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('userManagement.email')} value={userInfo.email} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('userManagement.username')}
                value={userInfo.username}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('userManagement.phone')} value={userInfo.phone} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('userManagement.fullName')}
                value={userInfo.fullName}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('userManagement.dateOfBirth')}
                value={userInfo.dateOfBirth}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('userManagement.user')}
                value={userInfo.createdBy?.username}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('userManagement.createTime')}
                value={convertUtcDateTimeToLocalTz(userInfo.createdAt)}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4" mt={1}>
                {t('userManagement.workInfo')}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <LV
                label={t('userManagement.companyName')}
                value={userInfo?.company?.name}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <LV
                label={t('userManagement.costCenter')}
                value={userInfo?.costCenters
                  ?.map((item) => item?.code)
                  ?.join(', ')}
              />
            </Grid> */}
            <Grid item xs={12}>
              <LV
                label={t('userManagement.department')}
                value={userInfo?.departmentSettings
                  ?.map((item) => `${item?.code} - ${item?.name}`)
                  ?.join(', ')}
              />
            </Grid>
            <Grid item xs={12}>
              <LV
                label={t('userManagement.division')}
                value={(() => {
                  const division = userInfo.sections ?? userInfo.division ?? []

                  return division
                    ?.map((item) =>
                      item?.code && item?.vName
                        ? `${item?.code} - ${item?.vName}`
                        : item?.code || item?.vName,
                    )
                    ?.join(' , ')
                })()}
              />
            </Grid>
            <Grid item xs={12}>
              <LV
                label={t('userManagement.section')}
                value={userInfo?.sections
                  ?.map(
                    (item) => `${item?.code} - ${item?.name || item?.vName}`,
                  )
                  ?.join(', ')}
              />
            </Grid>
            <Grid item xs={12}>
              <LV
                label={t('userManagement.role')}
                value={userInfo?.userRoleSettings?.[0]?.name}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Page>
  )
}

export default UserInfoDetail
