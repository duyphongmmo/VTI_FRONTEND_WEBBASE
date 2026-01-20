import React from 'react'

import PPMTrendChart from './index'

/**
 * Example usage của PPMTrendChart component
 */
export default function PPMTrendChartExample() {
  // Sample data theo yêu cầu
  const sampleData = [
    {
      periodType: 'Q',
      periodKey: '25Q2',
      date: '2025-04-01',
      ppm: 999,
    },
    {
      periodType: 'Q',
      periodKey: '25Q3',
      date: '2025-07-01',
      ppm: 1276,
    },
    {
      periodType: 'Q',
      periodKey: '25Q4',
      date: '2025-10-01',
      ppm: 984,
    },
    {
      periodType: 'Q',
      periodKey: '26Q1',
      date: '2026-01-01',
      ppm: 1202,
    },
    {
      periodType: 'M',
      periodKey: '2510',
      date: '2025-10-01',
      ppm: 896,
    },
    {
      periodType: 'M',
      periodKey: '2511',
      date: '2025-11-01',
      ppm: 758,
    },
    {
      periodType: 'M',
      periodKey: '2512',
      date: '2025-12-01',
      ppm: 1077,
    },
    {
      periodType: 'M',
      periodKey: '2601',
      date: '2026-01-01',
      ppm: 1221,
    },
    {
      periodType: 'W',
      periodKey: '2552',
      date: '2025-12-22',
      ppm: 1767,
    },
    {
      periodType: 'W',
      periodKey: '2601',
      date: '2025-12-29',
      ppm: 1255,
    },
    {
      periodType: 'W',
      periodKey: '2602',
      date: '2026-01-05',
      ppm: 689,
    },
    {
      periodType: 'W',
      periodKey: '2603',
      date: '2026-01-12',
      ppm: 983,
    },
    {
      periodType: 'D',
      periodKey: '260111',
      date: '2026-01-11',
      ppm: 1293,
    },
    {
      periodType: 'D',
      periodKey: '260112',
      date: '2026-01-12',
      ppm: 2011,
    },
    {
      periodType: 'D',
      periodKey: '260113',
      date: '2026-01-13',
      ppm: 1788,
    },
    {
      periodType: 'D',
      periodKey: '260114',
      date: '2026-01-14',
      ppm: 1253,
    },
    {
      periodType: 'D',
      periodKey: '260115',
      date: '2026-01-15',
      ppm: 1845,
    },
    {
      periodType: 'D',
      periodKey: '260116',
      date: '2026-01-16',
      ppm: 2110,
    },
  ]

  return (
    <div>
      <PPMTrendChart 
        data={sampleData} 
        title="총합 이탈률 (ppm)" 
      />
    </div>
  )
}
