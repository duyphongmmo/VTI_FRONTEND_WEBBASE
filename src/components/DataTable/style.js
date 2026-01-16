const style = (theme, noBorder) => ({
  paper: {
    width: '100%',
    overflowX: 'auto',
    position: 'relative',
  },
  tableContainer: {
    overflow: 'auto',
    ...(noBorder ? {} : { border: `1px solid ${theme.palette.grayF4.main}` }),
    borderTop: 'none',
    boxSizing: 'border-box',
  },
  table: {
    ...(noBorder ? {} : { borderCollapse: 'separate', borderSpacing: 0 }),
    minWidth: '100%',

    '.MuiCheckbox-root': {
      padding: 4,
    },
    '.MuiIconButton-root:not(.MuiFormControl-root .MuiIconButton-root)': {
      padding: 6,
    },
    '.MuiTableBody-root': {
      div: {
        whiteSpace: 'pre-wrap',
      },
    },
  },

  tableRow: {
    verticalAlign: 'top',
  },

  tableRowStriped: {
    '&:nth-child(even)>.MuiTableCell-root': {
      ...(noBorder ? {} : { backgroundColor: theme.palette.bg.tableRow }),
    },
  },

  tableRowBorder: {
    '>.MuiTableCell-root': {
      ...(noBorder ? {} : { borderBottomColor: theme.palette.grayF4.main }),
    },
  },
  tableRowBorderGrid: {
    '.MuiTableCell-root': {
      ...(noBorder
        ? {}
        : {
            borderRight: `1px solid ${theme.palette.grayF4.main}`,
            borderBottom: `1px solid ${theme.palette.grayF4.main}`,
            borderLeft: 'none',
            borderTop: 'none',
          }),
    },
  },

  tableRowHover: {
    '&:hover td.MuiTableCell-root': {
      backgroundColor: `${theme.palette.bg.tableRowHover} !important`,
    },
  },

  tableRowGray: {
    backgroundColor: theme.palette.bg.tableRow,
    // '>.MuiTableCell-root': {
    //   ...(noBorder ? {} : { borderBottomColor: theme.palette.subText.a1 }),
    // },
  },

  tableCell: {
    height: 35,
    padding: '1px 4px',
    fontSize: 14,
    lineHeight: 20 / 14,
    textAlign: 'left',
    overflow: 'hidden',
    backgroundColor: '#fff',
    boxSizing: 'border-box',
  },

  tableCellCheckbox: {
    textAlign: 'center !important',
    verticalAlign: 'middle',
    width: 50,
  },

  tableCellAlignright: {
    textAlign: 'right',
  },

  tableCellAligncenter: {
    textAlign: 'center',
  },

  tableCellHighlight: {
    backgroundColor: `${theme.palette.bg.tableRowHighLight} !important`,
    color: '#FF0909',
  },

  tableCellBold: {
    fontWeight: 600,
  },

  firstStickyRight: {
    ...(noBorder
      ? {}
      : { borderLeft: `1px solid ${theme.palette.grayF4.main} !important` }),
  },
})
export default style
