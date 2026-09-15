'use client';

import React, { useEffect } from 'react';
import { SingleAnalysisResponse } from '@/types/analysis';
import { WhatsAppAnalysisResponse } from '@/types/whatsapp';
import { RiskScoreMeter } from './RiskScoreMeter';
import { RiskLevelBadge } from './RiskLevelBadge';
import { ThreatIndicatorList } from './ThreatIndicatorList';
import { EscalationTimeline } from './EscalationTimeline';
import { ActionRecommendations } from './ActionRecommendations';
import { ExportReportMenu } from './ExportReportMenu';
import { Button } from '@/components/ui/Button';
import { RotateCcw, ShieldCheck, ShieldAlert } from 'lucide-react';

export interface ResultDashboardProps {
  data: SingleAnalysisResponse | WhatsAppAnalysisResponse;
  onReset: () => void;
  isWhatsApp?: boolean;
}

export function ResultDashboard({ data, onReset, isWhatsApp = false }: ResultDashboardProps) {
  const isWa = isWhatsApp && 'overallRiskLevel' in data;
  const riskLevel = isWa
    ? (data as WhatsAppAnalysisResponse).overallRiskLevel
    : (data as SingleAnalysisResponse).riskLevel;
  const riskScore = isWa
    ? (data as WhatsAppAnalysisResponse).overallRiskScore
    : (data as SingleAnalysisResponse).riskScore;

  useEffect(() => {
    // Scroll window smoothly to the top of the result report
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [data.id]);

  return (
    <div id="tumbasna-result-dashboard" className="space-y-8 animate-in fade-in duration-300 min-h-[600px]">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-foreground-secondary uppercase tracking-wider">
              {isWa ? 'Hasil Analisis Percakapan WhatsApp' : 'Hasil Analisis Pesan Teks'}
            </span>
            <span className="text-xs text-foreground-muted">•</span>
            <span className="text-xs text-foreground-muted">ID: {data.id}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
            Laporan Evaluasi Keamanan
          </h2>
        </div>

        {/* Reset CTA */}
        <Button variant="secondary" size="md" onClick={onReset} className="self-start sm:self-center">
          <RotateCcw className="w-4 h-4 mr-1.5" aria-hidden="true" />
          <span>Periksa Pesan Lain</span>
        </Button>
      </div>

      {/* Main Score & Summary Card */}
      <div className="bg-white border-2 border-border rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Radial Score Meter */}
          <div className="md:col-span-1 border-b md:border-b-0 md:border-r border-border pb-6 md:pb-0 md:pr-6 flex flex-col items-center">
            <RiskScoreMeter score={riskScore} level={riskLevel} />
            <div className="mt-2">
              <RiskLevelBadge level={riskLevel} size="lg" />
            </div>
          </div>

          {/* Evaluation Summary */}
          <div className="md:col-span-2 space-y-4">
            <div>
              <span className="text-xs font-bold text-foreground-muted uppercase tracking-wider">
                Ringkasan Analisis:
              </span>
              <p className="text-base sm:text-lg text-foreground font-medium mt-1 leading-relaxed">
                {data.summary}
              </p>
            </div>

            {/* Disclaimer pill */}
            <div className="p-3 bg-background-subtle border border-border rounded-xl text-xs text-foreground-secondary leading-normal">
              {data.disclaimer}
            </div>

            {/* Export Toolbar */}
            <div className="pt-2 border-t border-border/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <span className="text-xs font-semibold text-foreground-secondary">
                Ekspor Laporan Ini:
              </span>
              <ExportReportMenu data={data} isWhatsApp={isWa} />
            </div>
          </div>
        </div>
      </div>

      {/* Escalation Timeline (WhatsApp Only) */}
      {isWa && (
        <EscalationTimeline
          phases={(data as WhatsAppAnalysisResponse).escalationFlow}
          detectedType={(data as WhatsAppAnalysisResponse).detectedScamType}
        />
      )}

      {/* Detected Threat Indicators */}
      <ThreatIndicatorList indicators={data.indicators} />

      {/* Action Recommendations */}
      <ActionRecommendations recommendations={data.recommendations} />

      {/* Bottom Re-check Button */}
      <div className="text-center pt-4">
        <Button size="lg" variant="primary" onClick={onReset} className="min-w-[240px]">
          <RotateCcw className="w-4 h-4 mr-2" aria-hidden="true" />
          <span>Periksa Pesan Lainnya</span>
        </Button>
      </div>
    </div>
  );
}
