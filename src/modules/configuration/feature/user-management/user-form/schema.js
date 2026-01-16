import * as Yup from 'yup'

import { TEXTFIELD_REQUIRED_LENGTH, MODAL_MODE } from '~/common/constants'
import { phoneSchema, passwordSchema } from '~/common/schemas'

export const validationSchema = (t, mode) =>
  Yup.object().shape({
    code: Yup.string().required(t('general:form.required')),
    fullName: Yup.string().required(t('general:form.required')),
    username: Yup.string().required(t('general:form.required')),
    status: Yup.number().nullable().required(t('general:form.required')),
    departmentSettings: Yup.object()
      .nullable()
      .required(t('general:form.required')),
    division: Yup.object().nullable().required(t('general:form.required')),
    section: Yup.object().nullable().required(t('general:form.required')),
    ...(mode === MODAL_MODE.CREATE
      ? {
          password: passwordSchema(t).required(t('general:form.required')),
        }
      : {}),
    email: Yup.string()
      .required(t('general:form.required'))
      .email(t('general:form.validEmail'))
      .min(
        TEXTFIELD_REQUIRED_LENGTH.EMAIL.MIN,
        t('general:form.minLength', {
          min: TEXTFIELD_REQUIRED_LENGTH.EMAIL.MIN,
        }),
      ),
    phone: phoneSchema(t),
    userRoleSettings: Yup.object()
      .nullable()
      .required(t('general:form.required')),
    // costCenters: Yup.array().min(1, t('general:form.required')),
    dateOfBirth: Yup.date()
      .nullable()
      .max(new Date(), t('general:date.maxToday')),
  })
