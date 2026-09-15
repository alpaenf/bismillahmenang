import { jsPDF } from 'jspdf';
import { SingleAnalysisResponse } from '@/types/analysis';
import { WhatsAppAnalysisResponse } from '@/types/whatsapp';

export function downloadAnalysisPdf(
  data: SingleAnalysisResponse | WhatsAppAnalysisResponse,
  isWhatsApp: boolean = false
): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const primaryColor = [17, 24, 39]; // #111827
  const grayColor = [75, 85, 99]; // #4B5563
  const lightGray = [229, 231, 235]; // #E5E7EB

  // Header
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, 210, 24, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('Tumbasna — Laporan Analisis Risiko Keamanan', 15, 15);

  let y = 36;

  // Metadata
  doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`ID Laporan: ${data.id}`, 15, y);
  doc.text(`Tanggal Audit: ${new Date(data.timestamp).toLocaleString('id-ID')}`, 120, y);
  y += 10;

  // Risk Box
  const riskScore = 'riskScore' in data ? data.riskScore : data.overallRiskScore;
  const riskLevel = ('riskLevel' in data ? data.riskLevel : data.overallRiskLevel).toUpperCase();

  doc.setDrawColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.setFillColor(250, 250, 250);
  doc.roundedRect(15, y, 180, 26, 3, 3, 'FD');

  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(`Tingkat Risiko: ${riskLevel} (${riskScore}/100)`, 22, y + 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
  if (isWhatsApp && 'detectedScamType' in data) {
    doc.text(`Modus Terdeteksi: ${data.detectedScamType}`, 22, y + 20);
  } else {
    doc.text('Analisis Pesan Teks Tunggal', 22, y + 20);
  }
  y += 34;

  // Summary
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('Ringkasan Evaluasi:', 15, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
  const splitSummary = doc.splitTextToSize(data.summary, 180);
  doc.text(splitSummary, 15, y);
  y += splitSummary.length * 5 + 8;

  // Indicators
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('Indikator Ancaman yang Terdeteksi:', 15, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  data.indicators.forEach((ind, idx) => {
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(`${idx + 1}. ${ind.title} (${ind.severity.toUpperCase()})`, 18, y);
    y += 5;
    doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
    const splitDesc = doc.splitTextToSize(ind.description, 170);
    doc.text(splitDesc, 22, y);
    y += splitDesc.length * 5 + 3;
  });
  y += 4;

  // Recommendations
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('Rekomendasi Tindakan Keamanan:', 15, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  data.recommendations.forEach((rec, idx) => {
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(`- ${rec.actionText}`, 18, y);
    y += 5;
    doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
    const splitExp = doc.splitTextToSize(rec.explanation, 170);
    doc.text(splitExp, 22, y);
    y += splitExp.length * 5 + 3;
  });
  y += 6;

  // Footer Disclaimer
  doc.setFontSize(8);
  doc.setTextColor(156, 163, 175);
  const disclaimerText =
    'Disclaimer: Laporan ini dibuat secara otomatis oleh sistem deteksi pola Tumbasna. Data percakapan diproses di sisi klien. Kunjungi https://tumbasna.my.id untuk pemeriksaan mandiri.';
  const splitDisc = doc.splitTextToSize(disclaimerText, 180);
  doc.text(splitDisc, 15, 280);

  doc.save(`Tumbasna-Report-${data.id}.pdf`);
}
