import { useMemo } from 'react'
import QRCode from 'react-qr-code'
import { Download } from 'lucide-react'

export default function LoteQrPanel({ lote }) {
  const payload = useMemo(() => {
    if (!lote) return ''
    const data = {
      sistema: 'Cafe Sostenible AI',
      lote: lote.codigo_lote,
      id: lote.id,
      productor: lote.productor,
      variedad: lote.variedad_cafe,
      qr: lote.qr_codigo || `CAFE-${lote.id}`
    }
    return JSON.stringify(data)
  }, [lote])

  const downloadQr = () => {
    const svg = document.getElementById(`qr-lote-${lote.id}`)
    if (!svg) return
    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement('canvas')
    const img = new Image()
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      canvas.getContext('2d').drawImage(img, 0, 0)
      const a = document.createElement('a')
      a.download = `QR-${lote.codigo_lote}.png`
      a.href = canvas.toDataURL('image/png')
      a.click()
    }
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)))
  }

  if (!lote) return null

  return (
    <div className="bg-cafe-50 dark:bg-slate-900/50 rounded-xl p-4 border border-cafe-200 dark:border-slate-600 flex flex-col sm:flex-row items-center gap-4">
      <div className="bg-white p-3 rounded-lg shadow-inner">
        <QRCode id={`qr-lote-${lote.id}`} value={payload} size={128} level="M" />
      </div>
      <div className="flex-1 text-center sm:text-left">
        <p className="text-sm font-semibold text-cafe-900 dark:text-slate-100">Código QR de trazabilidad</p>
        <p className="text-xs text-cafe-600 dark:text-slate-400 mt-1 font-mono break-all">{lote.qr_codigo || `CAFE-${lote.id}`}</p>
        <p className="text-xs text-cafe-500 dark:text-slate-500 mt-2">Escanea para ver datos del lote en el sistema.</p>
        <button
          type="button"
          onClick={downloadQr}
          className="mt-3 inline-flex items-center gap-2 text-sm bg-amber-500 hover:bg-amber-600 text-cafe-900 font-medium px-3 py-1.5 rounded-lg transition-colors"
        >
          <Download size={16} /> Descargar PNG
        </button>
      </div>
    </div>
  )
}
