import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="max-w-3xl mx-auto w-full px-4 py-12">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-300 text-xs font-medium mb-5">
          The Mission
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">
          The 1-person company era is here. Are you ready?
        </h1>
        <p className="text-gray-400 leading-relaxed">
          For most of history, building a software company required a team — engineers, designers, marketers, sales reps, support staff. That changed fast.
        </p>
      </div>

      <div className="space-y-8">
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-6">
          <h2 className="text-white font-semibold mb-3">The problem we solve</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            In 2026, there are hundreds of AI-powered tools for coding, design, marketing, sales, and customer support. The problem isn't access to tools — it's knowing which ones to use and how to combine them.
          </p>
          <p className="text-gray-400 text-sm leading-relaxed">
            Should you use Lovable or Claude Code? Supabase or Firebase? Stripe or Lemon Squeezy? Intercom or a simple contact form? The combinations are overwhelming. StackSage cuts through the noise.
          </p>
        </div>

        <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-6">
          <h2 className="text-white font-semibold mb-3">Who it's for</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: '💻', label: 'Engineers', desc: 'Who want to move faster with AI' },
              { icon: '🎨', label: 'Designers', desc: 'Building products without deep code expertise' },
              { icon: '📋', label: 'Product Managers', desc: 'Prototyping ideas quickly' },
              { icon: '🎓', label: 'Students', desc: 'Building their first real product' },
              { icon: '🚀', label: 'Founders', desc: 'Launching with minimal headcount' },
              { icon: '⚡', label: 'Vibe Coders', desc: 'Weekend warriors building cool stuff' },
            ].map(p => (
              <div key={p.label} className="flex items-start gap-2.5">
                <span className="text-lg flex-shrink-0">{p.icon}</span>
                <div>
                  <div className="text-sm font-medium text-white">{p.label}</div>
                  <div className="text-xs text-gray-500">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-6">
          <h2 className="text-white font-semibold mb-3">The AI spectrum philosophy</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Not everyone wants to vibe-code their entire product. Some people want maximum control; others want to move as fast as humanly possible with AI doing most of the work.
          </p>
          <p className="text-gray-400 text-sm leading-relaxed">
            Our AI spectrum slider lets you position yourself on that continuum — and we adjust every recommendation accordingly. The default leans toward high AI automation, because we believe the future belongs to those who leverage AI aggressively.
          </p>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex-1 h-1.5 rounded-full bg-gradient-to-r from-sky-400 via-indigo-400 to-violet-500" />
            <span className="text-xs text-gray-500 flex-shrink-0">Full control → Vibe code</span>
          </div>
        </div>

        <div className="text-center pt-4">
          <Link
            to="/chat"
            className="inline-block px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors"
          >
            Find my stack →
          </Link>
        </div>
      </div>
    </div>
  );
}
