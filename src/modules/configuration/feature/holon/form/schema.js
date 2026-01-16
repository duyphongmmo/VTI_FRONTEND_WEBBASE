import * as Yup from 'yup'

export const formSchema = (t) => {
  return Yup.object().shape({
    code: Yup.string().test(_, (value, context) => {
      const HOLON_REGEX = /^[A-Z]{1}[0-9]{2}$/g
      if (value && !HOLON_REGEX.test(value)) {
        return context.createError({
          path: `${context.path}`,
          message: t('defineCostCenter.validateHolon'),
        })
      }
      if (!value) {
        return context.createError({
          path: `${context.path}`,
          message: t('general:form.required'),
        })
      }
      return true
    }),
    name: Yup.string(),
    description: Yup.string(),
  })
}
