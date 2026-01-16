import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export async function generatePDF({
  htmlString,
  width,
  height,
  orientation = 'portrait',
  margin = 5,
}) {
  const cover = margin
  const container = document.createElement('div')
  container.style.position = 'fixed'
  container.style.top = '-9999px'
  container.style.left = '-9999px'
  container.style.width = `${width}mm`
  container.style.margin = '0'
  container.style.padding = '0'
  container.innerHTML = htmlString
  document.body.appendChild(container)
  await new Promise((r) => setTimeout(r, 100))
  const canvas = await html2canvas(container, {
    scale: 2,
    useCORS: true,
    logging: false,
  })
  document.body.removeChild(container)

  const imgData = canvas.toDataURL('image/png')
  const pdf = new jsPDF({ unit: 'mm', format: [width, height], orientation })
  const imgProps = pdf.getImageProperties(imgData)
  const imgW = width - 2 * margin
  const imgH = (imgProps.height * imgW) / imgProps.width
  const printable = height - 2 * margin
  const pages = Math.ceil(imgH / printable)

  for (let i = 0; i < pages; i++) {
    const yOff = -i * printable + margin
    pdf.addImage(imgData, 'PNG', margin, yOff, imgW, imgH)

    pdf.setDrawColor(255, 255, 255)
    pdf.setFillColor(255, 255, 255)
    if (i > 0) {
      pdf.rect(0, 0, width, cover, 'F')
    }
    if (i < pages - 1) {
      pdf.rect(0, height - cover, width, cover, 'F')
    }

    if (i < pages - 1) pdf.addPage()
  }
  const dataUri = pdf.output('datauristring')
  const base64 = dataUri.split(',')[1]
  return base64
}
export function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result
      const base64 = dataUrl.split(',')[1]
      resolve(base64)
    }
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}
export const MM_TO_PX = (mm) => Math.floor((mm / 25.4) * 96)

export const convertToFormatHtmlQZ = (template, configOptions = {}) => {
  return {
    data: [
      {
        type: 'html',
        format: 'plain',
        data: template,
      },
    ],
    configOptions: {
      units: 'mm',
      ...configOptions,
    },
  }
}

export const convertToFormatPdfQZ = (pdfBase64) => {
  return [
    {
      type: 'pdf',
      format: 'base64',
      data: pdfBase64,
    },
  ]
}
