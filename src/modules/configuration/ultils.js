export const getDisplayValue = (value, codeKey = 'code', nameKey = 'name') => {
  if (!value) return

  const code = value[codeKey]
  const name = value[nameKey]

  if (code && name) {
    return `${code} - ${name}`
  }

  return code || name
}
