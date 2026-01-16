import { api } from '~/services/api'

export const importHolonApi = (params) => {
  const uri = `v1/cost-centers/holons/import`
  const formData = new FormData()
  formData.append('file', params)
  return api.postMultiplePart(uri, formData)
}

export const exportHolonApi = (params) => {
  const uri = `v1/cost-centers/export`
  return api.get(uri, params)
}

export const getHolonTemplateApi = (params) => {
  const uri = `v1/cost-centers/template-import/${params}`
  return api.get(uri)
}

export default {
  importHolonApi,
  exportHolonApi,
  getHolonTemplateApi,
}
