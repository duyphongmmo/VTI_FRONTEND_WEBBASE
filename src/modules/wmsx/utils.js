import JsBarcode from 'jsbarcode'
import { isPlainObject } from 'lodash'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import LogoNitori from '~/assets/images/logo-nitori.png'
import { convertNumberWithThousandSeparator } from '~/utils'

import { DEFAULT_UNITS_ID, LABEL_TYPE } from './constants'
export function createFilterFunction(keys, params) {
  return (item) => {
    return keys.every((key) => {
      const dataParams = params[key] === undefined ? null : params[key]
      const dataItem = item[key] === undefined ? null : item[key]
      if (typeof dataItem === 'object' && typeof dataParams === 'object') {
        return dataItem?.id === dataParams?.id
      } else {
        return dataItem === dataParams
      }
    })
  }
}

export function removeWmsxPrefix(obj) {
  const result = {}
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith('wmsx')) {
      const newKey = key.replace(/^wmsx/, '')
      result[newKey.charAt(0).toLowerCase() + newKey.slice(1)] = value
    } else {
      result[key] = value
    }
  }
  return result
}

export const ImageToPrintSato = (QrCode) => {
  return `<html lang="en">
  <body
    style="
      font-family: Arial, sans-serif;
      margin:auto;
      max-height:100px
      "
      onload="window.print()" 
      onafterprint="window.close()"
    
  >
   ${QrCode?.map((e) => {
     return `<div
     style=" width: 310px; font-family: Arial, sans-serif; margin: 0;  max-height:100px !important;page-break-after: always !important;break-before: page"
  >
    <div style="display: flex; justify-content: space-between">
      <div style="font-size: 18px;margin-top: 10px;margin-left: 14px;word-wrap: break-word;width:60%">${
        e?.itemCode
      }</div>
      <div style="display: flex; justify-content: space-between;height: 60px;margin-right: 3px">
      <div
      style="font-size: 24px;border:${
        e?.environmentCode ? ' 1px solid #000' : 'none'
      };margin-right: 5px;margin-top: 10px;display: flex;flex-direction: column;justify-content: center;height: 42px;"
    >
      ${e?.environmentCode || ''}
    </div>
        <img
          src=${e?.qrCode}
          alt="QR Code"
          style="margin-right: 5px"

        />
      </div>
    </div>
    <div
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: -10px
      "
    >
      <div
        style="font-size: 12px; display: flex; justify-content: space-between;margin-left: 13px;"
      >
        <div>(</div>
        ${
          e?.itemCodeShort
            ? e?.itemCodeShort
            : '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
        }
        
        <div>)</div>
      </div>
      <div style="font-size: 18px;word-wrap: break-word;margin-right:15px">${convertNumberWithThousandSeparator(
        e?.quantityOnBox,
      )}</div>
    </div>
    <img
      src=${e?.barCode}
      alt="Barcode"
      style=" width: 100%; height: 25px"
    />
    <div
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
      "
    >
      <div style="font-size: 12px;text-align: center; margin-left: 20px">${
        e?.manufactureDate
      }</div>
      <div style="font-size: 12px;text-align: center; margin-right: 10px">
       ${e?.country}
    </div>
  </div>`
   })?.join(' ')}
  </body>
</html>`
}

export const ImageToPrint = (QrCode) => {
  return `<html lang="en">
   <style>
    table,
    img,
    body,
    tr,
    td,
    span {
      margin: 0;
      padding: 0;
    }

    span {
      font-size: 10px;
    }

    td {
      font-size: 10px;
    }

    .main-table {
      width: 297mm;
      height: 210mm;
      page-break-after: always;
      margin-top: 0;
      margin-left: 5px;
      margin-bottom: 0;
      margin-right: 0;
      border: 1px solid;
    }

    .qr-image {
      width: 90mm;
      height: 90mm;
      margin-left: 5px;
    }

    .inner-table {
      margin: 0;
      padding: 0;
    }

    .inner-tr,
    .inner-td {
      margin: 0;
      padding: 0;
    }

    .bold {
      font-weight: bold;
      margin-right: 2px;
    }

    .word-break {
      margin-right: 2px;
      word-break: break-word;
    }

    .supplier,
    .entry-date {
      margin-right: 2px;
    }

    .expiry-date {
      margin-right: 2px;
      margin-left: 8px;
    }
  </style>
    <body
    >
    ${QrCode?.map((e) => {
      return `<table class="main-table">
      <tr>
        <td style="border: none">
          <img src=${e?.qrCode} alt="QR Code" class="qr-image" />
        </td>
        <td style="width: 85%">
          <table class="inner-table">
           <tr class="inner-tr">
              <td class="inner-td" style="width: 55%">
                <span class="bold entry-date">Ngày nhập kho:</span>
                <span></span>
              </td>
              <td class="inner-td" style="width: 45%">
                <span class="bold expiry-date">HSD:</span>
                <span></span>
              </td>
            </tr>
            <tr class="inner-tr">
              <td colspan="2" class="inner-td">
                <span class="bold">Code: </span>
                <span class="word-break">${e?.itemCode}</span>
              </td>
            </tr>
            <tr class="inner-tr">
              <td colspan="2" class="inner-td">
                <span class="bold">Name: </span>
                <span class="word-break">${e?.itemName}</span>
              </td>
            </tr>
            <tr class="inner-tr">
              <td colspan="2" class="inner-td">
                <span class="bold">Mô tả:</span>
                <span class="word-break"></span>
              </td>
            </tr>
            <tr class="inner-tr">
              <td class="inner-td">
                <span class="bold supplier">Nhà cung cấp:</span>
                <span></span>
              </td>
            </tr>
            <tr class="inner-tr">
              <td class="inner-td" style="width: 55%">
                <span class="bold entry-date">Ngày nhập kho:</span>
                <span></span>
              </td>
              <td class="inner-td" style="width: 45%">
                <span class="bold expiry-date">HSD:</span>
                <span></span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    `
    })?.join(' ')}
    </body>
  </html>
  `
}

