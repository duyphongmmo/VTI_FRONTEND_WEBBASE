import { get, isNumber, uniq } from 'lodash'

import { api } from '~/services/api'

const SUCCESS_STATUSES = [200, 201, 400]

export const validateStatus = (status) => {
  return SUCCESS_STATUSES.includes(status)
}

export const getFileNameFromHeader = (response) => {
  let filename = ''
  const contentDisposition = response?.header['content-disposition']
  if (contentDisposition && contentDisposition.indexOf('attachment') !== -1) {
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
    const matches = filenameRegex.exec(contentDisposition)
    if (matches != null && matches[1]) {
      filename = matches[1].replace(/['"]/g, '')
    }
  }

  return filename
}

export const genCodeApi = (dataSource) => {
  const uri = `${dataSource.prefixEndPointService}/${dataSource.name}/generate-code`
  return api.get(uri)
}

export const getUserInfo = (hook) => {
  const {
    data: { userInfo },
  } = hook

  return userInfo
}

const userKey = [
  'owner.id',
  'createdBy.id',
  'createdBy',
  'createdUser.id',
  'pic.id',
  'buyerPIC.id',
]

export const configMailPayload = ({
  data,
  userInfo,
  url,
  subject,
  isSend = false,
}) => {
  if (!isSend) return

  let receiverIds = []
  for (const key of userKey) {
    const userId = get(data, key)
    if (typeof userId === 'string' || isNumber(userId)) {
      receiverIds.push(userId)
    }
  }
  if (userInfo) {
    receiverIds.push(userInfo?.id)
  }

  const payload = {
    configMail: {
      receiverIds: uniq(receiverIds),
      url,
      subject,
      userInfo,
    },
  }
  return payload
}
