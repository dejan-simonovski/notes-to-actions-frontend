import { httpClient } from '../interceptors/httpClient';
import { API_ROUTES } from '../constants/api';
import type { AnalyzeResponse, ApiResponse, ChatMessage, ChatResponse } from '../types/meeting';

export async function analyzeFile(
  file: File,
  context?: string,
): Promise<ApiResponse<AnalyzeResponse>> {
  const formData = new FormData();
  formData.append('transcript', file);
  if (context?.trim()) {
    formData.append('context', context.trim());
  }

  const { data } = await httpClient.post<ApiResponse<AnalyzeResponse>>(
    API_ROUTES.ANALYZE_FILE,
    formData,
  );

  return data;
}

export const chatWithTranscript = async (
  question: string,
  transcript?: string,
  history?: ChatMessage[],
  title?: string,
  date?: string,
  summary?: string,
  action_items?: any[]
): Promise<string> => {
  const { data } = await httpClient.post<ApiResponse<ChatResponse>>(API_ROUTES.CHAT, {
    question,
    transcript,
    history,
    title,
    date,
    summary,
    action_items,
  });

  return data.data.answer;
}
