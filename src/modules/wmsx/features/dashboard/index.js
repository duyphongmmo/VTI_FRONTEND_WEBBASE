import React, { useEffect, useState } from "react";

import { Grid } from "@mui/material";
import { add, endOfDay, endOfWeek, startOfDay, startOfWeek } from "date-fns";
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";

import DateRangePicker from "~/components/DateRangePicker";
import Page from "~/components/Page";
import {
  DashboardConsumer,
  DashboardProvider,
} from "~/contexts/DashboardContext";
import { addHours } from "~/utils";

import { DASHBOARD_CHART, WMSX_DASHBOARD_CHART_OPTION } from "../../constants";
import { useDashboardYieldChart } from "../../redux/hooks/useDashboard";
import { ROUTE } from "../../routes/config";
import DefectRateChart from "./components/chart/defect-rate-chart";
import ExportReceipt from "./components/import-export-receipt/export-receipt";
import ImportReceipt from "./components/import-export-receipt/import-receipt";
import InventoryQuantity from "./components/inventory-quantity";
import UsedMaterialsReport from "./components/materials-used";
import MovementReport from "./components/movement-report";
import StockItemReport from "./components/stock-item-report";
import WarehouseTransfer from "./components/warehouse-transfer";

const breadcrumbs = [
  {
    route: ROUTE.DASHBOARD.PATH,
    title: ROUTE.DASHBOARD.TITLE,
  },
];

