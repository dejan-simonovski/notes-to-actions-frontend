import { Sparkles } from "lucide-react";

export function AppTitle() {
  return (
    <div className="inline-flex items-center gap-5">
      <h1 className="text-2xl font-bold text-indigo-600">Activo</h1>
      <Sparkles className="text-yellow-400" size={18} />
    </div>
  );
}