export const getDisabled = (att, isUpdate, handleGetDisabled) => {
  if (att.disabled) return true

  if (isUpdate && !att.canUpdate) return true

  if (handleGetDisabled) return true

  return false
}
