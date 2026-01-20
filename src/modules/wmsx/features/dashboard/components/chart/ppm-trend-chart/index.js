import { Box, Typography } from "@mui/material"
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Label } from "recharts"

/**
 * Component hiển thị biểu đồ xu hướng PPM theo thời gian
 * Hỗ trợ hiển thị dữ liệu theo Quarter, Month, Week và Day
 * 
 * @param {Array} data - Mảng dữ liệu với format:
 *   {
 *     periodType: 'Q' | 'M' | 'W' | 'D',
 *     periodKey: string,
 *     date: string,
 *     ppm: number
 *   }
 */
export default function PPMTrendChart({ data, title }) {
  
  /**
   * Format periodKey để hiển thị trên trục X
   * - Q: 25Q2 -> Q2
   * - M: 2510 -> 10월, 2511 -> 11월
   * - W: 2552 -> W52
   * - D: 260111 -> 1/11
   */
  function formatXAxisLabel(item) {
    if (!item.periodType || !item.periodKey) return ''
    
    const { periodType, periodKey } = item
    
    switch (periodType) {
      case 'Q':
        // 25Q2 -> Q2
        return periodKey.substring(2)
      
      case 'M':
        // 2510 -> 10월
        const month = periodKey.substring(2)
        return `${parseInt(month)}월`
      
      case 'W':
        // 2552 -> W52
        return `W${periodKey.substring(2)}`
      
      case 'D':
        // 260111 -> 1/11
        const monthDay = periodKey.substring(2)
        const m = parseInt(monthDay.substring(0, 2))
        const d = parseInt(monthDay.substring(2))
        return `${m}/${d}`
      
      default:
        return periodKey
    }
  }

  /**
   * Xây dựng dữ liệu cho chart
   * - Nhóm theo periodType theo thứ tự: Q -> M -> W -> D
   * - Thêm điểm null giữa các nhóm để ngắt line
   * - Thêm label đã format cho trục X
   */
  function buildChartData(raw) {
    if (!raw || raw.length === 0) return []
    
    const result = []
    const order = ['Q', 'M', 'W', 'D']
  
    order.forEach((type) => {
      const group = raw.filter((r) => r.periodType === type)
      if (!group.length) return
  
      // Sắp xếp theo date để đảm bảo thứ tự đúng
      group.sort((a, b) => new Date(a.date) - new Date(b.date))
      
      group.forEach((item) => {
        result.push({
          xLabel: formatXAxisLabel(item),
          ppm: item.ppm,
          periodType: type,
          periodKey: item.periodKey,
          date: item.date,
        })
      })
  
      // Thêm điểm null để cắt line giữa các periodType
      result.push({
        xLabel: null,
        ppm: null,
        periodType: null,
      })
    })
  
    // Xóa điểm null cuối cùng nếu có
    if (result.length > 0 && result[result.length - 1].ppm === null) {
      result.pop()
    }

    return result
  }

  const chartData = buildChartData(data)

  /**
   * Custom label hiển thị giá trị PPM trên mỗi điểm
   */
  const CustomLabel = (props) => {
    const { x, y, value } = props
    if (value === null || value === undefined) return null
    
    return (
      <text
        x={x}
        y={y - 10}
        fill="#5470C6"
        textAnchor="middle"
        fontSize={12}
        fontWeight={600}
      >
        {value.toLocaleString()}
      </text>
    )
  }

  /**
   * Custom tooltip hiển thị thông tin chi tiết
   */
  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null
    
    const data = payload[0].payload
    if (!data.periodType) return null

    const periodTypeLabel = {
      Q: 'Quarter',
      M: 'Month',
      W: 'Week',
      D: 'Day',
    }

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
        <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
          {periodTypeLabel[data.periodType]}: {data.periodKey}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
          Date: {data.date}
        </Typography>
        <Typography variant="body2" sx={{ color: '#5470C6', fontWeight: 600 }}>
          PPM: {data.ppm?.toLocaleString()}
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
      {/* Title */}
      {title && (
        <Typography
          variant="h6"
          sx={{
            textAlign: 'center',
            mb: 2,
            fontWeight: 600,
            color: '#333',
          }}
        >
          {title}
        </Typography>
      )}

      {/* Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          {/* Grid */}
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          
          {/* X Axis */}
          <XAxis
            dataKey="xLabel"
            type="category"
            allowDuplicatedCategory={false}
            tick={{ fontSize: 12 }}
            tickLine={{ stroke: '#ccc' }}
            axisLine={{ stroke: '#ccc' }}
          />
          
          {/* Y Axis */}
          <YAxis
            tick={{ fontSize: 12 }}
            tickLine={{ stroke: '#ccc' }}
            axisLine={{ stroke: '#ccc' }}
            tickFormatter={(value) => value.toLocaleString()}
          >
            <Label
              value="PPM"
              position="insideLeft"
              angle={-90}
              style={{ textAnchor: 'middle', fontSize: 14, fontWeight: 600 }}
            />
          </YAxis>
          
          {/* Tooltip */}
          <Tooltip content={<CustomTooltip />} />
          
          {/* Legend */}
          <Legend
            wrapperStyle={{
              paddingTop: '20px',
            }}
            iconType="line"
          />
          
          {/* Line */}
          <Line
            type="monotone"
            dataKey="ppm"
            stroke="#5470C6"
            strokeWidth={2}
            dot={{ r: 5, fill: '#5470C6', strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 7, fill: '#5470C6', strokeWidth: 2, stroke: '#fff' }}
            connectNulls={false} // QUAN TRỌNG: không nối line qua điểm null
            label={<CustomLabel />}
            name="총합 이탈률"
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  )
}
