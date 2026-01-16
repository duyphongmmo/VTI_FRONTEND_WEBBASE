import { isEmpty } from 'lodash'

export const generateRandomString = (length = 4) => {
  const randomString = Array(length)
    .fill()
    .map(() => String.fromCharCode(Math.floor(Math.random() * 26) + 65))
    .join('')
  return `${randomString}${new Date().getTime()}`
}

export const concatenateString = (arrString = []) => {
  const str = ''
  let newArrString = arrString?.filter((m) => !isEmpty(m)) ?? []
  if (newArrString && newArrString.length > 0) {
    return newArrString.join(' - ')
  }
  return str
}
