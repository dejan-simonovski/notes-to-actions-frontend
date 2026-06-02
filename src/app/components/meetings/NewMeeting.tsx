import { CloudUpload, FileText, X, Sparkles } from 'lucide-react';
import { useNewMeeting } from '../../hooks/useNewMeeting';

export function NewMeeting() {
  const {
    selectedFile,
    isDragging,
    isProcessing,
    fileInputRef,
    acceptedFileTypes,
    handleFileChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    openFilePicker,
    clearFile,
    handleSubmit,
    cancel,
  } = useNewMeeting();

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-gray-900 mb-1 sm:mb-2">New Meeting Analysis</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Upload your meeting transcript to generate AI-powered insights
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
          <label className="text-gray-900 text-sm sm:text-base font-medium mb-4 block">
            Meeting Transcript
          </label>

          <input
            ref={fileInputRef}
            type="file"
            accept={acceptedFileTypes}
            onChange={handleFileChange}
            className="sr-only"
            aria-label="Upload meeting transcript file"
          />

          {selectedFile ? (
            <div className="flex items-center gap-3 p-4 border border-indigo-200 bg-indigo-50 rounded-lg">
              <FileText size={20} className="text-indigo-600 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-gray-900 text-sm font-medium truncate">
                  {selectedFile.name}
                </p>
                <p className="text-gray-500 text-xs mt-0.5">
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
              <button
                type="button"
                onClick={clearFile}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Remove selected file"
              >
                <X size={18} />
              </button>
            </div>
          ) : (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={openFilePicker}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && openFilePicker()}
              className={[
                'flex flex-col items-center justify-center gap-3 p-8 sm:p-12',
                'border-2 border-dashed rounded-lg cursor-pointer transition-colors',
                isDragging
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50',
              ].join(' ')}
            >
              <CloudUpload
                size={36}
                className={isDragging ? 'text-indigo-500' : 'text-gray-400'}
              />
              <div className="text-center">
                <p className="text-gray-700 text-sm font-medium">
                  {isDragging ? 'Drop your file here' : 'Drag & drop your transcript'}
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  or{' '}
                  <span className="text-indigo-600 font-medium">browse files</span>
                  {' '}· .txt, .pdf, .doc, .docx · up to 20 MB
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3">
          <button
            type="button"
            onClick={cancel}
            className="px-4 py-2.5 sm:px-6 sm:py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-sm sm:text-base text-center"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!selectedFile || isProcessing}
            className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Generate Insights
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}