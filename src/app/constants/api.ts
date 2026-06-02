export const API_BASE_URL = 'http://localhost:8000';

export const API_ROUTES = {
  ANALYZE_FILE: '/api/analyze/file',
  CHAT: '/api/chat',
} as const;

export const ACCEPTED_FILE_TYPES = [
  '.txt',
  '.pdf',
  '.doc',
  '.docx',
  'text/plain',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
].join(',');

export const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024;
