import { isArray } from 'lodash'

import { MAX_STAGE_SIZE } from '../constants'

const mapHolonCostCenter = (costCenter) => {
  return {
    ...costCenter,
    holon: costCenter?.holon?.code,
  }
}

export const getInitDesign = (design, scale = 1) => {
  const {
    costCenterDesigns = [],
    productionLineDesigns = [],
    positionDesigns = [],
    doorDesigns = [],
  } = design

  return {
    holonDesign: costCenterDesigns?.map((item, index) => {
      return {
        ...item,
        uid: item.costCenter?.id + '-' + index,
        id: item.costCenter?.id,
        name: item.costCenter?.name,
        code: item.costCenter?.code,
        holon: item.costCenter?.holon?.code ?? item?.holon?.code,
        costCenter: mapHolonCostCenter(item.costCenter),
        design: {
          title: item.design?.title ?? item.costCenter?.holon?.code,
          x: item.design?.pointX * scale,
          y: item.design?.pointY * scale,
          size: {
            width: item.design?.sizeWidth * scale,
            height: item.design?.sizeHeight * scale,
          },
        },
      }
    }),
    productionLineDesign: productionLineDesigns.map((item) => {
      return {
        ...item,
        id: item.productionLine?.id,
        name: item.productionLine?.name,
        code: item.productionLine?.code,
        prCostCenter: mapHolonCostCenter(item.costCenter),
        costCenter: mapHolonCostCenter(item.costCenter),
        design: {
          title: item.design?.title ?? item?.productionLine?.name,
          x: item.design?.pointX * scale,
          y: item.design?.pointY * scale,
          size: {
            width: item.design?.sizeWidth * scale,
            height: item.design?.sizeHeight * scale,
          },
        },
      }
    }),
    positionDesign: positionDesigns?.map((item) => {
      return {
        ...item,
        id: item.device?.id,
        costCenter: mapHolonCostCenter(item.costCenter),
        prCostCenter: mapHolonCostCenter(item.costCenter),
        prResponsibleUser: item?.responsibleUser,
        productionLine: item.productionLine,
        design: {
          title: item.design?.title ?? item?.code,
          x: item.design?.pointX * scale,
          y: item.design?.pointY * scale,
          size: {
            width: item.design?.sizeWidth * scale,
            height: item.design?.sizeHeight * scale,
          },
          color: item?.color?.color,
        },
      }
    }),
    doorDesign: doorDesigns?.map((item) => {
      return {
        ...item,
        design: {
          title: item.design?.title,
          x: item.design?.pointX * scale,
          y: item.design?.pointY * scale,
          size: {
            width: item.design?.sizeWidth * scale,
            height: item.design?.sizeHeight * scale,
          },
          color: item.design?.color,
        },
      }
    }),
    file: isArray(design?.file) ? design?.file?.[0] : design?.file,
    background: design?.background ?? {
      width: MAX_STAGE_SIZE.width,
      height: MAX_STAGE_SIZE.height,
    },
  }
}

export const getDataDropTransfer = (event) => {
  if (!event.dataTransfer) {
    return null
  }
  let id = event.dataTransfer.getData('id') ?? null
  if (id != null) {
    id = isNaN(id) ? id : Number(id)
  }

  const name = event.dataTransfer.getData('name') ?? null
  const code = event.dataTransfer.getData('code') ?? null
  const type = event.dataTransfer.getData('type') ?? null
  const action = event.dataTransfer.getData('action') ?? null
  const device = JSON.parse(
    event.dataTransfer.getData('device') === ''
      ? null
      : event.dataTransfer.getData('device'),
  )

  const productionLine = JSON.parse(
    event.dataTransfer.getData('productionLine') === ''
      ? null
      : event.dataTransfer.getData('productionLine'),
  )
  const holon = event.dataTransfer.getData('holon')

  const position = JSON.parse(
    event.dataTransfer.getData('position') === ''
      ? null
      : event.dataTransfer.getData('position'),
  )
  const costCenter = JSON.parse(
    event.dataTransfer.getData('costCenter') === ''
      ? null
      : event.dataTransfer.getData('costCenter'),
  )
  const data = {
    id,
    name,
    type,
    action,
    device,
    productionLine,
    holon,
    position,
    code,
    costCenter,
  }
  return data
}

