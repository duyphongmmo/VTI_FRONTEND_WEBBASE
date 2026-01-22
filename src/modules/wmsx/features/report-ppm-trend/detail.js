import React, { useMemo } from "react";
import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";

export default function ReportPPMTrendDetail({
  detailData,
  t,
  height = 520, // chiều cao vùng 2 bảng (trong DialogContent)
  onSelectItem, // (item) => void
  selectedKey, // key của item đang chọn (vd: badName)
  detailDataRow,
}) {
  const items = detailData?.items || [];

  // data detail của bảng dưới (bạn set khi click dòng ở bảng trên)
  const detailItems = detailDataRow || []; // <-- bạn tự set từ handle onClick
  const hasDetail = Array.isArray(detailItems) && detailItems.length > 0;

  const topH = Math.floor(height * 0.4);
  const botH = Math.floor(height * 0.6);

  const noData =
    (!items || items.length === 0) &&
    (!detailData?.topDefects || detailData.topDefects.length === 0) &&
    (!detailData?.defectTypes || detailData.defectTypes.length === 0) &&
    (!detailItems || detailItems.length === 0);

  return (
    <Box sx={{ height, display: "flex", flexDirection: "column", gap: 2 }}>
      {/* =======================
          TABLE TOP (40%)
      ======================= */}
      <Box sx={{ height: topH, minHeight: topH }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
          {t?.("reportPPMTrend.mainMetrics") || "Main Metrics"}
        </Typography>

        <TableContainer
          component={Paper}
          sx={{
            height: `calc(100% - 32px)`, // trừ title
            overflow: "auto",
            borderRadius: 1.5,
          }}
        >
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: 700 }}>Bad Name</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="right">
                  Bad Qty
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {items?.map((item, index) => {
                const key = item.badName || item.label || String(index);
                const isSelected = selectedKey != null && selectedKey === key;

                return (
                  <TableRow
                    key={key}
                    hover
                    onClick={() => onSelectItem?.(item)}
                    sx={{
                      cursor: onSelectItem ? "pointer" : "default",
                      backgroundColor: isSelected
                        ? "rgba(84,112,198,0.12)"
                        : "inherit",
                      "&:hover": {
                        backgroundColor: isSelected
                          ? "rgba(84,112,198,0.18)"
                          : "rgba(0,0,0,0.04)",
                      },
                    }}
                  >
                    <TableCell>{item.badName || item.label}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600 }}>
                      {(item.badQty ?? "").toLocaleString?.() ??
                        item.badQty ??
                        ""}
                    </TableCell>
                  </TableRow>
                );
              })}

              {items?.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={2}
                    align="center"
                    sx={{ py: 3, color: "text.secondary" }}
                  >
                    {t?.("reportPPMTrend.noDetailData") || "No data"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* =======================
          TABLE BOTTOM (60%)
          chỉ hiện khi có detailItems
      ======================= */}
      {hasDetail && (
        <Box sx={{ height: botH, minHeight: botH }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
            {t?.("reportPPMTrend.detail") || "Detail"}
          </Typography>

          <TableContainer
            component={Paper}
            sx={{
              height: `calc(100% - 32px)`,
              overflow: "auto",
              borderRadius: 1.5,
            }}
          >
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell sx={{ fontWeight: 700 }}>Detail Name</TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="right">
                    Bad Name Detail
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="right">
                    Bad Qty Detail
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {detailItems.map((row, idx) => (
                  <TableRow key={idx} hover>
                    <TableCell>{row.badName}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600 }}>
                      {(Number(row.qty ?? row.badQty ?? 0) || 0).toLocaleString(
                        "en-US",
                      )}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ fontWeight: 600, color: "#5470C6" }}
                    >
                      {row.badQty}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {/* NO DATA */}
      {noData && (
        <Box sx={{ py: 4, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            {t?.("reportPPMTrend.noDetailData") || "No detail data available"}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
