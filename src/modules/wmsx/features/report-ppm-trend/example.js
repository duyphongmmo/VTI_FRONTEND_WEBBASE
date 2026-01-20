import React from 'react'

import ReportPPMTrend from './index'

/**
 * Example usage of ReportPPMTrend component
 * This component demonstrates how the PPM Trend Report works
 * 
 * Features:
 * - Filter by period type (Quarter, Month, Week, Day)
 * - Filter by time range
 * - Filter by warehouse, vendor, and item
 * - Display PPM trend chart using PPMTrendChart component
 * - Fetch data from API endpoint: /v1/report/ppm-trend
 * 
 * The component uses the PPMTrendChart from the dashboard
 * which supports multiple period types and displays data with:
 * - Line chart with data points
 * - Custom tooltips
 * - Formatted X-axis labels based on period type
 * - Segmented lines for different period types
 */
export default function ReportPPMTrendExample() {
  return <ReportPPMTrend />
}
