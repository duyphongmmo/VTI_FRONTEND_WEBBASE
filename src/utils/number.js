import Big from 'big.js'
import BigNumber from 'bignumber.js'
import { isNumber, every, isNil, first, isNaN } from 'lodash'

export const convertNumberWithSISymbol = (num, digits = 2) => {
  if (!num) return 0

  const si = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'B' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ]
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  let i
  for (i = si.length - 1; i > 0; i -= 1) {
    if (num >= si[i].value) {
      break
    }
  }

  return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol
}

export const convertNumberWithThousandSeparator = (num, digits = 2) => {
  const number = Number(num)
  if (isNil(number)) return ''

  const isInteger = Number.isInteger(number)

  let formattedNumber
  if (isInteger) {
    formattedNumber = number.toString()
  } else {
    formattedNumber = BigNumber(number).toFixed(digits).toString()
  }

  formattedNumber = formattedNumber.replace(/\d(?=(\d{3})+(?!\d))/g, '$&,')

  return formattedNumber
}

export const convertToValidNumber = (val) => {
  let unformatNumber = val
  if (typeof val === 'string') {
    unformatNumber = unformatNumber?.replaceAll(',', '')
  }
  if (
    isNil(unformatNumber) ||
    unformatNumber === '' ||
    isNaN(+unformatNumber)
  ) {
    return ''
  } else {
    return +unformatNumber
  }
}

export const minus = (...arr) => {
  const newArr = arr.map((num) => convertToValidNumber(num))
  if (!every(newArr, isNumber || !isNaN)) return ''
  return newArr.reduce((total, cur) =>
    Number(new Big(total).minus(new Big(cur))),
  )
}

export const plus = (...arr) => {
  const newArr = arr.map((num) => convertToValidNumber(num))
  if (!every(newArr, isNumber || !isNaN)) return ''
  return newArr.reduce((total, cur) =>
    Number(new Big(total).plus(new Big(cur))),
  )
}

export const mul = (...arr) => {
  const newArr = arr.map((num) => convertToValidNumber(num))
  if (!every(newArr, isNumber || !isNaN)) return ''
  if (newArr.some((num) => num === 0)) return 0
  return newArr.reduce((total, cur) => Number(new Big(total).mul(new Big(cur))))
}

export const div = (...arr) => {
  const newArr = arr.map((num) => convertToValidNumber(num))
  if (!every(newArr, isNumber || !isNaN)) return ''
  if (first(newArr) === 0) return 0
  if (newArr.some((num) => num === 0)) return ''
  return newArr.reduce((total, cur) => Number(new Big(total).div(new Big(cur))))
}

export function convertWithCommas(num, places = 2) {
  if (isNil(num)) return ''
  return round(num, places)
    .toString()
    .replace(/^[+-]?\d+/, function (int) {
      return int.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
    })
}

export function round(number, places) {
  const multiplier = Math.pow(10, places)
  return Math.round(number * multiplier) / multiplier
}

export function ceil(number, places) {
  const multiplier = Math.pow(10, places)
  return Math.ceil(number * multiplier) / multiplier
}

export const convertNumberThousandComma = (num) => {
  if (isNil(num) || isNaN(num) || num === '') return ''

  return BigNumber(num)
    .toString()
    .replace(/^[+-]?\d+/, function (int) {
      return int.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
    })
}

export const convertIntegerToRoman = (num) => {
  const romanValues = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  }
  let roman = ''
  let number = convertToValidNumber(num)
  for (let key in romanValues) {
    while (number >= romanValues[key]) {
      roman += key
      number -= romanValues[key]
    }
  }
  return roman
}
