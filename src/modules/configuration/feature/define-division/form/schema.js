import * as Yup from 'yup'

export const defineDivisionSchema = (t) => {
  return Yup.object().shape({
    code: Yup.string().required(t('general:form.required')),
    eName: Yup.string().required(t('general:form.required')),
    vName: Yup.string().required(t('general:form.required')),
    department: Yup.object().nullable().required(t('general:form.required')),
  })
}
