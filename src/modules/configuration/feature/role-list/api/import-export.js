import { api } from '~/services/api'

export const getTemplateRoleListImportApi = () => {
  const uri = `v1/users/static/template-import/6`
  return api.get(uri)
}

export const importRoleListApi = (params) => {
  const uri = `v1/users/user-role-settings/import`
  const formData = new FormData()
  formData.append('file', params)
  return api.postMultiplePart(uri, formData)
}
