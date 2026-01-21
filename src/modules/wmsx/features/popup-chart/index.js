import React, { useEffect, useMemo, useState } from "react";

import {
  Box,
  Grid,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Divider,
} from "@mui/material";
import { Form, Formik } from "formik";
import moment from "moment";
import { useTranslation } from "react-i18next";

import {
  ACTIVE_STATUS,
  ASYNC_SEARCH_LIMIT,
  NOTIFICATION_TYPE,
} from "~/common/constants";
import { useQueryState } from "~/common/hooks";
import ActionBar from "~/components/ActionBar";
import Button from "~/components/Button";
import { Field } from "~/components/Formik";
import Page from "~/components/Page";
import { searchUsersApi } from "~/modules/configuration/redux/sagas/user-management/search-users";

import { ROUTE } from "~/modules/wmsx/routes/config";
import { convertFilterParams } from "~/utils";
import { formSchema } from "./schema";
import { usePopupChart } from "../../redux/hooks/useDashboard";
import { fil } from "date-fns/locale";
import ProcessQualityChart from "../dashboard/components/chart/process-quality-chart";

const breadcrumbs = [
  {
    route: ROUTE.REPORT_POPUP.PATH,
    title: ROUTE.REPORT_POPUP.TITLE,
  },
];

const popupChart = () => {
  const { t } = useTranslation(["wmsx"]);
  const { filters, setFilters } = useQueryState({
    filters: {},
  });
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const initialValues = useMemo(
    () => ({
      time: new Date(),
    }),
    [],
  );

  const refreshData = () => {
    if (selectedDate) {
      const params = {
        procDate: moment(selectedDate).format("YYYY-MM-DD"),
      };
      actions.getPopupChart(params);
    }
  };
  useEffect(() => {
    refreshData();
  }, [selectedDate]);
  const { data, actions } = usePopupChart();

  const onSubmit = async () => {
    await refreshData();
  };
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t("menu.reportPpmTrend") || "PPM Trend Report"}
      loading={isLoading}
    >
      <Formik
        initialValues={initialValues}
        // validationSchema={formSchema(t)}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ handleReset }) => {
          return (
            <Form>
              {/* Filter Section */}
              <Paper
                elevation={1}
                sx={{
                  p: 3,
                  mb: 3,
                  borderRadius: 2,
                }}
              >
                <Grid container spacing={2}>
                  <Grid item lg={3} md={4} xs={12}>
                    <Field.DatePicker
                      name="time"
                      label={t("reportPPMTrend.timeRange") || "Time Range"}
                      maxDate={new Date()}
                      required
                      onChange={(date) => {
                        setSelectedDate(date);
                      }}
                    />
                  </Grid>
                </Grid>
              </Paper>

              {/* Chart Section */}
              <ProcessQualityChart rawData={data?.detail || []} />

              {/* Action Bar */}
              <ActionBar
                onCancel={handleReset}
                elAfter={() => (
                  <Button type="submit" icon="search">
                    {t("reportPPMTrend.viewReport")}
                  </Button>
                )}
              />
            </Form>
          );
        }}
      </Formik>
    </Page>
  );
};

export default popupChart;
