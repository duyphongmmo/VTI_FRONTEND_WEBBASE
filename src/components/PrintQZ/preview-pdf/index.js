import { forwardRef, memo } from "react"

import { Box } from "@mui/material"
import clsx from "clsx"

import { LAYOUT_PRINT_TYPE, PREVIEW_PAGE_HEIGHT_MM, PREVIEW_PAGE_WIDTH_MM } from "~/common/constants"
import { useClasses } from "~/themes"

import SplitPages from "../split-page"
import { style } from '../style'

 const PreviewTemplate = forwardRef(({templates},ref)=>{
      const classes = useClasses(style)
     const heightPage = (orientation) => {
        if (orientation === LAYOUT_PRINT_TYPE.LANDSCAPE) {
          return (
            (PREVIEW_PAGE_WIDTH_MM / 100) *
            (PREVIEW_PAGE_WIDTH_MM / (PREVIEW_PAGE_HEIGHT_MM / 100))
          )
        } else {
          return PREVIEW_PAGE_HEIGHT_MM
        }
      }
    return <Box className={clsx(classes.wrapperPreview)} ref={ref}>
    <Box className={clsx(classes.m15)}>
      {templates.map(({ template, config }) => (
        <SplitPages
          htmlString={template}
          width={PREVIEW_PAGE_WIDTH_MM}
          height={heightPage(config?.orientation)}
        />
      ))}
    </Box>
  </Box>
})
export default memo(PreviewTemplate)