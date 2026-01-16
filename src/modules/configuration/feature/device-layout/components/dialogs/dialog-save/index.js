import { useMemo } from 'react'

import { useTranslation } from 'react-i18next'

import Dialog from '~/components/Dialog'

import SaveLayoutForm from '../../form/save-layout'
import { validateSchema } from './schema'

export default function DialogSaveLayout({
  open,
  onCancel,
  onSubmit,
  initialValues,
}) {
  const { t } = useTranslation(['mmsx'])
  const initValue = useMemo(() => {
    const value = {
      positionDesign: initialValues?.positionDesign?.map((item) => {
        let user = item.responsibleUser ?? null
        if (!item.responsibleUser) {
          const checkIsDefaultHolon =
            item.costCenter?.id === item.prCostCenter?.id
          if (item.prResponsibleUser && checkIsDefaultHolon) {
            user = item.prResponsibleUser
          }
        }

        return {
          id: item.id,
          name: item.name,
          code: item.code,
          design: item.design,
          device: item.device,
          productionLine: item.productionLine,
          responsibleUser: user,
          costCenter: item.costCenter,
        }
      }),
    }
    return {
      plant: initialValues?.plant,
      floor: initialValues?.floor,
      ...value,
    }
  }, [initialValues])
  return (
    <Dialog
      open={open}
      title={t('deviceLayout.saveInformationDevice')}
      onCancel={onCancel}
      cancelLabel={t('general:common.cancel')}
      submitLabel={t('general:common.save')}
      noBorderBottom
      formikProps={{
        initialValues: initValue,
        validationSchema: validateSchema(t),
        onSubmit: onSubmit,
        enableReinitialize: true,
      }}
      renderDeps={initialValues}
      maxWidth={'xl'}
    >
      <SaveLayoutForm />
    </Dialog>
  )
}
