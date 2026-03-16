import { useEffect, useState } from 'react';
import { TRENDING_TOOLS, MOMENTUM_CONFIG } from '../data/trending';

const HN_BASE = 'https://hn.algolia.com/api/v1/search';
const THIRTY_DAYS_AGO = Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60;

function SourceBadge({ href, icon, label, detail, loading }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={e => e.stopPropagation()}
      className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/[0.14] transition-colors text-xs text-gray-400 hover:text-gray-200"
    >
      <span>{icon}</span>
      <span className="font-medium">{label}</span>
      {loading ? (
        <span className="w-8 h-3 rounded bg-white/10 animate-pulse" />
      ) : detail ? (
        <span className="text-gray-500">{detail}</span>
      ) : null}
    </a>
  );
}

function TrendingCard({ tool, rank, hnData, hnLoading }) {
  const momentum = MOMENTUM_CONFIG[tool.momentum];
  const hn = hnData[tool.id];
  const quote = tool.quotes[0];

  const hnDetail = hn ? `${hn.points} pts · ${hn.num_comments} comments` : null;
  const hnHref = hn
    ? `https://news.ycombinator.com/item?id=${hn.objectID}`
    : `https://news.ycombinator.com/search?q=${encodeURIComponent(tool.sources.hn.query)}`;

  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.11] transition-all p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-2xl font-bold text-white/10 tabular-nums shrink-0">
            {String(rank).padStart(2, '0')}
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-white font-semibold text-sm">{tool.name}</h3>
              <span className="text-xs text-gray-500 bg-white/[0.05] border border-white/[0.07] px-2 py-0.5 rounded-full">
                {tool.category}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{tool.tagline}</p>
          </div>
        </div>
        <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full border ${momentum.color}`}>
          {momentum.label}
        </span>
      </div>

      {/* What it is */}
      <p className="text-xs text-gray-400 leading-relaxed">{tool.whatItIs}</p>

      {/* Where it's talked about */}
      <div>
        <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-wider mb-2">Talked about on</p>
        <div className="flex flex-wrap gap-1.5">
          <SourceBadge
            href={hnHref}
            icon="🔶"
            label="Hacker News"
            detail={hnDetail}
            loading={hnLoading && !hn}
          />
          <SourceBadge
            href={tool.sources.reddit.url}
            icon="🟠"
            label={tool.sources.reddit.label}
          />
          <SourceBadge
            href={tool.sources.x.url}
            icon="✖"
            label="X / Twitter"
          />
          <SourceBadge
            href={tool.sources.ph.url}
            icon="🔼"
            label="Product Hunt"
          />
        </div>
      </div>

      {/* What people are saying */}
      <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3">
        <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-wider mb-1.5">What people are saying</p>
        <p className="text-xs text-gray-300 leading-relaxed italic">"{quote.text}"</p>
        <p className="text-[10px] text-gray-600 mt-1.5">— {quote.source}</p>
      </div>
    </div>
  );
}

export default function TrendingSection() {
  const [hnData, setHnData] = useState({});
  const [hnLoading, setHnLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchAll() {
      const results = await Promise.allSettled(
        TRENDING_TOOLS.map(async tool => {
          const url = `${HN_BASE}?query=${encodeURIComponent(tool.sources.hn.query)}&tags=story&numericFilters=created_at_i>${THIRTY_DAYS_AGO}&hitsPerPage=1`;
          const res = await fetch(url);
          const json = await res.json();
          return { id: tool.id, hit: json.hits?.[0] ?? null };
        })
      );

      if (cancelled) return;

      const map = {};
      results.forEach(r => {
        if (r.status === 'fulfilled' && r.value.hit) {
          map[r.value.id] = r.value.hit;
        }
      });
      setHnData(map);
      setHnLoading(false);
    }

    fetchAll();
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="border-t border-white/[0.06] py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">🔥</span>
              <h2 className="text-2xl font-bold text-white">Trending in AI</h2>
            </div>
            <p className="text-sm text-gray-400">
              What's getting talked about right now — across HN, Reddit, X, and Product Hunt.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-600">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Updated daily
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TRENDING_TOOLS.map((tool, i) => (
            <TrendingCard
              key={tool.id}
              tool={tool}
              rank={i + 1}
              hnData={hnData}
              hnLoading={hnLoading}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
