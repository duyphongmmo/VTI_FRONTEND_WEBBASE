import { isEmpty } from 'lodash'

import { NOTIFICATION_TYPE } from '~/common/constants'
import addNotification from '~/utils/toast'

import { getHolonByCoordinates, getProductionLineByCoordinates } from './index'
export const validateDesign = (layoutDesign, t, isCheckEmpty = false) => {
  const {
    holonDesign = [],
    productionLineDesign = [],
    positionDesign = [],
  } = layoutDesign

  const errorMessages = []
  if (isCheckEmpty && isEmpty(positionDesign)) {
    // errorMessages.push(t('deviceLayout.validate.noDeviceInLayout'))
  }

  if (isEmpty(errorMessages)) {
    //Check dây chuyền phải thuộc Holon
    const checkPr = productionLineDesign.find((productionLine) => {
      return !productionLine.costCenter?.id
    })
    if (checkPr) {
      errorMessages.push(
        t('deviceLayout.validate.productionLineMustBelongToHolon', {
          productionLine: checkPr.name,
        }),
      )
    }
  }

  //Check vị trí phải thuộc Holon
  if (isEmpty(errorMessages)) {
    const checkPo = positionDesign.find((position) => {
      return !position.costCenter?.id
    })
    if (checkPo) {
      errorMessages.push(
        t('deviceLayout.validate.deviceMustBelongToHolon', {
          device: checkPo.device?.code,
        }),
      )
    }
  }

  //Check dây chuyền phải thuộc holon đã định nghĩa -- PENDING
  // if (isEmpty(errorMessages)) {
  //   const checkPr = productionLineDesign.find((productionLine) => {
  //     if (!productionLine.prDepartment?.id) return false
  //     return (
  //       productionLine.departmentSetting?.id !== productionLine.prDepartment?.id
  //     )
  //   })
  //   if (checkPr) {
  //     errorMessages.push(
  //       t('deviceLayout.validate.productionLineMustBelongTo', {
  //         productionLine: checkPr.name,
  //         holon: checkPr.prDepartment?.name,
  //       }),
  //     )
  //   }
  // }

  //Check vị trí phải thuộc dây chuyền -- PENDING
  if (isEmpty(errorMessages)) {
    const checkPo = positionDesign.find((position) => {
      return !position.productionLine?.id
    })
    if (checkPo) {
      errorMessages.push(
        t('deviceLayout.validate.deviceMustBelongToProductionLine', {
          device: checkPo.device?.code,
        }),
      )
    }
  }

  //check holon không được chồng lên holon khác
  if (isEmpty(errorMessages)) {
    holonDesign.forEach((holon, index) => {
      const { design } = holon
      const { x: x1, y: y1, size: size1 } = design
      const { width: width1, height: height1 } = size1

      const isValidate = holonDesign.every((holon, index2) => {
        if (index === index2) return true
        const { design } = holon
        const { x, y, size } = design
        const { width, height } = size

        const isValidate =
          x1 + width1 <= x ||
          x1 >= x + width ||
          y1 + height1 <= y ||
          y1 >= y + height

        return isValidate
      })

      if (!isValidate) {
        errorMessages.push(
          t('deviceLayout.validate.holonOverlapHolon', {
            holon: holon.design.title,
          }),
        )
      }
    })
  }

  //check dây chuyền không được chồng lên dây chuyền khác
  if (isEmpty(errorMessages)) {
    productionLineDesign.forEach((ps, index) => {
      const { design } = ps
      const { x: x1, y: y1, size: size1 } = design
      const { width: width1, height: height1 } = size1

      const isValidate = productionLineDesign.every(
        (productionLine, index2) => {
          if (index === index2) return true
          const { design } = productionLine
          const { x, y, size } = design
          const { width, height } = size

          const isValidate =
            x1 + width1 <= x ||
            x1 >= x + width ||
            y1 + height1 <= y ||
            y1 >= y + height

          return isValidate
        },
      )

      if (!isValidate) {
        errorMessages.push(
          t('deviceLayout.validate.productionLineOverlapProductionLine', {
            productionLine: ps.design.title,
          }),
        )
      }
    })
  }

  //check vị trí không được chồng lên vị trí khác
  if (isEmpty(errorMessages)) {
    positionDesign.forEach((po, index) => {
      const { design } = po
      const { x: x1, y: y1, size: size1 } = design
      const { width: width1, height: height1 } = size1

      const isValidate = positionDesign.every((productionLine, index2) => {
        if (index === index2) return true
        const { design } = productionLine
        const { x, y, size } = design
        const { width, height } = size

        const isValidate =
          x1 + width1 <= x ||
          x1 >= x + width ||
          y1 + height1 <= y ||
          y1 >= y + height

        return isValidate
      })

      if (!isValidate) {
        errorMessages.push(
          t('deviceLayout.validate.positionOverlapPosition', {
            position: po.design.title,
          }),
        )
      }
    })
  }

  if (!isEmpty(errorMessages)) {
    addNotification(errorMessages[0], NOTIFICATION_TYPE.WARNING, _, 2000)
  }

  return isEmpty(errorMessages)
}

export const validatePositionCode = (positionDesign, code, id, t) => {
  const checkExist = positionDesign.find((position) => {
    return position.code === code && position.id !== id
  })
  if (checkExist) {
    addNotification(
      t('deviceLayout.validate.positionCodeExist', {
        position: code,
      }),
      NOTIFICATION_TYPE.WARNING,
      _,
      2000,
    )
  }
  return !checkExist
}

export const validateDropProductionLine = (holonDesign, productionLine, t) => {
  const prName = productionLine?.name
  const costCenterId = productionLine?.costCenter?.id
  const costCenterName = productionLine?.costCenter?.code

  let isValid = true

  const checkHolon = getHolonByCoordinates(
    holonDesign,
    productionLine?.x,
    productionLine?.y,
  )

  if (!checkHolon) {
    addNotification(
      t('deviceLayout.validate.productionLineMustBelongToHolon', {
        productionLine: prName,
      }),
      NOTIFICATION_TYPE.WARNING,
      _,
      2000,
    )
    isValid = false
  } else {
    if (checkHolon?.costCenter?.id !== costCenterId && !!costCenterId) {
      addNotification(
        t('deviceLayout.validate.productionLineMustBelongTo', {
          holon: costCenterName,
          productionLine: prName,
        }),
        NOTIFICATION_TYPE.WARNING,
        _,
        2000,
        {
          id: '1',
        },
      )
      isValid = false
    }
  }
  return isValid
}

export const validateDropPosition = (design, position, t) => {
  const checkHolon = getHolonByCoordinates(
    design?.holonDesign,
    position?.x,
    position?.y,
  )
  if (!checkHolon) {
    addNotification(
      t('deviceLayout.validate.productionLineMustBelongToHolon', {
        productionLine: position.name,
      }),
      NOTIFICATION_TYPE.WARNING,
      _,
      2000,
    )
  }

  const checkPr = getProductionLineByCoordinates(
    design?.productionLineDesign,
    position?.x,
    position?.y,
  )
  if (!checkPr) {
    addNotification(
      t('deviceLayout.validate.deviceMustBelongToProductionLine', {
        device: position.code,
      }),
      NOTIFICATION_TYPE.WARNING,
      _,
      2000,
    )
  }

  return {
    holon: checkHolon,
    productionLine: checkPr,
    isValid: !!checkHolon,
  }
}