export const materialQrCode = (QrCode) => {
  return `<html lang="en">
    <style>
    table,img,body,tr,td,span{
      margin:0;
      padding:0
    }
    span{
      font-size: 10px
    }
    td{
      font-size: 10px
    }
  </style>
      <body onload="window.print()" 
      >
      ${QrCode?.map((e, index) => {
        if (e.type === 'Tem panel print') {
          return `<table style="width: 300px; height: 86px;page-break-after: always;margin-top: ${
            index > 1 ? '30px' : '0px'
          };margin-left:5px;margin-bottom:0;margin-right:0;border: 1px solid;">
          <tr>
            <td style="border: none; ">
              <img
                src=${e?.qrCode}
                alt="QR Code"
                style="width: 65px;height: 65px;margin-left: 5px"
              />
            </td>
            <td style="width:85%;margin:0;padding:0">
              <table style="margin:0;padding:0">
                <tr style="margin:0;padding:0">
                  <td colspan="2" style="margin:0;padding:0;"> <span style="; font-weight: bold;margin-right: 2px;">Code:</span>
                    <span style=";margin-right: 2px;word-break:break-word"
                      >${e?.itemCode}</span></td>
                </tr>
                <tr style="margin:0;padding:0">
                <td colspan="2" style="margin:0;padding:0;"> <span style="; font-weight: bold;margin-right: 2px;">PP</span>
                </td>
              </tr>
                <tr style="margin:0;padding:0">
                  <td colspan="2" style="margin:0;padding:0">
                    <span style="; font-weight: bold;margin-right: 2px;">Size:</span><span style="margin-right: 2px;word-break:break-word">${
                      e?.size
                    }</span></td>
                </tr>
                <tr style="margin:0;padding:0">
                  <td colspan="2" style="margin:0;padding:0">
                    <span style="; font-weight: bold;margin-right: 2px;">Supplier:</span><span style="margin-right: 2px;word-break:break-word">${
                      e?.supplier
                    }</span></td>
                </tr>
                <tr style="margin:0;padding:0">
                  <td style="margin:0;padding:0;width:55%">
                    <span style="; font-weight: bold;margin-right: 2px;">MFG:</span><span>${
                      e?.mfg
                    }</span></td>
                    <td style="margin:0;padding:0;width:45%">
                    <span style="; font-weight: bold;margin-right: 2px;margin-left: 8px;">Qty:</span><span>${
                      e?.qty
                    }</span></td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        `
        } else {
          return `<table style="width: 300px; height: 86px;page-break-after: always;margin-top: ${
            index > 1 ? '30px' : '0px'
          };margin-left:5px;margin-bottom:0;margin-right:0;border: 1px solid;">
        <tr>
          <td style="border: none; ">
            <img
              src=${e?.qrCode}
              alt="QR Code"
              style="width: 65px;height: 65px;margin-left: 5px"
            />
          </td>
          <td style="width:85%;margin:0;padding:0">
            <table style="margin:0;padding:0">
              <tr style="margin:0;padding:0">
                <td colspan="2" style="margin:0;padding:0;"> <span style="; font-weight: bold;margin-right: 2px;">Code:</span>
                  <span style=";margin-right: 2px;word-break:break-word"
                    >${e?.itemCode}</span></td>
              </tr>
              <tr style="margin:0;padding:0">
              <td colspan="2" style="margin:0;padding:0;"> <span style="; font-weight: bold;margin-right: 2px;">Name:</span>
                <span style="margin-right: 2px;word-break:break-word"
                  >${e?.itemName}</span></td>
            </tr>
              <tr style="margin:0;padding:0">
                <td colspan="2" style="margin:0;padding:0">
                  <span style="; font-weight: bold;margin-right: 2px;">Supplier:</span><span style="margin-right: 2px;word-break:break-word">${
                    e?.supplier ? e?.supplier : ''
                  }</span></td>
              </tr>
              <tr style="margin:0;padding:0">
                <td style="margin:0;padding:0">
                  <span style="; font-weight: bold;margin-right: 2px;">Invoice:</span><span>${
                    e?.invoice ? e?.invoice : ''
                  }</span></td>
              </tr>
              <tr style="margin:0;padding:0">
                <td style="margin:0;padding:0;width:55%">
                  <span style="; font-weight: bold;margin-right: 2px;">Date:</span><span>${
                    e?.date ? e?.date : ''
                  }</span></td>
                  <td style="margin:0;padding:0;width:45%">
                  <span style="; font-weight: bold;margin-right: 2px;margin-left: 8px;">MFG:</span><span>${
                    e?.mfg ? e?.mfg : ''
                  }</span></td>
              </tr>
              <tr style="margin:0;padding:0">
                <td style="margin:0;padding:0;width:55%">
                  <span style="; font-weight: bold;margin-right: 2px;">Qty:</span><span>${
                    e?.qty ? e?.qty : ''
                  }</span></td>
                  <td style="margin:0;padding:0;width:45%">
                  <span style="; font-weight: bold;margin-right: 2px;margin-left: 8px;">Unit:</span><span>${
                    e?.unit ? e?.unit : ''
                  }</span></td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      `
        }
      })?.join(' ')}
      </body>
    </html>
    `
}
export const printQRCodeLabelPallet = (e) => {
  return `<html lang="en">
   <style>
      body {
        font-family: 'Times New Roman', serif;
        margin: 0;
        padding: 0;
      }
        @page {
        margin: 4px
      }
      table {
        width: 294mm;
        height: 206mm;
        border-collapse: collapse;
        /* margin: 0 auto; */
        /* table-layout: fixed; */
            border: 1px solid;
            page-break-after: always
      }
      td {
        vertical-align: top;
        padding: 10px;
      }
      .qr-code {
        width: 90mm;
        height: 90mm;
      }
      .details {
        font-size: 28px;
        font-weight: bold;
        line-height: 1.6;
        width: 100%;
      }
      .details div {
        display: flex;
        /* justify-content: flex-start; */
        align-items: center;
        margin-bottom: 10px;
      }
      .title {
        font-size: 48px;
        font-weight: bold;
        display: flex;
        justify-content: space-between;
      }
      .title .label {
        font-size: 28px;
      }
      .data {
        font-size: 48px;
        font-weight: bold;
        margin-left: 10px;
      }

      .qr-code {
        display: flex;
        justify-content: center; /* Căn ngang */
        align-items: center; /* Căn dọc */
        height: 100%; /* Đảm bảo chiều cao khớp với ô */
      }

      .qr-image {
        width: 90mm;
        height: 90mm;
      }
      tr{
        display: flex;
        align-items: center;
      }
    </style>
    <body
      onload="window.print()"
    >
      <table>
      <tr>
        <td class="qr-code">
        <img src=${e?.qrCode} alt="QR Code" class="qr-image" />
        </td>
        <td class="details">
          <div class="title">
            <span>${e?.qrCodeStringRule}</span>
            <span class="label">${e?.qrCodePallet ? 'Pallet' : ''}</span>
          </div>
          <div><span>Code:</span> <span class="data">${e?.itemCode}</span></div>
          <div><span>Name:</span> <span class="data">${e?.itemName}</span></div>
          <div><span>Supplier:</span> <span class="data">${
            e?.supplier
          }</span></div>
          <div><span>Invoice:</span> <span class="data">${
            e?.type === LABEL_TYPE.MATERIAL ? e?.invoice || '' : ''
          }</span></div>
          <div>
            <span>Lot:</span>
            <span class="data">${e?.lotNumber}</span>
             &nbsp; MFG:
            <span class="data">${e?.mfg}</span>
          </div>
          <div><span>Date:</span> <span class="data">${e?.date}</span></div>
          <div>
            <span>Qty:</span> <span class="data">${
              e?.quantity
            }</span> &nbsp;&nbsp; Unit:
            <span class="data">${e?.unit}</span>
          </div>
        </td>
      </tr>
    </table>
    </body>
  </html>
  `
}

