import * as Yup from 'yup'

export const validateSchema = (t) => {
  return Yup.object().shape({
    // code: Yup.string().nullable().required(t('general:form.required')),
    responsibleUser: Yup.object()
      .nullable()
      .required(t('general:form.required')),
  })
}
