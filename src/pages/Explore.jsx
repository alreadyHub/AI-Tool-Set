import ToolGrid from '../components/ToolGrid';

export default function Explore() {
  return (
    <div className="max-w-6xl mx-auto w-full px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Explore Tools</h1>
        <p className="text-gray-400 text-sm max-w-2xl">
          Browse the full catalog of AI tools, frameworks, and platforms we recommend.
          Each tool has an AI score (1–10) indicating how AI-automated it is.
        </p>
      </div>
      <ToolGrid />
    </div>
  );
}