export const printQRCodeLabelBox = (e) => {
  return `<html lang="en">
   <style>
      body {
        font-family: 'Times New Roman', serif;
        margin: 0;
        padding: 0;
      }
      table {
        width: 85mm;
        height: 50mm;
        border-collapse: collapse;
        /* margin: 0 auto; */
        /* table-layout: fixed; */
            border: 1px solid;
            page-break-after: always
      }
      td {
        vertical-align: top;
        padding: 10px;
      }
      .qr-code {
        width: 23mm;
        height: 23mm;
      }
      .details {
        font-size: 10px;
        font-weight: bold;
        line-height: 1.6;
        width: 100%;
      }
      .details div {
        display: flex;
        /* justify-content: flex-start; */
        align-items: center;
        margin-bottom: 10px;
      }
      .title {
        font-size: 10px;
        font-weight: bold;
        display: flex;
        justify-content: space-between;
      }
      .title .label {
        font-size: 10px;
      }
      .data {
        font-size: 10px;
        font-weight: bold;
        margin-left: 10px;
      }

      .qr-code {
        display: flex;
        justify-content: center; /* Căn ngang */
        align-items: center; /* Căn dọc */
        height: 100%; /* Đảm bảo chiều cao khớp với ô */
      }

      .qr-image {
        width: 23mm;
        height: 23mm;
      }
    </style>
    <body
      onload="window.print()"
    >
      <table>
      <tr>
        <td class="qr-code">
        <img src=${e?.qrCode} alt="QR Code" class="qr-image" />
        </td>
        <td class="details">
          <div class="title">
            <span>${e?.qrCodeStringRule}</span>
            <span class="label">${e?.qrCodeBox ? 'Box' : ''}</span>
          </div>
          <div><span>Code:</span> <span class="data">${e?.itemCode}</span></div>
          <div><span>Name:</span> <span class="data">${e?.itemName}</span></div>
          <div><span>Supplier:</span> <span class="data">${
            e?.supplier
          }</span></div>
          <div><span>Invoice:</span> <span class="data">${
            e?.invoice || ''
          }</span></div>
          <div>
            <span>Lot:</span>
            <span class="data">${e?.lotNumber}</span>
             &nbsp; MFG:
            <span class="data">${e?.mfg}</span>
          </div>
          <div><span>Date:</span> <span class="data">${e?.date}</span></div>
          <div>
            <span>Qty:</span> <span class="data">${
              e?.quantity
            }</span> &nbsp;&nbsp; Unit:
            <span class="data">${e?.unit}</span>
          </div>
        </td>
      </tr>
    </table>
    </body>
  </html>
  `
}

