import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Grid, Paper } from "@mui/material";
import { Form, Formik } from "formik";
import moment from "moment";
import { useTranslation } from "react-i18next";

import { useQueryState } from "~/common/hooks";
import ActionBar from "~/components/ActionBar";
import Button from "~/components/Button";
import { Field } from "~/components/Formik";
import Page from "~/components/Page";
import { ROUTE } from "~/modules/wmsx/routes/config";

import { usePopupChart } from "../../redux/hooks/useDashboard";
import ProcessQualityChart from "../dashboard/components/chart/process-quality-chart";

const breadcrumbs = [
  { route: ROUTE.REPORT_POPUP.PATH, title: ROUTE.REPORT_POPUP.TITLE },
];

const PopupChart = () => {
  const { t } = useTranslation(["wmsx"]);
  useQueryState({ filters: {} }); // nếu chưa dùng filters thì giữ minimal vậy thôi

  const { data, actions } = usePopupChart();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const initialValues = useMemo(() => ({ time: new Date() }), []);

  const refreshData = useCallback(() => {
    const params = { procDate: moment(selectedDate).format("YYYY-MM-DD") };
    actions.getPopupChart(params);
  }, [actions, selectedDate]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const onSubmit = async () => {
    refreshData();
  };

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t("menu.reportPpmTrend") || "PPM Trend Report"}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ handleReset }) => (
          <Form>
            <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
              <Grid container spacing={2}>
                <Grid item lg={3} md={4} xs={12}>
                  <Field.DatePicker
                    name="time"
                    label={t("reportPPMTrend.timeRange") || "Time Range"}
                    maxDate={new Date()}
                    required
                    onChange={(date) => setSelectedDate(date)}
                  />
                </Grid>
              </Grid>
            </Paper>

            <ProcessQualityChart rawData={data?.detail || []} />

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

export default PopupChart;
