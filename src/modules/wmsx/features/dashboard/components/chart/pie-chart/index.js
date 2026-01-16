import { Pie } from '@ant-design/plots'
import { Box } from '@mui/material'
import { first } from 'lodash'

import { formatNumber } from '../../../utils'


export default function PieChart({ data, itemWidth = 80 }) {
  const COLOR_ARRAY = ['#1F73D8', '#0FA44A', '#FF0909']
  const config = {
    appendPadding: 10,
    data: data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    color: COLOR_ARRAY,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => {
        return formatNumber((percent * 100).toFixed(2))
      },
      style: {
        fontSize: 10,
        fill: '#ffffff',
      },
    },
    tooltip: {
      customContent: (title, data) => {
        return (
          <div
            style={{
              display: 'flex',
              flexFlow: 'row wrap',
              justifyContent: 'flex-start',
              alignItems: 'center',
              backgroundColor: 'rgb(255, 255, 255)',
              borderRadius: '3px',
              lineHeight: '30px',
              width: 'auto',
              minHeight: '40px',
              fontSize: '15px',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '100%',
                backgroundColor: `${first(data)?.color}`,
                marginRight: '10px',
              }}
            ></div>
            <div>{title}: </div>
            <div
              style={{
                marginLeft: '5px',
              }}
            >
              {formatNumber(data?.[0]?.value)}
            </div>
          </div>
        )
      },
    },
    legend: {
      position: 'bottom',
      layout: 'horizontal',
      flipPage: false,
      itemSpacing: 5,
      itemWidth: itemWidth,
      maxRow: 2,
      marker: {
        symbol: 'square',
      },
      itemName: {
        style: {
          fontSize: 10,
          fill: '#333',
        },
      },
    },
  }
  return (
    <Box sx={{ height: '100%' }}>
      <Pie {...config} />
      {/* <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {data.map((item, index) => (
              <div
                key={item.type}
                style={{
                  display: 'flex',
                  alignItems: 'center',

                  fontSize: 8,
                }}
              >
                <span
                  style={{
                    width: 5,
                    height: 5,
                    backgroundColor: colors[index],
                    marginRight: 5,
                  }}
                />
                {item.type}
              </div>
            ))}
          </div> */}
    </Box>
  )
}