export const printQRCodePanelPrint = (e) => {
  return `<html lang="en">
   <style>
      body {
        font-family: 'Times New Roman', serif;
        margin: 0;
        padding: 0;
      }
        @page {
        margin: 4px
      }
      table {
        width: 294mm;
        height: 206mm;
        border-collapse: collapse;
        /* margin: 0 auto; */
        /* table-layout: fixed; */
            border: 1px solid;
            page-break-after: always
      }
      td {
        vertical-align: top;
        padding: 10px;
      }
      .qr-code {
        width: 65mm;
        height: 65mm;
      }
      .details {
        font-size: 28px;
        font-weight: bold;
        line-height: 1.6;
        width: 100%;
      }
      .details div {
        display: flex;
        /* justify-content: flex-start; */
        align-items: center;
        margin-bottom: 10px;
      }
      .title {
        font-size: 72px;
        font-weight: bold;
        display: flex;
        justify-content: space-between;
      }
      .title .label {
        font-size: 48px;
      }
      .label {
        font-size: 48px;
      }
      .data {
        font-size: 72px;
        font-weight: bold;
        margin-left: 10px;
      }

      .qr-code {
        display: flex;
        justify-content: center; /* Căn ngang */
        align-items: center; /* Căn dọc */
        height: 100%; /* Đảm bảo chiều cao khớp với ô */
      }

      .qr-image {
        width: 65mm;
        height: 65mm;
      }
    </style>
    <body
      onload="window.print()"
    >
      <table>
      <tr>
        <td class="qr-code">
        <img src=${e?.qrCode} alt="QR Code" class="qr-image" />
        </td>
        <td class="details">
          <div class="title">
            <div class="label"><span>MFG:</span> <span class="data">${e?.mfg}</span></div>
            <span class="label">PP</span>
          </div>
          <div class="label"><span>Code:</span> <span class="data">${e?.itemCode}</span></div>
          <div class="label"><span>Name:</span> <span class="data">${e?.quantity}</span></div>
          <div class="label"><span>Size:</span> <span class="data">${e?.size}</span></div>
          <div class="label"><span>Supplier:</span> <span class="data">${e?.supplier}</span></div>
        </td>
      </tr>
    </table>
    </body>
  </html>
  `
}

export const qrCodePallet = (e) => {
  return `<html lang="en">
  <style>
      body {
          font-family: 'Times New Roman', serif;
          margin: 0;
          padding: 0;
      }
      @page {
          margin: 4px;
      }
      .pallet-table {
          width: 210mm;
          height: 147mm;
          border-collapse: collapse;
          border: 1px solid;
          page-break-after: always;
      }
      .pallet-td {
          vertical-align: top;
          padding: 10px;
      }
      .pallet-details {
          font-size: 22px;
          line-height: 1.6;
          width: 100%;
      }
      .pallet-details div {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
      }
      .pallet-data {
          font-size: 30px;
          font-weight: bold;
          margin-left: 10px;
      }
      .pallet-qr-code {
        width: 86mm;
        height: 86mm;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          padding: 10px;
          flex-direction: column;
      }
      .pallet-qr-image {
          width: 86mm;
          height: 86mm;
      }
      .pallet-tr {
          display: flex;
          align-items: center;
      }
  </style>
  <body onload="window.print()">
      <table class="pallet-table">
          <tr class="pallet-tr">
              <td class="pallet-td pallet-details" style="padding-bottom: 0;min-height: 100px;">
                  <div style="align-items: unset;"><span style="margin-top: 7px;">Name:</span> <span
                          class="pallet-data">${e?.itemName}</span>
              </td>
          </tr>
          <tr class="pallet-tr">
              <td class="pallet-td pallet-details" >
                  <div><span>Code:</span> <span class="pallet-data">${e?.itemCode}</span></div>
                  <div>
                      <span>Qty:</span>
                      <span class="pallet-data">${e?.quantity}</span> &nbsp;Unit:
                      <span class="pallet-data">${e?.unit}</span>
                  </div>
                  <div>
                      <span>Invoice:</span>
                      <span class="pallet-data">${e?.invoice}</span>
                  </div>
                  <div>
                      <span>Supplier:</span> <span class="pallet-data">${e?.supplier}</span>
                  </div>
                  <div><span>Date:</span> <span class="pallet-data">${e?.date}</span></div>
  
                  <div>
                      <span>Lot:</span>
                      <span class="pallet-data">${e?.lotNumber}</span>
                  </div>
                  <div>
                      <span>MFG:</span>
                      <span class="pallet-data">${e?.mfg}</span>
                  </div>
              </td>
              <td class="pallet-td pallet-qr-code">
                  <img src="${e?.qrCode}" alt="QR Code" class="pallet-qr-image" />
                  <div class="pallet-data">${e?.qrCodeString}</div>
              </td>
          </tr>
      </table>
  </body>
  </html>`
}

