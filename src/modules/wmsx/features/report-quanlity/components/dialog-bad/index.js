import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Divider,
} from "@mui/material";

import Button from "~/components/Button"; // nếu bạn đang dùng Button custom
import ReportPPMTrendDetail from "../../../report-ppm-trend/detail";
import { api } from "~/services/api";
// hoặc nếu muốn dùng MUI Button: import { Button } from "@mui/material";

const DialogBad = ({
  open,
  onClose,
  t,
  selectedData,
  isLoadingDetail,
  detailData,
  maxWidth = "md",
  fullWidth = true,
}) => {
  const [selectedKey, setSelectedKey] = useState(null);
  const [detailDataRow, setDetailDataRow] = useState([]);

  const handleSelectItem = async (item) => {
    const key = item.badName || item.label;
    setSelectedKey(key);

    const params = {
      id: item.badName,
    };
    // gọi API detail theo item
    const res = await api.get(`/v1/dashboard/get-bad-category`, params);
    console.log("API detail response:", res);
    if (res.statusCode === 200) {
      setDetailDataRow(res.data?.items || []);
    } else {
      setDetailDataRow([]);
    }

    // demo: set detailItems
  };

  console.log("detailData", detailData);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
    >
      <DialogTitle>
        <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
          {t("reportPPMTrend.detailTitle") || "PPM Trend Detail"}
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        {/* Selected Data Info */}
        {/* {selectedData && (
          <Box sx={{ mb: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={4}>
                <Typography variant="caption" color="text.secondary">
                  {t("reportPPMTrend.periodType")}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {selectedData.periodType}
                </Typography>
              </Grid>

              <Grid item xs={6} sm={4}>
                <Typography variant="caption" color="text.secondary">
                  {t("reportPPMTrend.date") || "Date"}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {selectedData.date}
                </Typography>
              </Grid>

              <Grid item xs={6} sm={4}>
                <Typography variant="caption" color="text.secondary">
                  {t("reportPPMTrend.ppm") || "PPM"}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 600, color: "#5470C6" }}
                >
                  {selectedData.ppm?.toLocaleString?.() ??
                    selectedData.ppm ??
                    "-"}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        )} */}

        {/* <Divider sx={{ mb: 2 }} /> */}

        {/* Detail Data */}
        {isLoadingDetail ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : detailData ? (
          <ReportPPMTrendDetail
            detailData={detailData}
            t={t}
            onSelectItem={handleSelectItem}
            selectedKey={selectedKey}
            detailDataRow={detailDataRow}
          />
        ) : (
          <Box sx={{ py: 4, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              {t("reportPPMTrend.noDetailData") || "No detail data available"}
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="outlined" type="button">
          {t("general:common.close") || "Close"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogBad;
