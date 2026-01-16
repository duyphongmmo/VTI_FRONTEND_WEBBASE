/* eslint-disable no-param-reassign */
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import {
  format,
  differenceInDays,
  setHours,
  setMinutes,
  setSeconds,
  setMilliseconds,
  parse,
  isValid,
  formatISO,
} from 'date-fns'
import { enUS, ja, vi } from 'date-fns/locale'

import {
  DATE_TIME_FORMAT_BY_LANG,
  DEFAULT_LANG,
  DATE_FORMAT_BY_LANG,
  LANG_OPTIONS,
} from '~/common/constants'

import i18n from './i18n'

export const lang = i18n.language || DEFAULT_LANG

export const getLocale = () => {
  switch (lang) {
    case LANG_OPTIONS.JP:
      return ja
    case LANG_OPTIONS.VI:
      return vi
    case LANG_OPTIONS.EN:
    default:
      return enUS
  }
}

export const getLocaleFormat = () => {
  switch (lang) {
    case LANG_OPTIONS.JP:
      return { locale: ja, format: 'yyyy/MM/dd' }
    case LANG_OPTIONS.VI:
      return { locale: vi, format: 'dd/MM/yyyy' }
    case LANG_OPTIONS.EN:
    default:
      return { locale: enUS, format: 'MM/dd/yyyy' }
  }
}
/**
 * Convert date (string or Date) into string with input format
 * @param {Date|String} dateTime
 * @param {String} formatPattern
 * @return {String}
 */

export const convertUtcDateTimeToLocalTz = (dateTime, formatPattern) => {
  const currFormat = formatPattern || DATE_TIME_FORMAT_BY_LANG[lang]
  return dateTime && !isNaN(new Date(dateTime))
    ? format(new Date(dateTime), currFormat, { locale: getLocale() })
    : ''
}

export const convertUtcDateToLocalTz = (date, formatPattern) => {
  const currFormat = formatPattern || DATE_FORMAT_BY_LANG[lang]
  return date ? format(new Date(date), currFormat, { locale: getLocale() }) : ''
}

export const convertToStartOfDay = (dateString) => {
  const date = new Date(dateString)
  // Đặt thời gian thành 00:00:00.000
  const startOfDayDate = setMilliseconds(
    setSeconds(setMinutes(setHours(date, 0), 0), 0),
    0,
  )

  return startOfDayDate.toISOString()
}

export const getDaysByLang = () => {
  switch (lang) {
    case LANG_OPTIONS.JP:
      return ['月曜', '火曜', '水曜', '木曜', '金曜', '土曜', '日曜']
    case LANG_OPTIONS.VI:
      return ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']
    case LANG_OPTIONS.EN:
    default:
      return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  }
}

export class DateFns extends AdapterDateFns {
  getWeekdays = () =>
    getDaysByLang().map((day) => ({
      charAt: () => day,
    }))
}

export const addHours = (numOfHours, date) => {
  date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000)

  return date
}

export const isSameDate = (startDate, endDate) => {
  return differenceInDays(startDate, endDate) === 0
}

export function convertSeconds(seconds) {
  const day = Math.floor(seconds / (24 * 3600))
  seconds = seconds % (24 * 3600)
  const hour = Math.floor(seconds / 3600)
  seconds = seconds % 3600
  const minute = Math.floor(seconds / 60)
  seconds = seconds % 60

  return {
    day: day,
    hour: hour,
    minute: minute,
    second: seconds,
  }
}

export function getQuarter(date) {
  return Math.floor(date.getMonth() / 3) + 1
}

export function isIsoDate(str) {
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false
  const d = new Date(str)
  return d instanceof Date && !isNaN(d.getTime()) && d.toISOString() === str // valid date
}

/**
 * Chuyển từ "dd/MM/yyyy" sang ISO 8601.
 * @param {string} dateStr - Ngày định dạng "dd/MM/yyyy".
 * @returns {string | null} Ngày ISO 8601 hoặc null nếu không hợp lệ.
 */
export function convertToISO(dateStr) {
  if (!dateStr || typeof dateStr !== 'string') return null
  const parsedDate = parse(dateStr, 'dd/MM/yyyy', new Date())
  if (!isValid(parsedDate)) return null // Kiểm tra xem ngày hợp lệ không
  return formatISO(parsedDate)
}

export const yesterday = () => {
  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)
  return yesterday
}