export const qrCodeBox = (e) => {
  return `
<html lang="en">
<style>
    body {
        font-family: 'Times New Roman', serif;
        margin: 0;
        padding: 0;
    }
    table {
        width: 85mm;
        height: 50mm;
        border-collapse: collapse;
        /* margin: 0 auto; */
        /* table-layout: fixed; */
        border: 1px solid;
        page-break-after: always;
    }
    td {
        vertical-align: top;
        padding: 10px;
    }
    .qr-code {
        width: 32mm;
        height: 32mm;
    }
    .details {
        font-size: 8px;
        line-height: 1.6;
        width: 100%;
    }
    .details div {
        display: flex;
        /* justify-content: flex-start; */
        align-items: center;
        margin-bottom: 10px;
    }
    .title {
        font-size: 8px;
        font-weight: bold;
        display: flex;
        justify-content: space-between;
    }
    .title .label {
        font-size: 10px;
    }
    .data {
        font-size: 8px;
        font-weight: bold;
        margin-left: 10px;
    }
    .qr-code {
        display: flex;
        justify-content: center;
        /* Căn ngang */
        align-items: center;
        /* Căn dọc */
        height: 100%;
        /* Đảm bảo chiều cao khớp với ô */
        flex-direction: column;
    }
    .qr-image {
        width: 32mm;
        height: 32mm;
    }
</style>
<body onload="window.print()">
    <table>
        <tr>
            <td class="details" style="padding-bottom: 0;">
                <div style="align-items: unset;"><span>Name:</span> <span class="data">${e?.itemName}</span>
            </td>
        </tr>
        <tr>
            <td class="details">
                <div><span>Code:</span> <span class="data">${e?.itemCode}</span></div>
                <div>
                    <span>Qty:</span>
                    <span class="data">${e?.quantity}</span> &nbsp;&nbsp; Unit:
                    <span class="data">${e?.unit}</span>
                </div>
                <div>
                    <span>Invoice:</span>
                    <span class="data">${e?.invoice}</span>
                </div>
                <div>
                    <span>Supplier:</span> <span class="data">${e?.supplier}</span>
                </div>
                <div><span>Date:</span> <span class="data">${e?.date}</span></div>

                <div>
                    <span>Lot:</span>
                    <span class="data">${e?.lotNumber}</span>
                </div>
                <div>
                    <span>MFG:</span>
                    <span class="data">${e?.mfg}</span>
                </div>
            </td>
            <td class="qr-code">
                <img src="${e?.qrCode}" alt="QR Code" class="qr-image" />
                <div class="data">${e?.qrCodeString}</div>
            </td>
        </tr>
    </table>
</body>
</html>`
}

export const qrCodePalletPanelPrint = (e) => `<html lang="en">
  <style>
      body {
          font-family: 'Times New Roman', serif;
          margin: 0;
          padding: 0;
      }
      @page {
          margin: 4px;
      }
      .table {
          width: 295mm;
          height: 207mm;
          border-collapse: collapse;
          border: 1px solid;
          page-break-after: always;
      }
      .td {
          vertical-align: top;
          padding: 10px;
      }
      .details {
          font-size: 48px;
          font-weight: bold;
          line-height: 1.6;
          width: 100%;
      }
      .details div {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
      }
      .data {
          font-size: 72px;
          font-weight: bold;
          margin-left: 10px;
      }
      .qr-code {
        width: 65mm;
        height: 65mm;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          padding: 10px;
          flex-direction: column;
      }
      .qr-image {
          width: 65mm;
          height: 65mm;
      }
      .tr {
          display: flex;
          align-items: center;
          height: 100%;
          position: relative;
      }
      .subtitle-qr{
        font-size: 22px;
        font-weight: bold;
        margin-top: 5px;
      }
      .pp{
        position: absolute;
        top: 20px;
        right: 30px;
        font-size: 48px;
        font-weight: bold;
      }
  </style>
  <body onload="window.print()">
      <table class="table">
          <tr class="tr">
            <td class="td qr-code">
                <img src="${e?.qrCode}" alt="QR Code" class="qr-image" />
                <div class="subtitle-qr">${e?.qrCodeString}</div>
            </td>
              <td class="td details" >
                <div>
                    <span>MFG:</span>
                    <span class="data">${e?.mfg}</span>
                </div>
                  <div><span>Code:</span> <span class="data">${e?.itemCode}</span></div>
                  <div>
                      <span>Qty:</span>
                      <span class="data">${e?.quantity}</span>
                  </div>
                  <div><span>Size:</span> <span class="data">${e?.size}</span></div>
                  <div>
                      <span>Supplier:</span> <span class="data">${e?.supplier}</span>
                  </div>
              </td>
              <td class="pp">PP</td>
          </tr>
      </table>
  </body>
  </html>`

export const textToBase64Barcode = (text) => {
  var canvas = document.createElement('canvas')
  JsBarcode(canvas, text, {
    // format: 'pharmacode',
    displayValue: false,
    width: 5,
    // height: 70,
  })
  return canvas.toDataURL('image/png')
}

