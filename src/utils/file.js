import { FILE_TYPE, IMG_FILE_TYPE } from '~/common/constants'

export const formatFileSize = (bytes, decimals = 2) => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  if (bytes === 0) return `${bytes} ${units[0]}`

  const factor = 1024

  // calculate index in units array
  const i = Math.floor(Math.log(bytes) / Math.log(factor))

  return (
    parseFloat((bytes / Math.pow(factor, i)).toFixed(decimals)) + ' ' + units[i]
  )
}

/**
 * Download a file using blob
 * @param {BlobPart} buffer binary data from server
 * @param {string} fileName name of the file to be saved
 * @param {string} mimeType mime type of the blob
 * @param {[string]} accept array of accepted file extensions
 */
export const downloadFile = async (buffer, fileName, mimeType, accept) => {
  const blob = new Blob([buffer], {
    type: mimeType,
  })
  // const showSaveFilePicker = window.showSaveFilePicker

  // // window.showSaveFilePicker supports Chrome, Opera, Edge only
  // if (showSaveFilePicker) {
  //   // set accepted file extensions by mime type in Save as dialog
  //   const acceptFileType = {
  //     [mimeType]: accept,
  //   }

  //   const handle = await showSaveFilePicker({
  //     suggestedName: `${fileName}`,
  //     types: [
  //       {
  //         accept: acceptFileType,
  //       },
  //     ],
  //   })
  //   // handle.name = 'abc.xlsx'
  //   const writable = await handle.createWritable()
  //   await writable.write(blob)
  //   writable.close()
  //   return
  // } else {
  // Create a link pointing to the ObjectURL containing the blob
  const blobURL = window.URL.createObjectURL(blob)
  const tempLink = document.createElement('a')
  tempLink.style.display = 'none'
  tempLink.href = blobURL
  tempLink.setAttribute('download', `${fileName}${accept}`)
  // Safari thinks _blank anchor are pop ups. We only want to set _blank
  // target if the browser does not support the HTML5 download attribute.
  // This allows you to download files in desktop safari if pop up blocking
  // is enabled.
  if (typeof tempLink.download === 'undefined') {
    tempLink.setAttribute('target', '_blank')
  }

  document.body.appendChild(tempLink)
  tempLink.click()
  document.body.removeChild(tempLink)

  setTimeout(() => {
    // For Firefox it is necessary to delay revoking the ObjectURL
    window.URL.revokeObjectURL(blobURL)
  }, 100)
  // }
}

export const isValidFileType = (fileName, validType) => {
  const fileExt = fileName.split('.').pop()

  return `.${fileExt.toLowerCase()}` === validType.toLowerCase()
}

export const isImageFile = (file) => {
  const fileType = file?.type
  const imageTypes = IMG_FILE_TYPE.map((file) => file.MIME_TYPE)
  return imageTypes.includes(fileType)
}

/**
 * Convert raw int array in json response to JS Uint8Array
 * @param rawArr
 * @param fileName
 * @return {Promise<void>}
 */
export const downloadInt8Arr = async (
  rawArr,
  fileName,
  fileType = FILE_TYPE.XLSX,
) => {
  const uint8Arr = new Uint8Array(rawArr)

  await downloadFile(uint8Arr, fileName, fileType.MIME_TYPE, fileType.EXT)
}

export const downloadFileFromUrl = async (fileUrl, fileName) => {
  const res = await fetch(fileUrl, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
  const blob = await res.blob()
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.style.display = 'none'
  a.href = url
  a.download = fileName
  document.body.appendChild(a)
  a.click()
  window.URL.revokeObjectURL(url)
  document.body.removeChild(a)
}
