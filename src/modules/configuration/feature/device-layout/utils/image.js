export const getImageSize = async (image) => {
  let reader = new FileReader()

  return await new Promise((resolve, reject) => {
    reader.onloadend = () => {
      var img = new Image()
      img.src = reader.result
      img.onload = function () {
        resolve({
          width: img.width,
          height: img.height,
        })
      }
    }
    reader.onerror = reject
    reader.readAsDataURL(image)
  })
}