export function generatePalletCode(date, palletNumber) {
  if (!date) {
    return ''
  }
  // Định dạng ngày từ dd/mm/yyyy thành ddmmyy
  const [day, month, year] = date.split('/')
  const formattedDate = `${day}${month}${year.slice(-2)}`

  // Chuyển đổi số thứ tự pallet thành chuỗi mã pallet
  const maxNumber = 99999 // Giới hạn số pallet mỗi ký tự alphabet
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const letterIndex = Math.floor((palletNumber - 1) / maxNumber) // Tìm ký tự chữ
  const letter = alphabet[letterIndex] || '' // Đảm bảo không vượt qua Z

  const number = ((palletNumber - 1) % maxNumber) + 1 // Tìm số trong giới hạn từ 00001 -> 99999
  const formattedNumber = String(number).padStart(5, '0') // Định dạng số thành 5 chữ số

  // Kết hợp thành chuỗi pallet code
  return `${formattedDate}-${letter}${formattedNumber}`
}

export function generateBoxCode(date, palletNumber, boxNumber) {
  if (!date) {
    return ''
  }
  // Định dạng ngày từ dd/mm/yyyy thành ddmmyy
  const [day, month, year] = date.split('/')
  const formattedDate = `${day}${month}${year.slice(-2)}`

  // Giới hạn số pallet
  const maxPalletNumber = 99999 // Giới hạn số pallet mỗi ký tự alphabet

  // Xác định mã pallet (phần chữ và số)
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const letterIndex = Math.floor((palletNumber - 1) / maxPalletNumber) // Tìm ký tự chữ
  const letter = alphabet[letterIndex] || '' // Đảm bảo không vượt qua Z
  const palletNum = ((palletNumber - 1) % maxPalletNumber) + 1 // Số của pallet
  const formattedPalletNum = String(palletNum).padStart(5, '0') // Định dạng 5 chữ số

  // Xác định mã box (chỉ số)
  const formattedBoxNum = String(boxNumber).padStart(5, '0') // Định dạng 5 chữ số

  // Kết hợp thành chuỗi box code
  return `${formattedDate}-${letter}${formattedPalletNum}-${formattedBoxNum}`
}

export const generateTemplateOrderForm = (order, size) => {
  return `<html lang="en">
   <head>
   <title>ORDER FORM ${size?.toUpperCase()}</title>
      <style>
         * {
         margin: 0;
         padding: 0;
         box-sizing: border-box;
         }
         body {
         font-family: Arial, sans-serif;
         font-size: 12px;
         }
         .print-container:not(:last-child) {
         page-break-after: always;
         }
         .print-container {
         margin: auto;
         font-size: 12px;
         margin-left: 0in;
         margin-right: 0.01in;
         margin-top: 0in;
         margin-bottom: 0in;
         }
         .print-container:not(:last-child) {
         page-break-after: always;
         }
         .header {
         text-align: center;
         margin-bottom: 10px;
        width: 100%;
         }
         // .order-info {
         //   width: 100%;
         //   border-collapse: collapse;
         //   margin-bottom: 10px;
         // }
         .title {
         font-weight: bold;
         // font-size: 14px;
         }
         .title-main {
         font-weight: bold;
         font-size: 16px;
         }
         .title-main-sub {
         font-weight: bold;
         font-size: 14px;
         }
         table {
         width: 100%;
         border-collapse: collapse;
         font-size: 12px;
         margin: 0 auto;
         }
         th, td {
         border: 1px solid black;
         padding: 5px;
         text-align: center;
         }
      </style>
   </head>
   <body onload="window.print()" >
     <div class="print-container ${size}" >
         <div class="header">
            <table class="order-info">
               <tbody>
                  <tr>
                     <td colspan="2">
                        <img
                          src="${LogoNitori}"
                          alt="Nitori Logo"
                          style="height: 100px; object-fit: contain; image-rendering: auto;"
                        />
                     </td>
                     <td colspan="5" width="70%" style="border: none; text-align: left">
                        <span class="title-main">${order?.supplier}</span>
                     </td>
                     <td width="15%">
                        <img src="${
                          order?.qrCode
                        }" alt="QR Code" height="100" width="100" />
                     </td>
                  </tr>
                  <tr>
                     <td colspan="8" height="10"><span class="title-main-sub">ORDER FORM FOR ${
                       order?.producingStepCode || ''
                     }</span></td>
                  </tr>
                  <tr>
                     <td height="10"><span class="title">No.</span></td>
                     <td colspan="2"><span class="title">${
                       order?.no
                     }</span></td>
                     <td colspan="3"><span class="title">Production - Warehouse</span></td>
                     <td colspan="2"><span class="title">Acc Dept</span></td>
                  </tr>
                  <tr>
                     <td rowspan="2" height="10"><span class="title">Date</span></td>
                     <td height="10"><span class="title">Shift 1</span></td>
                     <td><span class="title">Shift 2</span></td>
                     <td><span class="title">Worker Pro-No.1</span></td>
                     <td><span class="title">Worker Pro-No.2</span></td>
                     <td><span class="title">Hancho</span></td>
                     <td><span class="title">Staff</span></td>
                     <td><span class="title">Hancho</span></td>
                  </tr>
                  <tr>
                     <th colspan="1" height="25"></th>
                     <th colspan="1" height="25"></th>
                     <th colspan="1" height="25"></th>
                     <th colspan="1" height="25"></th>
                     <th colspan="1" height="25"></th>
                     <th colspan="1" height="25"></th>
                     <th colspan="1" height="25"></th>
                  </tr>
                  <tr>
                     <td colspan="4" height="10">
                        ITEM: <span class="title">${order?.productName}</span>
                     </td>
                     <td colspan="4">CODE: <span class="title">${
                       order?.productCode
                     }</span>
                     </td>
                  </tr>
                  <tr>
                     <td height="10"><span class="title">NO</span></td>
                     <td><span class="title">CODE</span></td>
                     <td colspan="3"><span class="title">DESCRIPTION OF GOODS</span></td>
                     <td><span class="title">UNIT</span></td>
                     <td><span class="title">QTY</span></td>
                     <td><span class="title">Remark ghi chú</span></td>
                  </tr>
                  ${order?.requestOrderDetails
                    ?.map(
                      (item) => `
                  <tr>
                     <td>${item?.no}</td>
                     <td>${item?.materialCode || ''}</td>
                     <td colspan="3" class="title">${
                       item?.materialName || ''
                     }</td>
                     <td>${item?.unitName || ''}</td>
                     <td>${item?.quantity || ''}</td>
                     <td>${item?.remark || ''}</td>
                  </tr>
                  `,
                    )
                    .join('')}
               </tbody>
            </table>
         </div>
      </div>
   </body>
</html>`
}

