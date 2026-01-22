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
} from "recharts";

// Sample data (name = category, uv = số lỗi)
const data = [
  { name: "Bẩn Marking", uv: 133 },
  { name: "Biến Màu", uv: 2570 },
  { name: "Cong Mạch", uv: 397 },
  { name: "Crack Chíp", uv: 1071 },
  { name: "Crack IC", uv: 1520 },
  { name: "Dị Vật Tape", uv: 1400 },
  { name: "Gãy SUS", uv: 1400 },
  { name: "Không ET", uv: 680 },
];

// tone xanh
const COLOR_BAR = "#2f6fdf"; // xanh dương
const COLOR_LINE = "#0ea5a4"; // xanh teal

const LegendToggle = ({ items, onToggle }) => {
  return (
    <Box sx={{ display: "flex", gap: 2.5, justifyContent: "center", mt: 1 }}>
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
          }}
        >
          <Box
            sx={{
              width: 14,
              height: 14,
              borderRadius: it.shape === "circle" ? "50%" : "2px",
              backgroundColor: it.color,
              border: "1px solid #d0d0d0",
            }}
          />
          <Box sx={{ fontSize: 13, fontWeight: 600, color: "#2b2b2b" }}>
            {it.label}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

const BadCategory = ({ chartDataCategory }) => {
  // toggle series
  const [visible, setVisible] = useState({ uv: true, cumPct: true });
  const toggle = useCallback((key) => {
    setVisible((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const paretoData = useMemo(() => {
    const sorted = [...data]
      .map((d) => ({ ...d, uv: Number(d.uv) || 0 }))
      .sort((a, b) => b.uv - a.uv);

    const total = sorted.reduce((s, d) => s + d.uv, 0) || 1;
    let acc = 0;

    return sorted.map((d) => {
      acc += d.uv;
      return { ...d, cumPct: (acc / total) * 100 };
    });
  }, []);

  const legendItems = useMemo(
    () => [
      {
        key: "uv",
        label: "Số lỗi",
        color: COLOR_BAR,
        shape: "square",
        visible: visible.uv,
      },
      {
        key: "cumPct",
        label: "% tích luỹ",
        color: COLOR_LINE,
        shape: "circle",
        visible: visible.cumPct,
      },
    ],
    [visible],
  );
  return (
    <Box sx={{ backgroundColor: "white", borderRadius: 2, p: 2, boxShadow: 1 }}>
      <Typography
        sx={{ textAlign: "center", fontWeight: 700, mb: 1, fontSize: 22 }}
      >
        Biểu đồ Pareto tỷ lệ lỗi theo hạng mục lỗi
      </Typography>

      <ResponsiveContainer width="100%" height={420}>
        <ComposedChart
          data={chartDataCategory}
          margin={{ top: 10, right: 40, left: 10, bottom: 90 }}
        >
          <CartesianGrid stroke="#eaeaea" />

          <XAxis
            dataKey="itemName"
            interval={0}
            angle={-90}
            textAnchor="end"
            height={90}
            tickMargin={10}
          />

          <YAxis yAxisId="left" />
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={[0, 100]}
            tickFormatter={(v) => `${Math.round(v)}%`}
          />

          <Tooltip
            formatter={(value, name) => {
              if (name === "cumPct")
                return [`${Number(value).toFixed(2)}%`, "% tích luỹ"];
              if (name === "badQty") return [value, "Số lỗi"];
              return [value, name];
            }}
            labelFormatter={(label) => `Hạng mục: ${label}`}
          />

          {/* ✅ Toggle series */}
          {visible.uv && (
            <Bar
              yAxisId="left"
              dataKey="badQty"
              barSize={22}
              fill={COLOR_BAR}
            />
          )}
          {visible.cumPct && (
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="cumPct"
              stroke={COLOR_LINE}
              strokeWidth={3}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>

      {/* ✅ Custom Legend toggle */}
      <LegendToggle items={legendItems} onToggle={toggle} />
    </Box>
  );
};

export default BadCategory;
