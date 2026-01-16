/* eslint-disable no-unused-vars */
import React from 'react'

import { Box } from '@mui/material'
import { useTheme } from '@mui/styles'
import maxBy from 'lodash/maxBy'
import uniqBy from 'lodash/uniqBy'
import { PropTypes } from 'prop-types'

import Node from './Node'

const calc = (data = []) => {
  let nodes = uniqBy(data, 'code')

  const root = nodes.find((n) => !n?.parentCode)

  const updateNodeCoordinates = (node) => {
    const idx = nodes.findIndex((n) => n.code === node.code)

    nodes = [...nodes.slice(0, idx), node, ...nodes.slice(idx + 1)]
  }

  const findNextNode = (node) =>
    nodes.find((n) => n?.parentCode === node?.code && n?.x === undefined)

  const findPrevNode = (node) => {
    if (!node?.parentCode) return undefined

    return nodes.find((n) => n?.code === node?.parentCode)
  }

  const scan = (node) => {
    if (!node) return

    const nextNode = findNextNode(node)
    const prevNode = findPrevNode(node)

    if (nextNode) {
      const o =
        nodes?.filter(
          (n) =>
            n?.code !== nextNode?.code &&
            n?.parentCode === nextNode?.parentCode &&
            n?.y !== undefined,
        )?.length || 0

      const y = (node.y || 0) + (node.b || 0) + (node.b === undefined ? 0 : 1)
      const newNextNode = {
        ...nextNode,
        x: (node.x || 0) + 1,
        y,
        t: y - (node.y || 0),
        o,
      }
      updateNodeCoordinates(newNextNode)

      scan(newNextNode)
    } else if (prevNode) {
      const newPrevNode = {
        ...prevNode,
        b:
          (prevNode.b || 0) +
          (node.b || 0) +
          (prevNode.b === undefined ? 0 : 1),
      }
      updateNodeCoordinates(newPrevNode)

      scan(newPrevNode)
    }
  }

  scan(root)

  return nodes
}

const Flow = ({ data, sx }) => {
  const theme = useTheme()

  const nodes = calc(data)

  const xSize = 180
  const ySize = 180
  const xGap = 50
  const yGap = 20

  const yMax = maxBy(nodes, 'y')?.y || 4
  const containerHeight = yMax * (ySize + yGap) + ySize

  return (
    <Box sx={{ overflow: 'auto', pb: 1, ...sx }}>
      <Box sx={{ position: 'relative', height: containerHeight }}>
        {nodes.map(({ x = 0, y = 0, t, b, o = 0, ...nodeProps }) => (
          <Node
            key={nodeProps?.code}
            {...nodeProps}
            sx={{
              position: 'absolute',
              top: y * (ySize + yGap),
              left: x * (xSize + xGap),
              width: xSize,
              minHeight: ySize,
              zIndex: 2,

              '&:before': {
                display: 'inline-block',
                content: '""',
                width: t ? xGap + xSize * (0.4 + o * 0.1) : xGap,
                height: t ? (t - 1) * (yGap + ySize) + yGap + 58 : 0,
                borderBottom: `2px solid ${theme.palette.subText.main}`,
                borderLeft: `2px solid ${theme.palette.subText.main}`,
                borderBottomLeftRadius: t ? '8px' : 0,
                position: 'absolute',
                top: 58,
                left: 0,
                transform: 'translate(-100%,-100%)',
                pointerEvents: 'none',
              },
            }}
          />
        ))}
      </Box>
    </Box>
  )
}

Flow.defaultProps = {
  data: [],
  sx: {},
}

Flow.propTypes = {
  sx: PropTypes.shape(),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      highlight: PropTypes.bool,
      code: PropTypes.string,
      href: PropTypes.string,
      status: PropTypes.node,
      createdAt: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date),
      ]),
      renderNodeTitle: PropTypes.func,
      renderNodeContent: PropTypes.func,
      parentCode: PropTypes.string,
    }),
  ),
}

export default Flow
