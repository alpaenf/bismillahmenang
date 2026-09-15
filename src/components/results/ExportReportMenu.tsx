'use client';

import React, { useState } from 'react';
import { SingleAnalysisResponse } from '@/types/analysis';
import { WhatsAppAnalysisResponse } from '@/types/whatsapp';
import { Copy, Check, FileDown, Image, Share2 } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { Button } from '@/components/ui/Button';
import {
  formatSingleAnalysisShareText,
  formatWhatsAppAnalysisShareText,
} from '@/lib/export/formatShareText';
import { downloadElementAsImage } from '@/lib/export/generateImageCard';
import { downloadAnalysisPdf } from '@/lib/export/generatePdfReport';

export interface ExportReportMenuProps {
  data: SingleAnalysisResponse | WhatsAppAnalysisResponse;
  isWhatsApp?: boolean;
}

export function ExportReportMenu({ data, isWhatsApp = false }: ExportReportMenuProps) {
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleCopyText = async () => {
    const text = isWhatsApp
      ? formatWhatsAppAnalysisShareText(data as WhatsAppAnalysisResponse)
      : formatSingleAnalysisShareText(data as SingleAnalysisResponse);

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleDownloadImage = async () => {
    setIsExporting(true);
    try {
      await downloadElementAsImage(
        'tumbasna-result-dashboard',
        `tumbasna-audit-${data.id}.png`
      );
    } catch (e) {
      console.error(e);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadPdf = () => {
    downloadAnalysisPdf(data, isWhatsApp);
  };

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {/* Copy Summary */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopyText}
        className="text-xs"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-600 mr-1" aria-hidden="true" />
            <span>Teks Disalin!</span>
          </>
        ) : (
          <>
            <WhatsAppIcon colored size={14} className="mr-1.5" />
            <span>Salin Ringkasan untuk WA</span>
          </>
        )}
      </Button>

      {/* Download PNG */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleDownloadImage}
        isLoading={isExporting}
        className="text-xs"
      >
        <Image className="w-3.5 h-3.5 mr-1" aria-hidden="true" />
        <span>Unduh Gambar (PNG)</span>
      </Button>

      {/* Download PDF */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleDownloadPdf}
        className="text-xs"
      >
        <FileDown className="w-3.5 h-3.5 mr-1" aria-hidden="true" />
        <span>Unduh Dokumen (PDF)</span>
      </Button>
    </div>
  );
}
