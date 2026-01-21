import Page from "~/components/Page";

import React, { use, useEffect, useMemo, useState } from "react";

import { ROUTE } from "~/modules/wmsx/routes/config";
import { useTranslation } from "react-i18next";
import { Form, Formik } from "formik";
import { endOfMonth, startOfMonth, sub } from "date-fns";
import { Grid, Paper } from "@mui/material";
import ActionBar from "~/components/ActionBar";
import Button from "~/components/Button";
import { Field } from "~/components/Formik";
import PPMDataTable from "../dashboard/components/ppm-data-table";
import {
  useDashboardPPMChart,
  useDashboardPPMPage,
} from "../../redux/hooks/useDashboard";
import { useQueryState } from "~/common/hooks";
import addNotification from "~/utils/toast";
import { NOTIFICATION_TYPE } from "~/common/constants";
import moment from "moment";
import { api } from "~/services/api";

const breadcrumbs = [
  {
    route: ROUTE.REPORT_PPM_TREND_T.PATH,
    title: ROUTE.REPORT_PPM_TREND_T.TITLE,
  },
];

function ReportPPMTrendT() {
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState([]);
  const { t } = useTranslation(["wmsx"]);

  const [selectedDate, setSelectedDate] = useState({
    fromDate: startOfMonth(new Date()),
    toDate: endOfMonth(new Date()),
  });

  const initialValues = useMemo(
    () => ({
      time: [startOfMonth(new Date()), endOfMonth(new Date())],
    }),
    [],
  );

  const {
    page,
    pageSize,
    sort,
    filters,
    keyword,
    tab,
    setFilters,
    setPage,
    setPageSize,
    setSort,
  } = useQueryState();

  const {
    data: { list: ppmChartList, total },
    actions,
  } = useDashboardPPMChart();

  const { data: dataPage, actions: actionPage } = useDashboardPPMPage();

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(),
      sort: convertSortParams(sort),
      fromDate: moment(selectedDate?.fromDate).format("YYYY-MM-DD"),
      toDate: moment(selectedDate?.toDate).format("YYYY-MM-DD"),
    };
    actions.getPPMChartList(params);
  };

  const fetchPPMTrendData = async (values) => {
    setIsLoading(true);
    try {
      const fromTime = moment(values?.time?.[0]).format("YYYY-MM-DD");
      const toTime = moment(values?.time?.[1]).format("YYYY-MM-DD");

      const params = {
        fromDate: fromTime,
        toDate: toTime,
      };

      // Call API to get PPM trend data
      const res = await api.get("/v1/dashboard/get-dashboard-chart", {
        ...params,
      });

      setIsLoading(false);
      const { message, statusCode, data } = res;

      if (statusCode === 200) {
        setChartData(data?.charts || []);
        setFilters({
          periodType: values?.periodType,
          time: values?.time,
        });
      } else {
        addNotification(message, NOTIFICATION_TYPE.ERROR);
        setChartData([]);
      }
    } catch (error) {
      setIsLoading(false);
      addNotification(
        error?.message ||
          t("reportPPMTrend.fetchError") ||
          "Error fetching data",
        NOTIFICATION_TYPE.ERROR,
      );
      setChartData([]);
    }
  };

  useEffect(() => {
    // fetchPPMTrendData({
    //   time: filters.time,
    // });
    // actionPage.getPPMPage({
    //   fromDate: "2026-01-01",
    //   toDate: "2026-01-20",
    // });
  }, []);

  console.log("dataPage", dataPage);

  const refreshDataPPM = () => {
    setIsLoading(true);
    const params = {
      // keyword: keyword.trim(),
      page,
      limit: pageSize,
      // filter: convertFilterParams(),
      // sort: convertSortParams(sort),
      fromDate: moment(selectedDate?.fromDate).format("YYYY-MM-DD"),
      toDate: moment(selectedDate?.toDate).format("YYYY-MM-DD"),
    };
    actionPage.getPPMPage(params);

    setIsLoading(false);
  };

  const onSubmit = async (values) => {
    // await fetchPPMTrendData(values);
    // await refreshData();

    console.log(values);

    await refreshDataPPM();
  };

  useEffect(() => {
    refreshDataPPM();
  }, [page, pageSize, filters, sort, keyword, tab]);

  return (
    <>
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
                    <Grid item lg={3.3} md={4} xs={12}>
                      <Field.DateRangePicker
                        name="time"
                        label={t("reportPPMTrend.timeRange") || "Time Range"}
                        maxDate={new Date()}
                        required
                        onChange={(dateRange) => {
                          if (dateRange?.[0] && dateRange?.[1]) {
                            setSelectedDate({
                              fromDate: dateRange?.[0],
                              toDate: dateRange?.[1],
                            });
                          }
                        }}
                      />
                    </Grid>
                    {/* <Grid item lg={3}>
                      <Field.Autocomplete
                        name="createdBy"
                        placeholder={t("general:common.createdBy")}
                        asyncRequest={(s) =>
                          searchUsersApi({
                            keyword: s,
                            limit: ASYNC_SEARCH_LIMIT,
                            filter: convertFilterParams({
                              status: ACTIVE_STATUS.ACTIVE,
                            }),
                          })
                        }
                        asyncRequestHelper={(res) => res?.data?.items}
                        getOptionLabel={(opt) => opt?.fullName}
                        getOptionSubLabel={(opt) => opt?.username}
                      />
                    </Grid> */}
                  </Grid>
                </Paper>

                {/* Chart Section */}

                {/* {chartData && chartData.length > 0 ? (
                  <Box sx={{ mb: 3 }}>
                    <Grid container spacing={2}>
                      {chartData?.map((item) => (
                        <Grid item xs={12} lg={6} md={12} sx={{ mb: 1.5 }}>
                          <PPMTrendChart
                            title={item?.busiName}
                            data={item?.data}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                ) : (
                  !isLoading && (
                    <Paper
                      elevation={1}
                      sx={{
                        p: 4,
                        mb: 3,
                        borderRadius: 2,
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="body1" color="text.secondary">
                        {t("reportPPMTrend.noData") ||
                          "No data available. Please select filters and click View Report."}
                      </Typography>
                    </Paper>
                  )
                )} */}

                <Grid container spacing={2}>
                  <Grid item lg={12} md={12} xs={12}>
                    <PPMDataTable
                      requestProps={{
                        ppmChartList: dataPage.items,
                        total: dataPage?.total,
                        page,
                        pageSize,
                        sort,
                        filters,
                        keyword,
                        tab,
                        isLoading,
                        setPage,
                        setPageSize,
                        setSort,
                      }}
                    />
                  </Grid>
                </Grid>

                {/* Action Bar */}
                <ActionBar
                  onCancel={handleReset}
                  elAfter={() => (
                    <Button type="submit" icon="search">
                      {t("reportPPMTrend.viewReport") || "View Report"}
                    </Button>
                  )}
                />
              </Form>
            );
          }}
        </Formik>
      </Page>
    </>
  );
}

export default ReportPPMTrendT;
