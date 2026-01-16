import { api } from '~/services/api'

export const exportEmailNotificationApi = (params) => {
  const uri = `v1/produces/export`
  return api.get(uri, params)
}

export const importEmailNotificationApi = (params) => {
  const uri = `v1//users/email-notifications/import`
  const formData = new FormData()
  formData.append('file', params)
  return api.postMultiplePart(uri, formData)
}

export const getEmailNotificationTemplateApi = (params) => {
  const uri = `v1/users/static/template-import/${params}`
  return api.get(uri)
}

export default {
  exportEmailNotificationApi,
  importEmailNotificationApi,
  getEmailNotificationTemplateApi,
}
