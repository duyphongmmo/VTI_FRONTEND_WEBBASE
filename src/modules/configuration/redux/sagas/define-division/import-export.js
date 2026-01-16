import { api } from '~/services/api'

export const importDivisionApi = (params) => {
  const uri = `v1/cost-centers/divisions/import`
  const formData = new FormData()
  formData.append('file', params)
  return api.postMultiplePart(uri, formData)
}

export const exportDivisionApi = (params) => {
  const uri = `v1/cost-centers/export`
  return api.get(uri, params)
}

export const getDivisionTemplateApi = (params) => {
  const uri = `v1/cost-centers/template-import/${params}`
  return api.get(uri)
}

export default {
  importDivisionApi,
  exportDivisionApi,
  getDivisionTemplateApi,
}
