import type { Address } from '~/types'

/**
 * Génère un document PDF propre pour une adresse (§2.2 — Export PDF) :
 * en-tête de marque, adresse formatée, coordonnées, QR code et photo.
 * jsPDF et qrcode sont importés dynamiquement (hors bundle principal).
 */
export function useAddressPdf() {
  async function exportPdf(address: Address) {
    const [{ jsPDF }, QRCode] = await Promise.all([import('jspdf'), import('qrcode')])

    const doc = new jsPDF({ unit: 'mm', format: 'a4' })
    const W = 210
    const brand = [22, 82, 240] as const
    const ink = [10, 15, 30] as const
    const muted = [100, 116, 139] as const

    // En-tête
    doc.setFillColor(...brand)
    doc.rect(0, 0, W, 34, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(22)
    doc.text('findMe', 16, 20)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.text('Adresse numérique certifiée · GeoLink Africa', 16, 27)

    // Code (encadré)
    doc.setDrawColor(...brand)
    doc.setLineWidth(0.5)
    doc.roundedRect(16, 44, 110, 18, 2, 2)
    doc.setTextColor(...muted)
    doc.setFontSize(8)
    doc.text('CODE FINDME', 21, 51)
    doc.setTextColor(...brand)
    doc.setFont('courier', 'bold')
    doc.setFontSize(18)
    doc.text(address.code, 21, 59)

    // QR code (lien Maps)
    const mapUrl = `https://www.google.com/maps?q=${address.lat},${address.lng}`
    const qr = await QRCode.toDataURL(mapUrl, { margin: 1, width: 240 })
    doc.addImage(qr, 'PNG', 150, 40, 44, 44)
    doc.setTextColor(...muted)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7)
    doc.text('Scannez pour localiser', 150, 88)

    // Détails de l'adresse
    let y = 80
    doc.setTextColor(...ink)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(15)
    doc.text(`${address.district}, ${address.city}`, 16, y)

    y += 12
    const rows: [string, string][] = [
      ['Pays', address.country],
      ['Ville', address.city],
      ['Quartier', address.district],
      ['Rue', address.street],
      ['Numéro', address.houseNumber],
      ...(address.postalCode ? [['Code postal', address.postalCode] as [string, string]] : []),
      ['Coordonnées GPS', `${address.lat.toFixed(6)}, ${address.lng.toFixed(6)}`],
    ]
    doc.setFontSize(10)
    for (const [label, value] of rows) {
      doc.setDrawColor(226, 232, 240)
      doc.line(16, y + 2, W - 16, y + 2)
      doc.setTextColor(...muted)
      doc.setFont('helvetica', 'normal')
      doc.text(label, 16, y)
      doc.setTextColor(...ink)
      doc.setFont('helvetica', 'bold')
      doc.text(String(value), 70, y)
      y += 10
    }

    // Photo du bâtiment
    if (address.photoUrl?.startsWith('data:image')) {
      try {
        y += 4
        doc.setTextColor(...muted)
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(8)
        doc.text('PHOTO DU BÂTIMENT', 16, y)
        doc.addImage(address.photoUrl, 'JPEG', 16, y + 3, 70, 50)
      } catch {
        /* image invalide — ignorée */
      }
    }

    // Pied de page
    doc.setDrawColor(...brand)
    doc.setLineWidth(0.5)
    doc.line(16, 280, W - 16, 280)
    doc.setTextColor(...muted)
    doc.setFontSize(8)
    doc.text(
      `Document généré le ${new Date().toLocaleDateString('fr-FR')} · findme.geolink.africa`,
      16,
      286,
    )

    doc.save(`findMe-${address.code}.pdf`)
  }

  return { exportPdf }
}
