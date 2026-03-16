import { useParams, Link } from 'react-router-dom';
import { decodeResult } from '../lib/encode';
import StackCard from '../components/StackCard';
import Roadmap from '../components/Roadmap';
import { useState } from 'react';

export default function Results() {
  const { id } = useParams();
  const [copied, setCopied] = useState(false);
  const recommendation = id ? decodeResult(id) : null;

  function handleCopy() {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (!recommendation) {
    return (
      <div className="max-w-2xl mx-auto w-full px-4 py-20 text-center">
        <div className="text-5xl mb-4">🤔</div>
        <h2 className="text-xl font-bold text-white mb-2">No results found</h2>
        <p className="text-gray-400 text-sm mb-6">This link may be invalid or expired.</p>
        <Link to="/chat" className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors">
          Get my stack
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto w-full px-4 py-8">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-white">Your Recommended Stack</h1>
          <p className="text-sm text-gray-400 mt-0.5">Powered by StackSage</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-lg border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.07] text-sm text-gray-300 transition-colors"
          >
            {copied ? '✓ Copied!' : 'Copy Link'}
          </button>
          <Link
            to="/chat"
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm text-white font-medium transition-colors"
          >
            New Stack
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        <StackCard recommendation={recommendation} />
        <Roadmap steps={recommendation.roadmap} />
      </div>

      <div className="mt-8 rounded-xl border border-white/[0.07] bg-white/[0.02] p-5 text-center">
        <p className="text-sm text-gray-400 mb-3">Want a different stack? Adjust your preferences and chat with StackSage.</p>
        <Link to="/chat" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors">
          Start a new conversation →
        </Link>
      </div>
    </div>
  );
}
