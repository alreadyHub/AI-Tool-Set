export default function AISpectrumSlider({ value, onChange }) {
  const pct = ((value - 1) / 9) * 100;

  const label =
    value >= 9 ? 'Full Vibe Code' :
    value >= 7 ? 'AI-First' :
    value >= 5 ? 'Balanced' :
    value >= 3 ? 'AI-Assisted' :
    'Full Control';

  const color =
    value >= 8 ? '#8b5cf6' :
    value >= 6 ? '#6366f1' :
    value >= 4 ? '#3b82f6' :
    value >= 2 ? '#0ea5e9' :
    '#06b6d4';

  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">AI Spectrum</span>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ color, backgroundColor: `${color}20` }}>
          {label}
        </span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={1}
          max={10}
          step={1}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, ${color} 0%, ${color} ${pct}%, rgba(255,255,255,0.1) ${pct}%, rgba(255,255,255,0.1) 100%)`,
          }}
        />
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-xs text-gray-600">Full Control</span>
        <span className="text-xs text-gray-600">Vibe Code</span>
      </div>
    </div>
  );
}
