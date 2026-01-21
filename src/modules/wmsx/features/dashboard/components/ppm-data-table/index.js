import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { ACTIVE_STATUS, ACTIVE_STATUS_OPTIONS } from "~/common/constants";
import { FUNCTION_CODE } from "~/common/constants/functionCode";
import { useQueryState } from "~/common/hooks";
import Button from "~/components/Button";
import DataTable from "~/components/DataTable";
import FilterArea from "~/components/FilterArea";
import Guard from "~/components/Guard";
import HotKeys from "~/components/HotKeys";
import Icon from "~/components/Icon";
import IconButton from "~/components/IconButton";
import ImportExport from "~/components/ImportExport";
import Page from "~/components/Page";
import Status from "~/components/Status";
import Tabs from "~/components/Tabs";
import TaskBar from "~/components/TaskBar";
import useRoleManagement from "~/modules/configuration/redux/hooks/usePPMDataTable";
import { ROUTE } from "~/modules/configuration/routes/config";

import {
  getTemplatePPMDataTableImportApi,
  importPPMDataTableApi,
} from "../api/import-export";
import DialogActive from "../dialogs/active";
import DialogInActive from "../dialogs/in-active";
import FilterForm from "./filter-form";
import { useDashboardPPMChart } from "~/modules/wmsx/redux/hooks/useDashboard";
const breadcrumbs = [
  {
    title: "decentralization",
  },
  {
    route: ROUTE.ROLE_LIST.LIST.PATH,
    title: ROUTE.ROLE_LIST.LIST.TITLE,
  },
];

const PPMDataTable = ({ requestProps }) => {
  const { t } = useTranslation(["wmsx"]);

  const {
    total,
    page,
    pageSize,
    sort,
    setPage,
    setPageSize,
    setSort,
    isLoading,
    ppmChartList,
  } = requestProps || {};

  const columns = [
    {
      field: "kpiId",
      headerName: t("kpi.kpiId"),
      width: 90,
      align: "center",
      headerAlign: "center",
      fixed: true,
      renderCell: (params) => {
        return params.row.KPI_ID;
      },
    },
    {
      field: "BUSI_DIVI_ID",
      headerName: t("kpi.busiDiviId"),
      width: 120,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "BUSI_NAME",
      headerName: t("kpi.busiName"),
      width: 120,
      fixed: true,
    },
    {
      field: "PERIOD_TYPE",
      headerName: t("kpi.periodType"),
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "PERIOD_KEY",
      headerName: t("kpi.periodKey"),
      width: 110,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "DT_FROM",
      headerName: t("kpi.dtFrom"),
      width: 120,
    },
    {
      field: "PPM",
      headerName: t("kpi.ppm"),
      width: 120,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "GROUP_NAME",
      headerName: t("kpi.groupName"),
      width: 120,
    },
    {
      field: "LINE_GROUP",
      headerName: t("kpi.lineGroup"),
      width: 120,
    },
    {
      field: "PROC_NAME",
      headerName: t("kpi.procName"),
      width: 140,
    },
    {
      field: "INPUT",
      headerName: t("kpi.input"),
      width: 140,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "NG",
      headerName: t("kpi.ng"),
      width: 120,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "FPY",
      headerName: t("kpi.yield"),
      width: 110,
      align: "right",
      headerAlign: "right",
    },
  ];

  return (
    <>
      <DataTable
        title={t("ppmDataTable.title")}
        columns={columns}
        rows={ppmChartList}
        pageSize={pageSize}
        page={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        total={total}
        sort={sort}
      />
    </>
  );
};

export default PPMDataTable;
