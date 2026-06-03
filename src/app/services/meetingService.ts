import { httpClient } from '../interceptors/httpClient';
import { API_ROUTES } from '../constants/api';
import type { AnalyzeResponse, ApiResponse } from '../types/meeting';

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