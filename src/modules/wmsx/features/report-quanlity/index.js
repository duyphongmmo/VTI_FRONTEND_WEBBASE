import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Grid, Paper } from "@mui/material";
import { Form, Formik } from "formik";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { sub } from "date-fns";

import { useQueryState } from "~/common/hooks";
import ActionBar from "~/components/ActionBar";
import Button from "~/components/Button";
import { Field } from "~/components/Formik";
import Page from "~/components/Page";
import { ROUTE } from "~/modules/wmsx/routes/config";
import { api } from "~/services/api"; // ✅ thêm api

import QualityChart from "./components/quality-report";
import BadModelPareto from "./components/bad-model";
import BadCategory from "./components/bad-category";
import Pie4MChart from "./components/4man-report";
import WorstNgByMaterialChart from "./components/top-5-wost";
import DialogBad from "./components/dialog-bad";

import {
  BUSI_OPTIONS,
  CATEGORY_OPTIONS,
  FAKE_DETAIL_DATA,
  FAKE_SELECTED_DATA,
  ITEM_OPTIONS,
} from "./sample";

const breadcrumbs = [
  { route: ROUTE.REPORT_POPUP.PATH, title: ROUTE.REPORT_POPUP.TITLE },
];

const ReportQuanlity = () => {
  const { t } = useTranslation(["wmsx"]);
  useQueryState({ filters: {} });

  /* =========================
     FORM INIT
  ========================= */
  const initialValues = useMemo(
    () => ({
      time: [sub(new Date(), { months: 3 }), new Date()],
      busiName: null,
      itemCode: null,
      categoryCode: null,
    }),
    [],
  );

  /* =========================
     QUALITY CHART STATE (API)
  ========================= */
  const [qualityData, setQualityData] = useState([]);
  const [loadingQuality, setLoadingQuality] = useState(false);

  const mapBadProcToChart = useCallback((items = []) => {
    return (items || [])
      .map((it) => ({
        name: it.procDate, // XAxis label
        uv: Number(it.badQty) || 0, // bar = bad qty
        pv: Number(it.Ppm) || 0, // line = ppm
        inputQty: Number(it.inputQty) || 0, // optional for tooltip
      }))
      .sort((a, b) => (a.name || "").localeCompare(b.name || ""));
  }, []);

  const [badModelData, setBadModelData] = useState([]);
  const [badCategoryData, setBadCategoryData] = useState([]);
  const [bad4MData, setBad4MData] = useState([]);
  const [top5Wost, setTop5Wost] = useState([]);

  const fetchQualityChart = useCallback(
    async ({ fromDate, toDate, busiName, itemCode, categoryCode }) => {
      try {
        setLoadingQuality(true);

        const params = {
          fromDate: moment(fromDate).format("YYYY-MM-DD"),
          toDate: moment(toDate).format("YYYY-MM-DD"),
          factoryId: busiName || undefined,
          itemId: itemCode?.id || undefined,
          categoryId: categoryCode?.id || undefined,
        };

        // ✅ gọi API thật

        const [res, resBad, resBadModel, res4M, resTop5Wost] =
          await Promise.all([
            api.get("/v1/dashboard/get-bad-proc", { ...params }),
            api.get("/v1/dashboard/get-bad-by-name", { ...params }),
            api.get("/v1/dashboard/get-bad-by-model", { ...params }),
            api.get("/v1/dashboard/get-bad-category", { ...params }),
            api.get("/v1/dashboard/get-bad-detail", { ...params }),
          ]);

        const items = res?.data?.items || [];
        const badItems = resBad?.data?.items || [];
        const badModelItems = resBadModel?.data?.items || [];
        const badCategoryItems = res4M?.data?.items || [];
        const top5WostItems = resTop5Wost?.data?.items || [];

        // map data cho chart
        setBadModelData(badItems);
        setBadCategoryData(badModelItems);
        setBad4MData(badCategoryItems);
        setTop5Wost(top5WostItems);
        setQualityData(mapBadProcToChart(items));
      } catch (err) {
        console.error("get-bad-proc error:", err);
        setQualityData([]);
      } finally {
        setLoadingQuality(false);
      }
    },
    [mapBadProcToChart],
  );

  /* =========================
     INIT LOAD (auto call once)
  ========================= */
  useEffect(() => {
    const [fromDate, toDate] = initialValues.time;
    fetchQualityChart({
      fromDate,
      toDate,
      busiName: initialValues.busiName,
      itemCode: initialValues.itemCode,
      categoryCode: initialValues.categoryCode,
    });
  }, [fetchQualityChart, initialValues]);

  /* =========================
     SUBMIT FORM -> CALL API
  ========================= */
  const onSubmit = async (values) => {
    const [fromDate, toDate] = values.time || [];
    if (!fromDate || !toDate) return;

    await fetchQualityChart({
      fromDate,
      toDate,
      busiName: values.busiName,
      itemCode: values.itemCode,
      categoryCode: values.categoryCode,
    });
  };

  /* =========================
     DIALOG STATE
  ========================= */
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [detailData, setDetailData] = useState(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);

  const openDialogBadFunc = useCallback((payload) => {
    setDialogOpen(true);
    setSelectedData(payload);
    setIsLoadingDetail(true);
    setDetailData(null);

    // giả lập call API detail (sau này thay bằng api thật)
    setTimeout(() => {
      setDetailData(FAKE_DETAIL_DATA);
      setIsLoadingDetail(false);
    }, 500);
  }, []);

  const closeDialogBad = useCallback(() => {
    setDialogOpen(false);
    setSelectedData(null);
    setDetailData(null);
    setIsLoadingDetail(false);
  }, []);

  const openDialogWithFakeData = (payload) => {
    openDialogBadFunc(FAKE_SELECTED_DATA);
  };

  /* =========================
     RENDER
  ========================= */
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t("menu.reportPpmTrend") || "PPM Trend Report"}
      loading={loadingQuality}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ handleReset, values, setFieldValue }) => (
          <Form>
            <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
              <Grid container spacing={2}>
                <Grid item lg={4} md={4} xs={12}>
                  <Field.DateRangePicker
                    name="time"
                    label={t("reportPPMTrend.timeRange") || "Time Range"}
                    required
                  />
                </Grid>

                <Grid item lg={2.5} md={4} xs={12}>
                  <Field.Autocomplete
                    name="busiName"
                    label="Busi Name"
                    required
                    options={BUSI_OPTIONS}
                    getOptionValue={(opt) => opt?.id || ""}
                    getOptionLabel={(opt) => opt?.name}
                    onChange={(val) => setFieldValue("busiName", val)}
                  />
                </Grid>

                <Grid item lg={2.5} md={4} xs={12}>
                  <Field.Autocomplete
                    name="itemCode"
                    label="Model"
                    required
                    options={ITEM_OPTIONS}
                    getOptionValue={(opt) => opt?.id || ""}
                    getOptionLabel={(opt) => opt?.name}
                    onChange={(val) => setFieldValue("itemCode", val)}
                    multiple
                  />
                </Grid>

                <Grid item lg={2.5} md={4} xs={12}>
                  <Field.Autocomplete
                    name="categoryCode"
                    label="Category"
                    required
                    options={CATEGORY_OPTIONS}
                    getOptionValue={(opt) => opt?.id || ""}
                    getOptionLabel={(opt) => opt?.name}
                    onChange={(val) => setFieldValue("categoryCode", val)}
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* ✅ QUALITY CHART bind API */}
            <Grid container spacing={2}>
              <Grid item lg={12} md={12} xs={12}>
                <QualityChart chartData={qualityData} title="Quality Trend" />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item lg={6} md={12} xs={12}>
                <BadModelPareto
                  chartDataBad={badModelData}
                  handleBarClick={openDialogWithFakeData}
                />
              </Grid>
              <Grid item lg={6} md={12} xs={12}>
                <BadCategory chartDataCategory={badCategoryData} />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item lg={6} md={12} xs={12}>
                <Pie4MChart chartData4M={bad4MData} />
              </Grid>
              <Grid item lg={6} md={12} xs={12}>
                <WorstNgByMaterialChart data={top5Wost} />
              </Grid>
            </Grid>

            {/* ✅ DIALOG */}
            <DialogBad
              open={dialogOpen}
              onClose={closeDialogBad}
              t={t}
              selectedData={selectedData}
              isLoadingDetail={isLoadingDetail}
              detailData={detailData}
              maxWidth="md"
              fullWidth
            />

            <ActionBar
              onCancel={handleReset}
              elAfter={() => (
                <Button type="submit" icon="search">
                  {t("reportPPMTrend.viewReport")}
                </Button>
              )}
            />
          </Form>
        )}
      </Formik>
    </Page>
  );
};

export default ReportQuanlity;
