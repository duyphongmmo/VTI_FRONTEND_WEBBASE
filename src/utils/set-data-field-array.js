export const setDataFieldArray = (setValue, name, newData) => {
    if (Array.isArray(newData)) {
      setValue(
        name,
        // eslint-disable-next-line no-unused-vars
        Array.from({ length: newData.length }).map((_) => ({})),
      )
      newData.forEach((item, index) => {
        for (const key in item) {
          setValue(`${name}[${index}].${key}`, item[key])
        }
      })
    } else {
      for (const key in newData) {
        if (Object.prototype.hasOwnProperty.call(newData, key)) {
          setValue(`${name}.${key}`, newData[key])
        }
      }
    }
  }