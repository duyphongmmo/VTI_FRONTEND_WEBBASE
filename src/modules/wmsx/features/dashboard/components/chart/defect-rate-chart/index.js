import { Box } from "@mui/material"
import { useTranslation } from "react-i18next"
import { LabelList, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export default function DefectRateChart({ data }) {
    const { t } = useTranslation(['wmsx'])
    const lineColor = '#1f77b4'
    return (
      <Box>
        <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 20, right: 30 }}>
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip />
        <Legend />

        <Line
          type="monotone"
          dataKey="value"
          name="종합이탈률 (ppm)"
          strokeWidth={2}
          stroke={lineColor}
          dot={{
              r: 5,
              fill: lineColor,     // ✅ fill full màu
              stroke: lineColor,   // ✅ viền cùng màu
              strokeWidth: 1,
            }}
            activeDot={{
              r: 7,
              fill: lineColor,
              stroke: '#fff',      // viền trắng khi hover (đẹp hơn)
              strokeWidth: 2,
            }}
        >
          <LabelList
            dataKey="value"
            position="top"
            formatter={(v) => v.toLocaleString()}
          />
        </Line>
      </LineChart>
         
        </ResponsiveContainer>
      </Box>
    )
  }