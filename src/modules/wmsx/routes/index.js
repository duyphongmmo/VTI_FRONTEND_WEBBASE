import popupChart from "../features/popup-chart";
import ReportExport from "../features/report-export";
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
  // {
  //   path: ROUTE.REPORT_PPM_TREND_TEST.PATH,
  //   name: ROUTE.REPORT_PPM_TREND_TEST.TITLE,
  //   component: ReportPPMTrendTest,
  //   icon: "report",
  //   isInSidebar: true,
  // },
  {
    path: ROUTE.REPORT_POPUP.PATH,
    name: ROUTE.REPORT_POPUP.TITLE,
    component: popupChart,
    icon: "report",
    isInSidebar: true,
  },
];

export default routes;
