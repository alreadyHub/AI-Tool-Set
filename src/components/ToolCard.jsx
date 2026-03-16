const CATEGORY_COLORS = {
  'ai-coding': { bg: 'bg-violet-500/10', text: 'text-violet-400', border: 'border-violet-500/20' },
  'frontend': { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
  'backend': { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  'database': { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20' },
  'auth': { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' },
  'deployment': { bg: 'bg-sky-500/10', text: 'text-sky-400', border: 'border-sky-500/20' },
  'design': { bg: 'bg-pink-500/10', text: 'text-pink-400', border: 'border-pink-500/20' },
  'marketing': { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/20' },
  'sales': { bg: 'bg-lime-500/10', text: 'text-lime-400', border: 'border-lime-500/20' },
  'support': { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/20' },
  'deck': { bg: 'bg-fuchsia-500/10', text: 'text-fuchsia-400', border: 'border-fuchsia-500/20' },
  'mobile': { bg: 'bg-indigo-500/10', text: 'text-indigo-400', border: 'border-indigo-500/20' },
  'communication': { bg: 'bg-teal-500/10', text: 'text-teal-400', border: 'border-teal-500/20' },
};

function AIScore({ score }) {
  const blocks = Array.from({ length: 10 }, (_, i) => i + 1);
  return (
    <div className="flex gap-0.5 items-center">
      {blocks.map(b => (
        <div
          key={b}
          className={`h-1.5 w-1.5 rounded-full ${b <= score ? 'bg-indigo-400' : 'bg-white/10'}`}
        />
      ))}
    </div>
  );
}

export default function ToolCard({ tool }) {
  const colors = CATEGORY_COLORS[tool.category] || CATEGORY_COLORS['frontend'];
  const initials = tool.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-xl border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-200 p-4 group"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${colors.bg} ${colors.text} border ${colors.border}`}>
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors truncate">
              {tool.name}
            </h3>
            <span className={`text-xs px-1.5 py-0.5 rounded-full border ${colors.bg} ${colors.text} ${colors.border} flex-shrink-0`}>
              {tool.category}
            </span>
          </div>
          {tool.pricing && (
            <p className="text-xs text-gray-500 mt-0.5">{tool.pricing}</p>
          )}
        </div>
      </div>

      <p className="text-xs text-gray-400 leading-relaxed mb-3 line-clamp-2">
        {tool.description}
      </p>

      <div className="flex items-center justify-between">
        <AIScore score={tool.aiScore} />
        <span className="text-xs text-gray-600">
          AI {tool.aiScore}/10
        </span>
      </div>
    </a>
  );
}
