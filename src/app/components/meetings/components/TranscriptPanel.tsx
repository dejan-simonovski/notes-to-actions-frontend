interface TranscriptPanelProps {
    transcript: string | undefined;
}

export function TranscriptPanel({ transcript }: TranscriptPanelProps) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6 flex flex-col min-h-96 max-h-[600px]">
            <h3 className="text-gray-900 mb-3 font-semibold flex-shrink-0">Transcript</h3>
            <div className="overflow-y-auto flex-1 min-h-0 flex flex-col">
                {transcript ? (
                    <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap">
                        {transcript}
                    </p>
                ) : (
                    <div className="flex-1 flex items-center justify-center">
                        <p className="text-sm text-gray-400 italic">No transcript available.</p>
                    </div>
                )}
            </div>
        </div>
    );
}