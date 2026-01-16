import * as Yup from 'yup'

export const validationSchema = (t) => {
  return Yup.object().shape({
    department: Yup.object().nullable().required(t('general:form.required')),
    role: Yup.object().nullable().required(t('general:form.required')),
  })
}
