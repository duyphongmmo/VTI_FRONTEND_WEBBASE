import {
  CHART_QUANTITY_ITEM_ENUM_MAP,
  CHART_QUANTITY_ITEM_TYPE_ENUM,
  CHART_QUANTITY_PLAN_ENUM_MAP,
  CHART_QUANTITY_PLAN_TYPE_ENUM,
  CHART_QUANTITY_TEM_ENUM_MAP,
  CHART_QUANTITY_TEM_TYPE_ENUM,
  CHART_QUANTITY_WAREHOUSE_ENUM_MAP,
  CHART_QUANTITY_WAREHOUSE_TYPE_ENUM,
} from '~/modules/wmsx/constants'

function random35k() {
  return Math.floor(Math.random() * 35001) // 0–35000
}

function random40() {
  return Math.floor(Math.random() * 40) + 1
}

function random20k() {
  return Math.floor(Math.random() * 20001) // 0–35000
}
function random10k() {
  return Math.floor(Math.random() * 10001) // 0–35000
}
function generateChartQuantityPlan() {
  const nccList = [
    'CCV3800',
    'CSV6200',
    'DVKA948',
    'HTV_VC004',
    'KPVNHN003',
    'SS052',
  ]

  return nccList.map((ncc) => {
    const tong_sl_kh = random35k()
    const tong_sl_da_nhap = random35k()
    const tong_sl_chua_nhap = random35k()
    return {
      text: ncc,
      [CHART_QUANTITY_PLAN_TYPE_ENUM.TOTAL_QUANTITY_PLAN]: tong_sl_kh,
      [CHART_QUANTITY_PLAN_TYPE_ENUM.TOTAL_QUANTITY_IMPORTED]: tong_sl_da_nhap,
      [CHART_QUANTITY_PLAN_TYPE_ENUM.TOTAL_QUANTITY_NOT_YET_IMPORTED]:
        tong_sl_chua_nhap,
    }
  })
}

function generateChartQuantityItem() {
  const nccList = [
    'CCV3800',
    'CSV6200',
    'DVKA948',
    'HTV_VC004',
    'KPVNHN003',
    'SS052',
  ]

  return nccList.map((ncc) => {
    const so_item_kh = random40()
    const so_item_da_nhap = random40()
    const so_item_chua_nhap = random40()
    return {
      text: ncc,
      [CHART_QUANTITY_ITEM_TYPE_ENUM.TOTAL_QUANTITY_PLAN]: so_item_kh,
      [CHART_QUANTITY_ITEM_TYPE_ENUM.TOTAL_QUANTITY_IMPORTED]: so_item_da_nhap,
      [CHART_QUANTITY_ITEM_TYPE_ENUM.TOTAL_QUANTITY_NOT_YET_IMPORTED]:
        so_item_chua_nhap,
    }
  })
}

function generateChartQuantityWarehouse() {
  const nccList = [
    'AD-KH-01',
    'CM-KD-TA',
    'CM-KD-TG',
    'CM-KD-TU',
    'DA-KD-CM',
    'DA-KD-HĐ',
    'DA-KD-HL',
    'DA-KD-TA',
    'DA-KD-TG',
    'DA-VH-TG',
    'HM-KD-TA',
    'HM-KD-TG',
    'HN_K_HP_001',
    'KQA711_001',
    'KQA_001',
    'QA_K_HN',
    'TC-KD-TG',
    'VTI-KHO',
  ]
  return nccList.map((ncc) => {
    const so_item_kh = random20k()
    const so_item_da_nhap = random20k()
    return {
      text: ncc,
      [CHART_QUANTITY_WAREHOUSE_TYPE_ENUM.TOTAL_QUANTITY_PLAN]: so_item_kh,
      [CHART_QUANTITY_WAREHOUSE_TYPE_ENUM.TOTAL_QUANTITY_IMPORTED_ITEM]:
        so_item_da_nhap,
    }
  })
}

function generateChartQuantityTem() {
  const nccList = [
    'AD-KH-01',
    'CM-KD-TA',
    'CM-KD-TG',
    'CM-KD-TU',
    'DA-KD-CM',
    'DA-KD-HĐ',
    'DA-KD-HL',
    'DA-KD-TA',
    'DA-KD-TG',
    'DA-VH-TG',
    'HM-KD-TA',
    'HM-KD-TG',
    'HN_K_HP_001',
    'KQA711_001',
    'KQA_001',
    'QA_K_HN',
    'TC-KD-TG',
    'VTI-KHO',
  ]
  return nccList.map((ncc) => {
    const so_item_kh = random10k()
    const so_item_da_nhap = random10k()
    return {
      text: ncc,
      [CHART_QUANTITY_TEM_TYPE_ENUM.TOTAL_TEM_SPARE]: so_item_kh,
      [CHART_QUANTITY_TEM_TYPE_ENUM.TOTAL_TEM_CHEMISTRY]:
        so_item_da_nhap,
    }
  })
}

