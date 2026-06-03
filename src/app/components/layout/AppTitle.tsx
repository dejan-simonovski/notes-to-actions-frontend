import { Sparkles } from "lucide-react";

export function AppTitle() {
  return (
    <div className="relative inline-flex items-center">
      <Sparkles
        className="absolute left-47 -top-2 text-yellow-400 opacity-100"
        size={25}
      />

      <h1 className="relative text-indigo-600 whitespace-nowrap font-semibold">
        AI Meeting Notes
      </h1>
    </div>
  );
}