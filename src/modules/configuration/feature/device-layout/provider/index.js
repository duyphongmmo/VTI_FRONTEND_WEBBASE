import React, { createContext, useState, useMemo, useEffect } from 'react'

import { isString } from 'lodash'
import { useTranslation } from 'react-i18next'

import { LAYOUT_MODE, MAX_STAGE_SIZE } from '../constants'
import {
  getHolonWithProductionLineByCoordinates,
  getProductionLineWithPositionByCoordinates,
} from '../utils'
import { validateDesign } from '../utils/validation'

export const DeviceLayoutContext = createContext({})

const DeviceProvider = ({ children, defaultMode = LAYOUT_MODE.VIEW }) => {
  const [holonDesign, setHolonDesign] = useState([])
  const [productionLineDesign, setProductionLineDesign] = useState([])
  const [positionDesign, setPositionDesign] = useState([])
  const [doorDesign, setDoorDesign] = useState([])
  const [focusing, setFocusing] = useState(null)
  const [visibleSidebar, setVisibleSidebar] = useState(false)
  const { t } = useTranslation('mmsx')
  const [mode, setMode] = useState(defaultMode)
  const [backgroundImage, setBackgroundImage] = useState(null)
  const [zoom, setZoom] = useState(1)

  const [diagramSize, setDiagramSize] = useState({
    width: MAX_STAGE_SIZE.width,
    height: MAX_STAGE_SIZE.height,
    defaultWidth: MAX_STAGE_SIZE.width,
    defaultHeight: MAX_STAGE_SIZE.height,

    imageWidth: null,
    imageHeight: null,
  })

  const [imagePreview, setImagePreview] = useState(null)

  const deviceLayoutDesign = {
    holonDesign,
    productionLineDesign,
    positionDesign,
    doorDesign,
  }
  const isView = useMemo(() => mode === LAYOUT_MODE.VIEW, [mode])
  const isEdit = useMemo(() => mode === LAYOUT_MODE.EDIT, [mode])
  const isDashBoard = useMemo(() => mode === LAYOUT_MODE.DASHBOARD, [mode])
  const getHolonDesign = (designList) => {
    return designList.map((item, ind) => {
      return {
        uid: item.costCenter?.id + '-' + ind,
        id: item.id,
        name: item.name,
        code: item.code,
        design: item.design,
        costCenter: item.costCenter,
      }
    })
  }

  const getProductionLineDesign = (designList) => {
    const holon = getHolonDesign(holonDesign)
    return designList.map((item) => {
      return {
        id: item.id,
        name: item.name,
        code: item.code,
        design: item.design,
        costCenter: getHolonWithProductionLineByCoordinates(holon, item.design)
          ?.costCenter,
      }
    })
  }

  const getPositionDesign = (designList) => {
    const productionLine = getProductionLineDesign(productionLineDesign)

    return designList.map((item) => {
      const pl = getProductionLineWithPositionByCoordinates(
        productionLine,
        item.design,
      )
      return {
        id: item.id,
        name: item.name,
        code: item.code,
        design: item.design,
        device: item.device,
        productionLine: pl,
        costCenter: pl?.costCenter,
        responsibleUser: item.responsibleUser,
      }
    })
  }

  const mappingValue = useMemo(() => {
    const holon = getHolonDesign(holonDesign)

    const productionLine = productionLineDesign.map((item) => {
      return {
        id: item.id,
        name: item.name,
        code: item.code,
        design: item.design,
        prCostCenter: item.prCostCenter, // default department
        x: item.design.x,
        y: item.design.y,
        costCenter: getHolonWithProductionLineByCoordinates(holon, item.design)
          ?.costCenter,
      }
    })

    const position = positionDesign.map((item) => {
      const pl = getProductionLineWithPositionByCoordinates(
        productionLine,
        item.design,
      )
      const dp = getHolonWithProductionLineByCoordinates(
        holon,
        item.design,
      )?.costCenter
      return {
        id: item.id,
        name: item.name,
        code: item.code,
        design: item.design,
        device: item.device,
        productionLine: pl,
        costCenter: dp,
        prCostCenter: item?.prCostCenter,
        responsibleUser: item.responsibleUser,
        prResponsibleUser: item.prResponsibleUser,
      }
    })

    const door = doorDesign.map((item) => {
      return {
        id: item.id,
        name: item.name,
        code: item.code,
        design: item.design,
      }
    })
    return {
      holonDesign: holon,
      productionLineDesign: productionLine,
      positionDesign: position,
      doorDesign: door,
    }
  }, [holonDesign, productionLineDesign, positionDesign, doorDesign])

  useEffect(() => {
    if (mode === LAYOUT_MODE.VIEW || mode === LAYOUT_MODE.DASHBOARD) return
    validateDesign(mappingValue, t)
  }, [mappingValue, t, validateDesign, mode])

  const fetchBackgroundImage = async (url) => {
    try {
      const image = await fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      const imageBlob = await image.blob()

      //get size of image
      // var img = new Image()
      // img.src = URL.createObjectURL(imageBlob)
      // img.onload = function () {
      //   setDiagramSize((prev) => ({
      //     ...prev,
      //     imageWidth: img.width,
      //     imageHeight: img.height,
      //   }))
      // }

      setImagePreview(URL.createObjectURL(imageBlob))
    } catch (e) {}
  }

  useEffect(() => {
    try {
      if (!backgroundImage) {
        setImagePreview(null)

        setDiagramSize({
          width: MAX_STAGE_SIZE.width,
          height: MAX_STAGE_SIZE.height,
          defaultWidth: MAX_STAGE_SIZE.width,
          defaultHeight: MAX_STAGE_SIZE.height,
        })
        return
      }
      if (isString(backgroundImage) || isString(backgroundImage?.fileUrl)) {
        fetchBackgroundImage(backgroundImage?.fileUrl || backgroundImage)
        return
      }

      let reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
        //get size of image
        // var img = new Image()
        // img.src = reader.result
        // img.onload = function () {
        //   setDiagramSize((prev) => ({
        //     ...prev,
        //     imageWidth: img.width,
        //     imageHeight: img.height,
        //   }))
        // }
      }
      reader.readAsDataURL(backgroundImage)
    } catch (error) {}
  }, [backgroundImage])

  // useEffect(() => {
  //   if (zoom === 1) {
  //     setDiagramSize((prev) => {
  //       return {
  //         ...prev,
  //         width: prev.defaultWidth,
  //         height: prev.defaultHeight,
  //       }
  //     })
  //   } else {
  //     setDiagramSize((prev) => ({
  //       ...prev,
  //       width: prev.defaultWidth * zoom,
  //       height: prev.defaultHeight * zoom,
  //     }))
  //   }
  // }, [zoom, setDiagramSize])

  const value = {
    holonDesign: mappingValue.holonDesign,
    setHolonDesign,
    productionLineDesign: mappingValue.productionLineDesign,
    setProductionLineDesign,
    positionDesign: mappingValue.positionDesign,
    setPositionDesign,
    focusing,
    setFocusing,
    deviceLayoutDesign,
    doorDesign,
    setDoorDesign,

    visibleSidebar,
    setVisibleSidebar,

    mode,
    setMode,
    isView,
    isEdit,
    isDashBoard,

    getHolonDesign,
    getProductionLineDesign,
    getPositionDesign,

    mappingValue,
    backgroundImage,
    setBackgroundImage,
    diagramSize,
    setDiagramSize,
    imagePreview,

    zoom,
    setZoom,
  }
  return (
    <DeviceLayoutContext.Provider value={value}>
      {children}
    </DeviceLayoutContext.Provider>
  )
}

export default DeviceProvider