export const getHolonByCoordinates = (holonDesign, x, y) => {
  const holon = holonDesign.find((item) => {
    const { design } = item
    const { x: x1, y: y1, size } = design
    const { width, height } = size
    const isValidate = x1 <= x && x1 + width >= x && y1 <= y && y1 + height >= y
    return isValidate
  })

  return holon
}

export const getProductionLineByCoordinates = (productionLineDesign, x, y) => {
  const productionLine = productionLineDesign.find((item) => {
    const { design } = item
    const { x: x1, y: y1, size } = design
    const { width, height } = size

    const isValidate = x1 <= x && x1 + width >= x && y1 <= y && y1 + height >= y

    return isValidate
  })

  return productionLine
}

export const getPositionByCoordinates = (positionDesign, x, y) => {
  const position = positionDesign.find((item) => {
    const { design } = item
    const { x: x1, y: y1, size } = design
    const { width, height } = size

    const isValidate = x1 <= x && x1 + width >= x && y1 <= y && y1 + height >= y

    return isValidate
  })

  return position
}

export const getHolonWithProductionLineByCoordinates = (
  holonDesign,
  design,
) => {
  const { x, y, size } = design
  const x1 = x
  const y1 = y
  const x2 = x + size.width
  const y2 = y + size.height

  const coordinates = [
    { x: x1, y: y1 },
    { x: x2, y: y1 },
    { x: x1, y: y2 },
    { x: x2, y: y2 },
  ]

  let isValidate = true
  const holonList = []
  coordinates.forEach((coordinate) => {
    const { x, y } = coordinate
    const holon = getHolonByCoordinates(holonDesign, x, y)

    if (holon) {
      holonList.push(holon)
    }
  })
  if (holonList.length !== 4) {
    return null
  }

  isValidate = holonList.every((item, index) => {
    if (index === 0) return true
    return item.id === holonList[0].id
  })

  if (!isValidate) {
    return null
  } else {
    return holonList[0]
  }
}

export const getHolonWithPositionByCoordinates = (holonDesign, design) => {
  const { x, y, size } = design
  const x1 = x
  const y1 = y
  const x2 = x + size.width
  const y2 = y + size.height

  const coordinates = [
    { x: x1, y: y1 },
    { x: x2, y: y1 },
    { x: x1, y: y2 },
    { x: x2, y: y2 },
  ]

  let isValidate = true
  const holonList = []
  coordinates.forEach((coordinate) => {
    const { x, y } = coordinate
    const holon = getHolonByCoordinates(holonDesign, x, y)
    if (holon) {
      holonList.push(holon)
    }
  })

  if (holonList.length !== 4) {
    return null
  }

  isValidate = holonList.every((item, index) => {
    if (index === 0) return true
    return item.id === holonList[0].id
  })

  if (!isValidate) {
    return null
  }

  return holonList[0]
}

export const getProductionLineWithPositionByCoordinates = (
  productionLineDesign,
  design,
) => {
  const { x, y, size } = design
  const x1 = x
  const y1 = y
  const x2 = x + size.width
  const y2 = y + size.height

  const coordinates = [
    { x: x1, y: y1 },
    { x: x2, y: y1 },
    { x: x1, y: y2 },
    { x: x2, y: y2 },
  ]

  let isValidate = true
  const productionLineList = []

  coordinates.forEach((coordinate) => {
    const { x, y } = coordinate
    const productionLine = getProductionLineByCoordinates(
      productionLineDesign,
      x,
      y,
    )
    if (productionLine) {
      productionLineList.push(productionLine)
    }
  })

  if (productionLineList.length !== 4) {
    return null
  }

  isValidate = productionLineList.every((item, index) => {
    if (index === 0) return true
    return item.id === productionLineList[0].id
  })

  if (!isValidate) {
    return null
  }

  return productionLineList[0]
}
