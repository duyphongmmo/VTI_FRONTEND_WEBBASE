export const formatNumberReport = (value) => {
  if (value == null) return 0

  if (value >= 1_000_000_000) {
    return (value / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B'
  }
  if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'
  }
  if (value >= 1_000) {
    return (value / 1_000).toFixed(1).replace(/\.0$/, '') + 'k'
  }
  return value.toLocaleString()
}

export function formatNumber(value, locale = 'en-US') {
  if (value === null || value === undefined || value === '') return null

  const numberValue = typeof value === 'number' ? value : Number(value)
  if (isNaN(numberValue)) return ''

  return new Intl.NumberFormat(locale).format(numberValue)
}
