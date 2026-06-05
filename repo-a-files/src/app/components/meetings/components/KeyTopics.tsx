interface KeyTopicsProps {
    topics: string[];
}

export function KeyTopics({ topics }: KeyTopicsProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6">
      <h3 className="text-gray-900 mb-3 font-semibold">Key Topics</h3>
      <div className="flex flex-wrap gap-2">
        {topics.map((topic, idx) => (
          <span
            key={idx}
            className="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm"
          >
            {topic}
          </span>
        ))}
      </div>
    </div>
  );
}