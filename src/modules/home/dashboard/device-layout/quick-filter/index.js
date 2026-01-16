import React from 'react'

import { Grid } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'

import { ACTIVE_STATUS } from '~/common/constants'
import { Field } from '~/components/Formik'

const QuickFilter = ({ setQuickFilters, quickFilters }) => {
  const { t } = useTranslation('home')

  return (
    <Formik enableReinitialize initialValues={quickFilters}>
      {({ values, setFieldValue }) => {
        const floorList = values?.plant?.plantFloorDetails?.filter(
          (item) => item?.status === ACTIVE_STATUS.ACTIVE,
        )
        return (
          <Form>
            <Grid container justifyContent="center" spacing={2}>
              

              <Grid item xl={3} xs={12} md={3}>
                <Field.Autocomplete
                  name="floor"
                  placeholder={t('dashboard.floor')}
                  options={floorList}
                  labelWidth="auto"
                  getOptionLabel={(opt) => opt?.floorName ?? opt?.name}
                  getOptionSubLabel={(opt) => opt?.floorCode ?? opt?.code}
                  isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                  onChange={(val) => {
                    setFieldValue('productionLine', [])

                    setQuickFilters?.({
                      ...quickFilters,
                      floor: !!val
                        ? {
                            id: val?.id,
                            floorCode: val?.floorCode ?? val?.code,
                            floorName: val?.floorName ?? val?.name,
                          }
                        : null,
                      productionLine: [],
                    })
                  }}
                  disabled={!values?.plant?.id}
                />
              </Grid>
            </Grid>
          </Form>
        )
      }}
    </Formik>
  )
}

export default QuickFilter
