export const BUSI_OPTIONS = [
  { id: 101, name: "Oled" },
  { id: 102, name: "PCM" },
  { id: 103, name: "ACF" },
  { id: 104, name: "VM" },
  { id: 2340, name: "SPCM" },
];

export const ITEM_OPTIONS = [
  { id: 1, name: "All Item" },
  { id: 2, name: "Item 1" },
  { id: 3, name: "Item 2" },
  { id: 4, name: "Item 3" },
];

export const CATEGORY_OPTIONS = [
  { id: 1, name: "All Category" },
  { id: 2, name: "Category 1" },
  { id: 3, name: "Category 2" },
  { id: 4, name: "Category 3" },
];

// fake selected data (summary)
export const FAKE_SELECTED_DATA = {
  periodType: "DAY",
  date: "2026-01-15",
  ppm: 5179,
};

// fake detail data (table / chart detail)
export const FAKE_DETAIL_DATA = {
  totalQty: 120000,
  totalNg: 621,
  ppm: 5179,
  items: [
    {
      model: "FPCB-A01",
      ngQty: 215,
      ppm: 3583,
    },
    {
      model: "FPCB-A02",
      ngQty: 180,
      ppm: 3000,
    },
    {
      model: "FPCB-A03",
      ngQty: 126,
      ppm: 2100,
    },
    {
      model: "FPCB-A04",
      ngQty: 100,
      ppm: 1666,
    },
  ],
};
