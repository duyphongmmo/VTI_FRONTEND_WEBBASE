import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LabelList,
  Customized,
} from 'recharts'


import { formatNumber, formatNumberReport } from '../../../utils'


export default function JobChart({ data, names, enumMap }) {
  const { t } = useTranslation(['wmsx'])
  const COLOR_ARRAY = ['#1F73D8', '#0FA44A', '#FF0909']
  return (
    <Box>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={data} barGap={0} barCategoryGap={0}>
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          <XAxis
            dataKey="processName"
            tickFormatter={(value) =>
              value.length > 12 ? `${value.substring(0, 12)}...` : value
            }
            tick={{
              fontSize: 9,
              fontWeight: 'bold',
            }}
            interval={0}
          />

          <YAxis
            tickFormatter={formatNumberReport}
            tick={{
              fontSize: 10,
              fontWeight: 'bold',
            }}
            label={{
              value: t('analyzeReport.statisticData'),
              angle: -90,
              position: 'insideLeft',
              style: { textAnchor: 'middle', fontWeight: 700 },
            }}
          />

          <Tooltip
            formatter={(value, name) => {
              return [formatNumber(value), name]
            }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const unique = []
                const seen = new Set()

                payload.forEach((item) => {
                  if (!seen.has(item.dataKey)) {
                    seen.add(item.dataKey)
                    const barItem = payload.find(
                      (p) => p.dataKey === item.dataKey && p.name !== p.dataKey,
                    )
                    unique.push(barItem || item)
                  }
                })
                return (
                  <div
                    style={{
                      background: '#fff',
                      padding: '5px 10px',
                      border: '1px solid #ccc',
                      borderRadius: 5,
                      minWidth: 100,
                    }}
                  >
                    {unique.map((entry, index) => (
                      <p key={`item-${index}`} style={{ color: entry.color }}>
                        {`${entry.name} : ${formatNumber(entry.value)}`}
                      </p>
                    ))}
                  </div>
                )
              }
              return null
            }}
          />
          {enumMap?.map((item, index) => (
            <Bar
              dataKey={item?.id}
              barSize={18}
              fill={COLOR_ARRAY[index]}
              name={names[index]}
            >
              <LabelList
                position="top"
                dataKey={item?.id}
                fill={COLOR_ARRAY[index]}
                fontSize={8}
                fontWeight={700}
                formatter={(value) => {
                  return value > 0 ? formatNumberReport(value) : null
                }}
              />
            </Bar>
          ))}

          {enumMap?.map((item, index) =>
            renderCustomizedLine(item?.id, COLOR_ARRAY[index], index, enumMap),
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  )
}

const renderCustomizedLine = (dataKey, stroke, barIndex, enumMap) => (
  <Customized
    component={({ xAxisMap, yAxisMap, data }) => {
      const xAxis = Object.values(xAxisMap)[0]
      const yAxis = Object.values(yAxisMap)[0]
      const scale = xAxis?.scale
      const bandwidth =
        typeof scale?.bandwidth === 'function' ? scale.bandwidth() : 0

      const points = (data || [])
        .map((entry) => {
          const category = entry.processName
          if (category == null) return null
          const start = scale(category)
          if (start == null) return null
          const center = start + bandwidth / 2
          const totalBars = enumMap?.length || 0
          const totalWidth = totalBars * 18
          const offsetStart = center - totalWidth / 2
          const x = offsetStart + barIndex * 18 + 18 / 2

          const value = entry[dataKey]
          if (value == null || isNaN(value)) return null
          const y = yAxis.scale(value)
          return { x, y }
        })
        .filter(Boolean)

      if (!points.length) return null
      const path = `M${points.map((p) => `${p.x},${p.y}`).join('L')}`
      return (
        <g>
          <path d={path} stroke={stroke} strokeWidth={1} fill="none" />
          {points.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={3}
              fill={stroke}
              stroke="#fff"
              strokeWidth={1}
            />
          ))}
        </g>
      )
      // return <path d={path} stroke={stroke} strokeWidth={1} fill="none" />
    }}
  />
)
