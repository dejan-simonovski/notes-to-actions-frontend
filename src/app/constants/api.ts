export const API_BASE_URL = 'http://localhost:8000';

export const API_ROUTES = {
  HEALTH: '/health',
  ANALYZE_URL: '/api/analyze/url',
  ANALYZE_FILE: '/api/analyze/file',
  CHAT: '/api/chat',
} as const;
