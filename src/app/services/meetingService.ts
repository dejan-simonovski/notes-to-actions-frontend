import { httpClient } from '../interceptors/httpClient';
import { API_ROUTES } from '../constants/api';
import type { ApiResponse, AnalyzeResponse, ChatResponse } from '../types/meeting';

export async function chatWithTranscript(
  transcript: string,
  question: string,
): Promise<string> {
  const response = await httpClient.post<ApiResponse<ChatResponse>>(API_ROUTES.CHAT, {
    transcript,
    question,
  });

  if (!response.success || !response.data) {
    throw new Error(response.message ?? 'Chat request failed.');
  }

  return response.data.answer;
}

export async function analyzeTranscriptText(
  transcript: string,
  title: string,
  date: string,
): Promise<AnalyzeResponse> {
  const response = await httpClient.post<ApiResponse<AnalyzeResponse>>(API_ROUTES.ANALYZE_URL, {
    url: null,
    title,
    date,
  });

  if (!response.success || !response.data) {
    throw new Error(response.message ?? 'Analysis failed.');
  }

  return response.data;
}

export async function analyzeTranscriptFile(file: File): Promise<AnalyzeResponse> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await httpClient.postForm<ApiResponse<AnalyzeResponse>>(
    API_ROUTES.ANALYZE_FILE,
    formData,
  );

  if (!response.success || !response.data) {
    throw new Error(response.message ?? 'File analysis failed.');
  }

  return response.data;
}
