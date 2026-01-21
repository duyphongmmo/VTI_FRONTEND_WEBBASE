import React from 'react'

import { Box, Typography } from '@mui/material'
import { 
  ComposedChart, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Legend, 
  ResponsiveContainer,
  Tooltip
} from 'recharts'

/**
 * Process Quality Chart Component
 * Displays a composed chart with:
 * - Stacked bar chart for goodQty and badQty
 * - Line chart for remainQty (always above bars)
 * - X-axis shows process names
 */
export default function ProcessQualityChart() {
  const rawData = [
    {
      procDate: "2026-01-15",
      procName: "RPCB ARRAY DMC MARKING",
      remainQty: 36843,
      goodQty: 36843,
      badQty: 597
    },
    {
      procDate: "2026-01-15",
      procName: "FPCB ARRAY DMC MARKING",
      remainQty: 76787,
      goodQty: 76787,
      badQty: 1906
    },
    {
      procDate: "2026-01-15",
      procName: "1 ST SPI Inspection",
      remainQty: 34716,
      goodQty: 34673,
      badQty: 43
    },
    {
      procDate: "2026-01-15",
      procName: "2nd ST SPI Inspection",
      remainQty: 40680,
      goodQty: 40655,
      badQty: 25
    },
    {
      procDate: "2026-01-15",
      procName: "3rd SPI Inspection",
      remainQty: 38371,
      goodQty: 38283,
      badQty: 88
    },
    {
      procDate: "2026-01-15",
      procName: "1 ST AOI",
      remainQty: 36693,
      goodQty: 36562,
      badQty: 131
    },
    {
      procDate: "2026-01-15",
      procName: "2nd ST AOI",
      remainQty: 42783,
      goodQty: 42737,
      badQty: 46
    },
    {
      procDate: "2026-01-15",
      procName: "3rd AOI",
      remainQty: 40406,
      goodQty: 40336,
      badQty: 70
    },
    {
      procDate: "2026-01-15",
      procName: "Visual Inspection",
      remainQty: 36562,
      goodQty: 36544,
      badQty: 18
    },
    {
      procDate: "2026-01-15",
      procName: "DEFLUX",
      remainQty: 32470,
      goodQty: 32470,
      badQty: 0
    }
  ]

  // Calculate max stacked bar value
  const maxStackedValue = Math.max(...rawData.map(item => item.goodQty + item.badQty))
  
  // Calculate offset for 50px visual space (approximately 10-12% of chart height for 500px chart)
  const chartHeight = 500
  const pixelOffset = 50
  const baseOffset = (pixelOffset / chartHeight) * maxStackedValue
  
  // Get remainQty range
  const minRemainQty = Math.min(...rawData.map(item => item.remainQty))
  const maxRemainQty = Math.max(...rawData.map(item => item.remainQty))
  const remainQtyRange = maxRemainQty - minRemainQty
  
  // Base position for line (above max bar)
  const lineBasePosition = maxStackedValue + baseOffset
  
  // Scale factor to maintain trend visibility (adjust height range for line)
  const lineHeightRange = remainQtyRange > 0 ? maxStackedValue * 0.2 : 0 // 20% of max bar height for line variation
  
  // Transform data to position line above bars while maintaining trend
  const data = rawData.map(item => {
    // Normalize remainQty value (0 to 1)
    const normalizedValue = remainQtyRange > 0 
      ? (item.remainQty - minRemainQty) / remainQtyRange 
      : 0.5
    
    // Calculate line position: base + scaled variation
    const linePosition = lineBasePosition + (normalizedValue * lineHeightRange)
    
    return {
      ...item,
      linePosition: linePosition,
      originalRemainQty: item.remainQty // Keep original value for tooltip
    }
  })

  // Calculate Y-axis domain with extra space for labels
  const maxLinePosition = Math.max(...data.map(item => item.linePosition))
  const yAxisMax = maxLinePosition * 1.15

  /**
   * Custom label to display actual remainQty values on line chart dots
   */
  const CustomLineLabel = (props) => {
    const { x, y, value, payload, index } = props
    
    // Get the original remainQty from the data
    const remainQty = payload?.originalRemainQty || data[index]?.originalRemainQty
    
    if (!remainQty) return null
    
    return (
      <text
        x={x}
        y={y - 15}
        fill="#000000"
        textAnchor="middle"
        fontSize={11}
        fontWeight={600}
      >
        {remainQty.toLocaleString()}
      </text>
    )
  }

  /**
   * Custom label for Good Qty bar - displays in center
   */
  const CustomGoodQtyLabel = (props) => {
    const { x, y, width, height, value } = props
    if (!value) return null
    
    return (
      <text
        x={x + width / 2}
        y={y + height / 2}
        fill="#000000"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={10}
        fontWeight={600}
      >
        {value.toLocaleString()}
      </text>
    )
  }

  /**
   * Custom label for Bad Qty bar - displays in center of bad qty bar
   */
  const CustomBadQtyLabel = (props) => {
    const { x, y, width, height, value } = props
    if (!value || value === 0) return null
    
    return (
      <text
        x={x + width / 2}
        y={y + height / 2}
        fill="#000000"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={10}
        fontWeight={600}
      >
        {value.toLocaleString()}
      </text>
    )
  }

  /**
   * Custom tooltip to display detailed information
   * Only shows tooltip for bar charts, not for line chart
   */
  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null

    // Only show tooltip if we have bar data (goodQty or badQty)
    const hasBarData = payload.some(item => 
      item.dataKey === 'goodQty' || item.dataKey === 'badQty'
    )

    // Don't show tooltip if only line data is present
    if (!hasBarData) {
      return null
    }

    const data = payload[0]?.payload

    // Tooltip for bar charts (shows all data)
    return (
      <Box
        sx={{
          backgroundColor: 'white',
          border: '1px solid #ccc',
          borderRadius: 1,
          padding: 1.5,
          boxShadow: 2,
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
          {label}
        </Typography>
        <Typography variant="body2" sx={{ color: '#82ca9d', fontWeight: 600 }}>
          Good Qty: {data?.goodQty?.toLocaleString()}
        </Typography>
        <Typography variant="body2" sx={{ color: '#ff6b6b', fontWeight: 600 }}>
          Bad Qty: {data?.badQty?.toLocaleString()}
        </Typography>
        <Typography variant="body2" sx={{ color: '#8884d8', fontWeight: 600, mt: 0.5 }}>
          Remain Qty: {data?.originalRemainQty?.toLocaleString()}
        </Typography>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        borderRadius: 2,
        padding: 3,
        boxShadow: 1,
      }}
    >
      <ResponsiveContainer width="100%" height={500}>
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          
          <XAxis
            dataKey="procName"
            angle={-45}
            textAnchor="end"
            height={100}
            tick={{ fontSize: 11 }}
            interval={0}
          />
          
          {/* Single Y-Axis for both bars and line */}
          <YAxis
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => value.toLocaleString()}
            domain={[0, yAxisMax]}
          />
          
          <Tooltip content={<CustomTooltip />} />
          
          <Legend
            wrapperStyle={{
              paddingTop: '10px',
            }}
            iconType="rect"
          />
          
          {/* Stacked Bar Charts */}
          <Bar
            dataKey="goodQty"
            stackId="a"
            fill="#82ca9d"
            name="Good Qty"
            label={<CustomGoodQtyLabel />}
          />
          <Bar
            dataKey="badQty"
            stackId="a"
            fill="#ff6b6b"
            name="Bad Qty"
            label={<CustomBadQtyLabel />}
          />
          
          {/* Line Chart - Fixed position above bars */}
          <Line
            type="monotone"
            dataKey="linePosition"
            stroke="#8884d8"
            strokeWidth={3}
            dot={{ fill: '#8884d8', r: 5 }}
            activeDot={false}
            name="Remain Qty"
            label={<CustomLineLabel />}
            tooltipType="none"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  )
}
