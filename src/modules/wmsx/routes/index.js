import ReportExport from "../features/report-export";
import ReportPPMTrendT from "../features/report-ppm-t";
import ReportPPMTrendTest from "../features/report-ppm-test";
import ReportPPMTrend from "../features/report-ppm-trend";
import { ROUTE } from "./config";

const routes = [
  // {
  //   path: ROUTE.REPORT_EXPORT.PATH,
  //   name: ROUTE.REPORT_EXPORT.TITLE,
  //   component: ReportExport,
  //   icon: "report",
  //   isInSidebar: true,
  // },
  // {
  //   path: ROUTE.REPORT_PPM_TREND.PATH,
  //   name: ROUTE.REPORT_PPM_TREND.TITLE,
  //   component: ReportPPMTrend,
  //   icon: "report",
  //   isInSidebar: true,
  // },
  {
    path: ROUTE.REPORT_PPM_TREND_TEST.PATH,
    name: ROUTE.REPORT_PPM_TREND_TEST.TITLE,
    component: ReportPPMTrendTest,
    icon: "report",
    isInSidebar: true,
  },
  {
    path: ROUTE.REPORT_PPM_TREND_T.PATH,
    name: ROUTE.REPORT_PPM_TREND_T.TITLE,
    component: ReportPPMTrendT,
    icon: "report",
    isInSidebar: true,
  },
];

export default routes;
