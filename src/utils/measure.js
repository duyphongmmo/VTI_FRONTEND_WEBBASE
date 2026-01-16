import { isNil, isNumber } from 'lodash'

import { DEFAULT_WEIGHT_UNITS_ID } from '~/modules/database/constants'
import { CM_TO_PIXEL, UNIT_ENUM } from '~/modules/wmsx/constants'

export const convertToCm = (unit, value) => {
  if (isNil(value)) return
  if (unit === UNIT_ENUM.M) {
    return 100 * value
  } else if (unit === UNIT_ENUM.DM) {
    return 10 * value
  } else if (unit === UNIT_ENUM.MM) {
    return value / 10
  } else {
    return value
  }
}

export const convertToKg = (weight, value) => {
  if (isNil(value)) return
  switch (weight) {
    case DEFAULT_WEIGHT_UNITS_ID.g:
      return value / 1000
    case DEFAULT_WEIGHT_UNITS_ID.ton:
      return value * 1000
    default:
      return value
  }
}

export const convertToUnit = (fromUnit, toUnit, value) => {
  const valueInCm = convertToCm(fromUnit, value)
  if (toUnit === UNIT_ENUM.M) {
    return valueInCm / 100
  } else if (toUnit === UNIT_ENUM.DM) {
    return valueInCm / 10
  } else {
    return valueInCm
  }
}

export const convertActualDimensiontoCanvasDimension = (unit, value, ratio) => {
  const valueInCm = convertToCm(unit, value)
  return valueInCm * CM_TO_PIXEL * ratio
}

export const convertCanvasDimensionToActualDimension = (
  unit,
  valueInPixel,
  ratio,
) => {
  return valueInPixel / CM_TO_PIXEL / ratio
}

export const returnStockQuantity = (number) =>
  !isNumber(number) || number < 0 ? 0 : number
