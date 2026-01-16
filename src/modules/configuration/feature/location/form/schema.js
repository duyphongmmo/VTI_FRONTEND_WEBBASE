import * as Yup from 'yup'

export const validationSchema = (t) =>
  Yup.object().shape({
    code: Yup.string().nullable().required(t('general:form.required')),
    name: Yup.string()
      .nullable()
      .required(t('general:form.required'))
      .min(2, t('general:form.minLength', { min: 2 })),
  })
