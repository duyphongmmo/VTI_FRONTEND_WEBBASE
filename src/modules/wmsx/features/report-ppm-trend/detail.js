import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

export default function ReportPPMTrendDetail({detailData, t}) {
  return (
    
        <Box>
              {/* Main Metrics */}
              {detailData?.items && detailData.items.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.5 }}>
                    {t('reportPPMTrend.mainMetrics') || '주요 지표'}
                  </Typography>
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                          <TableCell sx={{ fontWeight: 600 }}>
                            {t('reportPPMTrend.item') || '항목'}
                          </TableCell>
                          <TableCell sx={{ fontWeight: 600 }} align="right">
                            {t('reportPPMTrend.value') || '값'}
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {detailData.items.map((item, index) => (
                          <TableRow key={index} hover>
                            <TableCell>{item.name || item.label}</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 500 }}>
                              {typeof item.value === 'number' 
                                ? item.value.toLocaleString() 
                                : item.value}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}
              {/* Top Defects */}
              {detailData?.topDefects && detailData.topDefects.length > 0 && (
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.5 }}>
                    {t('reportPPMTrend.topDefects') || '상위 불량 코드'}
                  </Typography>
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                          <TableCell sx={{ fontWeight: 600 }}>
                            {t('reportPPMTrend.defectCode') || '불량 코드'}
                          </TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>
                            {t('reportPPMTrend.defectName') || '불량명'}
                          </TableCell>
                          <TableCell sx={{ fontWeight: 600 }} align="right">
                            {t('reportPPMTrend.count') || '수량'}
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {detailData.topDefects.map((item, index) => (
                          <TableRow key={index} hover>
                            <TableCell>
                              <Typography 
                                variant="body2" 
                                sx={{ 
                                  fontFamily: 'monospace',
                                  fontWeight: 600,
                                  color: '#5470C6',
                                }}
                              >
                                {item.defectCode}
                              </Typography>
                            </TableCell>
                            <TableCell>{item.defectName}</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 500 }}>
                              {item.count.toLocaleString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}

              {/* No data message */}
              {(!detailData?.items || detailData.items.length === 0) &&
               (!detailData?.defectTypes || detailData.defectTypes.length === 0) &&
               (!detailData?.topDefects || detailData.topDefects.length === 0) && (
                <Box sx={{ py: 4, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    {t('reportPPMTrend.noDetailData') || 'No detail data available'}
                  </Typography>
                </Box>
              )}
            </Box>
    
  )
}