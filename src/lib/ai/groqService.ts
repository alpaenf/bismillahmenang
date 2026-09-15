import { RiskLevel, ThreatCategory, ThreatIndicator, RecommendedAction, SingleAnalysisResponse } from '@/types/analysis';
import { WhatsAppAnalysisRequest, WhatsAppAnalysisResponse, FlaggedBubbleResult, EscalationPhase } from '@/types/whatsapp';

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = process.env.GROQ_MODEL || 'llama-3.1-8b-instant';
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

export interface GroqSingleAnalysisResult {
  riskLevel: RiskLevel;
  riskScore: number;
  detectedScamType: string;
  summary: string;
  indicators: ThreatIndicator[];
  recommendations: RecommendedAction[];
}

export interface GroqWhatsAppAnalysisResult {
  overallRiskLevel: RiskLevel;
  overallRiskScore: number;
  detectedScamType: string;
  summary: string;
  flaggedMessages: FlaggedBubbleResult[];
  indicators: ThreatIndicator[];
  recommendations: RecommendedAction[];
  escalationFlow: EscalationPhase[];
}

/**
 * Analisis Pesan Tunggal dengan Groq LLM
 */
export async function analyzeMessageWithGroq(messageText: string): Promise<GroqSingleAnalysisResult | null> {
  if (!GROQ_API_KEY) {
    return null;
  }

  const systemPrompt = `Anda adalah "Tumbasna Security Intelligence Engine", sistem pakar forensik siber dan deteksi penipuan online/WhatsApp di Indonesia.
Tugas Anda: Menganalisis pesan teks yang mencurigakan (SMS, WhatsApp, medsos, bukti transfer) untuk menentukan apakah pesan tersebut terindikasi scam atau aman.

Analisis mencakup:
1. File APK jahat (kurir palsu, surat tilang palsu, undangan pernikahan).
2. Permintaan kredensial / OTP / PIN bank.
3. Iming-iming hadiah atau bansos palsu.
4. Phishing link & domain gratisan/palsu.
5. Manipulasi urgensi / tekanan psikologis.
6. Toko online bodong / penipuan transaksi belanja online ("tumbas").

Kembalikan respon WAJIB berupa JSON murni dengan skema persis:
{
  "riskLevel": "low" | "medium" | "high" | "critical",
  "riskScore": (integer 0 sampai 100),
  "detectedScamType": "(String nama modus penipuan ringkas dalam Bahasa Indonesia)",
  "summary": "(Ringkasan analisis 1-2 kalimat dalam Bahasa Indonesia yang edukatif)",
  "indicators": [
    {
      "id": "ind_1",
      "category": "suspicious_link" | "malicious_apk" | "urgency_pressure" | "financial_request" | "credential_harvesting" | "fake_reward" | "impersonation" | "suspicious_language" | "unknown_sender" | "social_engineering",
      "title": "Nama Indikator",
      "description": "Penjelasan mengapa hal ini mencurigakan",
      "severity": "low" | "medium" | "high" | "critical",
      "highlightSnippet": "potongan teks yang mencurigakan jika ada"
    }
  ],
  "recommendations": [
    {
      "id": "rec_1",
      "priority": "must_do" | "should_do" | "optional",
      "actionText": "Tindakan konkret (misal: Jangan klik link, Blokir nomor)",
      "explanation": "Alasan tindakan ini penting dilakukan"
    }
  ]
}`;

  try {
    const res = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        temperature: 0.1,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Analisis pesan ini:\n"${messageText}"` },
        ],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.warn('Groq API Single Analysis non-OK response:', res.status, errText);
      return null;
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) return null;

    const parsed: GroqSingleAnalysisResult = JSON.parse(content);
    return parsed;
  } catch (error) {
    console.error('Error calling Groq API for single analysis:', error);
    return null;
  }
}

/**
 * Analisis Percakapan WhatsApp Multi-Pesan dengan Groq LLM
 */
export async function analyzeWhatsAppWithGroq(
  request: WhatsAppAnalysisRequest
): Promise<GroqWhatsAppAnalysisResult | null> {
  if (!GROQ_API_KEY) {
    return null;
  }

  const systemPrompt = `Anda adalah "Tumbasna Security Intelligence Engine", sistem pakar forensik percakapan WhatsApp dan pencegahan penipuan online di Indonesia.
Tugas Anda: Menganalisis riwayat percakapan chat WhatsApp (multi-bubble) untuk memetakan alur manipulasi (escalation flow) dan menandai bubble chat yang berbahaya.

Kembalikan respon WAJIB berupa JSON murni dengan skema:
{
  "overallRiskLevel": "low" | "medium" | "high" | "critical",
  "overallRiskScore": (integer 0 - 100),
  "detectedScamType": "(Nama modus, misal: Penipuan Kurir APK / Olshop Bodong)",
  "summary": "(Ringkasan kesimpulan dalam Bahasa Indonesia edukatif)",
  "flaggedMessages": [
    {
      "messageId": "(id bubble yang relevan dari input)",
      "riskLevel": "low" | "medium" | "high" | "critical",
      "triggerCategory": "malicious_apk" | "suspicious_link" | "credential_harvesting" | "fake_reward" | "urgency_pressure",
      "reason": "(Alasan bubble ini berbahaya)"
    }
  ],
  "indicators": [
    {
      "id": "ind_wa_1",
      "category": "malicious_apk" | "suspicious_link" | "credential_harvesting" | "fake_reward" | "impersonation" | "urgency_pressure",
      "title": "Nama Indikator",
      "description": "Penjelasan ancaman",
      "severity": "low" | "medium" | "high" | "critical"
    }
  ],
  "recommendations": [
    {
      "id": "rec_wa_1",
      "priority": "must_do" | "should_do" | "optional",
      "actionText": "Tindakan wajib diambil",
      "explanation": "Penjelasan mengapa harus dilakukan"
    }
  ],
  "escalationFlow": [
    {
      "phaseNumber": 1,
      "phaseName": "Tahap 1: Pendekatan Awal",
      "description": "Deskripsi bagaimana pelaku memulai kontak"
    }
  ]
}`;

  try {
    const formattedMessages = request.messages.map((m) => ({
      id: m.id,
      sender: m.sender,
      isOutgoing: m.isOutgoing,
      text: m.content,
    }));

    const res = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        temperature: 0.1,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: systemPrompt },
          {
            role: 'user',
            content: `Analisis percakapan WhatsApp berikut ini:\n${JSON.stringify(formattedMessages, null, 2)}`,
          },
        ],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.warn('Groq API WhatsApp non-OK response:', res.status, errText);
      return null;
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) return null;

    const parsed: GroqWhatsAppAnalysisResult = JSON.parse(content);
    return parsed;
  } catch (error) {
    console.error('Error calling Groq API for WhatsApp analysis:', error);
    return null;
  }
}
