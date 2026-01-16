import { api } from '~/services/api'

export const importSectionApi = (params) => {
  const uri = `v1/cost-centers/sections/import`
  const formData = new FormData()
  formData.append('file', params)
  return api.postMultiplePart(uri, formData)
}

export const exportSectionApi = (params) => {
  const uri = `v1/cost-centers/export`
  return api.get(uri, params)
}

export const getSectionTemplateApi = (params) => {
  const uri = `v1/cost-centers/template-import/${params}`
  return api.get(uri)
}

export default {
  importSectionApi,
  exportSectionApi,
  getSectionTemplateApi,
}
