import { Link } from 'react-router-dom';
import TrendingSection from '../components/TrendingSection';

const EXAMPLES = [
  {
    icon: '🏢',
    label: 'Work Prototype',
    prompt: "I need to build a website to show a prototype at work. I'm not very technical.",
  },
  {
    icon: '💸',
    label: 'Fintech SaaS',
    prompt: "I'm a software engineer building a complex, secure fintech web app with a mobile component. I want to market, sell, and support it myself.",
  },
  {
    icon: '🚀',
    label: 'Weekend Project',
    prompt: "I want to build a SaaS side project over the weekend — just me, no team.",
  },
  {
    icon: '🎓',
    label: 'Student MVP',
    prompt: "I'm a student building an MVP to show investors. I want to move fast and keep it simple.",
  },
];

const STATS = [
  { value: '2026', label: 'The year it got easy' },
  { value: '1', label: 'Person, billion-$ co.' },
  { value: '∞', label: 'Possible stacks' },
];

export default function Home() {
  return (
    <div className="flex-1 flex flex-col">
      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 max-w-4xl mx-auto w-full">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-300 text-xs font-medium mb-8">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          The 1-person company era is here
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6">
          Build your company
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
            with the right AI tools
          </span>
        </h1>

        <p className="text-lg text-gray-400 max-w-2xl mb-10 leading-relaxed">
          In 2026, one person can build, ship, and scale a product company. We help you navigate the explosion of AI tools to find the exact stack for your goals — from vibe-coding to enterprise-grade.
        </p>

        <div className="flex flex-wrap gap-3 justify-center mb-16">
          <Link
            to="/chat"
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-indigo-500/20"
          >
            Get My Stack →
          </Link>
          <Link
            to="/explore"
            className="px-6 py-3 rounded-xl border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.07] text-gray-200 text-sm font-medium transition-colors"
          >
            Explore Tools
          </Link>
        </div>

        <div className="flex gap-12 justify-center">
          {STATS.map(s => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-bold text-white mb-1">{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Examples */}
      <section className="max-w-4xl mx-auto w-full px-4 pb-20">
        <h2 className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
          Try an example
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {EXAMPLES.map(ex => (
            <Link
              key={ex.label}
              to={`/chat?prompt=${encodeURIComponent(ex.prompt)}`}
              className="rounded-xl border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all p-4 text-left group"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{ex.icon}</span>
                <span className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">{ex.label}</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{ex.prompt}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending */}
      <TrendingSection />

      {/* How it works */}
      <section className="border-t border-white/[0.06] py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-2xl font-bold text-white mb-2">How it works</h2>
          <p className="text-center text-gray-400 text-sm mb-12">Three steps to your perfect stack</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Describe your idea', desc: 'Chat with StackSage about what you want to build, your goals, and your technical comfort level.' },
              { step: '02', title: 'Set your AI preference', desc: 'Choose how AI-automated you want to go — from full vibe-coding to full manual control.' },
              { step: '03', title: 'Get your stack + roadmap', desc: 'Receive a tailored tool recommendation and step-by-step roadmap to start building today.' },
            ].map(item => (
              <div key={item.step} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
                <div className="text-3xl font-bold text-indigo-500/40 mb-3">{item.step}</div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
