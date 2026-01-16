import { useMemo } from 'react'

import { useTranslation } from 'react-i18next'

import Dialog from '~/components/Dialog'

import PositionForm from '../../form/position'
import { validateSchema } from './schema'

export default function DialogPosition({ open, onCancel, onSubmit, tempData }) {
  const { t } = useTranslation(['mmsx'])
  const initValue = useMemo(() => {
    let user = tempData?.responsibleUser
    if (!user) {
      const checkIsDefaultHolon =
        tempData?.costCenter?.id === tempData?.prCostCenter?.id
      if (tempData?.prResponsibleUser && checkIsDefaultHolon) {
        user = tempData?.prResponsibleUser
      }
    }
    return {
      code: tempData?.code,
      device: tempData?.device,
      responsibleUser: user,
    }
  }, [tempData])
  return (
    <Dialog
      open={open}
      title={t('deviceLayout.positionInformation')}
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
      renderDeps={tempData}
    >
      <PositionForm positionDetail={tempData} />
    </Dialog>
  )
}
