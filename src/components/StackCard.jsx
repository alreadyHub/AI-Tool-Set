import toolsData from '../data/tools.json';

const CATEGORY_LABELS = {
  'ai-coding': 'AI Coding',
  'frontend': 'Frontend',
  'backend': 'Backend',
  'database': 'Database',
  'auth': 'Auth',
  'deployment': 'Deployment',
  'design': 'Design',
  'marketing': 'Marketing',
  'sales': 'Sales',
  'support': 'Support',
  'deck': 'Decks',
  'mobile': 'Mobile',
  'communication': 'Communication',
};

const CATEGORY_ICONS = {
  'ai-coding': '🤖',
  'frontend': '🖥️',
  'backend': '⚙️',
  'database': '🗄️',
  'auth': '🔐',
  'deployment': '🚀',
  'design': '🎨',
  'marketing': '📣',
  'sales': '💼',
  'support': '💬',
  'deck': '📊',
  'mobile': '📱',
  'communication': '🔗',
};

function ToolPill({ toolId }) {
  const tool = toolsData.tools.find(t => t.id === toolId);
  if (!tool) return null;
  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.06] border border-white/[0.08] hover:bg-white/[0.1] hover:border-white/[0.15] transition-all text-xs text-white font-medium"
    >
      {tool.name}
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="opacity-40">
        <path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    </a>
  );
}

export default function StackCard({ recommendation }) {
  if (!recommendation) return null;
  const { stack, summary, aiScore, rationale } = recommendation;

  const categories = Object.entries(stack).filter(([, ids]) => ids && ids.length > 0);

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
      <div className="px-5 py-4 border-b border-white/[0.06] flex items-start justify-between gap-4">
        <div>
          <h3 className="text-white font-semibold mb-1">{summary}</h3>
          {rationale && <p className="text-xs text-gray-400">{rationale}</p>}
        </div>
        <div className="flex-shrink-0 text-center">
          <div className="text-2xl font-bold text-indigo-400">{aiScore}</div>
          <div className="text-xs text-gray-500">AI Score</div>
        </div>
      </div>

      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map(([cat, ids]) => (
          <div key={cat}>
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-sm">{CATEGORY_ICONS[cat] || '🔧'}</span>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {CATEGORY_LABELS[cat] || cat}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {ids.map(id => <ToolPill key={id} toolId={id} />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