export const fakeData = [
  {
    text: `Biểu đồ so sánh tổng số lượng hàng hóa (SL KH) theo nhà cung cấp với tổng số lượng đã nhập kho và lượng tồn kho (chưa nhập kho). Dựa trên dữ liệu từ Chart DataFrame, ta có thể nhận thấy một số điểm sau:

Nhà cung cấp KPVNHN003 chiếm phần lớn về mặt số lượng hàng hóa, với tổng SL KH là 33,173 đơn vị. Trong đó, chỉ có khoảng 19,739 đơn vị đã được nhập kho, còn lại 13,434 đơn vị chưa nhập kho. Điều này cho thấy rằng công ty đang gặp khó khăn trong việc quản lý hàng tồn kho của nhà cung cấp này.

Nhà cung cấp CCV3800 cũng có một lượng hàng hóa đáng kể, với tổng SL KH là 382 đơn vị. Tuy nhiên, không có thông tin nào về số lượng đã nhập kho hay chưa nhập kho, nên chúng ta cần thêm thông tin để đánh giá hiệu quả quản lý hàng tồn kho của nhà cung cấp này.

Trong khi đó, hai nhà cung cấp CSV6200 và DVKA948 chỉ cung cấp rất ít hàng hóa, mỗi nhà cung cấp chỉ có 5 và 9 đơn vị tương ứng. Mặc dù vậy, cả hai nhà cung cấp đều đã hoàn thành việc nhập toàn bộ hàng hóa vào kho.

Cuối cùng, nhà cung cấp HTV_VC004 cung cấp 36 đơn vị hàng hóa, trong đó chỉ có 3 đơn vị đã được nhập kho, còn lại 33 đơn vị chưa nhập kho. Điều này cho thấy rằng công ty cần cải thiện quá trình nhập kho đối với hàng hóa từ nhà cung cấp này.

Tóm lại, biểu đồ cho thấy sự chênh lệch lớn giữa SL KH và SL đã nhập kho của một số nhà cung cấp, đặc biệt là nhà cung cấp KPVNHN003. Điều này có thể gây rủi ro về quản lý hàng tồn kho dẫn đến việc cung ứng không kịp thời. Đồng thời, cần chú ý đến việc tăng cường quy trình nhập kho để giảm thiểu tình trạng hàng hóa chưa được nhập kho. Các nhà cung cấp khác như CSV6200 và DVKA948 cần tiếp tục duy trì hiệu suất hiện tại. Đối với nhà cung cấp HTV_VC004, công ty cần xử lý kịp thời hàng tồn kho để tránh ảnh hưởng đến hoạt động kinh doanh.`,
    data: generateChartQuantityPlan(),
    enumMap: CHART_QUANTITY_PLAN_ENUM_MAP,
    title: 'analyzeReport.totalQuantityBySupplier',
  },
  {
    data: generateChartQuantityItem(),
    enumMap: CHART_QUANTITY_ITEM_ENUM_MAP,
    title: 'analyzeReport.numberBySupplier',
    text: `Trong biểu đồ so sánh số lượng Item KH, số lượng Item đã nhập kho và số lượng Item chưa nhập kho theo nhà cung cấp, ta có thể nhận thấy một số xu hướng và đặc điểm sau:

Nhà cung cấp KPVNHN003 chiếm tỉ lệ cao nhất về số lượng Item KH với tổng cộng 48 mặt hàng, trong đó có 29 mặt hàng đã được nhập kho và còn lại 19 mặt hàng chưa nhập kho. Điều này cho thấy có sự chênh lệch lớn giữa số lượng Item KH và số lượng Item đã nhập kho của nhà cung cấp này, gợi ý rằng có thể đang gặp vấn đề hoặc khó khăn trong quá trình nhập kho.

Nhà cung cấp CCV3800 và CSV6200 đều có số lượng Item tương đối ít – 7 mặt hàng từ nhà cung cấp CCV3800 và 9 mặt hàng từ CSV6200 đều chưa được nhập kho hoàn toàn. Điều này cho thấy có thể quá trình hoàn thành việc nhập hàng vẫn còn tồn đọng.

Ngược lại, hai nhà cung cấp DVKA948 và HTV_VC004 chỉ cung cấp 2 mặt hàng và 6 mặt hàng, nhưng phần lớn số lượng đã được nhập kho, phản ánh sự cân bằng giữa số lượng Item KH và số lượng Item đã nhập kho.

Nhà cung cấp SS052 cũng chỉ cung cấp 5 mặt hàng, trong đó 2 mặt hàng đã được nhập kho và 3 mặt hàng chưa nhập kho, thể hiện sự cân bằng giữa nhập và chưa nhập.

Tổng thể, biểu đồ cho thấy sự khác biệt đáng kể trong quản lý hàng hóa giữa các nhà cung cấp. Dữ liệu cung cấp cơ sở để đánh giá hiệu suất nhập kho và xác định nguyên nhân của những bất đồng giữa số lượng hàng đã khai báo và quy trình thực tế vận hành. Các nhà cung cấp như KPVNHN003 cần được tập trung vào để giải quyết vấn đề, trong khi các nhà cung cấp khác như DVKA948 và HTV_VC004 có thể cần được khuyến nghị duy trì tốc độ nhập kho ổn định để đảm bảo quy trình hiệu quả.`,
  },
  {
    text: `Các mã kho như DA-KD-TG, KQA_001, và HN_K_HP_001 chiếm phần lớn tổng số lượng hàng hóa (SL KH), với DA-KD-TG có tổng SL KH lên tới hơn 17,646 đơn vị, tiếp theo là KQA_001 với 12,462 đơn vị và HN_K_HP_001 với 200 đơn vị.

Tuy nhiên, khi nhìn vào số lượng mặt hàng riêng biệt (Số Item KH), chúng ta phát hiện ra sự chênh lệch đáng kể.
DA-KD-TG chỉ có 29 mặt hàng, trong khi KQA_001 và HN_K_HP_001 đều có số mặt hàng nhiều hơn gấp đôi lần so với DA-KD-TG.

Mã kho DA-KD-TA cũng thu hút sự chú ý vì dù nó có tổng SL KH tương đối cao nhưng chỉ chứa 5 mặt hàng.

Một số mã kho như CM-KD-TA, CM-KD-TG, CM-KD-TU, và DA-KD-CM cũng góp một phần không nhỏ, cả về tổng SL KH lẫn số lượng mặt hàng.

Đáng lưu ý là có một số mã kho chỉ chứa rất ít mặt hàng hoặc tổng lượng hàng hóa thấp, như
DA-KD-HĐ, DA-KD-HL, và CM-KD-TU, đồng thời cũng chỉ chứa một lượng nhỏ hàng hóa.`,
    data: generateChartQuantityWarehouse(),
    enumMap: CHART_QUANTITY_WAREHOUSE_ENUM_MAP,
    title: 'analyzeReport.totalQuantityVsnumberBySupplier',
  },
  {
       data: generateChartQuantityTem(),
    enumMap: CHART_QUANTITY_TEM_ENUM_MAP,
    title: 'analyzeReport.temByWarehouseCode',
    text: `Trong biểu đồ so sánh tổng tem phụ tùng và tổng tem hoá chất theo Mã Kho, ta có thể nhận thấy một số điểm đáng chú ý:

1. "Nhóm Mã Kho có lượng tem phụ tùng":
   - Mã kho "QA_K_HN" chiếm vị trí hàng đầu với tổng tem phụ tùng lên đến 9836. Biểu này thể hiện rằng kho này được sử dụng nhiều để lưu trữ và vận chuyển các loại phụ tùng.
   - Tiếp theo là mã kho "AD-KD-TG" với tổng tem phụ tùng là 2571. Đây cũng là một kho quan trọng đối với việc quản lý phụ tùng.

2. "Nhóm Mã Kho có ít tem phụ tùng":
   - Một số mã kho như "CM-KD-TA", "CM-KD-TG", "CM-KD-TU", "DA-KD-CM", "DA-KD-HG", "HM-KD-TG" chỉ có vài tem phụ tùng hoặc không có tem phụ tùng nào. Biểu này có thể phản ánh rằng những kho này chủ yếu dùng cho mục đích khác ngoài việc lưu trữ phụ tùng.

3. "Nhóm Mã Kho có cả tem phụ tùng và tem hoá chất":
   - Có một số mã kho đồng thời có cả tem phụ tùng và tem hoá chất, ví dụ như "VTI-KHO". Tuy nhiên, số lượng tem hoá chất ở mức thấp so với tem phụ tùng, chỉ 300 tem.

4. "Nhóm Mã Kho đặc biệt":
   - Mã kho "HN_K_HP_001" có tổng tem phụ tùng là 400, tương đương với tổng tem hoá chất. Điều này có thể cho thấy sự cân nhắc giữa việc sử dụng tem phụ tùng và tem hoá chất tại kho này.

Tuỳ phân tích trên, chúng ta có thể rút ra rằng việc phân phối tem phụ tùng và tem hoá chất giữa các kho là khá chênh lệch. Các kho chính như "QA_K_HN" và "AD-KD-TG" đóng vai trò quan trọng trong việc cung cấp phụ tùng, trong khi một số kho khác tập trung vào mục đích khác. Đồng thời, cần chú ý đến việc cân đối giữa tem phụ tùng và tem hoá chất tại các kho cụ thể.`,
  },

]
