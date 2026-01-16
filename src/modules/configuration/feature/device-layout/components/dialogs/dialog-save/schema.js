/* eslint-disable babel/no-invalid-this */
import * as Yup from 'yup'

export const validateSchema = (t) => {
  return Yup.object().shape({
    positionDesign: Yup.array().of(
      Yup.object().shape({
        responsibleUser: Yup.object()
          .nullable()
          .required(t('general:form.required')),
        // code: Yup.string()
        //   .nullable()
        //   .required(t('general:form.required'))
        //   .test('check is exist', _, function (value) {
        //     const { path, createError, from } = this
        //     const index = from[1].value?.positionDesign?.findIndex(
        //       (item) => item.code === value && item.id !== this.parent.id,
        //     )
        //     if (index !== -1) {
        //       return createError({
        //         path,
        //         message: t('mmsx:deviceLayout.validate.positionExist'),
        //       })
        //     }
        //     return true
        //   }),
      }),
    ),
  })
}
