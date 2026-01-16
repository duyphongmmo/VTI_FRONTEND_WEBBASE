export const getRequired = (att, handleGetRequired) => {
  if (handleGetRequired) return true
  if (att.isRequired) return true
  return false
}
