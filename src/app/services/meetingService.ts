import { httpClient } from '../interceptors/httpClient';
import { API_ROUTES } from '../constants/api';
import type { AnalyzeResponse, ApiResponse } from '../types/meeting';

export async function analyzeFile(
  file: File,
): Promise<ApiResponse<AnalyzeResponse>> {
  const formData = new FormData();
  formData.append('file', file);

  const { data } = await httpClient.post<ApiResponse<AnalyzeResponse>>(
    API_ROUTES.ANALYZE_FILE,
    formData,
  );

  return data;
}
