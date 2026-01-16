import { api } from "~/services/api"

export const getTemplateImport = (params) => {
  const uri = `v1/users/static/template-import/${params}`
  return api.get(uri)
}
