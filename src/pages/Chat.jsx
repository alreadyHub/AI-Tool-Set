import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import ChatInterface from '../components/ChatInterface';

export default function Chat() {
  const [searchParams] = useSearchParams();
  const initialPrompt = searchParams.get('prompt');

  return (
    <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full px-4 py-6" style={{ minHeight: 0 }}>
      <div className="mb-5">
        <h1 className="text-xl font-bold text-white">Get Your Stack</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          Tell StackSage what you're building and get a personalized tool recommendation.
        </p>
      </div>
      <div className="flex-1 min-h-0" style={{ height: 'calc(100vh - 180px)' }}>
        <ChatInterface initialPrompt={initialPrompt} />
      </div>
    </div>
  );
}
