export function addFieldHeader(FIELD_HEADER, attr) {
  FIELD_HEADER.push({ id: attr?.attribute?.id, code: attr?.attribute?.code })
}

export function addAttributeHeader(
  attributeHeaders,
  attr,
  override = {},
  ruleOverride = {},
) {
  attributeHeaders.push({
    ...attr,
    attribute: {
      ...attr?.attribute,
      ...override,
    },
    attributeRule: {
      ...attr?.attributeRule,
      ...ruleOverride,
    },
  })
}

export function addAttributeGroup(
  attributeGroups,
  attr,
  override = {},
  ruleOverride = {},
) {
  attributeGroups.push({
    ...attr,
    attribute: {
      ...attr?.attribute,
      ...override,
    },
    attributeRule: {
      ...attr?.attributeRule,
      ...ruleOverride,
    },
  })
}

export function getAttributeValue(payload, code, fallback) {
  return (
    payload?.attributeHeaders?.find((e) => e?.attribute?.code === code)
      ?.attribute?.value ??
    fallback?.attributeHeaders?.find((e) => e?.attribute?.code === code)
      ?.attribute?.value
  )
}
