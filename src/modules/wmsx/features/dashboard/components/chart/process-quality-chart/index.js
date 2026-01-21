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
  const safeData = useMemo(
    () => (Array.isArray(rawData) ? rawData : []),
    [rawData],
  );

  if (safeData.length === 0) {
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

  // normalize numeric fields to avoid NaN
  const data = useMemo(
    () =>
      safeData.map((it) => ({
        ...it,
        goodQty: Number(it.goodQty ?? 0),
        badQty: Number(it.badQty ?? 0),
        remainQty: Number(it.ppm ?? 0),
      })),
    [safeData],
  );

  // domains for nicer padding
  const { barMax, remainMin, remainMax } = useMemo(() => {
    const barMaxVal = Math.max(...data.map((d) => d.goodQty + d.badQty), 0);
    const rMin = Math.min(...data.map((d) => d.remainQty), 0);
    const rMax = Math.max(...data.map((d) => d.remainQty), 0);
    return { barMax: barMaxVal, remainMin: rMin, remainMax: rMax };
  }, [data]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    const p = payload[0]?.payload;

    return (
      <Box
        sx={{
          backgroundColor: "white",
          border: "1px solid #ccc",
          borderRadius: 1,
          padding: 1.5,
          boxShadow: 2,
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
          {label}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          Good Qty: {p?.goodQty?.toLocaleString()}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          Bad Qty: {p?.badQty?.toLocaleString()}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.5 }}>
          Remain Qty: {p?.remainQty?.toLocaleString()}
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
          margin={{ top: 20, right: 40, left: 20, bottom: 100 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />

          <XAxis
            dataKey="procName"
            angle={-45}
            textAnchor="end"
            height={120}
            tick={{ fontSize: 11 }}
            interval={0}
          />

          {/* Y axis for Bars (Good/Bad) */}
          <YAxis
            yAxisId="bar"
            tick={{ fontSize: 12 }}
            tickFormatter={(v) => Number(v).toLocaleString()}
            domain={[0, Math.ceil(barMax * 1.15)]}
          />

          {/* Y axis for Line (RemainQty) */}
          <YAxis
            yAxisId="remain"
            orientation="right"
            tick={{ fontSize: 12 }}
            tickFormatter={(v) => Number(v).toLocaleString()}
            domain={[Math.floor(remainMin * 0.95), Math.ceil(remainMax * 1.05)]}
          />

          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: "10px" }} iconType="rect" />

          {/* Stacked Bars use left axis */}
          <Bar
            yAxisId="bar"
            dataKey="goodQty"
            stackId="a"
            fill="#82ca9d"
            name="Good Qty"
          />
          <Bar
            yAxisId="bar"
            dataKey="badQty"
            stackId="a"
            fill="#ff6b6b"
            name="Bad Qty"
          />

          {/* Line uses right axis, value is REAL remainQty */}
          <Line
            yAxisId="remain"
            type="monotone"
            dataKey="remainQty"
            stroke="#8884d8"
            strokeWidth={3}
            dot={{ fill: "#8884d8", r: 4 }}
            activeDot={{ r: 6 }}
            name="Remain Qty"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
}
