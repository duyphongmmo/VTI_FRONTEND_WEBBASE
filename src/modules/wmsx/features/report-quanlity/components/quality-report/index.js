import React, { useMemo, useState, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const COLOR_BAR = "#0f8a8a";
const COLOR_BAR_BORDER = "#0a4f4f";
const COLOR_LINE = "#ff7a1a";

const fmtInt = (v) => {
  const n = Number(v);
  if (!Number.isFinite(n)) return "-";
  return n.toLocaleString("en-US");
};

const LegendCheckbox = ({ items, onToggle }) => (
  <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 1 }}>
    {items.map((it) => (
      <Box
        key={it.key}
        onClick={() => onToggle(it.key)}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          cursor: "pointer",
          userSelect: "none",
          opacity: it.visible ? 1 : 0.35,
          border: "1px solid #d0d0d0",
          borderRadius: 1,
          px: 1,
          py: 0.5,
          backgroundColor: "#fff",
        }}
      >
        <Box
          sx={{
            width: 14,
            height: 14,
            borderRadius: 0.5,
            border: "1px solid #666",
            backgroundColor: it.visible ? "#1f2a37" : "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: 12,
            lineHeight: 1,
          }}
        >
          {it.visible ? "✓" : ""}
        </Box>

        <Box
          sx={{
            width: it.key === "pv" ? 18 : 14,
            height: 8,
            display: "flex",
            alignItems: "center",
          }}
        >
          {it.key === "uv" ? (
            <Box
              sx={{
                width: 14,
                height: 14,
                backgroundColor: it.color,
                border: `1px solid ${COLOR_BAR_BORDER}`,
              }}
            />
          ) : (
            <>
              <Box sx={{ width: 18, height: 2, backgroundColor: it.color }} />
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: it.color,
                  marginLeft: -10,
                }}
              />
            </>
          )}
        </Box>

        <Box sx={{ fontSize: 13, fontWeight: 600 }}>{it.label}</Box>
      </Box>
    ))}
  </Box>
);

// ✅ nhận props chartData
const QualityChart = ({ chartData = [], title = "Quality Trend" }) => {
  const [visible, setVisible] = useState({ uv: true, pv: true });

  const toggle = useCallback((key) => {
    setVisible((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const legendItems = useMemo(
    () => [
      {
        key: "uv",
        label: "Defect Quantity (EA)",
        color: COLOR_BAR,
        visible: visible.uv,
      },
      { key: "pv", label: "PPM", color: COLOR_LINE, visible: visible.pv },
    ],
    [visible],
  );

  const ppmDomain = useMemo(() => {
    const max = Math.max(...(chartData || []).map((d) => Number(d.pv) || 0), 0);
    const pad = max * 0.15;
    return [0, Math.ceil(max + pad)];
  }, [chartData]);

  return (
    <Box sx={{ backgroundColor: "white", borderRadius: 2, p: 2, boxShadow: 1 }}>
      <Typography
        sx={{ textAlign: "center", fontWeight: 800, mb: 1, fontSize: 22 }}
      >
        {title}
      </Typography>

      <ResponsiveContainer width="100%" height={320}>
        <ComposedChart
          data={chartData}
          margin={{ top: 20, right: 35, left: 10, bottom: 20 }}
        >
          <CartesianGrid stroke="#efefef" vertical={false} />
          <XAxis dataKey="name" tickMargin={8} />

          <YAxis yAxisId="left" tickFormatter={fmtInt} />
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={ppmDomain}
            tickFormatter={fmtInt}
          />

          <Tooltip
            labelFormatter={(label) => `Date: ${label}`}
            formatter={(value, key) => {
              if (key === "uv") return [fmtInt(value), "Defect Qty"];
              if (key === "pv") return [fmtInt(value), "PPM"];
              return [fmtInt(value), key];
            }}
          />

          {visible.uv && (
            <Bar
              yAxisId="left"
              dataKey="uv"
              barSize={44}
              fill={COLOR_BAR}
              stroke={COLOR_BAR_BORDER}
              strokeWidth={1}
            >
              <LabelList
                dataKey="uv"
                position="top"
                formatter={fmtInt}
                fill="#111"
                fontSize={12}
                fontWeight={700}
              />
            </Bar>
          )}

          {visible.pv && (
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="pv"
              stroke={COLOR_LINE}
              strokeWidth={2.5}
              dot={{ r: 4, stroke: COLOR_LINE, strokeWidth: 2, fill: "#fff" }}
              activeDot={{ r: 6 }}
            >
              <LabelList
                dataKey="pv"
                position="top"
                formatter={fmtInt}
                fill="#111"
                fontSize={12}
                fontWeight={700}
              />
            </Line>
          )}
        </ComposedChart>
      </ResponsiveContainer>

      <LegendCheckbox items={legendItems} onToggle={toggle} />
    </Box>
  );
};

export default QualityChart;
