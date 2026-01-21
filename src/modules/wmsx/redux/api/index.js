import { api } from "~/services/api"

export const getPPMTrendData = async (params) => {
  const response = await api.get('/v1/users/yield-chart', { params })
  return response
}

export const getPPMTrendDataTemplate = async (params) => {
  const response = await api.get('/v1/users/static/template-import/ppm-trend', { params })
  return response.data
}

export const getPPMTrendDetail = async (params) => {
  // TODO: Replace with real API call when backend is ready
  // const response = await api.get('/v1/users/yield-chart/detail', { params })
  // return response
  
  // Fake sample data for testing
  return new Promise((resolve) => {
    setTimeout(() => {
      const { periodType, periodKey, date } = params
      
      // Generate different sample data based on period type
      const sampleData = {
        statusCode: 200,
        message: 'Success',
        data: {
          summary: {
            periodType,
            periodKey,
            date,
          },
          items: [
            { name: '총 생산 수량 (Total Production)', value: 1250000 },
            { name: '불량 수량 (Defect Quantity)', value: 3125 },
            { name: 'PPM 비율 (PPM Rate)', value: 2500 },
            { name: '검사 수량 (Inspection Quantity)', value: 1250000 },
            { name: '합격 수량 (Pass Quantity)', value: 1246875 },
            { name: '불합격 수량 (Fail Quantity)', value: 3125 },
            { name: '재작업 수량 (Rework Quantity)', value: 875 },
            { name: '폐기 수량 (Scrap Quantity)', value: 2250 },
            { name: '검사 완료율 (Inspection Rate)', value: '100%' },
            { name: '수율 (Yield Rate)', value: '99.75%' },
          ],
          defectTypes: [
            { type: '치수 불량 (Dimension)', count: 1250, percentage: '40%' },
            { type: '외관 불량 (Appearance)', count: 938, percentage: '30%' },
            { type: '조립 불량 (Assembly)', count: 625, percentage: '20%' },
            { type: '기능 불량 (Function)', count: 312, percentage: '10%' },
          ],
          topDefects: [
            { defectCode: 'D001', defectName: '긁힘 (Scratch)', count: 625 },
            { defectCode: 'D002', defectName: '치수 초과 (Over Size)', count: 563 },
            { defectCode: 'D003', defectName: '변색 (Discoloration)', count: 438 },
            { defectCode: 'D004', defectName: '오염 (Contamination)', count: 375 },
            { defectCode: 'D005', defectName: '파손 (Damage)', count: 312 },
          ],
        },
      }
      
      resolve(sampleData)
    }, 800) // Simulate network delay
  })
}