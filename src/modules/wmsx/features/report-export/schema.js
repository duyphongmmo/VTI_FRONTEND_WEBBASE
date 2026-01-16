import { isEmpty } from 'lodash'
import * as Yup from 'yup'

import { REPORT_TYPE } from '../../constants'

export const formSchema = (t, checkFormatTime, FORMAT_TIME) =>
  Yup.object().shape({
    type: Yup.string().nullable().required(t('general:form.required')),
    exportFileType: Yup.object()
      .nullable()
      .required(t('general:form.required')),
    syncTime: Yup.date()
      .nullable()
      .required(t('general:form.required'))
      .test('syncTime', '', (value, context) => {
        const type = context.from?.[0]?.value?.type
        if (
          (checkFormatTime(type?.id) === FORMAT_TIME.DATE ||
            checkFormatTime(type?.id) === FORMAT_TIME.DATE_MONTH) &&
          !value
        ) {
          return context.createError({
            message: t('general:form.required'),
            path: `${context.path}`,
          })
        }
        return true
      }),
    warehouse: Yup.object()
      .nullable()
      .test('', (value, context) => {
        const type = context.from?.[1]?.value?.type
        if (type?.id === REPORT_TYPE.LOGISTIC_INVENTORY_STATISTICS && !value) {
          return context.createError({
            message: t('general:form.required'),
            path: `${context.path}`,
          })
        }
        return true
      }),
    timeMonth: Yup.array()
      .nullable()
      .test('', (value, context) => {
        const type = context.parent?.type
        if (type?.id === REPORT_TYPE.REPORT_BOUND_BY_YEAR) {
          const filterNull = value?.filter((x) => x)
          if (filterNull?.length < 2) {
            return context.createError({
              path: context.path,
              message: t('general:form.required'),
            })
          }
        }
        return true
      }),
    time: Yup.array()
      .transform((value) =>
        value?.filter(Boolean)?.length === 0 ? null : value,
      )
      .nullable()
      .required(t('general:form.required')),
    inventoryCalendar: Yup.array()
      .nullable()
      .test('time', '', (value, context) => {
        const type = context.from?.[0]?.value?.type?.id
        if (type === REPORT_TYPE.REPORT_POST_INVENTORY && isEmpty(value)) {
          return context.createError({
            message: t('general:form.required'),
            path: `${context.path}`,
          })
        }
        return true
      }),
  })