function Dashboard() {
  const { t } = useTranslation(["wmsx"]);

  const initialDate = [
    startOfWeek(new Date(), { weekStartsOn: 1 }),
    endOfWeek(new Date(), { weekStartsOn: 1 }),
  ];

  const { data: yieldChartList, actions } = useDashboardYieldChart();

  useEffect(() => {
    actions.getYieldChartList();
  }, []);

  const [selectedDate, setSelectedDate] = useState(initialDate);
  const groupOptions = [
    {
      name: "day",
      value: 0,
    },
    {
      name: "month",
      value: 1,
    },
    {
      name: "quarter",
      value: 2,
    },
  ];
  const handleChangeSelect = (value) => {
    if (selectedDate[0] && selectedDate[1]) {
      setSelectedDate([value[0] ?? null, null]);
    } else {
      setSelectedDate(value);
    }
  };
  const fromDate = selectedDate[0]
    ? addHours(7, startOfDay(new Date(selectedDate[0])))
    : null;
  const toDate = selectedDate[1]
    ? addHours(7, endOfDay(new Date(selectedDate[1])))
    : null;

  return (
    <DashboardProvider chartOptions={WMSX_DASHBOARD_CHART_OPTION}>
      <DashboardConsumer>
        {({ isVisibleChart, visibleCharts }) => {
          return (
            <Page
              title={t("dashboard.title")}
              breadcrumbs={breadcrumbs}
              freeSolo
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Formik
                    initialValues={{ createdAt: initialDate }}
                    onSubmit={() => {}}
                    enableReinitialize
                  >
                    {() => (
                      <Form>
                        <Grid
                          container
                          rowSpacing={1}
                          columnSpacing={2}
                          sx={{ justifyContent: "flex-end" }}
                        >
                          <Grid item xs={12} lg={3} md={6}>
                            <DateRangePicker
                              maxDate={add(selectedDate[0], { years: 3 })}
                              // minDate={sub(selectedDate[1], {
                              //   years: 3,
                              // })}
                              name="createdAt"
                              value={selectedDate}
                              onChange={handleChangeSelect}
                              helperText={t("general:form.required")}
                              error={!selectedDate[0]}
                            />
                          </Grid>
                        </Grid>
                      </Form>
                    )}
                  </Formik>
                </Grid>
                <Grid item xs={12}>
                  <DefectRateChart data={yieldChartList} />
                </Grid>
                {!visibleCharts.includes(
                  DASHBOARD_CHART.WAREHOUSE_IMPORT_RECEIPT,
                ) ||
                !visibleCharts.includes(
                  DASHBOARD_CHART.WAREHOUSE_EXPORT_RECEIPT,
                ) ||
                !visibleCharts.includes(DASHBOARD_CHART.WAREHOUSE_TRANSFER) ? (
                  <>
                    {isVisibleChart(
                      DASHBOARD_CHART.WAREHOUSE_IMPORT_RECEIPT,
                    ) && (
                      <Grid item xs={12} lg={6} md={12} sx={{ mb: 1.5 }}>
                        <ImportReceipt fromDate={fromDate} toDate={toDate} />
                      </Grid>
                    )}{" "}
                    {isVisibleChart(
                      DASHBOARD_CHART.WAREHOUSE_EXPORT_RECEIPT,
                    ) && (
                      <Grid item xs={12} lg={6} md={12} sx={{ mb: 1.5 }}>
                        <ExportReceipt fromDate={fromDate} toDate={toDate} />
                      </Grid>
                    )}{" "}
                    {isVisibleChart(DASHBOARD_CHART.WAREHOUSE_TRANSFER) && (
                      <Grid item xs={12} lg={6} md={12} sx={{ mb: 1.5 }}>
                        <WarehouseTransfer
                          fromDate={fromDate}
                          toDate={toDate}
                        />
                      </Grid>
                    )}{" "}
                  </>
                ) : (
                  <>
                    {isVisibleChart(
                      DASHBOARD_CHART.WAREHOUSE_IMPORT_RECEIPT,
                    ) && (
                      <Grid item xs={12} md={6} lg={4} sx={{ mb: 1.5 }}>
                        <ImportReceipt fromDate={fromDate} toDate={toDate} />
                      </Grid>
                    )}{" "}
                    {isVisibleChart(
                      DASHBOARD_CHART.WAREHOUSE_EXPORT_RECEIPT,
                    ) && (
                      <Grid item xs={6} md={6} lg={4} sx={{ mb: 1.5 }}>
                        <ExportReceipt fromDate={fromDate} toDate={toDate} />
                      </Grid>
                    )}{" "}
                    {isVisibleChart(DASHBOARD_CHART.WAREHOUSE_TRANSFER) && (
                      <Grid item xs={6} md={6} lg={4} sx={{ mb: 1.5 }}>
                        <WarehouseTransfer
                          fromDate={fromDate}
                          toDate={toDate}
                        />
                      </Grid>
                    )}{" "}
                  </>
                )}
                {isVisibleChart(DASHBOARD_CHART.TOP_ITEM_USE) && (
                  <Grid item xs={12} lg={6} md={12} sx={{ mb: 1.5 }}>
                    <UsedMaterialsReport fromDate={fromDate} toDate={toDate} />
                  </Grid>
                )}
                {isVisibleChart(DASHBOARD_CHART.STOCK_ITEM_REPORT) && (
                  <Grid item xs={12} lg={6} md={12} sx={{ mb: 1.5 }}>
                    <StockItemReport fromDate={fromDate} toDate={toDate} />
                  </Grid>
                )}{" "}
                {/* {fakeData?.map((item) => (
                  <Grid item xs={12} lg={12} md={12} sx={{ mb: 1.5 }}>
                    <AnalyzeReportChart
                      title={item?.title}
                      enumMap={item?.enumMap}
                      data={item?.data}
                    />
                  </Grid>
                ))} */}
                {isVisibleChart(DASHBOARD_CHART.MOVEMENT_REPORT) && (
                  <Grid item xs={12} lg={6} md={12} sx={{ mb: 1.5 }}>
                    <MovementReport
                      fromDate={fromDate}
                      toDate={toDate}
                      groupOptions={groupOptions}
                    />
                  </Grid>
                )}{" "}
                {isVisibleChart(DASHBOARD_CHART.INVENTORY_QUANTITY) && (
                  <Grid item xs={12} lg={6} md={12} sx={{ mb: 1.5 }}>
                    <InventoryQuantity
                      fromDate={fromDate}
                      toDate={toDate}
                      groupOptions={groupOptions}
                    />
                  </Grid>
                )}{" "}
              </Grid>
            </Page>
          );
        }}
      </DashboardConsumer>
    </DashboardProvider>
  );
}

export default Dashboard;
