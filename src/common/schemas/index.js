import { addDays } from 'date-fns'
import { isEmpty } from 'lodash'
import * as Yup from 'yup'

import {
  TEXTFIELD_REQUIRED_LENGTH,
  NUMBER_FIELD_REQUIRED_SIZE,
  FILE_SIZE,
} from '~/common/constants'
import { formatFileSize } from '~/utils/file'

export const phoneSchema = (t) =>
  Yup.string()
    .transform((value) => (isEmpty(value) ? null : value))
    .nullable()
    .min(
      TEXTFIELD_REQUIRED_LENGTH.PHONE.MIN,
      t('general:form.minLength', {
        min: TEXTFIELD_REQUIRED_LENGTH.PHONE.MIN,
      }),
    )

export const phoneRequiredSchema = (t) =>
  Yup.string()
    .transform((value) => (isEmpty(value) ? null : value))
    .nullable()
    .required(t('general:form.required'))
    .min(
      TEXTFIELD_REQUIRED_LENGTH.PHONE.MIN,
      t('general:form.minLength', {
        min: TEXTFIELD_REQUIRED_LENGTH.PHONE.MIN,
      }),
    )

export const numberSchema = (t) =>
  Yup.number()
    .min(
      NUMBER_FIELD_REQUIRED_SIZE.INTEGER_100K.MIN,
      t('general:form.minNumber', {
        min: NUMBER_FIELD_REQUIRED_SIZE.INTEGER_100K.MIN,
      }),
    )
    .max(
      NUMBER_FIELD_REQUIRED_SIZE.INTEGER_100K.MAX,
      t('general:form.maxNumber', {
        max: NUMBER_FIELD_REQUIRED_SIZE.INTEGER_100K.MAX,
      }),
    )

export const passwordSchema = (t) =>
  Yup.string().min(
    TEXTFIELD_REQUIRED_LENGTH.PASSWORD.MIN,
    t('general:form.minLength', {
      min: TEXTFIELD_REQUIRED_LENGTH.PASSWORD.MIN,
    }),
  )

export const unitSchema = (t) =>
  Yup.number()
    .min(
      NUMBER_FIELD_REQUIRED_SIZE.UNIT.MIN,
      t('general:form.minNumber', {
        min: NUMBER_FIELD_REQUIRED_SIZE.UNIT.MIN,
      }),
    )
    .max(
      NUMBER_FIELD_REQUIRED_SIZE.UNIT.MAX,
      t('general:form.maxNumber', {
        max: NUMBER_FIELD_REQUIRED_SIZE.UNIT.MAX,
      }),
    )

export const dayLimitSchema = (t, dayLimit) =>
  Yup.array()
    .nullable()
    .of(Yup.string().nullable())
    .test(_, (value, context) => {
      const filterNull = value?.filter((x) => x)
      if (filterNull?.length < 2) {
        return context.createError({
          path: context.path,
          message: t('general:form.required'),
        })
      }
      const dateFrom = value?.[0]
      const dateTo = value?.[1]
      const dateLimit = addDays(new Date(dateFrom), dayLimit)
      if (
        dateFrom &&
        dateTo &&
        new Date(dateLimit).getTime() < new Date(dateTo).getTime()
      ) {
        return context.createError({
          path: context.path,
          message: t('mesx:common.validateDayLimitFilter', {
            day: dayLimit,
          }),
        })
      }
      return true
    })

export const fileSchema = (t, fileSize = FILE_SIZE._4MB) => {
  return Yup.array()
    .nullable()
    .test(_, (value, context) => {
      const isInvalidFileSize = value?.some((f) => f?.size > fileSize)
      if (isInvalidFileSize) {
        return context.createError({
          path: context.path,
          message: `${t(
            'general:fileUpload.error.invalidSize',
          )} ${formatFileSize(fileSize)}.`,
        })
      }
      return true
    })
}
