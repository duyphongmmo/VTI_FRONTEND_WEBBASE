import * as Yup from 'yup'

export const validationSchema = (t) =>
  Yup.object().shape({
    code: Yup.string().nullable().required(t('general:form.required')),
    enName: Yup.string().nullable().required(t('general:form.required')),
    vnName: Yup.string().nullable().required(t('general:form.required')),
    description: Yup.string().nullable(),
    // factories: Yup.array()
    //   .nullable()
    //   .min(1, t('general:form.required'))
    //   .required(t('general:form.required')),
    // holon: Yup.string().nullable().required(t('general:form.required')),
  })
