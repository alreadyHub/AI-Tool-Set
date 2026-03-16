export const TRENDING_TOOLS = [
  {
    id: 'cursor',
    name: 'Cursor',
    category: 'AI Coding',
    tagline: 'The AI-first code editor taking over dev Twitter',
    whatItIs: 'A VS Code fork where the AI understands your entire codebase — tab-complete whole functions, chat with your repo, and let it write multi-file changes autonomously.',
    momentum: 'hot',
    sources: {
      hn: { query: 'Cursor AI editor' },
      reddit: { url: 'https://www.reddit.com/r/cursor/', label: 'r/cursor' },
      x: { url: 'https://x.com/search?q=cursor+ai+editor&src=typed_query&f=live', label: 'X' },
      ph: { url: 'https://www.producthunt.com/products/cursor-the-ai-first-code-editor', label: 'Product Hunt' },
    },
    quotes: [
      { text: 'Switched from VS Code 3 months ago. My output has literally doubled.', source: 'Reddit' },
      { text: 'The tab completion isn\'t autocomplete — it\'s the AI finishing your thought.', source: 'HN' },
    ],
  },
  {
    id: 'lovable',
    name: 'Lovable',
    category: 'Vibe Coding',
    tagline: 'Build full-stack apps by chatting — no code required',
    whatItIs: 'Describe what you want to build and Lovable generates a complete full-stack web app. Connects to Supabase, deploys to the web, and iterates based on your feedback.',
    momentum: 'rising',
    sources: {
      hn: { query: 'Lovable dev app builder' },
      reddit: { url: 'https://www.reddit.com/r/lovable_dev/', label: 'r/lovable_dev' },
      x: { url: 'https://x.com/search?q=lovable+dev&src=typed_query&f=live', label: 'X' },
      ph: { url: 'https://www.producthunt.com/products/lovable-2', label: 'Product Hunt' },
    },
    quotes: [
      { text: 'Built and shipped my MVP in a weekend. No joke.', source: 'X' },
      { text: 'Non-technical founders finally have their cheat code.', source: 'Reddit' },
    ],
  },
  {
    id: 'claude',
    name: 'Claude (Anthropic)',
    category: 'AI Model',
    tagline: 'The model developers reach for when quality matters',
    whatItIs: 'Anthropic\'s flagship AI model family — known for long context, instruction-following, and safety. Claude is the backbone of many AI products and coding tools.',
    momentum: 'hot',
    sources: {
      hn: { query: 'Claude Anthropic model' },
      reddit: { url: 'https://www.reddit.com/r/ClaudeAI/', label: 'r/ClaudeAI' },
      x: { url: 'https://x.com/search?q=claude+anthropic&src=typed_query&f=live', label: 'X' },
      ph: { url: 'https://www.producthunt.com/products/claude', label: 'Product Hunt' },
    },
    quotes: [
      { text: 'Claude writes code that actually works the first time. Others hallucinate APIs.', source: 'HN' },
      { text: 'The best model for anything that needs nuance — writing, analysis, reasoning.', source: 'Reddit' },
    ],
  },
  {
    id: 'perplexity',
    name: 'Perplexity AI',
    category: 'AI Search',
    tagline: 'The search engine that actually answers your question',
    whatItIs: 'An AI-powered answer engine that searches the web in real time and synthesizes cited, up-to-date answers. Replacing Google for research-heavy workflows.',
    momentum: 'rising',
    sources: {
      hn: { query: 'Perplexity AI search' },
      reddit: { url: 'https://www.reddit.com/r/perplexity_ai/', label: 'r/perplexity_ai' },
      x: { url: 'https://x.com/search?q=perplexity+ai&src=typed_query&f=live', label: 'X' },
      ph: { url: 'https://www.producthunt.com/products/perplexity-ai', label: 'Product Hunt' },
    },
    quotes: [
      { text: 'I haven\'t opened Google in 3 months. Perplexity just gives me the answer.', source: 'X' },
      { text: 'The citations make it actually trustworthy. Game changer for research.', source: 'Reddit' },
    ],
  },
  {
    id: 'bolt',
    name: 'Bolt.new',
    category: 'Vibe Coding',
    tagline: 'Full-stack apps from a prompt, live in your browser',
    whatItIs: 'StackBlitz\'s AI that spins up a complete development environment in the browser. Prompt it to build an app and it writes, runs, and previews the code — no setup.',
    momentum: 'stable',
    sources: {
      hn: { query: 'Bolt new StackBlitz AI' },
      reddit: { url: 'https://www.reddit.com/r/bolt_new/', label: 'r/bolt_new' },
      x: { url: 'https://x.com/search?q=bolt.new&src=typed_query&f=live', label: 'X' },
      ph: { url: 'https://www.producthunt.com/products/bolt-new', label: 'Product Hunt' },
    },
    quotes: [
      { text: 'Zero to deployed app in under 10 minutes. Wild.', source: 'X' },
      { text: 'Best for quick prototypes you need to show a client same day.', source: 'Reddit' },
    ],
  },
  {
    id: 'gemini',
    name: 'Gemini 2.0',
    category: 'AI Model',
    tagline: 'Google\'s strongest model push yet — and it\'s shipping fast',
    whatItIs: 'Google DeepMind\'s latest model family with multimodal reasoning, massive context windows, and deep integration across Google Workspace and developer tools.',
    momentum: 'rising',
    sources: {
      hn: { query: 'Gemini 2.0 Google AI' },
      reddit: { url: 'https://www.reddit.com/r/Gemini/', label: 'r/Gemini' },
      x: { url: 'https://x.com/search?q=gemini+2.0&src=typed_query&f=live', label: 'X' },
      ph: { url: 'https://www.producthunt.com/products/gemini', label: 'Product Hunt' },
    },
    quotes: [
      { text: 'The 1M token context window is not a gimmick — it changes how you work with docs.', source: 'HN' },
      { text: 'Google is shipping so fast right now. Gemini 2.0 actually surprised me.', source: 'X' },
    ],
  },
];

export const MOMENTUM_CONFIG = {
  hot:    { label: 'Hot',    color: 'text-orange-400 bg-orange-400/10 border-orange-400/20' },
  rising: { label: 'Rising', color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
  stable: { label: 'Steady', color: 'text-blue-400 bg-blue-400/10 border-blue-400/20' },
};
