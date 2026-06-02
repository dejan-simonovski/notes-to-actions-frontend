import {
  useState,
  useRef,
  useCallback,
  type ChangeEvent,
  type DragEvent,
} from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { analyzeFile } from '../services/meetingService';
import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE_BYTES } from '../constants/api';
import { useAppDispatch } from '../store/hooks';
import { addMeeting } from '../store/meetingsSlice';

export type UploadMode = 'file' | 'text';

export function useNewMeeting() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const ALLOWED_EXTENSIONS = ['.txt', '.pdf', '.doc', '.docx'];
  const ALLOWED_MIME_TYPES = [
    'text/plain',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];

  const validateFile = (file: File): string | null => {
    const ext = `.${file.name.split('.').pop()?.toLowerCase()}`;
    const typeOk =
      ALLOWED_MIME_TYPES.includes(file.type) ||
      ALLOWED_EXTENSIONS.includes(ext);

    if (!typeOk) {
      return 'Unsupported file type. Please upload a .txt, .pdf, .doc, or .docx file.';
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return 'File exceeds the 20 MB limit.';
    }
    return null;
  };

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;

    const error = validateFile(file);
    if (error) {
      toast.error(error);
      return;
    }
    setSelectedFile(file);
  }, []);

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0] ?? null;
    if (!file) return;

    const error = validateFile(file);
    if (error) {
      toast.error(error);
      return;
    }
    setSelectedFile(file);
  }, []);

  const openFilePicker = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const clearFile = useCallback(() => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!selectedFile) return;

    setIsProcessing(true);

    try {
      const response = await analyzeFile(selectedFile);

      if (!response.success || !response.data) {
        throw new Error(response.message ?? 'Analysis failed.');
      }

      dispatch(addMeeting(response.data));
      toast.success('Meeting analyzed successfully!');
      navigate('/app');
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'An unexpected error occurred.';
      toast.error(message);
    } finally {
      setIsProcessing(false);
    }
  }, [selectedFile, navigate, dispatch]);

  const cancel = useCallback(() => {
    navigate('/app');
  }, [navigate]);

  return {
    selectedFile,
    isDragging,
    isProcessing,
    fileInputRef,
    acceptedFileTypes: ACCEPTED_FILE_TYPES,
    handleFileChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    openFilePicker,
    clearFile,
    handleSubmit,
    cancel,
  };
}
