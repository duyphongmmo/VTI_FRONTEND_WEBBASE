import React, { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

// Sample giống ảnh
const sample = [
  { name: "FPCB lộ đồng", badQty: 793, ppm: 17923 },
  { name: "AOI", badQty: 188, ppm: 4249 },
  { name: "Void kết hợp", badQty: 138, ppm: 3119 },
  { name: "SPI", badQty: 132, ppm: 2983 },
  { name: "Void", badQty: 112, ppm: 2531 },
];

const fmtInt = (v) => {
  const n = Number(v);
  if (!Number.isFinite(n)) return "-";
  return n.toLocaleString("en-US"); // 17,923
};

const WorstNgByMaterialChart = (props) => {
  const { data, height = 320, title = "5 Worst NG by Material" } = props;

  const top5 = useMemo(() => {
    const arr = (data || []).map((d) => ({
      badName: String(d?.badName ?? ""),
      badQty: Number(d?.badQty ?? d?.badQty ?? d?.uv ?? 0) || 0,
      // ppm: Number(d?.ppm ?? d?.pv ?? 0) || 0,
    }));

    // sort theo badQty giảm dần + lấy top 5
    return arr.sort((a, b) => b.badQty - a.badQty).slice(0, 5);
  }, [data]);

  // domain cho trục phải (ppm) để line không dính sát mép
  const ppmDomain = useMemo(() => {
    const max = Math.max(...top5.map((d) => d.ppm), 0);
    const pad = max * 0.15; // chừa 15%
    return [0, Math.ceil(max + pad)];
  }, [top5]);

  return (
    <Box sx={{ backgroundColor: "white", borderRadius: 2, p: 2, boxShadow: 1 }}>
      <Typography
        sx={{ textAlign: "center", fontWeight: 700, mb: 1, fontSize: 20 }}
      >
        {title}
      </Typography>

      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart
          data={top5}
          margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
        >
          <CartesianGrid stroke="#eaeaea" vertical={false} />

          <XAxis dataKey="badName" interval={0} tickMargin={10} />

          {/* Trục trái: Bad Qty */}
          <YAxis yAxisId="left" tickFormatter={fmtInt} />

          {/* Trục phải: PPM */}
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={ppmDomain}
            tickFormatter={fmtInt}
          />

          <Tooltip
            labelFormatter={(label) => `${label}`}
            formatter={(value, name) => {
              if (name === "badQty") return [fmtInt(value), "Bad Qty"];
              if (name === "ppm") return [fmtInt(value), "PPM"];
              return [fmtInt(value), name];
            }}
          />

          <Legend
            formatter={(value) =>
              value === "badQty" ? "Bad Qty" : value === "ppm" ? "PPM" : value
            }
          />

          {/* Bar: Bad Qty */}
          <Bar yAxisId="left" dataKey="badQty" barSize={38} fill="#3b6dd8">
            <LabelList
              dataKey="badQty"
              position="top"
              offset={6}
              formatter={fmtInt}
              fill="#333"
              fontSize={12}
              fontWeight={600}
            />
          </Bar>

          <Line
            yAxisId="right"
            type="monotone"
            dataKey="ppm"
            stroke="#f28c28"
            strokeWidth={3}
            dot={{ r: 4 }}
          >
            <LabelList
              dataKey="ppm"
              position="right" // 👈 lệch sang phải
              offset={10}
              formatter={fmtInt}
              fill="#f28c28"
              fontSize={12}
              fontWeight={600}
            />
          </Line>
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default WorstNgByMaterialChart;
