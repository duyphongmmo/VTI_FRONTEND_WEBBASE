import React, { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* COLOR MAP theo 4M */
const COLORS = {
  "Máy Móc": "#F28C28",
  "Nguyên Liệu": "#FFC000",
  "Thao Tác": "#70AD47",
  "Phương pháp": "#8B4513",
};

const RADIAN = Math.PI / 180;

function createLabelRenderer(total) {
  return function renderLabel(props) {
    const { cx, cy, midAngle, innerRadius, outerRadius, payload } = props;

    if (
      cx == null ||
      cy == null ||
      innerRadius == null ||
      outerRadius == null ||
      midAngle == null ||
      !payload
    ) {
      return null;
    }

    const value = Number(payload.value) || 0;
    if (value <= 0) return null;

    const name = payload.name || "";
    const percent = total ? (value / total) * 100 : 0;

    const radius = innerRadius + (outerRadius - innerRadius) * 0.55;
    const x = Number(cx) + radius * Math.cos(-midAngle * RADIAN);
    const y = Number(cy) + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="middle"
        style={{ fontSize: 13, fontWeight: 600, fill: "#222" }}
      >
        <tspan x={x} dy="-0.4em">
          {name},
        </tspan>
        <tspan x={x} dy="1.2em">
          {value.toLocaleString("en-US")}, {percent.toFixed(0)}%
        </tspan>
      </text>
    );
  };
}

const Pie4MChart = ({
  chartData4M = [], // ✅ mảng items từ API
  height = 280,
  title = "Biểu đồ tỷ trọng theo 4M",
}) => {
  // ✅ convert API -> recharts format
  const normalized = useMemo(() => {
    return (chartData4M || []).map((d) => ({
      name: d.badName,
      value: Number(d.badQty) || 0,
    }));
  }, [chartData4M]);

  const total = useMemo(() => {
    return normalized.reduce((sum, d) => sum + d.value, 0);
  }, [normalized]);

  const renderLabel = useMemo(() => createLabelRenderer(total), [total]);

  return (
    <Box sx={{ backgroundColor: "white", borderRadius: 2, p: 2, boxShadow: 1 }}>
      <Typography
        sx={{ textAlign: "center", fontWeight: 700, fontSize: 20, mb: 1 }}
      >
        {title}
      </Typography>

      <Box sx={{ width: "100%", height }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              formatter={(value, name) => {
                const v = Number(value) || 0;
                const pct = total ? (v / total) * 100 : 0;
                return [
                  `${v.toLocaleString("en-US")} (${pct.toFixed(0)}%)`,
                  name,
                ];
              }}
            />

            <Legend
              verticalAlign="middle"
              align="right"
              layout="vertical"
              iconType="square"
              wrapperStyle={{ paddingLeft: 12 }}
            />

            {/* ✅ dùng normalized để chắc chắn value là number */}
            <Pie
              data={normalized}
              dataKey="value"
              nameKey="name"
              cx="40%"
              cy="50%"
              outerRadius="75%"
              labelLine={false}
              label={renderLabel}
              stroke="#fff"
              strokeWidth={3}
              isAnimationActive={false}
            >
              {normalized.map((entry, idx) => (
                <Cell
                  key={`${entry.name}-${idx}`}
                  fill={COLORS[entry.name] || "#999"}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default Pie4MChart;
