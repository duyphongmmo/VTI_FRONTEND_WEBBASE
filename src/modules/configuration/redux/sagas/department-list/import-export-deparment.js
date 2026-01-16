import { api } from '~/services/api'

export const importDepartmentApi = (params) => {
  const uri = `v1/users/department-settings/import`
  const formData = new FormData()
  formData.append('file', params)
  return api.postMultiplePart(uri, formData)
}

export const exportDepartmentApi = (params) => {
  const uri = `v1/users/export`
  return api.get(uri, params)
}

export const getDepartmentTemplateApi = (params) => {
  const uri = `v1/users/static/template-import/${params}`
  return api.get(uri)
}

export default {
  importDepartmentApi,
  exportDepartmentApi,
  getDepartmentTemplateApi,
}
