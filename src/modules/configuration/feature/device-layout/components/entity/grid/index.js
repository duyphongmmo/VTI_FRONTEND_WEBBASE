import React from 'react'

import { Layer, Line } from 'react-konva'

import { gridSize } from '../../../constants'

const KGrid = ({ width, height }) => {
  const lines = []
  for (let i = 0; i < width / gridSize.width; i++) {
    lines.push(
      <Line
        key={`gridx-${i}`}
        points={[
          Math.round(i * gridSize.width) + 0.5,
          0,
          Math.round(i * gridSize.width) + 0.5,
          height,
        ]}
        stroke="#ddd"
        strokeWidth={1}
      />,
    )
  }

  for (var j = 0; j < height / gridSize.height; j++) {
    lines.push(
      <Line
        key={`gridy-${j}`}
        points={[
          0,
          Math.round(j * gridSize.height),
          width,
          Math.round(j * gridSize.height),
        ]}
        stroke="#ddd"
        strokeWidth={1}
      />,
    )
  }

  return <Layer>{lines}</Layer>
}

export default KGrid
