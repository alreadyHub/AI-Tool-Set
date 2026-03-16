export default function Roadmap({ steps }) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
        Your Build Roadmap
      </h3>
      <div className="space-y-0">
        {steps.map((step, i) => (
          <div key={i} className="flex gap-3 relative">
            {i < steps.length - 1 && (
              <div className="absolute left-[15px] top-7 bottom-0 w-px bg-white/[0.06]" />
            )}
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-xs font-semibold text-indigo-400 z-10">
              {i + 1}
            </div>
            <div className="pb-5 pt-1 min-w-0">
              <p className="text-sm text-gray-200 leading-relaxed">{step.replace(/^Step \d+:\s*/i, '')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
