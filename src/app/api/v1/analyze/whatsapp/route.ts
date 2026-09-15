import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { WhatsAppAnalysisRequest, WhatsAppAnalysisResponse, FlaggedBubbleResult, EscalationPhase } from '@/types/whatsapp';
import { RiskLevel, ThreatIndicator, RecommendedAction } from '@/types/analysis';
import { analyzeWhatsAppWithGroq } from '@/lib/ai/groqService';

export async function POST(request: Request) {
  try {
    const body: WhatsAppAnalysisRequest = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Pesan percakapan WhatsApp wajib diisi.' },
        { status: 400 }
      );
    }

    let overallRiskLevel: RiskLevel = 'low';
    let overallRiskScore = 20;
    let detectedScamType = 'Percakapan Normal / Risiko Rendah';
    let summary = 'Percakapan WhatsApp ini secara umum tidak menunjukkan indikasi penipuan digital yang berbahaya.';
    let flaggedMessages: FlaggedBubbleResult[] = [];
    let indicators: ThreatIndicator[] = [];
    let recommendations: RecommendedAction[] = [
      {
        id: 'rec_wa_safe_1',
        priority: 'optional',
        actionText: 'Tetap Waspada',
        explanation: 'Selalu verifikasi kontak sebelum memberikan informasi atau bertransaksi.',
      }
    ];
    let escalationFlow: EscalationPhase[] = [
      {
        phaseNumber: 1,
        phaseName: 'Tahap 1: Pendekatan & Kontak Awal',
        description: 'Pengirim menghubungi dengan pesan pembuka.',
      },
    ];

    // 1. COBA ANALISIS DENGAN GROQ AI LLM
    const groqResult = await analyzeWhatsAppWithGroq(body);

    if (groqResult) {
      overallRiskLevel = groqResult.overallRiskLevel;
      overallRiskScore = groqResult.overallRiskScore;
      detectedScamType = groqResult.detectedScamType;
      summary = groqResult.summary;
      flaggedMessages = groqResult.flaggedMessages;
      indicators = groqResult.indicators;
      recommendations = groqResult.recommendations;
      escalationFlow = groqResult.escalationFlow;
    } else {
      // 2. FALLBACK ATURAN HEURISTIK BUBBLE
      let hasApk = false;
      let hasOtp = false;
      let hasReward = false;
      let hasUrgency = false;
      let hasLink = false;

      messages.forEach((msg) => {
        const text = msg.content.toLowerCase();
        if (text.includes('.apk') || text.includes('unduh aplikasi') || text.includes('instal')) {
          hasApk = true;
          flaggedMessages.push({
            messageId: msg.id,
            riskLevel: 'critical',
            triggerCategory: 'malicious_apk',
            reason: 'Pesan mengarahkan pengunduhan file .APK bermasalah di luar Play Store.',
          });
        } else if (text.includes('otp') || text.includes('kode pin') || text.includes('password') || text.includes('rekening')) {
          hasOtp = true;
          flaggedMessages.push({
            messageId: msg.id,
            riskLevel: 'critical',
            triggerCategory: 'credential_harvesting',
            reason: 'Permintaan kode rahasia / OTP via pesan instan.',
          });
        } else if (text.includes('selamat') || text.includes('hadiah') || text.includes('menang')) {
          hasReward = true;
          flaggedMessages.push({
            messageId: msg.id,
            riskLevel: 'high',
            triggerCategory: 'fake_reward',
            reason: 'Klaim hadiah gratis tanpa dasar transaksi.',
          });
        } else if (text.includes('http://') || text.includes('https://') || text.includes('bit.ly') || text.includes('.club') || text.includes('.xyz')) {
          hasLink = true;
          flaggedMessages.push({
            messageId: msg.id,
            riskLevel: 'high',
            triggerCategory: 'suspicious_link',
            reason: 'Tautan luar tidak resmi terdeteksi pada percakapan.',
          });
        } else if (text.includes('segera') || text.includes('sekarang') || text.includes('hangus') || text.includes('darurat')) {
          hasUrgency = true;
          flaggedMessages.push({
            messageId: msg.id,
            riskLevel: 'medium',
            triggerCategory: 'urgency_pressure',
            reason: 'Tekanan psikologis waktu untuk merespons cepat.',
          });
        }
      });

      if (hasApk) {
        overallRiskLevel = 'critical';
        overallRiskScore = 98;
        detectedScamType = 'Penipuan WhatsApp Modus File APK Malware';
        summary = 'Ditemukan indikasi penipuan tingkat kritis! Penipu mencoba mengirimkan file .APK untuk membajak SMS dan OTP bank korban.';
        indicators.push({
          id: 'ind_wa_apk',
          category: 'malicious_apk',
          title: 'File APK Kurir / Penipuan',
          description: 'Terdapat instruksi menginstal aplikasi dari luar sumber resmi.',
          severity: 'critical',
        });
        recommendations.push(
          {
            id: 'rec_wa_1',
            priority: 'must_do',
            actionText: 'JANGAN BUKA ATAU INSTAL FILE APK',
            explanation: 'Menginstal file APK dapat membobol data rekening perbankan Anda.',
          },
          {
            id: 'rec_wa_2',
            priority: 'must_do',
            actionText: 'Blokir Kontak WhatsApp Penipu',
            explanation: 'Segera blokir dan laporkan kontak ini ke WhatsApp.',
          }
        );
      } else if (hasOtp) {
        overallRiskLevel = 'critical';
        overallRiskScore = 94;
        detectedScamType = 'Penipuan Pencurian Kode OTP via WhatsApp';
        summary = 'Percakapan terindikasi pencurian akun atau kredensial bank melalui permintaan OTP.';
        indicators.push({
          id: 'ind_wa_otp',
          category: 'credential_harvesting',
          title: 'Permintaan Kode OTP / PIN',
          description: 'Penipu mencoba mengambil alih akun dengan meminta kode verifikasi.',
          severity: 'critical',
        });
      } else if (hasReward || (hasLink && hasUrgency)) {
        overallRiskLevel = 'high';
        overallRiskScore = 85;
        detectedScamType = 'Penipuan Phishing Tautan & Hadiah Palsu';
        summary = 'Percakapan ini memuat tautan luar mencurigakan dengan iming-iming hadiah atau ancaman pemblokiran.';
        indicators.push({
          id: 'ind_wa_link',
          category: 'suspicious_link',
          title: 'Tautan Phishing Terdeteksi',
          description: 'Tautan mengarahkan ke situs non-resmi.',
          severity: 'high',
        });
      }

      escalationFlow = [
        {
          phaseNumber: 1,
          phaseName: 'Tahap 1: Pendekatan & Kontak Awal',
          description: 'Pengirim menghubungi dengan pesan acak atau mengatasnamakan pihak tertentu.',
        },
        {
          phaseNumber: 2,
          phaseName: 'Tahap 2: Pembentukan Kepercayaan & Umpan',
          description: 'Memberikan informasi hadiah, paket, atau masalah transaksi.',
        },
        {
          phaseNumber: 3,
          phaseName: 'Tahap 3: Eksekusi (Permintaan File / Link / OTP)',
          description: 'Mengirimkan link atau file berbahaya untuk dieksekusi oleh korban.',
        },
      ];
    }

    // 3. SIMPAN HASIL ANALISIS KE SUPABASE
    let savedId: string | null = null;
    let savedTimestamp: string | null = null;

    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();

      const { data: insertedData, error: dbError } = await supabase
        .from('analysis_history')
        .insert({
          user_id: session?.user?.id || null,
          session_type: 'whatsapp_chat',
          whatsapp_messages: messages,
          risk_level: overallRiskLevel,
          risk_score: overallRiskScore,
          detected_scam_type: detectedScamType,
          summary: summary,
          indicators: indicators,
          recommendations: recommendations,
          escalation_flow: escalationFlow,
          flagged_messages: flaggedMessages,
        })
        .select('id, created_at')
        .single();

      if (dbError) {
        console.warn('Gagal menyimpan analisis WA ke Supabase:', dbError.message);
      } else if (insertedData) {
        savedId = insertedData.id;
        savedTimestamp = insertedData.created_at;
      }
    } catch (dbErr) {
      console.warn('Supabase DB Exception (WA):', dbErr);
    }

    const responsePayload: WhatsAppAnalysisResponse = {
      id: savedId || `res_wa_${Date.now()}`,
      timestamp: savedTimestamp || new Date().toISOString(),
      overallRiskLevel,
      overallRiskScore,
      detectedScamType,
      summary,
      escalationFlow,
      flaggedMessages,
      indicators,
      recommendations,
      disclaimer: 'Analisis percakapan diproses cerdas oleh Tumbasna AI dan tersimpan aman di database Supabase.',
    };

    return NextResponse.json(responsePayload);
  } catch (error) {
    console.error('API WhatsApp Analysis Error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan server saat menganalisis percakapan WhatsApp.' },
      { status: 500 }
    );
  }
}
