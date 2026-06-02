import { useState } from "react";
import { useNavigate } from "react-router";
import { Upload, Sparkles } from "lucide-react";

const EXAMPLE_TRANSCRIPT = `Sarah: Good morning everyone. Let's dive into our Q2 product roadmap. We need to prioritize features for the next release.

Michael: I think we should focus on the AI-powered search functionality. Our users have been requesting this for months.

Sarah: Agreed. Michael, can you take the lead on scoping that out? I'd like a proposal by Friday.

Michael: Absolutely. I'll coordinate with the engineering team and get you something by end of week.

Jennifer: What about the mobile app redesign? We've been talking about it for a while.

Sarah: Good point. Jennifer, let's schedule a design review for next Tuesday. Can you pull together some mockups?

Jennifer: Sure thing. I'll have three different directions ready.

Michael: One more thing - we need to address the performance issues users reported last week.

Sarah: Priority one. Michael, can you assign someone from your team to investigate today?

Michael: I'll have Alex look into it immediately.`;

export function NewMeeting() {
  const navigate = useNavigate();
  const [transcript, setTranscript] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transcript.trim()) return;

    setIsProcessing(true);

    setTimeout(() => {
      navigate("/meeting/1");
    }, 1500);
  };

  const loadExample = () => {
    setTranscript(EXAMPLE_TRANSCRIPT);
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">New Meeting Analysis</h1>
          <p className="text-gray-600">
            Paste your meeting transcript below to generate AI-powered insights
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
            <div className="mb-4 flex items-center justify-between">
              <label htmlFor="transcript" className="text-gray-900">
                Meeting Transcript
              </label>
              <button
                type="button"
                onClick={loadExample}
                className="text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                Load example
              </button>
            </div>

            <textarea
              id="transcript"
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Paste your meeting transcript here...

Example:
Sarah: Let's discuss the Q2 roadmap.
Michael: I think we should prioritize the new analytics feature.
Sarah: Agreed. Can you scope that out by Friday?
..."
              className="w-full h-96 px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />

            <div className="mt-4 flex items-center gap-4">
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
              >
                <Upload size={20} />
                Upload File
              </button>
              <span className="text-gray-500">or paste text above</span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!transcript.trim() || isProcessing}
              className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Generate Insights
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
