export const dataFactories = [
  {
    id: 1,
    code: 'P1',
    name: 'Xuong 1',
    floor: [
      {
        id: '98',
        code: 'T1',
        name: 'tang1',
      },
      {
        id: '99',
        code: 'T2',
        name: 'tang2',
      },
    ],
  },
  {
    id: 2,
    code: 'P2',
    name: 'Xuong 2',
    positions: ['VT1', 'VT2'],
    devices: [
      {
        id: '300',
        code: 'M1',
        name: 'may 1',
      },
      {
        id: '301',
        code: 'M2',
        name: 'may 2',
      },
    ],
    floors: [
      {
        id: '100',
        code: 'T1',
        name: 'tang1',
        holon: ['holon1', 'holon2'],
        productionLines: [
          {
            id: '200',
            code: 'DC1',
            name: 'day chuyen 1',
          },
          {
            id: '201',
            code: 'DC2',
            name: 'day chuyen 2',
          },
        ],
      },
      {
        id: '101',
        code: 'T2',
        name: 'tang2',
        holon: ['holon3', 'holon4'],
        productionLines: [
          {
            id: '203',
            code: 'DC3',
            name: 'day chuyen 3',
          },
          {
            id: '204',
            code: 'DC4',
            name: 'day chuyen 4',
          },
        ],
      },
    ],
  },
]

export const layoutDesign = {
  id: '98', //id tầng
  code: 'T1',
  name: 'tang1',
  plantId: 'P1',
  holonDesign: [
    {
      id: '1', //id department
      name: 'V01', //holon
      code: 'V01', //holon
      departmentSetting: {
        id: '1',
        code: 'P1',
        name: 'BP 1',
        holon: 'V01',
      },
      design: {
        title: 'V01',
        x: 100,
        y: 100,
        size: {
          width: 100,
          height: 100,
        },
      },
    },
  ],
  productionLineDesign: [
    {
      id: '200',
      code: 'DC1',
      name: 'day chuyen 1',
      departmentSetting: {
        id: '1',
        code: 'P1',
        name: 'BP 1',
        holon: 'V01',
      },
      design: {
        title: 'DC1',
        x: 100,
        y: 100,
        size: {
          width: 100,
          height: 100,
        },
      },
    },
  ],
  positionDesign: [
    {
      id: 'VT1',
      code: 'VT1',
      name: 'VT1',
      productionLine: {
        id: '200',
        code: 'DC1',
        name: 'day chuyen 1',
      },
      departmentSetting: {
        id: '1',
        code: 'P1',
        name: 'BP 1',
        holon: 'V01',
      },
      design: {
        title: 'VT1',
        x: 100,
        y: 100,
        size: {
          width: 100,
          height: 100,
        },
      },
      device: {
        id: '300',
        code: 'M1',
        name: 'may 1',
      },
      responsibleUser: {
        id: 1,
        code: 'U1',
        username: 'user 1',
        fullName: 'user 1',
      },
    },
  ],
}
