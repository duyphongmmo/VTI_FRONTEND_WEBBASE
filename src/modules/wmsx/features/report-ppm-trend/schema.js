import * as Yup from 'yup'

export const formSchema = (t) =>
  Yup.object().shape({
    time: Yup.array()
      .nullable()
      .required(
        t('reportPPMTrend.validation.timeRequired') || 'Time range is required',
      )
  })