export const generateTemplateStockOutForm = (stockOut) => {
  return `<!DOCTYPE html>
<html lang="en">
   <head>
      <style>
         @media print {
         @page A4 {
         size: A4 portrait;
         }
         @page A5 {
         size: A5 portrait;
         }
         .a4 {
         page: A4;
         }
         .a5 {
         page: A5;
         }
         .print-container .main:not(:last-child) {
         page-break-after: always;
         }
         .print-container {
         min-height: 100vh;
         }
         .signatures {
         position: absolute;
         bottom: 150px;
         width: 100%;
         }
         }
         * {
         margin: 0;
         padding: 0;
         box-sizing: border-box;
         }
         body {
         font-family: Arial, sans-serif;
         font-size: 12px;
         }
         .print-container .main:not(:last-child) {
         page-break-after: always;
         }
         .print-container {
         margin: auto;
         /* border: 1px solid black; */
         }
         .print-container .main:not(:last-child) {
         page-break-after: always;
         }
         table {
         width: 90%;
         border-collapse: collapse;
         margin: 0 auto 20px;
         font-size: 12px;
         }
         th,
         td {
         border: 1px solid black;
         padding: 5px;
         text-align: left;
         }
         .title {
         text-align: center;
         font-size: 12px;
         font-weight: bold;
         margin: 10px 0;
         }
        .text {
         font-size: 12px;
         font-weight: bold;
         }
        .main-title {
         font-size: 20px;
         font-weight: bold;
         }
         .print-container {
         position: relative;
         min-height: 100vh;
         display: flex;
         flex-direction: column;
         }
         .signatures {
         position: absolute;
         bottom: 150px;
         width: 100%;
         display: flex;
         justify-content: space-around;
         }
      </style>
   </head>
   <body onload="window.print()" onafterprint="window.close()">
      <div class="print-container a4">
         <table style="border: none; margin-top: 20px">
            <tr>
               <td colspan="2" style="border: none">
                  <img
                    src="${LogoNitori}"
                    alt="Nitori Logo"
                    style="height: 100px; object-fit: contain; image-rendering: auto;"
                  />
                </td>
               <td colspan="6" width="70%" style="border: none; text-align: left">
                  <span class="title">${stockOut?.supplier}</span>
               </td>
               <td width="15%" style="border: none">
                  <img src=${
                    stockOut?.qrCode
                  } alt="QR Code" height="100" width="100" />
               </td>
            </tr>
            <tr>
               <td colspan="10" width="70%" style="border: none; text-align: center">
                  <span class="main-title">Phiếu xuất kho</span>
               </td>
            </tr>
         </table>
         <table>
            <tr>
               <th>No.</th>
               <th>${stockOut?.no}</th>
               <th>Ref</th>
               <th>Request by</th>
               <th>Cont.</th>
               <th>Warehouse</th>
            </tr>
            <tr>
               <th>Date</th>
               <th>${stockOut?.date || '22/02/2024'}</th>
               <th>${stockOut?.ref}</th>
               <th>${stockOut?.requestBy}</th>
               <th>${stockOut?.cont}</th>
               <th>${stockOut?.warehouse || 'FG1 - Kho thành phẩm'}</th>
            </tr>
         </table>
         <table class="main">
            <tr>
               <th>NO</th>
               <th>CODE</th>
               <th colspan="4">NAME</th>
               <th>PICK/OUT</th>
            </tr>
            ${stockOut?.items
              ?.map(
                (item) => `
            <div>
               <tr>
               <td class="text">${item?.no}</td>
               ${item?.blockSerial?.length > 0 ? <td></td> : ''}
              <td class="text">${item?.materialCode}</td>
              <td colspan="4" class="text">
                  ${item?.materialName}
              </td>
              <td>${item?.pickProgress}</td>
               </tr>
               <tr>
                 ${item?.blockSerial
                   ?.map(
                     (rows, index) => `
                 <tr>
                    <td></td>
                    <td class="text">${index + 1}</td>
                    ${rows
                      ?.map(
                        (serial) => `
                    <td>${serial}</td>
                    `,
                      )
                      .join('')}
                    `,
                   )
                   .join('')}
               </tr>
            </div>
            `,
              )
              .join('')}
         </table>
         <div class="signatures">
            <div>Thủ kho</div>
            <div>Người kiểm kho xuất</div>
            <div>Kế toán</div>
         </div>
      </div>
   </body>
</html>`
}

