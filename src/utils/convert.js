import { get, isNil } from 'lodash'

export const CHECKBOX_ENUM = {
  UNCHECK: 0,
  CHECKED: 1,
}

export const convertCheckboxValueToEnum = (bool) => {
  return bool ? CHECKBOX_ENUM.CHECKED : CHECKBOX_ENUM.UNCHECK
}

export const convertCheckboxValueToBoolean = (value) => {
  return value === CHECKBOX_ENUM.CHECKED ? true : false
}

export const convertAttributeToObject = (
  arr = [],
  key = 'attribute.code',
  value = 'attribute.value',
) => {
  const object = {}
  arr.every((attr) => {
    if (isNil(get(attr, key))) return false
    object[get(attr, key)] = get(attr, value)
    return true
  })
  return object
}

export const groupByMultipleKeys = (items = [], keys) => {
  return _.mapValues(
    _.groupBy(items, (item) => keys.map((key) => _.get(item, key)).join('|')),
    (groupedItems) => groupedItems.map((item) => _.omit(item, keys)),
  )
}

export const toSlug = (str = '') => {
  // Convert to lower case
  var newStr = str
  newStr = newStr.toLowerCase()

  // Delete unicode
  newStr = newStr
    .normalize('NFD') // convert to Unicode
    .replace(/[\u0300-\u036f]/g, '') // delete Unicode

  // Replace special characters
  newStr = newStr.replace(/[đĐ]/g, 'd')

  // Delete special characters
  newStr = newStr.replace(/([^0-9a-z-\s])/g, '')

  // Delete space and replace by -
  newStr = newStr.replace(/(\s+)/g, '-')

  // Delete - duplicate
  newStr = newStr.replace(/-+/g, '-')

  // Delete - at the beginning and end of the string
  newStr = newStr.replace(/^-+|-+$/g, '')

  // return
  return newStr
}
