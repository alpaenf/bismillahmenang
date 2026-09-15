import { RiskLevel, ThreatCategory, ThreatIndicator, RecommendedAction } from '@/types/analysis';
import { WhatsAppAnalysisRequest, FlaggedBubbleResult, EscalationPhase } from '@/types/whatsapp';

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

  const systemPrompt = `Anda adalah "Tumbasna Security Intelligence Engine", sistem pakar forensik siber dan deteksi penipuan online di Indonesia.
Tugas Anda: Menganalisis pesan teks untuk menentukan secara adil dan akurat apakah pesan tersebut berisiko penipuan atau percakapan wajar.

PANDUAN KLASIFIKASI:
1. JIKA PESAN NORMAL / WAJAR (sapaan, obrolan keluarga/teman, percakapan sehari-hari, konfirmasi biasa):
   - overallRiskLevel: "low"
   - overallRiskScore: 5 sampai 15
   - detectedScamType: "Pesan Normal / Aman"
   - summary: "Pesan ini adalah komunikasi wajar sehari-hari dan tidak mengandung indikasi penipuan digital."
   - indicators: [] (kosongkan)
   - recommendations: [{"id": "rec_1", "priority": "optional", "actionText": "Tetap Waspada", "explanation": "Pesan ini aman, tetap jaga kehati-hatian secara umum."}]

2. HANYA TANDAI SEBAGAI SCAM (medium/high/critical) jika ada bukti nyata:
   - File APK tidak resmi (.apk)
   - Permintaan kode OTP / PIN bank rahasia
   - Phishing link / tautan mencurigakan
   - Iming-iming hadiah uang/bansos tanpa transaksi jelas
   - Tekanan urgensi atau ancaman pemblokiran/penangkapan

Kembalikan respon WAJIB berupa JSON murni dengan skema:
{
  "riskLevel": "low" | "medium" | "high" | "critical",
  "riskScore": (integer 0 sampai 100),
  "detectedScamType": "(String nama status/modus)",
  "summary": "(Ringkasan analisis)",
  "indicators": [
    {
      "id": "ind_1",
      "category": "suspicious_link" | "malicious_apk" | "urgency_pressure" | "financial_request" | "credential_harvesting" | "fake_reward" | "impersonation" | "suspicious_language" | "unknown_sender" | "social_engineering",
      "title": "Nama Indikator",
      "description": "Penjelasan ancaman",
      "severity": "low" | "medium" | "high" | "critical",
      "highlightSnippet": "potongan teks jika ada"
    }
  ],
  "recommendations": [
    {
      "id": "rec_1",
      "priority": "must_do" | "should_do" | "optional",
      "actionText": "Saran tindakan",
      "explanation": "Alasan tindakan"
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

  const systemPrompt = `Anda adalah "Tumbasna Security Intelligence Engine", sistem pakar forensik percakapan WhatsApp di Indonesia.
Tugas Anda: Menganalisis riwayat obrolan WhatsApp untuk mendeteksi apakah ada modus penipuan ataukah hanya obrolan biasa yang aman.

PANDUAN UTAMA PENILAIAN:
1. JIKA OBROLAN BIASA / NORMAL (sapaan halo/hai, obrolan santai teman/keluarga, koordinasi tugas, janjian, percakapan sehari-hari tanpa modus kejahatan):
   - overallRiskLevel WAJIB: "low"
   - overallRiskScore WAJIB: 5 sampai 15
   - detectedScamType: "Percakapan Normal / Tidak Berbahaya"
   - summary: "Percakapan ini adalah obrolan biasa sehari-hari yang wajar. Tidak ditemukan indikasi modus penipuan, manipulasi, maupun tautan atau file berbahaya."
   - flaggedMessages: [] (KOSONGKAN karena tidak ada pesan berbahaya)
   - indicators: [] (KOSONGKAN)
   - recommendations: [
       {
         "id": "rec_safe",
         "priority": "optional",
         "actionText": "Percakapan Aman",
         "explanation": "Tidak ada indikator penipuan yang terdeteksi pada riwayat chat ini."
       }
     ]
   - escalationFlow: [
       {
         "phaseNumber": 1,
         "phaseName": "Komunikasi Normal",
         "description": "Pertukaran pesan wajar antar pihak tanpa pola eskalasi penipuan."
       }
     ]

2. JANGAN PERNAH menuduh chat biasa sebagai scam paket kurir atau APK jika tidak ada pembahasan file APK berbahaya atau modus penipuan!
3. HANYA berikan skor risiko tinggi jika BENAR-BENAR ada indikator kejahatan siber (file APK kurir/tilang, phishing link, pencurian OTP/PIN, iming-iming hadiah bodong, atau pemaksaan transfer uang).

Kembalikan respon WAJIB berupa JSON murni dengan skema:
{
  "overallRiskLevel": "low" | "medium" | "high" | "critical",
  "overallRiskScore": (integer 0 - 100),
  "detectedScamType": "(Nama status/modus)",
  "summary": "(Ringkasan hasil evaluasi)",
  "flaggedMessages": [
    {
      "messageId": "(id bubble yang relevan)",
      "riskLevel": "low" | "medium" | "high" | "critical",
      "triggerCategory": "malicious_apk" | "suspicious_link" | "credential_harvesting" | "fake_reward" | "urgency_pressure",
      "reason": "(Alasan bahaya)"
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
      "actionText": "Saran tindakan",
      "explanation": "Penjelasan"
    }
  ],
  "escalationFlow": [
    {
      "phaseNumber": 1,
      "phaseName": "Tahap Alur",
      "description": "Keterangan"
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
