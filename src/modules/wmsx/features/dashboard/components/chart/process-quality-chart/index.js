import React, { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function ProcessQualityChart({ rawData }) {
  // Hook #1: normalize input (luôn chạy)
  const safeData = useMemo(
    () => (Array.isArray(rawData) ? rawData : []),
    [rawData],
  );

  // Hook #2: normalize numeric fields (luôn chạy)
  const data = useMemo(
    () =>
      safeData.map((it) => ({
        ...it,
        goodQty: Number(it.goodQty ?? 0),
        badQty: Number(it.badQty ?? 0),
        ppm: Number(it.ppm ?? 0),
      })),
    [safeData],
  );

  // Hook #3: compute domains (luôn chạy)
  const { barMax, ppmMin, ppmMax } = useMemo(() => {
    if (data.length === 0) return { barMax: 0, ppmMin: 0, ppmMax: 0 };

    const bMax = Math.max(...data.map((d) => d.goodQty + d.badQty), 0);
    const pMin = Math.min(...data.map((d) => d.ppm), 0);
    const pMax = Math.max(...data.map((d) => d.ppm), 0);
    return { barMax: bMax, ppmMin: pMin, ppmMax: pMax };
  }, [data]);

  // ✅ Sau khi gọi hết hook rồi mới return empty
  if (data.length === 0) {
    return (
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: 2,
          padding: 3,
          boxShadow: 1,
          height: 500,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#999",
        }}
      >
        No data available
      </Box>
    );
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    const p = payload[0]?.payload;
    return (
      <Box
        sx={{
          backgroundColor: "white",
          border: "1px solid #ccc",
          borderRadius: 1,
          p: 1.5,
          boxShadow: 2,
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
          {label}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          Good Qty: {p.goodQty.toLocaleString()}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          Bad Qty: {p.badQty.toLocaleString()}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.5 }}>
          PPM: {p.ppm.toLocaleString()}
        </Typography>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: 2,
        padding: 3,
        boxShadow: 1,
      }}
    >
      <ResponsiveContainer width="100%" height={500}>
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 40, left: 20, bottom: 110 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />

          <XAxis
            dataKey="procName"
            angle={-45}
            textAnchor="end"
            height={130}
            tick={{ fontSize: 11 }}
            interval={0}
          />

          {/* Bars axis */}
          <YAxis
            yAxisId="qty"
            tick={{ fontSize: 12 }}
            tickFormatter={(v) => Number(v).toLocaleString()}
            domain={[0, Math.ceil(barMax * 1.15)]}
          />

          {/* PPM axis */}
          <YAxis
            yAxisId="ppm"
            orientation="right"
            tick={{ fontSize: 12 }}
            tickFormatter={(v) => Number(v).toLocaleString()}
            domain={[Math.floor(ppmMin * 0.95), Math.ceil(ppmMax * 1.05)]}
          />

          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: "10px" }} iconType="rect" />

          <Bar
            yAxisId="qty"
            dataKey="goodQty"
            stackId="a"
            fill="#82ca9d"
            name="Good Qty"
          />
          <Bar
            yAxisId="qty"
            dataKey="badQty"
            stackId="a"
            fill="#ff6b6b"
            name="Bad Qty"
          />

          <Line
            yAxisId="ppm"
            type="monotone"
            dataKey="ppm"
            stroke="#8884d8"
            strokeWidth={3}
            dot={{ fill: "#8884d8", r: 4 }}
            activeDot={{ r: 6 }}
            name="PPM"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
}