/**
 * Formats "code - name" from object, else code or name.
 *
 * @param {Object} value - Object with code, name.
 * @param {string} [codeKey='code'] - Property name for code, defaults to 'code'.
 * @param {string} [nameKey='name'] - Property name for name, defaults to 'name'.
 * @returns {string|undefined} String or undefined.
 */
export const getDisplayValue = (value, codeKey = 'code', nameKey = 'name') => {
  if (!value) return

  const code = value[codeKey]
  const name = value[nameKey]

  if (code && name) {
    return `${code} - ${name}`
  }

  return code || name
}

export const getDisplayValueUnit = (
  value,
  codeKey = 'value',
  nameKey = 'unit',
) => {
  if (!value) return

  const code = value[codeKey]
  const name = value[nameKey]

  if (code && name) {
    return `${code} ${name}`
  }

  return code || name
}

/**
 * Converts value to id, name, code object.
 *
 * @param {*} value - Value.
 * @returns {Object|null} Object or null.
 */
export const toOptionObject = (value) => {
  if (value && typeof value === 'object') {
    return value
  }

  return value != null ? { id: value, name: value, code: value } : null
}

export const generateBarcodeDataUrl = (code, optsBarcode) => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    try {
      JsBarcode(canvas, code, {
        format: 'CODE128',
        width: 3,
        height: 60,
        displayValue: false,
        ...optsBarcode,
      })
      const dataUrl = canvas.toDataURL('image/png')
      resolve(dataUrl)
    } catch (err) {
      reject(err)
    }
  })
}

export const getKeyInformation = (
  lstObject,
  lstKey = ['id', 'code', 'name'],
) => {
  if (!Array.isArray(lstObject)) return []

  const result = []

  for (let i = 0; i < lstObject.length; i++) {
    const item = lstObject[i]

    // Chỉ xử lý nếu item là object hợp lệ
    if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
      const picked = {}
      for (let j = 0; j < lstKey.length; j++) {
        const k = lstKey[j]
        picked[k] = item[k]
      }
      result.push(picked)
    }
  }

  return result
}

export const convertStringToNumber = (value) => {
  const number = typeof value === 'number' ? value : Number(value)
  return number || number === 0 ? number : null
}

export const convertToM3 = (value, unitId) => {
  const numberValue = typeof value === 'number' ? value : Number(value)
  if (!numberValue) return null
  switch (unitId) {
    case DEFAULT_UNITS_ID.mm:
      return numberValue / 1000000000
    case DEFAULT_UNITS_ID.cm:
      return numberValue / 1000000
    case DEFAULT_UNITS_ID.dm:
      return numberValue / 1000
    case DEFAULT_UNITS_ID.m:
      return numberValue
    default:
      return numberValue
  }
}
export const getError = (currentValue, options = {}) => {
  const { t } = useTranslation(['qmsx', 'general'])
  const { formState } = useFormContext()
  const submitCount = formState.submitCount

  const {
    required = true,
    compareWithStandard = null,
    customCheck = null,
  } = options
  const isValueMissing = (value) => {
    if (value === '' || value === null || value === undefined) return true
    if (Array.isArray(value)) return value.length === 0
    if (isPlainObject(value)) return Object.keys(value).length === 0
    return false
  }
  // Rule 1: Required
  const isMissing = required && isValueMissing(currentValue)
  const showRequiredError = submitCount > 0 && isMissing

  // Rule 2: Compare currentValue > standardValue
  let showStandardError = false

  if (
    compareWithStandard &&
    currentValue !== undefined &&
    currentValue !== null &&
    currentValue !== '' &&
    Number(currentValue) > Number(compareWithStandard.standardValue)
  ) {
    showStandardError = true
  }

  // Rule 3: Custom check
  let customError = { showError: false, errorMessage: '' }
  if (typeof customCheck === 'function') {
    customError = customCheck(currentValue)
  }

  const showError =
    showRequiredError || showStandardError || customError.showError

  const errorMessage = showRequiredError
    ? t('general:form.required')
    : showStandardError
    ? t('processChemicals.errorMesage.lslSmallerStandardValue')
    : customError.errorMessage

  return { showError, errorMessage }
}

export const pickFields = (obj, fields = []) => {
  const defaultFields = ['id', 'code', 'name']
  if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) {
    return {}
  }

  const keysToKeep = [...new Set([...fields, ...defaultFields])]
  const result = {}

  for (const key of keysToKeep) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = obj[key] || null
    }
  }

  return result || null
}

export const convertStringToObj = (string) => {
  if (!string) return null
  return {
    id: string,
    code: string,
    name: string,
  }
}