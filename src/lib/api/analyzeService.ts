import { SingleAnalysisRequest, SingleAnalysisResponse } from '@/types/analysis';
import { WhatsAppAnalysisRequest, WhatsAppAnalysisResponse } from '@/types/whatsapp';
import { simulateSingleMessageAnalysis, simulateWhatsAppChatAnalysis } from '../mock/mockApiResponse';
import { postJson } from './apiClient';

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

export async function analyzeSingleMessage(
  request: SingleAnalysisRequest
): Promise<SingleAnalysisResponse> {
  if (USE_MOCK) {
    return simulateSingleMessageAnalysis(request);
  }

  return postJson<SingleAnalysisRequest, SingleAnalysisResponse>(
    '/api/v1/analyze/message',
    request
  );
}

export async function analyzeWhatsAppChat(
  request: WhatsAppAnalysisRequest
): Promise<WhatsAppAnalysisResponse> {
  if (USE_MOCK) {
    return simulateWhatsAppChatAnalysis(request);
  }

  return postJson<WhatsAppAnalysisRequest, WhatsAppAnalysisResponse>(
    '/api/v1/analyze/whatsapp',
    request
  );
}
