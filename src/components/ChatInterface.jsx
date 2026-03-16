import { useState, useRef, useEffect } from 'react';
import { streamChat, parseRecommendation } from '../lib/claude';
import { buildSystemPrompt } from '../data/systemPrompt';
import AISpectrumSlider from './AISpectrumSlider';
import StackCard from './StackCard';
import Roadmap from './Roadmap';
import { encodeResult } from '../lib/encode';
import { useNavigate } from 'react-router-dom';

const WELCOME_MESSAGE = {
  role: 'assistant',
  content: "Hey! I'm StackSage. Tell me what you're trying to build — a quick description is enough to get started. I'll help you figure out the best tools and roadmap for your goals.",
};

function MessageBubble({ msg, pending }) {
  const isUser = msg.role === 'user';

  // Strip JSON code blocks from assistant messages for display
  let displayContent = msg.content;
  if (!isUser) {
    displayContent = msg.content.replace(/```json[\s\S]*?```/g, '').trim();
  }

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center mt-0.5">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1L11 3.5V8.5L6 11L1 8.5V3.5L6 1Z" stroke="#6366f1" strokeWidth="1.5"/>
            <circle cx="6" cy="6" r="1.5" fill="#6366f1"/>
          </svg>
        </div>
      )}
      <div className={`max-w-[85%] ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
        <div
          className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed prose-dark ${
            isUser
              ? 'bg-indigo-600 text-white rounded-tr-sm'
              : 'bg-white/[0.05] text-gray-200 rounded-tl-sm border border-white/[0.07]'
          } ${pending ? 'animate-pulse' : ''}`}
          dangerouslySetInnerHTML={{ __html: formatMessage(displayContent) }}
        />
      </div>
    </div>
  );
}

function formatMessage(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\n/g, '<br/>');
}

export default function ChatInterface({ initialPrompt }) {
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState(initialPrompt || '');
  const [loading, setLoading] = useState(false);
  const [aiSpectrum, setAiSpectrum] = useState(7);
  const [recommendation, setRecommendation] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);
  const navigate = useNavigate();
  const sentInitialRef = useRef(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (initialPrompt && !sentInitialRef.current) {
      sentInitialRef.current = true;
      // Small delay so the component is mounted
      setTimeout(() => {
        sendMessage(initialPrompt);
        setInput('');
      }, 300);
    }
  }, []);

  async function sendMessage(overrideText) {
    const text = (overrideText !== undefined ? overrideText : input).trim();
    if (!text || loading) return;

    const userMsg = { role: 'user', content: text };
    // Build API messages from existing conversation (skip the welcome placeholder if it's the only message)
    const existingApiMessages = messages[0] === WELCOME_MESSAGE && messages.length === 1
      ? []
      : messages.filter(m => m.role === 'user' || m.role === 'assistant').map(m => ({ role: m.role, content: m.content }));
    const apiMessages = [...existingApiMessages, { role: 'user', content: text }];

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setError(null);

    // Placeholder for streaming
    const assistantPlaceholder = { role: 'assistant', content: '' };
    setMessages(prev => [...prev, assistantPlaceholder]);

    try {
      const systemPrompt = buildSystemPrompt(aiSpectrum);
      let fullText = '';

      await streamChat(
        apiMessages,
        systemPrompt,
        (delta) => {
          fullText += delta;
          setMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1] = { role: 'assistant', content: fullText };
            return updated;
          });
        }
      );

      // Check for recommendation JSON
      const rec = parseRecommendation(fullText);
      if (rec) {
        setRecommendation(rec);
        if (rec.aiScore) setAiSpectrum(rec.aiScore);
      }
    } catch (err) {
      const errMsg = err.message?.includes('VITE_ANTHROPIC_API_KEY')
        ? 'API key not configured. Add VITE_ANTHROPIC_API_KEY to your .env file.'
        : `Error: ${err.message}`;
      setError(errMsg);
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function handleShare() {
    if (!recommendation) return;
    const encoded = encodeResult(recommendation);
    const url = `${window.location.origin}/results/${encoded}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleViewResults() {
    if (!recommendation) return;
    const encoded = encodeResult(recommendation);
    navigate(`/results/${encoded}`);
  }

  function handleSpectrumChange(val) {
    setAiSpectrum(val);
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-full">
      {/* Chat column */}
      <div className="flex flex-col flex-1 min-h-0 min-w-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 pb-4 pr-1">
          {messages.map((msg, i) => (
            <MessageBubble key={i} msg={msg} pending={loading && i === messages.length - 1 && msg.content === ''} />
          ))}
          {loading && messages[messages.length - 1]?.content === '' && (
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
              </div>
              <div className="bg-white/[0.05] border border-white/[0.07] rounded-2xl rounded-tl-sm px-4 py-2.5">
                <span className="text-gray-400 text-sm">Thinking...</span>
              </div>
            </div>
          )}
          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="flex-shrink-0 pt-3 border-t border-white/[0.06]">
          <div className="flex gap-2">
            <textarea
              ref={textareaRef}
              rows={2}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe what you're building..."
              disabled={loading}
              className="flex-1 resize-none bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.06] transition-colors disabled:opacity-50"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="flex-shrink-0 w-10 h-10 mt-1 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M14 8L2 2L5 8L2 14L14 8Z" fill="white"/>
              </svg>
            </button>
          </div>
          <p className="text-xs text-gray-600 mt-1.5 pl-1">Enter to send · Shift+Enter for new line</p>
        </div>
      </div>

      {/* Right panel */}
      <div className="w-full lg:w-80 xl:w-96 flex-shrink-0 space-y-4">
        <AISpectrumSlider value={aiSpectrum} onChange={handleSpectrumChange} />

        {recommendation ? (
          <div className="space-y-3">
            <StackCard recommendation={recommendation} />
            <Roadmap steps={recommendation.roadmap} />
            <div className="flex gap-2">
              <button
                onClick={handleShare}
                className="flex-1 py-2.5 rounded-xl border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.07] text-sm text-gray-300 transition-colors"
              >
                {copied ? '✓ Copied!' : 'Share Link'}
              </button>
              <button
                onClick={handleViewResults}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-sm text-white font-medium transition-colors"
              >
                Full View
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 text-center">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-3">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L18 6V14L10 18L2 14V6L10 2Z" stroke="#6366f1" strokeWidth="1.5"/>
                <circle cx="10" cy="10" r="3" fill="#6366f1" fillOpacity="0.4"/>
              </svg>
            </div>
            <p className="text-sm text-gray-400">Your recommended stack will appear here after the conversation.</p>
          </div>
        )}
      </div>
    </div>
  );
}
